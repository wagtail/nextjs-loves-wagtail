interface BlogIndexPage {
  title: string;
  intro: string;
}

interface BlogPage {
  id: number;
  meta: {
    slug: string;
  };
  title: string;
  date: string;
  intro: string;
}

export default async function BlogIndex() {
  const indexPages = await fetch(
    `http://localhost:8000/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogIndexPage",
      fields: "intro",
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const index: BlogIndexPage = indexPages.items[0];

  const data = await fetch(
    `http://127.0.0.1:8000/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogPage",
      fields: ["date", "intro"].join(","),
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
        <h1 className="text-4xl font-bold mb-2">{index.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: index.intro }}></div>
      </div>
      <ul>
        {posts.map((child) => (
          <li key={child.id} className="mb-4">
            <a className="underline" href={`blog/${child.meta.slug}`}>
              <h2>{child.title}</h2>
            </a>
            <time dateTime={child.date}>
              {new Date(child.date).toDateString()}
            </time>
            <p>{child.intro}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
