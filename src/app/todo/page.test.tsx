import TodoList from "./page";
import { render, fireEvent, screen } from "@testing-library/react";

describe("할 일 목록 페이지 테스트", () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test("초기 상태에서는 할 일이 없어야 한다.", () => {
    const text = screen.getByText("할 일이 없습니다");
    const text1 = screen.getByText("총 0개의 할 일이 있습니다");
    expect(text).toBeInTheDocument();
    expect(text1).toBeInTheDocument();
  });

  test("새로운 할 일을 추가하면 할 일 목록에 추가되어야 한다.", () => {
    // 입력 필드에 값 입력
    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    fireEvent.change(input, { target: { value: "야구 티켓 예매하기" } });
    // 추가 버튼 클릭
    const addBtn = screen.getByText("추가");
    fireEvent.click(addBtn);
    // 결과 검증
    const todo = screen.getByText("야구 티켓 예매하기");
    const text = screen.getByText("총 1개의 할 일이 있습니다");
    expect(text).toBeInTheDocument();
    expect(todo).toBeInTheDocument();
    expect(screen.getByText("완료: 0개")).toBeInTheDocument();
  });

  test("할 일을 완료하면 완료 상태가 반영되어야 한다.", () => {
    // 할 일 추가
    const input = screen.getByPlaceholderText("할 일을 입력하세요");
    fireEvent.change(input, { target: { value: "야구 티켓 예매하기" } });
    fireEvent.click(screen.getByText("추가"));
    expect(screen.getByText("야구 티켓 예매하기")).toBeInTheDocument();
    expect(screen.getByText("완료: 0개")).toBeInTheDocument();
    // 체크박스 클릭
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    // 완료 상태 검증
    expect(screen.getByText("완료: 1개")).toBeInTheDocument();
    expect(screen.getByText("야구 티켓 예매하기")).toHaveClass("line-through");
    expect(checkbox).toBeChecked();
  });
});
