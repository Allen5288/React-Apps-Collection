# DebouncedSearch — a Small Project

A search box that only queries after the user pauses typing, and never
lets a slow, stale response overwrite a fresh one. Two small patterns
that show up in almost every real search UI.

## The two rules

1. **Debounce the input.** `useDebounce` (see `useDebounce.js`) waits
   300 ms after the last keystroke before updating the value the
   search effect depends on. Typing "react" fires one search, not
   five — fewer API calls, less server load, no flicker.
2. **Abort the stale request.** The effect creates an
   `AbortController` per search and aborts it in the cleanup. If the
   user types again while a search is in flight, the old request is
   cancelled and its result is ignored (`AbortError`), so results can
   never arrive out of order.

## Files

- `useDebounce.js` — reusable hook; works for any value, not just search.
- `DebouncedSearch.jsx` — the component. `searchUsers` is a mock with
  a 400 ms delay; swap it for a real `fetch()` call with the same
  `signal` passed through.

## Run it

```jsx
import DebouncedSearch from "./projects/00-SmallProject/DebouncedSearch/DebouncedSearch";

export default function App() {
  return <DebouncedSearch />;
}
```

## Try it

- Type fast: one "Searching…" per pause, not one per keystroke.
- Type "a", then quickly "al": only results for "al" appear — the
  "a" search is aborted, not just ignored.
- Clear the box: results clear immediately, no request fires.

## What to learn next

- `AbortController` also cancels real `fetch()` calls — pass the
  same `signal` into `fetch(url, { signal })`.
- For heavier use, add a cache (`Map` of query → results) so a
  repeated query never hits the network twice.
