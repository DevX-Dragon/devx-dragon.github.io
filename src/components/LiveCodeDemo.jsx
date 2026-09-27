import { useState } from "react";
import { Play, Sun, Moon } from "lucide-react";

const SNIPPET = `function roar(fire = true) {
  return fire
    ? "🔥 Deploy shipped."
    : "🌙 Cooling down.";
}`;

/**
 * A tiny sandboxed "runnable" snippet. It doesn't eval arbitrary code —
 * it mirrors the one function above so visitors can safely hit Run.
 */
export default function LiveCodeDemo() {
  const [output, setOutput] = useState(null);
  const [fire, setFire] = useState(true);
  const [dark, setDark] = useState(false);

  function run() {
    setOutput(fire ? "🔥 Deploy shipped." : "🌙 Cooling down.");
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-glass transition-colors ${
        dark ? "border-zinc-800 bg-zinc-900" : "border-hairline bg-white"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-2.5 ${
          dark ? "border-zinc-800" : "border-hairline"
        }`}
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <button
          type="button"
          data-cursor-hover
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle demo theme"
          className={`rounded-md p-1 ${dark ? "text-zinc-400 hover:text-white" : "text-muted hover:text-ink"}`}
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>

      <pre
        className={`overflow-x-auto px-4 py-4 text-[13px] leading-relaxed ${
          dark ? "text-zinc-200" : "text-ink"
        }`}
      >
        <code>{SNIPPET}</code>
      </pre>

      <div className={`flex items-center gap-3 border-t px-4 py-3 ${dark ? "border-zinc-800" : "border-hairline"}`}>
        <label className={`flex items-center gap-2 text-xs ${dark ? "text-zinc-400" : "text-muted"}`}>
          <input
            type="checkbox"
            checked={fire}
            onChange={(e) => setFire(e.target.checked)}
            className="accent-indigo"
          />
          fire = {String(fire)}
        </label>
        <button
          type="button"
          data-cursor-hover
          onClick={run}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-indigo px-3 py-1.5 text-xs font-medium text-white"
        >
          <Play size={12} /> Run
        </button>
      </div>

      {output && (
        <div
          className={`border-t px-4 py-2.5 font-mono text-[12px] ${
            dark ? "border-zinc-800 text-emerald-400" : "border-hairline text-emerald"
          }`}
        >
          → {output}
        </div>
      )}
    </div>
  );
}
