import { useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "React & TypeScript", level: 95, note: "Primary stack for the last 4 years." },
  { name: "Node.js & APIs", level: 90, note: "REST, GraphQL, and the occasional gRPC." },
  { name: "Databases (SQL/NoSQL)", level: 82, note: "Postgres by default, Redis for speed." },
  { name: "DevOps & CI/CD", level: 74, note: "GitHub Actions, Docker, comfortable in a Dockerfile." },
  { name: "System Design", level: 78, note: "Enjoys the whiteboard as much as the editor." },
  { name: "UI/UX Craft", level: 85, note: "Believes motion should answer a question, not decorate." },
];

export default function Skills() {
  const [active, setActive] = useState(null);

  return (
    <section id="skills" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
          Skills &amp; arsenal
        </h2>
        <p className="mt-2 max-w-md text-[15px] text-muted">
          Click a skill to see what it means in practice.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill) => {
            const isActive = active === skill.name;
            return (
              <button
                key={skill.name}
                type="button"
                data-cursor-hover
                onClick={() => setActive(isActive ? null : skill.name)}
                aria-expanded={isActive}
                className="rounded-2xl border border-hairline bg-canvas p-5 text-left transition-colors hover:border-indigo/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">{skill.name}</span>
                  <span className="text-xs font-medium text-muted">{skill.level}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-hairline">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="h-full rounded-full bg-indigo"
                  />
                </div>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 text-xs leading-relaxed text-muted"
                  >
                    {skill.note}
                  </motion.p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
