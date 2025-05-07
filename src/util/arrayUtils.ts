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
