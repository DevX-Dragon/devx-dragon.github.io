import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectModal from "./ProjectModal.jsx";

const FILTERS = ["All", "React", "TypeScript", "Full-Stack", "Utilities"];

export default function ProjectHub({ projects }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [openProject, setOpenProject] = useState(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.tags.includes(filter);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [projects, filter, query]);

  return (
    <section id="work" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
              Selected work
            </h2>
            <p className="mt-2 max-w-md text-[15px] text-muted">
              A mix of shipped products and the small tools I built because I
              couldn't find them elsewhere.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects"
              className="w-full rounded-full border border-hairline bg-white py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-zinc-400 focus:border-indigo"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              data-cursor-hover
              onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-ink text-white"
                  : "bg-white text-muted border border-hairline hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-hairline py-16 text-center">
            <p className="text-sm text-muted">
              No projects match "{query || filter}" yet. Try a different search or filter.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={project.featured}
                onOpen={setOpenProject}
              />
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
