import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer({ onOpenAdmin }) {
  return (
    <footer className="border-t border-hairline px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} DevX-Dragon. Built with React, Tailwind &amp; a little fire.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/DevX-Dragon"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-ink"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/devx-dragon"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-ink"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://twitter.com/devx_dragon"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            aria-label="Twitter"
            className="text-muted transition-colors hover:text-ink"
          >
            <Twitter size={18} />
          </a>
          <button
            type="button"
            onClick={onOpenAdmin}
            data-cursor-hover
            className="text-xs font-medium text-zinc-300 transition-colors hover:text-indigo"
            title="Ctrl+Shift+A"
          >
            admin
          </button>
        </div>
      </div>
    </footer>
  );
}
