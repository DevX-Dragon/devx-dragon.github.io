import { useEffect } from "react";

/**
 * Fires `callback` when the given key is pressed with the required modifiers.
 * Example: useKeyboardShortcut({ key: "a", ctrl: true, shift: true }, openAdmin)
 */
export function useKeyboardShortcut({ key, ctrl = false, shift = false, meta = false }, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      const keyMatches = e.key.toLowerCase() === key.toLowerCase();
      const ctrlMatches = ctrl ? e.ctrlKey || e.metaKey : true;
      const shiftMatches = shift ? e.shiftKey : true;
      const metaMatches = meta ? e.metaKey : true;

      if (keyMatches && ctrlMatches && shiftMatches && metaMatches) {
        e.preventDefault();
        callback(e);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, ctrl, shift, meta, callback]);
}
