import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-600 dark:text-amber-500">
          Personal blog + AI assistant
        </p>
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Life reflections &amp; coding projects
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          A place to read essays on life, explore software I&apos;m building, react to
          posts, leave comments, and chat with an AI guide that knows this site.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Read the blog
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            About me
          </Link>
        </div>
      </div>

      <section className="mt-24 grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-500">
            Life
          </p>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Reflections &amp; stories
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Personal essays and notes — coming in step 3 when posts go live.
          </p>
        </article>
        <article className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-sky-500">
            Coding
          </p>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Projects &amp; builds
          </h2>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Write-ups on things I ship — write flow lands in step 4.
          </p>
        </article>
      </section>
    </main>
  );
}
