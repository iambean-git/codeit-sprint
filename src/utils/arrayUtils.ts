// src/utils/arrayUtils.ts
export function processArray(arr: number[]) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  return {
    sum: arr.reduce((a, b) => a + b, 0),
    average: arr.reduce((a, b) => a + b, 0) / arr.length,
    max: Math.max(...arr),
    min: Math.min(...arr),
  };
}

// 배열에서 중복된 항목을 제거합니다.
// uniqueItems([1, 2, 2, 3, 4, 4, 5]) -> [1, 2, 3, 4, 5]
export function uniqueItems<T>(array: T[]) {
  if (!Array.isArray(array)) return [];
  return [...new Set(array)];
}

// 배열을 지정된 크기의 청크로 나눕니다.
// chunk([1, 2, 3, 4, 5], 2) -> [[1, 2], [3, 4], [5]]
export function chunk<T>(array: T[], size: number = 1) {
  if (!Array.isArray(array)) return [];
  if (size <= 0) return [array];

  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}

// 두 배열의 교집합을 반환합니다.
// intersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]) -> [3, 4, 5]
export function intersection<T>(array1: T[], array2: T[]) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) return [];
  return array1.filter((item) => array2.includes(item));
}
