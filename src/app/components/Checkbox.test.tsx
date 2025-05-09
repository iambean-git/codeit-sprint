import Checkbox from "./Checkbox";
import { fireEvent, render, screen } from "@testing-library/react";

test("체크박스 클릭이벤트 테스트", () => {
  render(<Checkbox />);

  // 초기상태 확인
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();

  // 첫번째 클릭
  fireEvent.click(checkBox);
  expect(checkBox).toBeChecked();

  // 두번째 클릭
  fireEvent.click(checkBox);
  expect(checkBox).not.toBeChecked();
});
