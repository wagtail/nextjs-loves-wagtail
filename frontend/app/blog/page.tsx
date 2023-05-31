export default async function BlogIndex() {
  const posts = [
    {
      id: 1,
      title: "First post",
      intro: "This is the first post",
      meta: {
        slug: "first-post",
        first_published_at: "2022-01-01T09:00:00Z",
      },
    },
    {
      id: 2,
      title: "Second post",
      intro: "This is the second post",
      meta: {
        slug: "first-post",
        first_published_at: "2021-01-01T09:00:00Z",
      },
    },
  ];

  return (
    <main>
      <div className="mb-8">
        <h1>Title</h1>
        <p>Some introduction</p>
      </div>
      <ul>
        {posts.map((child) => (
          <li key={child.id} className="mb-4">
            <a href={child.meta.slug}>
              <h2>{child.title}</h2>
            </a>
            <time dateTime={child.meta.first_published_at}>
              {new Date(child.meta.first_published_at).toDateString()}
            </time>
            <p>{child.intro}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
