export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Edit post
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">Editing post {id} — step 4.</p>
    </main>
  );
}
