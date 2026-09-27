import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Wraps any button/link content and subtly pulls it toward the cursor
 * on hover, springing back to rest on mouse leave.
 */
export default function MagneticButton({ as: Tag = "button", className = "", children, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const MotionTag = motion[Tag] ?? motion.button;

  return (
    <MotionTag
      ref={ref}
      data-cursor-hover
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
