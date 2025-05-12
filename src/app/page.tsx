"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
        );
        if (!response.ok) {
          throw new Error("데이터를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error: unknown) {
        setError(
          error instanceof Error
            ? error
            : new Error("알 수 없는 에러가 발생했습니다."),
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h1>API 호출 테스트</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
