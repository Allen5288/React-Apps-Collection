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

## What to learn next

- A cart: which state it needs, and why the cart is state but the
  cart total is derived (same rule, applied again).
- Saving the filters in the URL, so a filtered view can be shared
  as a link.
