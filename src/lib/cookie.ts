interface CookieOptions {
  path?: string;
  domain?: string;
  expires?: Date;
  "max-age"?: number;
  secure?: boolean;
  samesite?: "Strict" | "Lax" | "None";
  [key: string]: string | number | boolean | Date | undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  // 1. 옵션 설정
  options = {
    // 기본적으로 전체 사이트에서 접근 가능하도록
    path: "/",
    // path를 수정하거나 다른 옵션들을 넣어줌
    ...options,
  };

  // 쿠키 문자열 만들기
  let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  // 옵션 추가하기
  for (const optionKey in options) {
    // 옵션 값 추출
    const optionValue = options[optionKey];
    // 예를 들어, null 또는 undefined 와 같은 값이 들어간다면 저장하지 않고 넘어가기
    if (
      optionValue === undefined ||
      optionValue === null ||
      optionValue === false
    )
      continue;

    // Date 객체 정리
    let finalValue = optionValue;
    if (optionValue instanceof Date) {
      finalValue = optionValue.toUTCString();
    }

    // 세미콜론(;)을 먼저 추가한 후 뒤에 옵션의 key를 추가
    cookieString += `${optionKey}`;

    // 옵션의 값이 true가 아니라면 '=옵션값'을 추가
    if (finalValue !== true) {
      cookieString += `=${finalValue}`;
    }
  }

  // 쿠키 설정하기
  document.cookie = cookieString;
}

// 특정 키의 쿠키가 존재하는지 확인
export function isCookieExists(name: string) {
  const encodedName = encodeURIComponent(name);
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(encodedName + "="))
    ? true
    : false;
}

// 쿠키 삭제하기
export function deleteCookie(name: string) {
  document.cookie = encodeURIComponent(name) + "=; Max-age=0";

  // 또는 setCookie 재사용
  //   setCookie(name, "", {
  //     "max-age": 0,
  //   });
}

// 쿠키 이름으로 값 확인하기
export function getCookieValue(name: string) {
  const encodedName = encodeURIComponent(name);

  // 쿠키 목록을 "; " 기준으로 배열로 변경
  const cookies = document.cookie.split("; ");

  // 존재하는지 찾기 (encodedName=으로 시작하는지 확인)
  const cookie = cookies.find((cookie) => cookie.startsWith(encodedName + "="));

  // 있으면 디코딩해서 값 변환
  if (cookie) {
    return decodeURIComponent(cookie.split("-")[1]);
  }
  // 없으면 undefined 반환
  return undefined;
}
