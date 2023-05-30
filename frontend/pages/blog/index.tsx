import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { Article, stubArticles } from "../../data/articles";

const BlogListing: NextPage<{ posts: Article[] }> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogListing;

// This function gets called at build time
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query FetchBlogListing($slug: String) {
        page(slug: $slug) {
          title
          id
          firstPublishedAt
          ... on BlogIndexPage {
            children {
              slug
              title
              url
              urlPath
              ... on BlogPage {
                introduction
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: "blog",
    },
  });

  return {
    props: {
      posts: data.page.children,
    },
  };
}
