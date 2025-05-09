import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";

// ...생략

test("이메일/비밀번호 입력 후 로그인 시도 시나리오 테스트", () => {
  render(<LoginForm />);

  // alert 모킹 설정
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  // 입력 요소 가져오기
  const emailInput = screen.getByRole("textbox", { name: "이메일:" });
  const passwordInput = screen.getByLabelText("비밀번호:");

  // 이메일과 비밀번호 입력
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // 입력값 확인
  expect(emailInput).toHaveValue("test@test.com");
  expect(passwordInput).toHaveValue("password123");

  // 폼 제출
  const form = screen.getByRole("form");
  fireEvent.submit(form);

  // 로그인 성공 메시지 확인
  expect(alertSpy).toHaveBeenCalledWith(
    "로그인 성공 test@test.com password123",
  );

  // 스파이 복원
  alertSpy.mockRestore();
});

test("이메일, 비밀번호 입력 시 input 요소의 값이 변경되는지 확인", () => {
  render(<LoginForm />);

  // 이메일 입력 요소 가져오기
  const emailInput = screen.getByRole("textbox", { name: "이메일:" });
  // type="password"인 요소는 getByRole로 찾을 수 없음
  const passwordInput = screen.getByLabelText("비밀번호:");

  // input에 이메일 입력
  fireEvent.change(emailInput, { target: { value: "test@test.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  // input의 값이 변경되었는지 확인
  expect(emailInput).toHaveValue("test@test.com");
  expect(passwordInput).toHaveValue("password123");
});

// test("로그인 폼이 올바르게 렌더링 되는지 확인", () => {
//   render(<LoginForm />);

//   //라벨로 input 찾기
//   const emailByLabel = screen.getByLabelText("이메일:");

//   //placeholder로 input 찾기
//   const emailByPlaceholder = screen.getByPlaceholderText("이메일을 입력하세요");

//   // 역할로 버튼 찾기
//   const loginButton = screen.getByRole("button", { name: "로그인" });

//   // 테스트 ID로 요소 찾기
//   const emailByTestId = screen.getByTestId("email-input");

//   // 모든 요소가 화면에 있는지 확인
//   expect(emailByLabel).toBeInTheDocument();
//   expect(emailByPlaceholder).toBeInTheDocument();
//   expect(loginButton).toBeInTheDocument();
//   expect(emailByTestId).toBeInTheDocument();

//   // emailByLabel, emailByPlaceholder, emailByTestId가 동일한 요소인지 확인
//   expect(emailByLabel).toBe(emailByPlaceholder);
//   expect(emailByLabel).toBe(emailByTestId);
// });

// test("로그인 버튼을 클릭하면 로그인 메시지가 출력되는지 확인", () => {
//   render(<LoginForm />);

//   // <참고>
//   // 1. jest.spyOn(console, "log")
//   // - console.log를 감시(spy)하기 시작합니다
//   // - 함수가 언제 호출되었는지, 어떤 인자로 호출되었는지 추적할 수 있게 됩니다

//   // 2. .mockImplementation(() => {})
//   // - 실제 console.log의 구현을 빈 함수로 대체합니다
//   // - 즉, console.log가 호출되어도 실제로는 아무것도 출력되지 않습니다
//   // console.log 함수를 모킹하여 호출되는 메시지를 가로채기
//   const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

//   // 로그인 버튼 가져오기 및 클릭
//   const loginButton = screen.getByRole("button", { name: "로그인" });
//   fireEvent.click(loginButton);

//   // 로그인 버튼 클릭 시 로그인 메시지가 출력되는지 확인
//   expect(consoleSpy).toHaveBeenCalledWith("로그인 버튼 클릭");

//   // jest.spyOn()으로 생성된 스파이(spy)를 원래 구현(original implementation)으로 완전히 복원하는 역할
//   consoleSpy.mockRestore();
// });
