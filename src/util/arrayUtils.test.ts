import { desc } from "motion/react-m";
import { processArray, uniqueItems, chunk, intersection } from "./arrayUtils";

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

describe("uniqueItems 함수 테스트", () => {
  test("중복된 항목이 제거되는가?", () => {
    expect(uniqueItems([1, 2, 2, 3])).toEqual([1, 2, 3]);
    expect(uniqueItems(["a", "b", "c", "a"])).toEqual(["a", "b", "c"]);
  });

  test("중복이 없는 배열은 그대로 반환되는가?", () => {
    expect(uniqueItems([1, 2, 3])).toEqual([1, 2, 3]);
    expect(uniqueItems(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  });

  test("빈 배열은 빈 배열을 반환", () => {
    expect(uniqueItems([])).toEqual([]);
  });

  test("배열이 아닌 입력은 빈 배열을 반환", () => {
    // @ts-expect-error
    expect(uniqueItems(123)).toEqual([]);
    // @ts-expect-error
    expect(uniqueItems("abc")).toEqual([]);
    // @ts-expect-error
    expect(uniqueItems(null)).toEqual([]);
    // @ts-expect-error
    expect(uniqueItems(undefined)).toEqual([]);
  });
});

describe("chunk 함수 테스트", () => {
  test("배열을 지정된 크기의 청크로 나누는가", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });
  test("청크 크기가 배열 길이보다 크면 하나의 청크만 반환", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });
  test("크기가 1이면 각 항목이 별도의 청크가 됨", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
  test("크기가 0이하면 전체 배열을 하나의 청크로 반환", () => {
    expect(chunk([1, 2, 3], -1)).toEqual([[1, 2, 3]]);
  });
  test("빈 배열(또는 배열이 아닌 입력)은 빈 배열 반환", () => {
    expect(chunk([], 5)).toEqual([]);
    // @ts-expect-error
    expect(chunk("abc", 5)).toEqual([]);
    // @ts-expect-error
    expect(chunk(123, 5)).toEqual([]);
    // @ts-expect-error
    expect(chunk(null, 5)).toEqual([]);
    // @ts-expect-error
    expect(chunk(undefined, 5)).toEqual([]);
  });
});

describe("intersection 함수 테스트", () => {
  test("두 배열의 공통 요소 반환", () => {
    expect(intersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])).toEqual([3, 4, 5]);
  });
  test("공통 요소가 없으면 빈 배열 반환환", () => {
    expect(intersection([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toEqual([]);
  });
  test("빈 배열 입력시 빈배열 반환", () => {
    expect(intersection([], [])).toEqual([]);
    expect(intersection([], [6, 7, 8, 9, 10])).toEqual([]);
    expect(intersection([1, 2, 3, 4, 5], [])).toEqual([]);
  });
  test("배열이 아닌 입력은 빈 배열 반환", () => {
    // @ts-expect-error
    expect(intersection("abc", [3, 4, 5, 6, 7])).toEqual([]);
    // @ts-expect-error
    expect(intersection(null, [3, 4, 5, 6, 7])).toEqual([]);
    // @ts-expect-error
    expect(intersection(undefined, [3, 4, 5, 6, 7])).toEqual([]);
    // @ts-expect-error
    expect(intersection(12345, [3, 4, 5, 6, 7])).toEqual([]);
  });
});
