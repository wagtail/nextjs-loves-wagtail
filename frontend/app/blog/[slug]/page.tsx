import { gql } from '@apollo/client';
import { client } from '@/lib/graphql';

interface BlogPage {
  title: string;
  url: string;
  firstPublishedAt: string;
  introduction: string;
  body: Array<
    {
      id: string;
    } & ({ field: 'paragraph_block'; value: string } | { field: 'image_block' })
  >;
}

export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data } = await client.query({
    query: gql`
      query FetchBlogPage($slug: String!) {
        blogPage: page(slug: $slug) {
          title
          url
          firstPublishedAt
          ... on BlogPage {
            introduction
            body {
              id
              field
              ... on RichTextBlock {
                value
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  });
  const blogPage: BlogPage = data.blogPage;

  return (
    <main className="flex min-h-screen flex-col p-24 max-w-4xl">
      <div className="mb-16">
        <a className="hover:text-blue-100 block mb-8" href="/blog">
          ← Blog index
        </a>
        <h1 className="text-4xl font-bold mb-2">{blogPage.title}</h1>
        <time dateTime={blogPage.firstPublishedAt} className="mb-4 block">
          {new Date(blogPage.firstPublishedAt).toDateString()}
        </time>
        <p className="text-xl">{blogPage.introduction}</p>
      </div>
      <div className="prose prose-invert">
        {blogPage.body.map((block) =>
          block.field === 'paragraph_block' ? (
            <div
              key={block.id}
              dangerouslySetInnerHTML={{ __html: block.value }}
            ></div>
          ) : null,
        )}
      </div>
    </main>
  );
}
