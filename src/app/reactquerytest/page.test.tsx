// src/hooks/page.test.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchPosts } from "./page";

describe("useFetchPosts 훅 테스트", () => {
  // react-query를 포함한 컴포넌트 테스트를 위해 셋팅이 필요해요!
  // ============= 쿼리 테스트 셋팅 start =====================
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    // react-query가 관리하는 캐시 없애기
    queryClient.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  // ============= 쿼리 테스트 셋팅 start =====================

  test("데이터 패치 테스트", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]),
    });

    // 커스텀 훅 테스트하기 위해 필요한 것
    // wrapper 꼭 확인하세요
    const { result } = renderHook(() => useFetchPosts(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toEqual([
        {
          id: 1,
          title: "리액트를 재밌게 공부하는 법",
          content: "리액트를 재밌게 공부하는 법이란 ~",
        },
        {
          id: 2,
          title: "Next.js를 재밌게 공부하는 법",
          content: "Next.js를 재밌게 공부하는 법이란 ~",
        },
      ]);
    });
  });
});
