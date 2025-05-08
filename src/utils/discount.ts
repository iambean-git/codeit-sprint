// src/utils/discount.ts
export function calculateDiscount(price: number, discountRate: number) {
  if (typeof price !== "number" || typeof discountRate !== "number") return 0;
  if (price < 0 || discountRate < 0 || discountRate > 100) return 0;
  return price * (1 - discountRate / 100);
}
