import axios from "axios";

export function setupLocalStorageMock() {
  // 이거 분리
  const localStorageMock = {
    store: {} as Record<string, string>,
    getItem: jest.fn(function (key: string) {
      return this.store[key] || null;
    }),
    setItem: jest.fn(function (key: string, value: string) {
      this.store[key] = value.toString();
    }),
    removeItem: jest.fn(function (key: string) {
      delete this.store[key];
    }),
    clear: jest.fn(function () {
      this.store = {} as Record<string, string>;
    }),
  };

  // window.localStorage에 localStorageMock 로 대체하겠다.
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
    writable: true,
  });

  return localStorageMock;
}

export function createUser(overrides = {}) {
  return {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    ...overrides,
  };
}

export const axiosMock = jest.mocked(axios);

export function mockLoginSuccess(user = createUser(), token = "fake-token") {
  axiosMock.post.mockResolvedValue({
    data: {
      user: user,
      token: token,
    },
  });
  return {
    user,
    token,
  };
}

export function mockLoginFailure() {
  axiosMock.post.mockRejectedValue({
    response: {
      status: 401,
      data: { message: "잘못된 로그인 정보입니다" },
    },
  });
}

export function mockGetCurrentUserSuccss(user = createUser()) {
  axiosMock.get.mockResolvedValue({
    data: user,
  });
  return user;
}
