import Home from "./page";
import { render, screen } from "@testing-library/react";

test("Home 컴포넌트가 로딩 상태 후 사용자 데이터를 올바르게 렌더링", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([{ id: 1, name: "김철수", email: "kim@example.com" }]),
    }),
  ) as jest.Mock;

  render(<Home />);

  // 초기상태확인
  expect(screen.getByText("로딩중...")).toBeInTheDocument();

  // 비동기 작업 완료 후 데이터 확인
  await screen.findByText("이름: 김철수");
  await screen.findByText("이메일: kim@example.com");

  // 로딩 상태 제거 확인
  expect(screen.queryByText("로딩중...")).not.toBeInTheDocument();
});
