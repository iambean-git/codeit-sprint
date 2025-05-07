"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

type Item = {
  id: number;
  name: string;
};

export type CartItem = Item & {
  count: number;
};

const ITEMS = [
  {
    id: 1,
    name: "사과",
  },
  {
    id: 2,
    name: "오렌지",
  },
  {
    id: 3,
    name: "딸기",
  },
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. 세션 스토리지에서 장바구니 아이템을 가져오기 (새로고침해도 유지)
  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems") || "[]");
    setCartItems(cartItems);
  }, []);

  const handleAddItem = (item: Item) => {
    const isExist = cartItems.find((cartItem) => cartItem.id === item.id);
    if (isExist) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem,
      );
      // 세션 스토리지에 저장
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...item, count: 1 }];
      // 세션 스토리지에 저장
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">코드잇 마켓</h1>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center justify-between gap-2 rounded-md bg-gray-100 px-8 py-4"
          >
            <span>{item.name}</span>
            <button
              onClick={() => handleAddItem(item)}
              className="cursor-pointer rounded-md bg-gray-300 px-4 py-3 hover:bg-gray-400"
            >
              담기
            </button>
          </div>
        ))}
      </div>
      <div className="w-full">장바구니: {cartItems.length}개</div>
      <Link
        href="/shop/cart"
        className="w-full rounded-md bg-indigo-500 px-4 py-3 text-white"
      >
        장바구니로 가기
      </Link>
    </div>
  );
}
