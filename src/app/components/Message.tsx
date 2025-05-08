// Message.tsx
export default function Message({ isError }: { isError: boolean }) {
  return (
    <div>{isError ? <p className="error">오류가 발생했습니다</p> : null}</div>
  );
}
