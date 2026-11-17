import Link from "next/link";

// Static export serves this as 404.html on GitHub Pages
export default function NotFound() {
  return (
    <main
      id="main"
      className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
    >
      <p className="text-lg text-blue-300">404</p>
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Page not found
      </h1>
      <p className="max-w-md text-slate-200">
        That page doesn’t exist. Head back to the portfolio to see my work.
      </p>
      <Link
        href="/"
        className="rounded-full bg-blue-400 px-6 py-3 font-semibold text-slate-950 hover:bg-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        Back to home
      </Link>
    </main>
  );
}
