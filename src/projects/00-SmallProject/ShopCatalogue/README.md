# ShopCatalogue — a Small Project

A searchable, filterable product catalogue for a small Sydney
homewares shop ("Ponds & Pine" — fictional). The shop's customers
browse by name, category, and budget; the owner wants the list to
always match the filters, with no stale results and no "0 products"
dead end.

## The one rule

**State holds the filters; the list is derived.** `query`,
`category`, `maxPrice` and `sort` are the only state. The visible
list is computed with `useMemo` from those four values, so it can
never disagree with what the customer selected — there is no
second copy of the list to go stale.

## Files

- `products.js` — 12 products (id, name, category, price in AUD,
  stock, description) + the category list. Swap in the shop's real
  export by keeping the same fields.
- `ShopCatalogue.jsx` — the component: search box, category
  select, max-price slider, sort select, and the derived list.
- `cart.js` — pure cart functions (add, remove, set quantity, total) + test sketch; the component keeps only state and rendering.

## Run it

```jsx
import ShopCatalogue from "./projects/00-SmallProject/ShopCatalogue/ShopCatalogue";

export default function App() {
  return <ShopCatalogue />;
}
```

## Try it

- Type "lamp": 2 products, both in Lighting.
- Set max price to $30: only the mug and the bud vase remain.
- Sort by price, high to low: the arch mirror ($199) comes first.
- Search "xyz": the empty state explains what to try next, instead
  of a blank page.

## The cart (commit 2 of 5)

The catalogue from commit 1 could only be browsed. Today it can
be shopped — a cart, built on the same one rule: **state holds the
choices, everything else is derived.**

### State vs derived, again

| State (chosen) | Derived (computed) |
|---|---|
| The filters (`query`, `category`, `maxPrice`, `sort`) | The visible list (`useMemo`) |
| The cart (`{ productId: quantity }`) | The cart lines and the total (`useMemo`) |

The total is never stored. It is `price × quantity`, summed, every
render — so it can never disagree with the cart the way a stored
total can after a remove or a quantity change. The cart logic
itself lives in `cart.js` as pure functions (`addToCart`,
`setQuantity`, `removeFromCart`, `cartTotal`), so the rules can be
tested without rendering anything — see the test sketch at the
bottom of `cart.js`.

### Stock is the cap

A customer cannot add more than the shop has: `addToCart` caps the
quantity at `product.stock`, and the button disables at the cap
with a message saying so ("In cart (2 — all 2 in stock)"). The
arch mirror has a stock of 2, so it is the honest test case: add
it five times and the cart holds 2. Out-of-stock products cannot
be added at all.

### Scope, stated honestly

This is a **reservation list, not a checkout**. The customer builds
the cart and the shop calls them to confirm pickup — no payment is
taken here, and the component does not pretend otherwise. A real
checkout (payment, stock decrement, order record) is a later
commit, not this one.

### Files

- `cart.js` — pure cart functions + test sketch (run `node --test`
  with the sketch saved as `cart.test.js`).
- `ShopCatalogue.jsx` — the component: catalogue as before, plus
  add-to-cart buttons and the cart panel (quantity +/−, remove,
  derived total).

### Try it

- Add the stoneware mug twice: cart shows 2 × $24, total $48.
- Add the arch mirror three times: the cart holds 2 (all the stock
  there is) and the button says so.
- Drop a quantity to 0 with −: the line disappears — setting a
  quantity to 0 removes it, by design.

## What to learn next

- Saving the filters in the URL, so a filtered view can be shared
  as a link.
- A real checkout: payment, stock decrement, and an order record.
