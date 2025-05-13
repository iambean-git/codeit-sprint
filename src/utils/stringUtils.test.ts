// import { tr } from "motion/react-m";
import { capitalize, truncate } from "./stringUtils";
describe("capitalize 함수 테스트", () => {
  test("문자열 첫 글자를 대문자로 변환 hello->Hello", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("빈 문자열에 대해 빈 문자열 반환", () => {
    expect(capitalize("")).toBe("");
    // @ts-expect-error 타입 에러 무시
    expect(capitalize(null)).toBe("");
    // @ts-expect-error 타입 에러 무시
    expect(capitalize(undefined)).toBe("");
  });

  test("한 글자 문자열 테스트", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("B")).toBe("B");
  });
});

describe("truncate 함수 테스트", () => {
  test("최대 길이보다 짧은 문자열은 그대로 반환", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });
  test("최대 길이보다 긴 문자열은 자르고 말줄임표 추가", () => {
    expect(truncate("helloABC", 5)).toBe("hello...");
  });
  test("사용자 정의 말줄임표를 사용할 수 있어야 함", () => {
    expect(truncate("안녕하세요12345", 5, "[~]")).toBe("안녕하세요[~]");
  });
  test("빈 문자열, null, undefined에 대해 빈 문자열 반환", () => {
    expect(truncate("", 3)).toBe("");
    // @ts-expect-error 타입 에러 무시
    expect(truncate(null, 3)).toBe("");
    // @ts-expect-error 타입 에러 무시
    expect(truncate(undefined, 3)).toBe("");
  });
});
