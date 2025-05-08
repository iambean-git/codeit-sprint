// UserProfile.tsx
export default function UserProfile({
  name,
  isVerified,
}: {
  name: string;
  isVerified: boolean;
}) {
  return (
    <div
      className={isVerified ? "verified" : ""}
      data-testid="profile-container"
    >
      <h2>{name}님의 프로필</h2>
      <img src="/avatar.png" alt="프로필 이미지" />
      <button disabled={!isVerified}>프로필 수정</button>
    </div>
  );
}
