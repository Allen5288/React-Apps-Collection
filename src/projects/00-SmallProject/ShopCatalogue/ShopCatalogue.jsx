import { useMemo, useState } from "react";
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

// ShopCatalogue — searchable, filterable product catalogue for a
// small homewares shop. Commit 2 of 5: a cart.
//
// The one rule from commit 1, applied again: state holds the
// choices, everything else is derived. The cart itself is state
// ({ productId: quantity }); the cart lines and the total are
// derived from the cart with useMemo, so the total can never
// disagree with what the customer added. The list is still derived
// from the filters, exactly as before.
//
// Scope, stated honestly: this is a reservation list, not a
// checkout. The customer builds the cart and the shop calls them
// back to confirm pickup — there is no payment here, and the
// component does not pretend otherwise. A real checkout (payment,
// stock decrement, order record) is commit 4 or 5, not this one.
export default function ShopCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);
  const [sort, setSort] = useState("name");
  const [cart, setCart] = useState(createCart);

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
