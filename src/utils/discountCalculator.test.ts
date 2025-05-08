// discountCalculator.test.ts
import {
  calculatePrice,
  type Membership,
  type Coupon,
} from "./discountCalculator";

const BASE_PRICE_100K = 100000;
const BASE_PRICE_50K = 50000;
const BASE_PRICE_200K = 200000;
const BASE_PRICE_30K = 30000;

const createCustomer = (
  membership: Membership = "regular",
  coupon?: Coupon,
): { membership: Membership; coupon?: Coupon } => ({
  membership,
  coupon,
});

describe("할인 계산기", () => {
  describe("금액별 할인", () => {
    test("기본 가격에 할인이 적용되지 않아야 함 (5만원 미만)", () => {
      const price = BASE_PRICE_30K;
      const customer = { membership: "regular" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_30K);
    });

    test("5만원 이상 구매 시 5% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_50K;
      const customer = { membership: "regular" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_50K * 0.95); // 50,000 * 0.95
    });

    test("10만원 이상 구매 시 10% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_100K;
      const customer = { membership: "regular" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9); // 100,000 * 0.9
    });

    test("20만원 이상 구매 시 20% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_200K;
      const customer = { membership: "regular" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_200K * 0.8); // 200,000 * 0.8
    });
  });

  describe("회원 등급에 따라 차등 할인 적용", () => {
    test("실버 회원은 추가 2% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_100K;
      const customer = { membership: "silver" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.98); // 100,000 * 0.9 * 0.98
    });

    test("골드 회원은 추가 5% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_100K;
      const customer = { membership: "gold" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.95); // 100,000 * 0.9 * 0.95
    });

    test("VIP 회원은 추가 10% 할인이 적용되어야 함", () => {
      const price = BASE_PRICE_100K;
      const customer = { membership: "vip" as Membership };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.9); // 100,000 * 0.9 * 0.9
    });
  });

  describe("쿠폰 할인 테스트 (정액/정률)", () => {
    test("5,000원 정액 쿠폰 적용시 올바른 할인", () => {
      const price = BASE_PRICE_100K;
      const customer = {
        membership: "regular" as Membership,
        coupon: { type: "fixed", value: 5000 } as Coupon,
      };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 - 5000); // (100,000 * 0.9) - 5,000
    });

    test("5% 정률 쿠폰 적용 시 올바른 할인", () => {
      const price = 100000;
      const customer = {
        membership: "regular" as Membership,
        coupon: { type: "percentage", value: 5 } as Coupon,
      };
      const finalPrice = calculatePrice(price, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.9 * 0.95); // 100,000 * 0.9 * 0.95
    });
  });

  describe("최소 가격 제한", () => {
    test("할인 후 가격이 원래 가격의 50% 이하로 내려가지 않음", () => {
      const customer = createCustomer("vip", {
        type: "percentage",
        value: 50,
      });
      const finalPrice = calculatePrice(BASE_PRICE_100K, customer);
      expect(finalPrice).toBe(BASE_PRICE_100K * 0.5); // 50,000
    });
  });
});
