import { useEffect, useState } from "react";

/**
 * useDebounce — return `value` only after it has stayed unchanged
 * for `delay` ms. Typing "react" fires one update, not five.
 *
 * The cleanup function is the whole trick: every keystroke clears the
 * pending timer, so only the final pause triggers the update.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cancel on next keystroke / unmount
  }, [value, delay]);

  return debouncedValue;
}
