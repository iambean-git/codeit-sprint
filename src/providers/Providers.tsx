"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            // 필요에 따라 다른 옵션 설정
          },
        },
      }),
  );

  return (
    //QueryClientProvider 안에 있는 컴포넌트에서만 react-query 사용 가능
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
