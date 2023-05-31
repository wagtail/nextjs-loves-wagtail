interface BlogPage {
  id: number;
  meta: {
    type: string;
    slug: string;
    first_published_at: string;
  };
  title: string;
  intro: string;
  body: string;
}

export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const data = await fetch(
    `http://localhost:8000/api/v2/pages/?${new URLSearchParams({
      slug,
      type: "blog.BlogPage",
      fields: ["intro", "body"].join(","),
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  const post: BlogPage = data.items[0];

  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time dateTime={post.meta.first_published_at}>
          {new Date(post.meta.first_published_at).toDateString()}
        </time>
        <p className="my-4">{post.intro}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </main>
  );
}

export async function generateStaticParams() {
  const data = await fetch(
    `http://localhost:8000/api/v2/pages/?${new URLSearchParams({
      type: "blog.BlogPage",
    })}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => response.json());

  return data.items.map((post: BlogPage) => ({
    slug: post.meta.slug,
  }));
}
