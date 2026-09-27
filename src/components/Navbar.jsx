import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import DragonMascot from "./DragonMascot.jsx";
import MagneticButton from "./MagneticButton.jsx";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all ${
        scrolled ? "glass shadow-glass" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-1">
          <DragonMascot />
          <a href="#top" className="font-display text-[15px] font-semibold tracking-tight">
            DevX-Dragon
          </a>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor-hover
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton
            as="a"
            href="#contact"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-white sm:inline-flex"
          >
            Let's talk
          </MagneticButton>
          <button
            type="button"
            onClick={onOpenAdmin}
            title="Project admin (Ctrl+Shift+A)"
            aria-label="Open project admin panel"
            className="rounded-full p-2 text-muted transition-colors hover:bg-indigo-soft hover:text-indigo"
          >
            <Settings size={18} />
          </button>
        </div>
      </nav>
    </header>
  );
}
