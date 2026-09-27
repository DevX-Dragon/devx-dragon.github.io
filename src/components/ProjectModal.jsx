import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-7 shadow-glass-lg scrollbar-thin"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
                {project.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                data-cursor-hover
                aria-label="Close"
                className="rounded-full p-1.5 text-muted hover:bg-zinc-100 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-1 text-sm font-medium text-indigo">{project.tagline}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-emerald-soft px-2.5 py-1 text-[11px] font-medium text-emerald"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white"
              >
                <Github size={15} /> View source
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-hairline px-4 py-2.5 text-sm font-medium text-ink"
                >
                  <ExternalLink size={15} /> Live demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
