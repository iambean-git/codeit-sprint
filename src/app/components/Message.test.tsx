import { render, screen } from "@testing-library/react";
import Message from "./Message";

test("에러가 없는 경우 메시지가 보이지 않는다", () => {
  render(<Message isError={false} />);
  const msg = screen.queryByText("오류가 발생했습니다");
  expect(msg).not.toBeInTheDocument();
});

test("에러가 있는 경우 메시지가 보이고 error 클래스가 적용되어 있음음", () => {
  render(<Message isError={true} />);
  const msg = screen.queryByText("오류가 발생했습니다");
  expect(msg).toBeInTheDocument();
  expect(msg).toHaveClass("error");
});
