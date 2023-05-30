export interface Article {
  slug: string;
  title: string;
  introduction: string;
  body: any;
}

export const stubArticles = [
  {
    slug: "hello-potato",
    title: "Hello, potato!",
  },
  {
    slug: "hello-tomato",
    title: "Hello, tomato!",
  },
];
