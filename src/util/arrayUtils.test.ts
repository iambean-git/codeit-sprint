import { processArray } from "./arrayUtils";

test("정상적인 배열 입력에 올바른 결과 객체 반환?", () => {
  expect(processArray([1, 2, 3])).toEqual({
    sum: 6,
    average: 2,
    max: 3,
    min: 1,
  });
});

test("빈 배열에 null 반환?", () => {
  expect(processArray([])).toBeNull();
});

test("배열이 아닌 입력에 대해 null 반환?", () => {
  // @ts-expect-error
  expect(processArray("abc")).toBeNull();
});

test("결과 객체가 예상한 모든 속성을 포함하는가?", () => {
  const result = processArray([1, 2, 3]);
  expect(result).toHaveProperty("sum");
  expect(result).toHaveProperty("average");
  expect(result).toHaveProperty("max");
  expect(result).toHaveProperty("min");
});
