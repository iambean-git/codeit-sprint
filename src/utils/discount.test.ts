import { calculateDiscount } from "./discount";

test("정상적인 가격과 할인율에 대해 가격이 정확함", () => {
  expect(calculateDiscount(2000, 10)).toBe(1800);
  expect(calculateDiscount(3000, 30)).toBe(2100);
  expect(calculateDiscount(1000, 0)).toBe(1000);
});

test("음수 가격이 입력되면 0을 반환", () => {
  expect(calculateDiscount(-2000, 10)).toBe(0);
});

test("100% 초과 혹은 음수 할인율은 0을 반환", () => {
  expect(calculateDiscount(2000, 120)).toBe(0);
  expect(calculateDiscount(2000, -80)).toBe(0);
});

test("숫자가 아닌 입력은 0을 반환환", () => {
  // @ts-expect-error 타입 체크 무시
  expect(calculateDiscount("hello", 120)).toBe(0);
  // @ts-expect-error 타입 체크 무시
  expect(calculateDiscount(2000, { a: 10 })).toBe(0);
  // @ts-expect-error 타입 체크 무시
  expect(calculateDiscount("1000", 10)).toBe(0);
  // @ts-expect-error 타입 체크 무시
  expect(calculateDiscount(1000, "10")).toBe(0);
  // @ts-expect-error 타입 체크 무시
  expect(calculateDiscount(null, undefined)).toBe(0);
});
