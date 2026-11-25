// products.js — catalogue data for ShopCatalogue.
//
// A small Sydney homewares shop ("Ponds & Pine" — fictional).
// Twelve real-shaped products: id, name, category, price in AUD,
// stock, and a short description. Prices and stock are invented
// for this case; swap in the shop's real export by keeping the
// same fields.
export const PRODUCTS = [
  { id: "mug-stone", name: "Stoneware Mug", category: "Kitchen", priceAud: 24, stock: 18, description: "Speckled stoneware mug, 350 ml, dishwasher safe." },
  { id: "bowl-ramen", name: "Ramen Bowl", category: "Kitchen", priceAud: 32, stock: 12, description: "Wide ramen bowl with chopstick rest, holds 900 ml." },
  { id: "pan-cast", name: "Cast Iron Skillet 26 cm", category: "Kitchen", priceAud: 89, stock: 6, description: "Pre-seasoned cast iron skillet, suits induction and oven." },
  { id: "board-acacia", name: "Acacia Serving Board", category: "Kitchen", priceAud: 45, stock: 9, description: "Acacia board with handle, 45 x 25 cm, food-safe oil finish." },
  { id: "lamp-rattan", name: "Rattan Pendant Lamp", category: "Lighting", priceAud: 129, stock: 4, description: "Hand-woven rattan pendant, E27 fitting, 40 cm diameter." },
  { id: "lamp-desk", name: "Brass Desk Lamp", category: "Lighting", priceAud: 149, stock: 3, description: "Adjustable brass desk lamp, warm LED bulb included." },
  { id: "candle-fig", name: "Fig & Cassis Candle", category: "Home Fragrance", priceAud: 38, stock: 22, description: "Soy candle, fig and cassis, 45-hour burn time." },
  { id: "diffuser-cedar", name: "Cedar Reed Diffuser", category: "Home Fragrance", priceAud: 42, stock: 15, description: "Cedar and amber reed diffuser, 200 ml, lasts about 3 months." },
  { id: "throw-wool", name: "Wool Throw — Oat", category: "Textiles", priceAud: 119, stock: 7, description: "Lambswool throw in oat, 130 x 180 cm, dry clean only." },
  { id: "cushion-linen", name: "Linen Cushion 50 cm", category: "Textiles", priceAud: 59, stock: 11, description: "Stonewashed linen cushion cover with feather insert." },
  { id: "vase-ceramic", name: "Ceramic Bud Vase", category: "Decor", priceAud: 29, stock: 20, description: "Small matte ceramic vase, 15 cm tall, for a single stem." },
  { id: "mirror-arch", name: "Arch Wall Mirror", category: "Decor", priceAud: 199, stock: 2, description: "Arched wall mirror, 60 x 90 cm, hangs portrait or landscape." },
];

export const CATEGORIES = ["All", "Kitchen", "Lighting", "Home Fragrance", "Textiles", "Decor"];
