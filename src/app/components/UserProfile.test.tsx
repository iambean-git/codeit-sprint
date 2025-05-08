import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

test("UserProfile 컴포넌트 테스트 name = 홍길동, isVerified = true", () => {
  render(<UserProfile name="홍길동" isVerified={true} />);

  // 텍스트 컨텐츠 확인
  const title = screen.getByRole("heading", { name: "홍길동님의 프로필" });
  expect(title).toBeInTheDocument();
  // 이미지 대체 텍스트 확인
  const image = screen.getByAltText("프로필 이미지");
  expect(image).toBeInTheDocument();

  // 버튼 활성화 상태 및 컨테이너 클래스 확인
  const button = screen.getByRole("button", { name: "프로필 수정" });
  expect(button).not.toBeDisabled();

  // 컨테이너 클래스 확인
  const div = screen.getByTestId("profile-container");
  expect(div).toHaveClass("verified");
});
