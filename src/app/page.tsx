"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [fill, setFill] = useState("#000000");
  const [border, setBorder] = useState("#000000");

  useEffect(() => {
    let localfill = localStorage.getItem("fill");
    let localborder = localStorage.getItem("border");

    if (localfill) setFill(localfill);
    if (localborder) setBorder(localborder);
  }, []);

  useEffect(() => {
    localStorage.setItem("fill", fill);
    localStorage.setItem("border", border);
  }, [fill, border]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">테마 설정</h1>
      <div className="flex items-center justify-center gap-6">
        <div className="flex h-18 w-48 items-center justify-center gap-2 rounded-md bg-gray-300">
          <span>채우기</span>
          <input
            type="color"
            name="fill"
            id="fill"
            value={fill}
            onChange={(e) => setFill(e.target.value)}
          />
        </div>
        <div className="flex h-18 w-48 items-center justify-center gap-2 rounded-md bg-gray-300">
          <span>테두리</span>
          <input
            type="color"
            name="border"
            id="border"
            value={border}
            onChange={(e) => setBorder(e.target.value)}
          />
        </div>
      </div>
      <div
        className={`h-24 w-48 rounded-md border-4`}
        style={{ backgroundColor: fill, borderColor: border }}
      ></div>
    </div>
  );
}
