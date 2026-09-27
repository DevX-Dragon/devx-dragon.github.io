import { useEffect, useRef, useState } from "react";

/**
 * A ring that follows the pointer and grows/tints when hovering anything
 * with [data-cursor-hover]. Skips itself entirely on touch devices.
 */
export default function CustomCursor() {
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf;

    function move(e) {
      x = e.clientX;
      y = e.clientY;
    }

    function render() {
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
      raf = requestAnimationFrame(render);
    }

    function onOver(e) {
      if (e.target.closest("[data-cursor-hover]") && ringRef.current) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(16,185,129,0.7)";
        ringRef.current.style.background = "rgba(16,185,129,0.06)";
      }
    }
    function onOut(e) {
      if (e.target.closest("[data-cursor-hover]") && ringRef.current) {
        ringRef.current.style.width = "28px";
        ringRef.current.style.height = "28px";
        ringRef.current.style.borderColor = "rgba(79,70,229,0.55)";
        ringRef.current.style.background = "transparent";
      }
    }

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
