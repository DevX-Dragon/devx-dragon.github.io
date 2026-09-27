import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import confetti from "canvas-confetti";
import TiltCard from "./TiltCard.jsx";

export default function ProjectCard({ project, featured, onOpen }) {
  const [starred, setStarred] = useState(false);

  function handleStar(e) {
    e.stopPropagation();
    setStarred((s) => !s);
    if (!starred) {
      const rect = e.currentTarget.getBoundingClientRect();
      confetti({
        particleCount: 36,
        spread: 55,
        startVelocity: 28,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#4F46E5", "#10B981", "#A5B4FC"],
        scalar: 0.8,
      });
    }
  }

  return (
    <TiltCard maxTilt={4} className={`group h-full rounded-2xl ${featured ? "sm:col-span-2" : ""}`}>
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor-hover
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="glass shadow-glass flex h-full w-full flex-col rounded-2xl p-6 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          </div>
          <button
            type="button"
            onClick={handleStar}
            data-cursor-hover
            aria-label={starred ? "Unstar project" : "Star project"}
            aria-pressed={starred}
            className={`shrink-0 rounded-full p-1.5 transition-colors ${
              starred ? "text-amber-500" : "text-zinc-300 hover:text-amber-400"
            }`}
          >
            <Star size={17} fill={starred ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-indigo-soft px-2.5 py-1 text-[11px] font-medium text-indigo"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Github size={13} /> Source
          </span>
          {project.demo && (
            <span className="inline-flex items-center gap-1">
              <ExternalLink size={13} /> Live demo
            </span>
          )}
          <span className="ml-auto">{project.year}</span>
        </div>
      </motion.button>
    </TiltCard>
  );
}
