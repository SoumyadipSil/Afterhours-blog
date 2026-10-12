import { getAllPublishedPosts } from '@/app/lib/notion';
import BlogArchive from '@/app/components/BlogArchive';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams?.category as string | undefined;

  const posts = await getAllPublishedPosts();

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-5xl md:text-7xl text-text-primary mb-16 animate-fade-in opacity-0 capitalize">
        {categoryFilter ? categoryFilter : 'The Archive'}
      </h1>

      <BlogArchive posts={posts} initialCategory={categoryFilter} />
    </main>
  );
}

export const revalidate = 60;
