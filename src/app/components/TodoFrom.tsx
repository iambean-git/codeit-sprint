// TodoForm.tsx

"use client";

import { useState } from "react";

export default function TodoForm() {
  const [todo, setTodo] = useState("");

  return (
    <form>
      <label htmlFor="todo">할 일:</label>
      <input
        id="todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
    </form>
  );
}
