// cart.js — cart logic for ShopCatalogue, as pure functions.
//
// The component owns the cart state; this module owns the rules,
// so the rules can be tested without rendering anything (run:
// node --test cart.test.js — see the test sketch at the bottom).
//
// The cart is a plain object: { productId: quantity }. That shape
// is the whole design:
// - The cart is STATE (the customer chose these items).
// - The cart total is DERIVED (price x quantity, summed) — never
//   stored, so it can never disagree with the cart. Same rule as
//   commit 1: state holds the choices, everything else is a
//   function of them.
// - Stock is the cap: you cannot add more than the shop has.
//   Adding past stock is not an error the customer sees — the
//   button disables at the cap, and addToCart refuses silently
//   by returning the cart unchanged with added: 0.

export function createCart() {
  return {};
}

export function addToCart(cart, product, qty = 1) {
  if (!product || product.stock <= 0 || qty <= 0) {
    return { cart, added: 0 };
  }
  const current = cart[product.id] || 0;
  const wanted = Math.min(current + qty, product.stock);
  if (wanted === current) return { cart, added: 0 }; // already at stock
  return { cart: { ...cart, [product.id]: wanted }, added: wanted - current };
}

export function removeFromCart(cart, productId) {
  if (!(productId in cart)) return { cart };
  const next = { ...cart };
  delete next[productId];
  return { cart: next };
}

export function setQuantity(cart, product, qty) {
  if (!product) return { cart };
  if (qty <= 0) return removeFromCart(cart, product.id);
  const capped = Math.min(qty, product.stock);
  return { cart: { ...cart, [product.id]: capped } };
}

export function cartItems(cart, products) {
  // Join the cart (ids + quantities) with the catalogue, so the
  // component renders product names and prices from one source.
  // Items whose product vanished from the catalogue are dropped,
  // not rendered as a broken row.
  return Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((p) => p.id === id);
      return product ? { product, quantity } : null;
    })
    .filter(Boolean);
}

export function cartTotal(items) {
  return items.reduce(
    (sum, { product, quantity }) => sum + product.priceAud * quantity,
    0,
  );
}

export function cartCount(cart) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

// ---------------------------------------------------------------------------
// Test sketch (save as cart.test.js next to this file, run node --test):
//
//   import test from "node:test";
//   import assert from "node:assert/strict";
//   import { PRODUCTS } from "./products.js";
//   import { addToCart, cartTotal, cartItems, createCart, setQuantity } from "./cart.js";
//
//   test("adding respects stock", () => {
//     const mirror = PRODUCTS.find((p) => p.id === "mirror-arch"); // stock 2
//     let { cart } = addToCart(createCart(), mirror, 5);
//     assert.equal(cart["mirror-arch"], 2); // capped, not 5
//   });
//
//   test("total is derived from the cart", () => {
//     let { cart } = addToCart(createCart(), PRODUCTS[0]); // mug $24
//     ({ cart } = addToCart(cart, PRODUCTS[0]));
//     assert.equal(cartTotal(cartItems(cart, PRODUCTS)), 48);
//   });
//
//   test("zero quantity removes the line", () => {
//     let { cart } = addToCart(createCart(), PRODUCTS[0]);
//     ({ cart } = setQuantity(cart, PRODUCTS[0], 0));
//     assert.equal(cart["mug-stone"], undefined);
//   });
// ---------------------------------------------------------------------------
