import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MILESTONES = [
  {
    year: "2025 — Now",
    role: "Senior Full-Stack Engineer",
    org: "Independent / Contract",
    detail:
      "Building Emberflow and Hoard as flagship open-source projects while taking select full-stack contracts for early-stage teams.",
  },
  {
    year: "2023 — 2025",
    role: "Full-Stack Engineer",
    org: "Series B startup",
    detail:
      "Owned the collaboration features of a project-management product used by 12,000+ teams, including real-time presence and permission systems.",
  },
  {
    year: "2021 — 2023",
    role: "Frontend Engineer",
    org: "Digital agency",
    detail:
      "Shipped 20+ client sites and internal tools, and built the agency's first shared component library, cutting new-project setup time by 60%.",
  },
  {
    year: "2020",
    role: "First commit",
    org: "Learning to ship",
    detail:
      "Pushed the first real project to GitHub — a to-do app with far too many features for a to-do app.",
  },
];

export default function Timeline() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">Experience</h2>

        <div className="mt-10 border-l border-hairline">
          {MILESTONES.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.role} className="relative pb-8 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                    isOpen ? "bg-indigo" : "bg-zinc-300"
                  }`}
                />
                <button
                  type="button"
                  data-cursor-hover
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <div>
                    <p className="text-xs font-medium text-indigo">{item.year}</p>
                    <p className="mt-0.5 font-display text-lg font-semibold text-ink">
                      {item.role}
                    </p>
                    <p className="text-sm text-muted">{item.org}</p>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-muted" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="mt-3 max-w-lg overflow-hidden text-sm leading-relaxed text-muted"
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
