import { validateUsername } from "./stringValidator";

test("유효한 사용자 이름이 true 반환", () => {
  expect(validateUsername("eunbin")).toBeTruthy();
  expect(validateUsername("eunbin__")).toBeTruthy();
  expect(validateUsername("eunbin_02")).toBeTruthy();
});

test("특수문자가 포함된 이름이 false를 반환", () => {
  expect(validateUsername("eunbin_^^")).toBeFalsy();
});

test("길이제한 벗어나면 false 반환", () => {
  expect(validateUsername("ac")).toBeFalsy();
  expect(validateUsername("1234567890123456789011")).toBeFalsy();
});

test("잘못된 타입에 대해 false 반환", () => {
  //@ts-expect-error
  expect(validateUsername(null)).toBeFalsy();
  //@ts-expect-error
  expect(validateUsername(undefined)).toBeFalsy();
  //@ts-expect-error
  expect(validateUsername(1234)).toBeFalsy();
});
