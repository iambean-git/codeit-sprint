// src/utils/sum.test.ts
import sum from "./sum";

test("1 + 2는 3이 되어야 함", () => {
  expect(sum(1, 2)).toBe(3);
});

// 다음 사용자 객체를 테스트하는 코드를 작성하세요.
const user = {
  name: "Kim",
  age: 25,
  contact: {
    email: "kim@example.com",
    phone: "010-1234-5678",
  },
  hobbies: ["reading", "gaming", "coding"],
};

test("user객체에 name, contact가 있고 이름이 Kim 이며, contact내부에는 email의 존재와 유효성 확인", () => {
  expect(user).toEqual(
    expect.objectContaining({
      name: "Kim",
      contact: expect.objectContaining({
        email: expect.stringMatching(/^\S+@\S+\.\S+$/),
      }),
    }),
  );
});

test("user 객체에 contact속성이 있고 이메일이 kim@example.com이며 취미 목록에 coding 포함?", () => {
  expect(user).toEqual(
    expect.objectContaining({
      contact: expect.objectContaining({
        email: "kim@example.com",
      }),
      hobbies: expect.arrayContaining(["coding"]),
    }),
  );
});

test("사용자 나이가 20~30 사이인지 확인", () => {
  expect(user.age).toBeWithin(20, 30);
});

// 다음 함수를 테스트하는 코드를 작성하세요.
const fetchUserData = async (id: number) => {
  if (id <= 0) {
    throw new Error("Invalid ID");
  }
  return {
    id,
    name: "User " + id,
    isActive: true,
  };
};

test("유효한 id로 호출 시 올바른 데이터 반환?", async () => {
  await expect(fetchUserData(10)).resolves.toEqual({
    id: 10,
    name: "User 10",
    isActive: true,
  });
});

test("잘못된 ID로 호출 시 에러 발생?", async () => {
  await expect(fetchUserData(-10)).rejects.toThrow("Invalid ID");
});

test("반환된 객체가 올바른 속성(id, name, isActive)를 가지고 있는가?", async () => {
  const userData = await fetchUserData(1);
  expect(userData).toHaveProperty("id");
  expect(userData).toHaveProperty("name");
  expect(userData).toHaveProperty("isActive");
});
