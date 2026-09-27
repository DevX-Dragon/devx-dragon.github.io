import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function Counter({ to, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 214000, suffix: "+", label: "Lines of code shipped" },
  { to: 1487, suffix: "", label: "Commits this year" },
  { to: 62, suffix: "", label: "Projects deployed" },
  { to: 891, suffix: "", label: "Cups of coffee (est.)" },
];

export default function StatsCounter() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <Counter to={stat.to} suffix={stat.suffix} />
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </dd>
        </motion.div>
      ))}
    </dl>
  );
}
