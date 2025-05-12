export async function GET() {
  const posts = [
    {
      id: 1,
      title: "리액트를 재밌게 공부하는 법",
      content: "리액트를 재밌게 공부하는 법이란 ~",
    },
    {
      id: 2,
      title: "Next.js를 재밌게 공부하는 법",
      content: "Next.js를 재밌게 공부하는 법이란 ~",
    },
  ];
  return Response.json(posts);
}
