import { desc } from "motion/react-m";
import { formatDate, daysDifference, isWeekend } from "./dateUtil";

describe("formatDate", () => {
  test("날짜를 YYYY-MM-DD 형식으로 포맷", () => {
    expect(formatDate(new Date(2025, 4, 7))).toEqual("2025-05-07");
    expect(formatDate(new Date(2025, 10, 21))).toEqual("2025-11-21");
  });
  test("다른 구분자를 사용할 수 있는가", () => {
    expect(formatDate(new Date(2025, 4, 7), ".")).toEqual("2025.05.07");
    expect(formatDate(new Date(2025, 4, 7), "/")).toEqual("2025/05/07");
  });
  test("10월 미만의 월, 일 앞에는 0을 붙임", () => {
    expect(formatDate(new Date(2025, 1, 9))).toEqual("2025-02-09");
    expect(formatDate(new Date(2025, 7, 5))).toEqual("2025-08-05");
  });
  test("유효하지 않은 날짜는 빈 문자열을 반환", () => {
    //@ts-expect-error
    expect(formatDate("250507")).toEqual("");
    //@ts-expect-error
    expect(formatDate(null)).toEqual("");
    //@ts-expect-error
    expect(formatDate(undefined)).toEqual("");
    expect(formatDate(new Date("Invalid Date"))).toEqual("");

    // expect(formatDate(new Date(2025, 15, 50))).toEqual("");
    // 이 경우 자동으로 날짜가 보정됨
    // 15는 16번째 달 → 다음해 4월로 계산됨 (월은 0부터 시작하니까)
  });
});

describe("daysDifference 함수 테스트", () => {
  test("두 날짜 간의 일수 차이 계산", () => {
    expect(daysDifference(new Date(2025, 2, 1), new Date(2025, 2, 10))).toBe(9);
  });
  test("날짜 순서가 반대이면 음수 반환환", () => {
    expect(daysDifference(new Date(2025, 2, 10), new Date(2025, 2, 1))).toBe(
      -9,
    );
  });
  test("같은 날짜는 0 반환", () => {
    expect(daysDifference(new Date(2025, 2, 1), new Date(2025, 2, 1))).toBe(0);
  });
});
