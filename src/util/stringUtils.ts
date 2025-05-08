// src/utils/stringUtils.ts

// 문자열의 첫 글자를 대문자로 변환하고, 나머지는 소문자로 변환하는 함수
// capitalize("hello") -> "Hello"
export function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// 문자열을 지정된 길이로 자르고 말줄임표를 추가하는 함수
// truncate("hello world", 5) -> "hello..."
export function truncate(
  str: string,
  maxLength: number,
  suffix: string = "...", // 사용자 정의 말줄임표
) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  // 0부터 maxLength 까지 자르고 suffix를 추가
  return str.slice(0, maxLength) + suffix;
}
