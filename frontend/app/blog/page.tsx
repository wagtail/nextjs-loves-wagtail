import { gql } from '@apollo/client';
import { client } from '@/lib/graphql';

interface BlogPage {
  title: string;
  url: string;
  firstPublishedAt: string;
  introduction: string;
}

export default async function BlogIndex() {
  const {
    data: { blogIndex },
  } = await client.query({
    query: gql`
      query FetchBlogIndexPage {
        blogIndex: page(slug: "blog") {
          title
          url
          ... on BlogIndexPage {
            introduction
          }
          children(limit: 10) {
            title
            url
            firstPublishedAt
            ... on BlogPage {
              introduction
            }
          }
        }
      }
    `,
  });

  return (
    <main className="flex min-h-screen flex-col p-24 max-w-4xl">
      <div className="mb-16">
        <a className="hover:text-blue-100 block mb-8" href="/">
          ← Home
        </a>
        <h1 className="text-4xl font-bold mb-4">{blogIndex.title}</h1>
        <p className="text-xl">{blogIndex.introduction}</p>
      </div>
      <ul>
        {blogIndex.children.map((child: BlogPage) => (
          <li key={child.url} className="mb-12">
            <a className="hover:text-blue-100" href={child.url}>
              <h2 className="text-2xl font-bold mb-1">{child.title}</h2>
            </a>
            <time dateTime={child.firstPublishedAt} className="mb-3 block">
              {new Date(child.firstPublishedAt).toDateString()}
            </time>
            <p>{child.introduction}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
