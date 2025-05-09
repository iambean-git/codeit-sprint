import { fireEvent, render, screen } from "@testing-library/react";
import SearchForm from "./SearchForm";
import userEvent from "@testing-library/user-event";

test("검색어 입력 후 폼 제출시 onSearch 함수 동작 확인", async () => {
  const user = userEvent.setup();
  const handleSearch = jest.fn();
  render(<SearchForm onSearch={handleSearch} />);

  const input = screen.getByLabelText("검색:");
  const submitButton = screen.getByRole("button", { name: "검색" });

  await user.type(input, "리액트");
  await user.click(submitButton);

  expect(handleSearch).toHaveBeenCalledWith("리액트");
});
