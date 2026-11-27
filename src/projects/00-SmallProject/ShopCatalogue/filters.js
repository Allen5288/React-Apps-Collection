// filters.js — URL filter helpers for ShopCatalogue, as pure functions.
//
// Commit 3 of 5: the filters live in the URL, so a filtered view can
// be shared as a link and the back button steps through filter
// states. The component owns the state; this module owns the
// translation, so the translation can be tested without rendering
// anything (run: node --test filters.test.js — see the test sketch
// at the bottom).
//
// The rules:
// - The URL is the shareable form of the filters: q, category,
//   maxPrice, sort. A parameter at its default value is left out,
//   so the plain catalogue URL stays clean (no ?q=&category=All…).
// - Reading is forgiving: an unknown category, a sort that does
//   not exist, or a price outside the slider range falls back to
//   the default instead of rendering an empty page or crashing.
//   A link a customer edits by hand still shows products.
// - maxPrice is clamped into the slider range (20–200), not
//   rejected: ?maxPrice=999 means "show me everything", and the
//   slider can represent that as 200.
// - The translation is lossless for real filter states:
//   parse(build(filters)) gives the same filters back, so a copied
//   link shows exactly what the sender saw.

export const DEFAULT_FILTERS = {
  query: "",
  category: "All",
  maxPrice: 200,
  sort: "name",
};

export const SORTS = ["name", "price-asc", "price-desc"];

export const MAX_PRICE_MIN = 20;
export const MAX_PRICE_MAX = 200;

function clampPrice(value) {
  if (!Number.isFinite(value)) return DEFAULT_FILTERS.maxPrice;
  return Math.min(MAX_PRICE_MAX, Math.max(MAX_PRICE_MIN, Math.round(value)));
}

// Read filters from a query string (window.location.search).
// `categories` is passed in so this stays pure — the component
// passes CATEGORIES from products.js.
export function parseFilters(search, categories) {
  const params = new URLSearchParams(search || "");
  const query = params.get("q") ?? "";
  const rawCategory = params.get("category");
  const category =
    rawCategory && categories.includes(rawCategory) ? rawCategory : "All";
  const sort = SORTS.includes(params.get("sort")) ? params.get("sort") : "name";
  // A missing price is the default. (Number(null) is 0, which would
  // clamp to the slider minimum — so check for null first.)
  const rawPrice = params.get("maxPrice");
  const maxPrice =
    rawPrice === null ? DEFAULT_FILTERS.maxPrice : clampPrice(Number(rawPrice));
  return {
    query,
    category,
    maxPrice,
    sort,
  };
}

// Write filters to a query string, leaving out anything at its
// default so the URL stays short and readable. Returns "" when
// every filter is at its default (the plain catalogue URL).
export function buildSearch(filters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.category !== "All") params.set("category", filters.category);
  if (filters.maxPrice !== DEFAULT_FILTERS.maxPrice) {
    params.set("maxPrice", String(filters.maxPrice));
  }
  if (filters.sort !== "name") params.set("sort", filters.sort);
  const text = params.toString();
  return text ? `?${text}` : "";
}

// ---------------------------------------------------------------------------
// Test sketch (save as filters.test.js next to this file, run node --test):
//
//   import test from "node:test";
//   import assert from "node:assert/strict";
//   import { buildSearch, parseFilters } from "./filters.js";
//   import { CATEGORIES } from "./products.js";
//
//   test("an empty query string is the defaults", () => {
//     assert.deepEqual(parseFilters("", CATEGORIES), {
//       query: "", category: "All", maxPrice: 200, sort: "name",
//     });
//   });
//
//   test("unknown values fall back to defaults", () => {
//     assert.equal(
//       parseFilters("?category=Nope&sort=bogus&maxPrice=abc", CATEGORIES)
//         .category,
//       "All",
//     );
//   });
//
//   test("a real filter state survives the round trip", () => {
//     const filters = {
//       query: "lamp", category: "Lighting", maxPrice: 150, sort: "price-asc",
//     };
//     assert.deepEqual(parseFilters(buildSearch(filters), CATEGORIES), filters);
//   });
// ---------------------------------------------------------------------------
