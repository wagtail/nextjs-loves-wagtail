import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { Article, stubArticles } from "../../data/articles";
import StreamField from "../../components/StreamField";

const BlogArticle: NextPage<{ post: Article }> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        <h1>{post.title}</h1>
        <p>{post.introduction}</p>

        <StreamField stream={post.body} />
      </main>
    </>
  );
};

export default BlogArticle;

// This function gets called at runtime
export async function getServerSideProps({ params }) {
  const { data } = await client.query({
    query: gql`
      fragment getStreamfieldBlock on StreamFieldInterface {
        ...getRichTextBlock
      }

      fragment getRichTextBlock on RichTextBlock {
        value
      }

      query getPage($slug: String) {
        page(slug: $slug) {
          ... on BlogPage {
            title
            introduction
            body {
              id
              field
              blockType
              ...getStreamfieldBlock
            }
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  if (!data.page) {
    return {
      notFound: true,
    };
  }

  console.log("hey");

  return {
    props: {
      post: data.page,
    },
  };
}
