// src/utils/user.ts

import axios from "axios";

// fetch로 유저의 목록을 요청하는 함수
export async function fetchUsers() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const data = await response.json();
  return data;
}

// axios로 유저의 상세 정보를 요청하는 함수
export async function getUser(id: number) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  return response.data;
}
