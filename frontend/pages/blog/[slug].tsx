import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

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

const BlogArticle: NextPage<{ post: BlogPage }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <h1>{post.title}</h1>
        <p>{post.intro}</p>

        <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
      </main>
    </>
  );
};

export default BlogArticle;

// This function gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
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

  return {
    props: {
      post: data.items[0],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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

  const paths = data.items.map((post: BlogPage) => ({
    params: {
      slug: post.meta.slug,
    },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
