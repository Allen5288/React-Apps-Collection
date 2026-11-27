// filters.test.js — tests for the URL filter helpers (commit 3 of 5).
//
// Run: node --test filters.test.js (no dependencies, no rendering).
// The round-trip test is the one that matters: a link copied from a
// filtered view must show exactly what the sender saw.
import test from "node:test";
import assert from "node:assert/strict";
import { buildSearch, parseFilters } from "./filters.js";
import { CATEGORIES } from "./products.js";

test("an empty query string is the defaults", () => {
  assert.deepEqual(parseFilters("", CATEGORIES), {
    query: "",
    category: "All",
    maxPrice: 200,
    sort: "name",
  });
});

test("a full query string parses", () => {
  assert.deepEqual(
    parseFilters("?q=lamp&category=Lighting&maxPrice=150&sort=price-asc", CATEGORIES),
    { query: "lamp", category: "Lighting", maxPrice: 150, sort: "price-asc" },
  );
});

test("unknown category and sort fall back to defaults", () => {
  const filters = parseFilters("?category=Nope&sort=bogus", CATEGORIES);
  assert.equal(filters.category, "All");
  assert.equal(filters.sort, "name");
});

test("a bad or out-of-range price falls back to the slider range", () => {
  assert.equal(parseFilters("?maxPrice=abc", CATEGORIES).maxPrice, 200);
  assert.equal(parseFilters("?maxPrice=999", CATEGORIES).maxPrice, 200);
  assert.equal(parseFilters("?maxPrice=5", CATEGORIES).maxPrice, 20);
  assert.equal(parseFilters("?maxPrice=50", CATEGORIES).maxPrice, 50);
});

test("default filters build an empty query string", () => {
  assert.equal(
    buildSearch({ query: "", category: "All", maxPrice: 200, sort: "name" }),
    "",
  );
});

test("non-default filters build a short, readable query string", () => {
  assert.equal(
    buildSearch({ query: "lamp", category: "Lighting", maxPrice: 150, sort: "name" }),
    "?q=lamp&category=Lighting&maxPrice=150",
  );
});

test("a real filter state survives the round trip", () => {
  const filters = {
    query: "lamp",
    category: "Lighting",
    maxPrice: 150,
    sort: "price-asc",
  };
  assert.deepEqual(parseFilters(buildSearch(filters), CATEGORIES), filters);
});

test("a search with spaces survives the round trip", () => {
  const filters = {
    query: "fig candle",
    category: "All",
    maxPrice: 200,
    sort: "name",
  };
  assert.deepEqual(parseFilters(buildSearch(filters), CATEGORIES), filters);
});
