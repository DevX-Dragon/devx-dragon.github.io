import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STATUS_QUOTES = [
  "Dragon is currently compiling...",
  "Reticulating splines and scales.",
  "npm install more-fire",
  "Warming up the git blame flamethrower.",
  "99 problems, 0 are merge conflicts today.",
  "Hoarding semicolons instead of gold.",
  "Rebasing onto main, wish me luck.",
  "Currently in a meeting that could've been a PR comment.",
];

/** A tiny particle spark used for the mascot's click burst. */
function Spark({ angle, distance, delay }) {
  const tx = Math.cos(angle) * distance;
  const ty = Math.sin(angle) * distance;
  return (
    <span
      className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-indigo animate-spark"
      style={{ "--tx": `${tx}px`, "--ty": `${ty}px`, animationDelay: `${delay}ms` }}
    />
  );
}

export default function DragonMascot() {
  const [bursting, setBursting] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(null);
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback(() => {
    // Particle burst
    const newSparks = Array.from({ length: 10 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      angle: (Math.PI * 2 * i) / 10,
      distance: 26 + Math.random() * 18,
      delay: Math.random() * 80,
    }));
    setSparks(newSparks);
    setBursting(true);
    setTimeout(() => setBursting(false), 350);
    setTimeout(() => setSparks([]), 900);

    // Rotate through status quotes
    setQuoteIndex((prev) => {
      const next = prev === null ? 0 : (prev + 1) % STATUS_QUOTES.length;
      return next;
    });
  }, []);

  return (
    <div className="relative flex items-center">
      <motion.button
        type="button"
        data-cursor-hover
        onClick={handleClick}
        aria-label="Say hi to the dragon mascot"
        animate={bursting ? { rotate: [0, -8, 8, -4, 0], scale: [1, 1.12, 1] } : {}}
        transition={{ duration: 0.35 }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl leading-none hover:bg-indigo-soft transition-colors"
      >
        <span aria-hidden="true">🐉</span>
        {sparks.map((s) => (
          <Spark key={s.id} angle={s.angle} distance={s.distance} delay={s.delay} />
        ))}
      </motion.button>

      <AnimatePresence>
        {quoteIndex !== null && (
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="status"
            className="glass shadow-glass absolute left-12 top-1/2 z-40 w-max max-w-[220px] -translate-y-1/2 rounded-xl px-3 py-2 text-xs font-medium text-ink"
          >
            {STATUS_QUOTES[quoteIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
