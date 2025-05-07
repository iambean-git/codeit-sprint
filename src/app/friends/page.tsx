// 웹 브라우저에 데이터 저장하기 - 로컬스토리지 학습

"use client";

import { useState, useEffect } from "react";

type FriendType = {
  이름: string;
  나이: string;
  성별: string;
};
export default function Home() {
  // 친구 목록과 새 친구 정보를 저장할 변수
  const [친구들, 친구들변경] = useState<FriendType[]>([]);
  const [새친구정보, 새친구정보변경] = useState<FriendType>({
    이름: "",
    나이: "",
    성별: "남자",
  });

  // 페이지가 처음 열릴 때 저장된 친구 목록 불러오기기
  useEffect(() => {
    const friends = localStorage.getItem("친구목록");
    if (friends) 친구들변경(JSON.parse(friends));
  }, []);

  // 친구를 추가하는 함수
  function 친구추가() {
    if (새친구정보.이름 === "" || 새친구정보.나이 === "") {
      return alert("이름과 나이를 입력해주세요.");
    }

    const 새친구목록 = [...친구들, 새친구정보];
    친구들변경(새친구목록);
    localStorage.setItem("친구목록", JSON.stringify(새친구목록));
    // 입력창 초기화
    새친구정보변경({
      이름: "",
      나이: "",
      성별: "남자",
    });
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-100 p-8">
      <h1 className="mb-6 text-3xl font-bold text-blue-800">내 친구 목록</h1>

      {/* 친구 추가 폼 */}
      <div className="mb-8 flex w-full max-w-md flex-col gap-4">
        <input
          type="text"
          value={새친구정보.이름}
          onChange={(e) =>
            새친구정보변경({ ...새친구정보, 이름: e.target.value })
          }
          placeholder="친구 이름 입력"
          className="rounded border border-blue-300 px-4 py-2"
        />
        <input
          type="number"
          value={새친구정보.나이}
          onChange={(e) =>
            새친구정보변경({ ...새친구정보, 나이: e.target.value })
          }
          placeholder="나이 입력"
          className="rounded border border-blue-300 px-4 py-2"
        />
        <select
          value={새친구정보.성별}
          onChange={(e) =>
            새친구정보변경({ ...새친구정보, 성별: e.target.value })
          }
          className="rounded border border-blue-300 px-4 py-2"
        >
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
        <button
          onClick={친구추가}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          친구 추가
        </button>
      </div>

      {/* 친구 목록 */}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl text-blue-600">
          친구들 ({친구들.length}명)
        </h2>

        {친구들.length === 0 ? (
          <p className="text-gray-500">
            아직 친구가 없어요. 친구를 추가해보세요!
          </p>
        ) : (
          <ul className="space-y-2">
            {친구들.map((친구, 번호) => (
              <li
                key={번호}
                className="flex items-center justify-between rounded bg-blue-50 p-3"
              >
                <span className="font-medium text-blue-700">
                  👫 {친구.이름} ({친구.나이}세, {친구.성별})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
