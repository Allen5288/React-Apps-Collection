import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

// Mock data standing in for a real API — swap `searchUsers` for fetch().
const USERS = [
  "Ada Lovelace",
  "Grace Hopper",
  "Alan Turing",
  "Edsger Dijkstra",
  "Margaret Hamilton",
  "Linus Torvalds",
  "Barbara Liskov",
  "Tim Berners-Lee",
];

function searchUsers(query, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal.aborted) return reject(new DOMException("aborted", "AbortError"));
      resolve(USERS.filter((u) => u.toLowerCase().includes(query.toLowerCase())));
    }, 400);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("aborted", "AbortError"));
    });
  });
}

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    searchUsers(debouncedQuery, controller.signal)
      .then(setResults)
      .catch((err) => {
        // A stale response is expected — ignore it. Anything else is real.
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));
    return () => controller.abort(); // cancel the in-flight search
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search pioneers…"
        aria-label="Search users"
      />
      {loading && <p>Searching…</p>}
      <ul>
        {results.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
