// Checkbox.tsx
"use client";

import { useState } from "react";

export default function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      완료
    </label>
  );
}
