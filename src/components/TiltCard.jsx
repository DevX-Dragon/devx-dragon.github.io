import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** A card that tilts in 3D toward the cursor and flattens on mouse leave. */
export default function TiltCard({ className = "", children, maxTilt = 10 }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), springConfig);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
