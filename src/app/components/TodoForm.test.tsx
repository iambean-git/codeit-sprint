import TodoForm from "./TodoFrom";
import { fireEvent, render, screen } from "@testing-library/react";

test("초기 input 값은 빈 문자열이고, input에 할일 입력시 상태가 업데이트 되는가", () => {
  render(<TodoForm />);

  const todoInput = screen.getByLabelText("할 일:");
  expect(todoInput).toHaveValue("");

  fireEvent.change(todoInput, { target: { value: "여행 준비하기" } });
  expect(todoInput).toHaveValue("여행 준비하기");
});
