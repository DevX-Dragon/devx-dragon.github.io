import { useEffect, useState } from "react";

/**
 * Persists React state to localStorage so the in-browser CMS survives reloads.
 * Falls back silently to plain in-memory state if localStorage is unavailable
 * (e.g. private browsing mode with storage disabled).
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or disabled — edits still work for this session.
    }
  }, [key, value]);

  return [value, setValue];
}
