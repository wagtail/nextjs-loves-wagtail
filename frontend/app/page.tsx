export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold mb-8">Welcome!</h1>
      </div>
      <p className="mb-8">This is a website built with Next.js and Wagtail</p>
      <a className="px-4 py-2 rounded border hover:text-blue-100" href="/blog">
        Visit the blog
      </a>
    </main>
  );
}
