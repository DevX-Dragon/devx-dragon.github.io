import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Trash2, Copy, Download, Check, Pencil } from "lucide-react";

const EMPTY_PROJECT = {
  title: "",
  tagline: "",
  description: "",
  tags: [],
  stack: [],
  github: "",
  demo: "",
  featured: false,
  year: new Date().getFullYear(),
};

const ALL_TAGS = ["React", "TypeScript", "Full-Stack", "Utilities"];

function makeId(title) {
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `${slug || "project"}-${Date.now().toString(36)}`;
}

/**
 * Visual admin drawer for the static-site CMS workflow described in the brief:
 * 1. Edits here write to localStorage and update the live UI immediately.
 * 2. "Copy JSON" / "Download projects.json" let the owner commit the result
 *    to their repo's src/data/projects.json so it's baked into the next build.
 */
export default function AdminCMS({ open, onClose, projects, setProjects }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(EMPTY_PROJECT);
  const [filterText, setFilterText] = useState("");
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        `${p.title} ${p.tagline} ${p.tags.join(" ")}`.toLowerCase().includes(filterText.toLowerCase())
      ),
    [projects, filterText]
  );

  function startNew() {
    setEditingId("new");
    setDraft(EMPTY_PROJECT);
  }

  function startEdit(project) {
    setEditingId(project.id);
    setDraft({ ...project, tags: [...project.tags], stack: [...project.stack] });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(EMPTY_PROJECT);
  }

  function saveDraft() {
    if (!draft.title.trim()) return;

    if (editingId === "new") {
      setProjects((prev) => [...prev, { ...draft, id: makeId(draft.title) }]);
    } else {
      setProjects((prev) => prev.map((p) => (p.id === editingId ? { ...draft, id: editingId } : p)));
    }
    cancelEdit();
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) cancelEdit();
  }

  function toggleTag(field, tag) {
    setDraft((d) => {
      const list = d[field].includes(tag) ? d[field].filter((t) => t !== tag) : [...d[field], tag];
      return { ...d, [field]: list };
    });
  }

  function toggleStackTag(tech) {
    setDraft((d) => {
      const has = d.stack.includes(tech);
      return { ...d, stack: has ? d.stack.filter((t) => t !== tech) : [...d.stack, tech] };
    });
  }

  const jsonOutput = useMemo(() => JSON.stringify(projects, null, 2), [projects]);

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API blocked — fall back to selecting the textarea manually.
    }
  }

  function downloadJson() {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-xl flex-col bg-white shadow-glass-lg"
            role="dialog"
            aria-label="Project admin panel"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">Project admin</h2>
                <p className="text-xs text-muted">Local edits only — export JSON to publish for real.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close admin panel"
                className="rounded-full p-2 text-muted hover:bg-zinc-100 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
              {editingId ? (
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-ink">
                    {editingId === "new" ? "New project" : "Edit project"}
                  </p>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">Title</label>
                    <input
                      value={draft.title}
                      onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                      className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">Tagline</label>
                    <input
                      value={draft.tagline}
                      onChange={(e) => setDraft((d) => ({ ...d, tagline: e.target.value }))}
                      className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">Description</label>
                    <textarea
                      rows={3}
                      value={draft.description}
                      onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                      className="w-full resize-none rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">GitHub URL</label>
                      <input
                        value={draft.github}
                        onChange={(e) => setDraft((d) => ({ ...d, github: e.target.value }))}
                        className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">Demo URL</label>
                      <input
                        value={draft.demo}
                        onChange={(e) => setDraft((d) => ({ ...d, demo: e.target.value }))}
                        className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">Year</label>
                      <input
                        type="number"
                        value={draft.year}
                        onChange={(e) => setDraft((d) => ({ ...d, year: Number(e.target.value) }))}
                        className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                      />
                    </div>
                    <label className="flex items-center gap-2 self-end pb-2 text-sm text-muted">
                      <input
                        type="checkbox"
                        checked={draft.featured}
                        onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
                        className="accent-indigo"
                      />
                      Featured (wider card)
                    </label>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">Filter tags</label>
                    <div className="flex flex-wrap gap-1.5">
                      {ALL_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag("tags", tag)}
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            draft.tags.includes(tag)
                              ? "bg-indigo text-white"
                              : "border border-hairline text-muted"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Stack (comma separated, click to remove)
                    </label>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {draft.stack.map((tech) => (
                        <button
                          key={tech}
                          type="button"
                          onClick={() => toggleStackTag(tech)}
                          className="rounded-full bg-emerald-soft px-2.5 py-1 text-xs font-medium text-emerald"
                        >
                          {tech} ×
                        </button>
                      ))}
                    </div>
                    <input
                      placeholder="Type a technology and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault();
                          toggleStackTag(e.currentTarget.value.trim());
                          e.currentTarget.value = "";
                        }
                      }}
                      className="w-full rounded-lg border border-hairline px-3 py-2 text-sm focus:border-indigo"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={saveDraft}
                      className="flex-1 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white"
                    >
                      Save project
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="rounded-full border border-hairline px-4 py-2.5 text-sm font-medium text-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    <input
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      placeholder="Filter projects..."
                      className="flex-1 rounded-full border border-hairline px-3.5 py-2 text-sm focus:border-indigo"
                    />
                    <button
                      type="button"
                      onClick={startNew}
                      className="flex shrink-0 items-center gap-1.5 rounded-full bg-indigo px-3.5 py-2 text-sm font-medium text-white"
                    >
                      <Plus size={15} /> Add
                    </button>
                  </div>

                  <ul className="space-y-2">
                    {filtered.map((project) => (
                      <li
                        key={project.id}
                        className="flex items-center justify-between gap-3 rounded-xl border border-hairline px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">{project.title}</p>
                          <p className="truncate text-xs text-muted">{project.tagline}</p>
                        </div>
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(project)}
                            aria-label={`Edit ${project.title}`}
                            className="rounded-full p-2 text-muted hover:bg-indigo-soft hover:text-indigo"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                            aria-label={`Delete ${project.title}`}
                            className="rounded-full p-2 text-muted hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                    {filtered.length === 0 && (
                      <p className="py-8 text-center text-sm text-muted">No projects match that filter.</p>
                    )}
                  </ul>
                </>
              )}
            </div>

            <div className="border-t border-hairline px-6 py-4">
              <p className="mb-2 text-xs font-medium text-muted">
                Export to make changes permanent on GitHub Pages
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={copyJson}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-hairline px-4 py-2.5 text-sm font-medium text-ink"
                >
                  {copied ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy JSON"}
                </button>
                <button
                  type="button"
                  onClick={downloadJson}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white"
                >
                  <Download size={15} /> Download projects.json
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
                Replace <code>src/data/projects.json</code> in your repo with this file and push to
                update your live GitHub Pages site.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
