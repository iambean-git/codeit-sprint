import { validateEmail, validatePassword, validateUser } from "./validators";

test("유효한 이메일 주소 검증", () => {
  expect(validateEmail("test@example.com")).toBeTruthy();
  expect(validateEmail("user.name@domain.co.kr")).toBeTruthy();
});

test("유효화지 않은 이메일 주소 검증", () => {
  expect(validateEmail("invalid")).toBeFalsy();
  expect(validateEmail("test@")).toBeFalsy();
  expect(validateEmail("test@example")).toBeFalsy();
  expect(validateEmail("")).toBeFalsy();
  // @ts-expect-error 타입 오류 에러
  expect(validateEmail(null)).toBeFalsy();
});

test("8자 이상의 비밀번호는 유효", () => {
  expect(validatePassword("password1234")).toBeTruthy();
  expect(validatePassword("12345678")).toBeTruthy();
  //8자 이하는 유효하지 않다.
  expect(validatePassword("1234")).toBeFalsy();
});

test("유효한 사용자 객체가 주어지면 true르 반환해야 함", () => {
  // 선택적 필드 불포함
  const validUser = {
    name: "성태영",
    email: "sung@example.com",
  };
  expect(validateUser(validUser)).toBeTruthy();
});

test("선택적 필드를 포함한 유효한 사용자 객체가 주어지면 true 반환해야 함", () => {
  const validUserWithAge = {
    name: "김철수",
    email: "kim@example.com",
    age: 30,
  };
  expect(validateUser(validUserWithAge)).toBeTruthy();
});

test("이메일이 없는 경우 유효하지 않음", () => {
  const userWithoutEmail = {
    name: "김철수",
  };

  // @ts-expect-error 타입 검사 예외
  expect(validateUser(userWithoutEmail)).toBeFalsy();
});

test("이메일 형식이 올바르지 않은 경우 유효하지 않음", () => {
  const userWithInvalidEmail = {
    name: "김철수",
    email: "invalid-email",
  };

  expect(validateUser(userWithInvalidEmail)).toBeFalsy();
});

test("이름 길이가 너무 짧은 경우 유효하지 않음", () => {
  const userWithShortName = {
    name: "J",
    email: "kim@example.com",
  };

  expect(validateUser(userWithShortName)).toBeFalsy();
});

test("나이가 음수인 경우 유효하지 않음", () => {
  const userWithNegativeAge = {
    name: "김철수",
    email: "kim@example.com",
    age: -5,
  };

  expect(validateUser(userWithNegativeAge)).toBeFalsy();
});

test("객체가 아닌 입력은 유효하지 않음", () => {
  // @ts-expect-error 타입 검사 예외
  expect(validateUser(null)).toBeFalsy();
  // @ts-expect-error 타입 검사 예외
  expect(validateUser(undefined)).toBeFalsy();
  // @ts-expect-error 타입 검사 예외
  expect(validateUser("string")).toBeFalsy();
  // @ts-expect-error 타입 검사 예외
  expect(validateUser(123)).toBeFalsy();
});
