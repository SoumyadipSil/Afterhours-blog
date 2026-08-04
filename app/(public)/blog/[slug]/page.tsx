// app/(public)/blog/[slug]/page.tsx
import { createClient } from '@/app/lib/supabase/server';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published') // Only fetch published posts
    .single();

  if (error) {
    console.error('Error fetching post:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl mb-4">
          {post.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          Published on {new Date(post.published_at!).toLocaleDateString()} in{' '}
          <span className="capitalize">{post.category}</span>
        </p>
        <Markdown>{post.content}</Markdown>
      </article>
    </main>
  );
}

// Optional: Generate static params for all published posts for SSG
export async function generateStaticParams() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published');

  return posts?.map(({ slug }) => ({
    slug,
  })) || [];
}
