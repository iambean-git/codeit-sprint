//
import { login } from "./authService";
import {
  // mockGetCurrentUserSuccss,
  // mockLoginFailure,
  mockLoginSuccess,
  setupLocalStorageMock,
  axiosMock,
} from "src/helpers/test-helpers";

jest.mock("axios");

describe("authService", () => {
  let localStorageMock: ReturnType<typeof setupLocalStorageMock>;
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock = setupLocalStorageMock();
  });

  test("로그인 성공", async () => {
    const { user, token } = mockLoginSuccess();

    const result = await login("kim@example.com", "password123");

    // 적절한 API 주소와 데이터를 호출했는지
    expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:3000/login", {
      email: "kim@example.com",
      password: "password123",
    });

    // 반환된 데이터가 예상한 데이터인지
    expect(result).toEqual({
      user: user,
      token: token,
    });

    // 로컬 스토리지에 토큰 저장 로직이 실행됐는지
    expect(localStorageMock.setItem).toHaveBeenCalledWith("token", token);
  });

  //   test("로그인 실패", async () => {
  //     // API 오류 응답 모킹
  //     axiosMock.post.mockRejectedValue({
  //       response: {
  //         status: 401,
  //         data: { message: "잘못된 로그인 정보입니다" },
  //       },
  //     });

  //     // 로그인 실패 테스트
  //     const result = await login("wrong@email.com", "wrongpassword");
  //     expect(result).toEqual({
  //       status: 401,
  //       data: { message: "잘못된 로그인 정보입니다" },
  //     });

  //     // 적절한 API 주소와 데이터(로그인 실패용)를 호출했는지
  //     expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:3000/login", {
  //       email: "wrong@email.com",
  //       password: "wrongpassword",
  //     });

  //     // 로컬 스토리지 setItem이 실행이 안됐는지
  //     expect(window.localStorage.setItem).not.toHaveBeenCalled();
  //   });

  //   test("인증된 현재 사용자 조회하기", async () => {
  //     // localStorage에서 토큰 조회 모킹 설정
  //     (window.localStorage.getItem as jest.Mock).mockReturnValue("fake-token");

  //     // API 응답 모킹
  //     axiosMock.get.mockResolvedValue({
  //       data: {
  //         id: 1,
  //         name: "김철수",
  //         email: "kim@example.com",
  //       },
  //     });

  //     const result = await getCurrentUser();
  //     expect(result).toEqual({
  //       id: 1,
  //       name: "김철수",
  //       email: "kim@example.com",
  //     });

  //     expect(window.localStorage.getItem).toHaveBeenCalledWith("token");
  //     // 적절한 API 주소와 데이터(토큰 포함)를 호출했는지
  //     expect(axiosMock.get).toHaveBeenCalledWith("http://localhost:3000/me", {
  //       headers: { Authorization: `Bearer fake-token` },
  //     });
  //   });
});
