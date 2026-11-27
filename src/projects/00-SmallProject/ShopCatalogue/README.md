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
- `filters.js` — pure URL helpers (parse/build the filter query string) + `filters.test.js`

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

## URL filters (commit 3 of 5)

The catalogue from commits 1–2 could be filtered, but the filters
died with the page: refresh and they were gone, and there was no
way to send a customer a link to "the lamps under $150". Today the
filters live in the URL as well as in state.

### The one rule, extended

**State holds the filters; the list is derived — and the URL is a
mirror of the state, not a second copy.** The four filter states
are still the source of truth. Changing a filter writes the URL;
the back and forward buttons read it back into state. There is no
second copy of the filters to go stale, in either direction.

### How it works

- **Reading:** on first render the filters are initialised from
  `window.location.search` (`?q=lamp&category=Lighting&maxPrice=150&sort=price-asc`).
  A shared link opens on exactly the view the sender saw.
- **Writing:** a filter change writes the URL after a 400 ms
  pause, with `history.pushState` — so typing "lamp" is one
  back-button step, not four, and dragging the price slider does
  not fill the history with an entry per tick. Parameters at their
  defaults are left out, so the plain catalogue URL stays clean.
- **Back / forward:** a `popstate` listener reads the URL back
  into state, so the back button steps through filter states.
- **Forgiving parsing:** an unknown category, a sort that does not
  exist, or a price outside the slider range falls back to the
  default instead of rendering an empty page — a link a customer
  edits by hand still shows products.
- **No react-router:** this component is also used standalone,
  outside a Router, where `useSearchParams` would throw. Plain
  `window.history` + `URLSearchParams` does the same job wherever
  the component is mounted.
- **Copy link + clear filters:** a "Copy link to this view" button
  copies the current URL (with a fallback message when the
  clipboard is unavailable), and "Clear filters" returns to the
  plain catalogue view — which is also what the URL becomes.

### Files

- `filters.js` — pure functions for the translation
  (`parseFilters`, `buildSearch`) + test sketch; the component
  keeps only state and rendering.
- `filters.test.js` — `node --test` coverage of the translation,
  including the round trip: `parse(build(filters))` gives the same
  filters back (8 tests). The round trip is the test that matters
  — a copied link must show what the sender saw.
- `ShopCatalogue.jsx` — the component: catalogue and cart as
  before, plus the URL sync, copy-link and clear-filters buttons.

### Try it

- Type "lamp", set max price to $150: the URL becomes
  `?q=lamp&maxPrice=150`. Copy it, open it in a new tab — same
  two lamps, same order.
- Press the browser back button: the previous filter state returns.
- Open `?category=Nope&sort=bogus`: the catalogue shows everything,
  sorted by name — bad values fall back, they never blank the page.
- Click "Clear filters": the URL is the plain catalogue URL again.

## What to learn next

- A real checkout: payment, stock decrement, and an order record.
