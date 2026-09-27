import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import MagneticButton from "./MagneticButton.jsx";
import TiltCard from "./TiltCard.jsx";
import LiveCodeDemo from "./LiveCodeDemo.jsx";
import StatsCounter from "./StatsCounter.jsx";

const SKILL_PILLS = ["React", "TypeScript", "Node.js", "Postgres", "Vite", "Tailwind"];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-3 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
            </span>
            Open for collaboration
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
          >
            Hi, I'm DevX-Dragon 👋
            <br />
            <span className="text-indigo">I build software that ships.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-muted"
          >
            Full-stack developer focused on fast, resilient products — from
            real-time collaboration engines to the small CLI tools that make
            a team's week easier.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              as="a"
              href="#work"
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              See my work <ArrowUpRight size={15} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="https://github.com/DevX-Dragon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-white px-5 py-3 text-sm font-medium text-ink"
            >
              <Github size={15} /> GitHub
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {SKILL_PILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-hairline bg-white px-3 py-1 text-xs font-medium text-muted"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <div className="mt-14 border-t border-hairline pt-8">
            <StatsCounter />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <TiltCard className="group rounded-2xl">
            <LiveCodeDemo />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
