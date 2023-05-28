import { gql } from '@apollo/client';
import { client, getHostOrigin } from '@/lib/graphql';

export default async function Home() {
  const {
    data: { homePage },
  } = await client.query({
    query: gql`
      query FetchHomePage {
        homePage: page(urlPath: "/") {
          title
          ... on HomePage {
            heroText
            heroCtaLink {
              url
            }
            heroCta
          }
        }
      }
    `,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className="text-4xl font-bold mb-8">{homePage.title}</h1>
      </div>
      <p className="mb-8">{homePage.heroText}</p>
      <a
        className="px-4 py-2 rounded border hover:text-blue-100"
        href={getHostOrigin() + homePage.heroCtaLink.url}
      >
        {homePage.heroCta}
      </a>
    </main>
  );
}
