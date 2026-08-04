import { createClient } from '@/app/lib/supabase/server';
import Link from 'next/link';

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Blog
        </h1>
        <p className="text-red-500">Error loading posts.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
        Blog
      </h1>

      {posts && posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600"
            >
              <h2 className="mb-2 text-xl font-semibold text-zinc-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              )}
              {post.published_at && (
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                  Published on{' '}
                  {new Date(post.published_at).toLocaleDateString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-zinc-600 dark:text-zinc-400">No published posts yet.</p>
      )}
    </main>
  );
}
