export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="mb-2 text-sm uppercase tracking-wider text-zinc-500">Post</p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {slug}
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Single post view — reactions, comments, and content load in later steps.
      </p>
    </main>
  );
}
