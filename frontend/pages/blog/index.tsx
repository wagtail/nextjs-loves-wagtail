import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

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

const BlogListing: NextPage<{ posts: BlogPage[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.meta.slug}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            <time dateTime={post.meta.first_published_at}>
              {new Date(post.meta.first_published_at).toDateString()}
            </time>
            <p>{post.intro}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogListing;

// This function gets called at build time
export async function getStaticProps() {
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

  return {
    props: {
      posts: data.items,
    },
  };
}
