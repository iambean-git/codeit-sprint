"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("/api/posts");
      if (!res.ok) {
        throw new Error("데이터 패치 실패");
      }
      return res.json();
    },
  });

  return { data, isLoading, error };
};

export default function Home() {
  const { data, isLoading, error } = useFetchPosts();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">게시글 목록</h1>
      <ul>
        {data?.map((post: { id: number; title: string; content: string }) => (
          <li key={post.id} className="border-b py-2">
            <h2 className="text-xl font-semibold">제목: {post.title}</h2>
            <p className="text-sm text-gray-600">내용: {post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
