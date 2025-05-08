import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";

test("NavBar 에서 h1, input, button 요소가 존재하는지 확인", () => {
  render(<NavBar />);
  const logo = screen.getByRole("heading", { name: "웹사이트 로고" });
  const input = screen.getByRole("searchbox", { name: "검색" });
  const button = screen.getByRole("button", { name: "로그인" });

  expect(logo).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
