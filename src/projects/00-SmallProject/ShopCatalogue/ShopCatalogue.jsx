import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "./products";
import {
  addToCart,
  cartCount,
  cartItems,
  cartTotal,
  createCart,
  removeFromCart,
  setQuantity,
} from "./cart";
import { buildSearch, DEFAULT_FILTERS, parseFilters } from "./filters";

// ShopCatalogue — searchable, filterable product catalogue for a
// small homewares shop. Commit 3 of 5: URL filters.
//
// The one rule from commit 1, applied again: state holds the
// choices, everything else is derived. The cart itself is state
// ({ productId: quantity }); the cart lines and the total are
// derived from the cart with useMemo, so the total can never
// disagree with what the customer added. The list is still derived
// from the filters, exactly as before.
//
// New in this commit: the filters also live in the URL. The four
// filter states are still the source of truth — the URL is a mirror
// of them, not a second copy. Changing a filter writes the URL
// (debounced, one history entry per pause, so typing "lamp" is one
// back-button step, not four); the back and forward buttons read
// the URL back into state. A filtered view can be shared as a link,
// and a link with a bad value still shows products — the parsing in
// filters.js falls back to defaults instead of rendering nothing.
//
// Deliberately no react-router here: this component is also used
// standalone (see the README), outside a Router, where
// useSearchParams would throw. Plain window.history + URLSearchParams
// does the same job wherever the component is mounted.
//
// Scope, stated honestly: this is a reservation list, not a
// checkout. The customer builds the cart and the shop calls them
// back to confirm pickup — there is no payment here, and the
// component does not pretend otherwise. A real checkout (payment,
// stock decrement, order record) is commit 4 or 5, not this one.
export default function ShopCatalogue() {
  // Initial filters come from the URL, so a shared link opens on
  // the view the sender saw. The window guard keeps this safe
  // outside a browser (tests, server rendering). Parsed once —
  // the four states below all read from this one object.
  const [initialFilters] = useState(() =>
    typeof window === "undefined"
      ? DEFAULT_FILTERS
      : parseFilters(window.location.search, CATEGORIES),
  );
  const [query, setQuery] = useState(initialFilters.query);
  const [category, setCategory] = useState(initialFilters.category);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);
  const [sort, setSort] = useState(initialFilters.sort);
  const [cart, setCart] = useState(createCart);
  const [copied, setCopied] = useState(false);

  // Write the filters to the URL, debounced: a history entry is
  // pushed once the user pauses (400 ms), not once per keystroke or
  // slider tick. Parameters at their defaults are left out, so the
  // plain catalogue URL stays clean. The write is skipped when the
  // URL already matches, which is what stops the effect looping
  // with the popstate handler below.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const search = buildSearch({ query, category, maxPrice, sort });
    if (search === window.location.search) return undefined;
    const timer = setTimeout(() => {
      if (buildSearch({ query, category, maxPrice, sort }) === window.location.search) {
        return; // something else already wrote this URL (e.g. back button)
      }
      window.history.pushState(
        null,
        "",
        search ? `${window.location.pathname}${search}` : window.location.pathname,
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [query, category, maxPrice, sort]);

  // Back / forward: read the URL back into state.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onPopState = () => {
      const next = parseFilters(window.location.search, CATEGORIES);
      setQuery(next.query);
      setCategory(next.category);
      setMaxPrice(next.maxPrice);
      setSort(next.sort);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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

  // Derived, never stored: the lines to render and the total.
  const items = useMemo(() => cartItems(cart, PRODUCTS), [cart]);
  const total = useMemo(() => cartTotal(items), [items]);
  const count = cartCount(cart);

  const handleAdd = (product) => {
    setCart((prev) => addToCart(prev, product).cart);
  };

  const handleReset = () => {
    setQuery(DEFAULT_FILTERS.query);
    setCategory(DEFAULT_FILTERS.category);
    setMaxPrice(DEFAULT_FILTERS.maxPrice);
    setSort(DEFAULT_FILTERS.sort);
  };

  const handleCopyLink = async () => {
    if (typeof window === "undefined" || !navigator.clipboard) {
      setCopied("copy-unavailable");
      return;
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied("copy-unavailable");
    }
  };

  const isDefaultView =
    query === "" && category === "All" && maxPrice === 200 && sort === "name";

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

      <button type="button" onClick={handleReset} disabled={isDefaultView}>
        Clear filters
      </button>{" "}
      <button type="button" onClick={handleCopyLink}>
        Copy link to this view
      </button>
      {copied === true ? <span> Link copied.</span> : null}
      {copied === "copy-unavailable" ? (
        <span> Copy did not work — copy the address bar URL instead.</span>
      ) : null}

      <p>
        {filtered.length} of {PRODUCTS.length} products
      </p>

      {filtered.length === 0 ? (
        <p>No products match — try a wider price range or a different search.</p>
      ) : (
        <ul>
          {filtered.map((p) => {
            const inCart = cart[p.id] || 0;
            const atCap = inCart >= p.stock;
            return (
              <li key={p.id}>
                <strong>{p.name}</strong> — ${p.priceAud} · {p.category} ·{" "}
                {p.stock > 0 ? `${p.stock} in stock` : "out of stock"}
                <br />
                {p.description}
                <br />
                <button
                  type="button"
                  onClick={() => handleAdd(p)}
                  disabled={p.stock === 0 || atCap}
                >
                  {p.stock === 0
                    ? "Out of stock"
                    : atCap
                      ? `In cart (${inCart} — all ${p.stock} in stock)`
                      : inCart > 0
                        ? `Add another (${inCart} in cart)`
                        : "Add to cart"}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <h3>Your cart ({count} {count === 1 ? "item" : "items"})</h3>
      {items.length === 0 ? (
        <p>Your cart is empty — add something from the catalogue above.</p>
      ) : (
        <>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.id}>
                <strong>{product.name}</strong> — ${product.priceAud} each
                <br />
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.name}`}
                  onClick={() =>
                    setCart((prev) => setQuantity(prev, product, quantity - 1).cart)
                  }
                >
                  −
                </button>{" "}
                {quantity}{" "}
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.name}`}
                  disabled={quantity >= product.stock}
                  onClick={() =>
                    setCart((prev) => setQuantity(prev, product, quantity + 1).cart)
                  }
                >
                  +
                </button>{" "}
                = ${product.priceAud * quantity}
                <br />
                <button
                  type="button"
                  onClick={() => setCart((prev) => removeFromCart(prev, product.id).cart)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ${total}</strong>
          </p>
          <p>
            Reserve for pickup — the shop will call you to confirm.
            No payment is taken here.
          </p>
        </>
      )}
    </div>
  );
}
