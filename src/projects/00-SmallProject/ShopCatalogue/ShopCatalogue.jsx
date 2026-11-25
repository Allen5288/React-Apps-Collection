import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "./products";

// ShopCatalogue — searchable, filterable product catalogue for a
// small homewares shop. Commit 1 of 5: search + category filter +
// price cap + sorting, all derived from one filter state.
//
// The list is derived, never stored: `filtered` is recomputed with
// useMemo whenever a filter changes, so the displayed list can
// never disagree with the filters. That is the rule for the whole
// case — state holds the filters, the list is a function of them.
export default function ShopCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (p.priceAud > maxPrice) return false;
      if (needle && !`${p.name} ${p.description}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    const by = {
      name: (a, b) => a.name.localeCompare(b.name),
      "price-asc": (a, b) => a.priceAud - b.priceAud,
      "price-desc": (a, b) => b.priceAud - a.priceAud,
    };
    return [...list].sort(by[sort]);
  }, [query, category, maxPrice, sort]);

  return (
    <div>
      <h2>Ponds &amp; Pine — Shop Catalogue</h2>

      <label>
        Search{" "}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mugs, lamps…"
          aria-label="Search products"
        />
      </label>

      <label>
        Category{" "}
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Category">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Max price ${maxPrice}{" "}
        <input
          type="range"
          min="20"
          max="200"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="Maximum price"
        />
      </label>

      <label>
        Sort{" "}
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort order">
          <option value="name">Name A–Z</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>

      <p>
        {filtered.length} of {PRODUCTS.length} products
      </p>

      {filtered.length === 0 ? (
        <p>No products match — try a wider price range or a different search.</p>
      ) : (
        <ul>
          {filtered.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — ${p.priceAud} · {p.category} ·{" "}
              {p.stock > 0 ? `${p.stock} in stock` : "out of stock"}
              <br />
              {p.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
