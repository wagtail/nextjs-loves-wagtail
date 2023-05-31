interface BlogPage {
  id: number;
  meta: {
    type: string;
    slug: string;
    first_published_at: string;
  };
  title: string;
  intro: string;
}

export default async function BlogIndex() {
  const data = await fetch(
    `http://localhost:8000/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogPage",
      fields: "intro",
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const posts: BlogPage[] = data.items;

  return (
    <main>
      <div className="mb-8">
        <h1>Title</h1>
        <p>Some introduction</p>
      </div>
      <ul>
        {posts.map((child) => (
          <li key={child.id} className="mb-4">
            <a href={`blog/${child.meta.slug}`}>
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
