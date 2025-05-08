// NavBar.tsx
export default function NavBar() {
  return (
    <nav>
      <h1>웹사이트 로고</h1>
      <input
        type="search"
        placeholder="검색어를 입력하세요"
        aria-label="검색"
      />
      <button type="button">로그인</button>
    </nav>
  );
}
