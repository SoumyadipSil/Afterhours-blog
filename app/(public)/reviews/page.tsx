import type { Metadata } from 'next';
import { getAllPublishedPosts } from '@/app/lib/notion';
import ReviewsView from '@/app/components/ReviewsView';

export const metadata: Metadata = {
  title: 'Reviews · AfterHours',
  description: 'Late-night critiques, deep dives, and impressions on books, cinema, software, and cultural craft by Soumyadip.',
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const allPosts = await getAllPublishedPosts();

  // Filter for posts categorized under "Reviews" or "Review"
  const reviewPosts = allPosts.filter(
    (post) => post.category?.toLowerCase().includes('review')
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 min-h-[80vh]">
      {/* Header */}
      <div className="max-w-3xl mb-16 animate-fade-in opacity-0">
        <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tight mb-4">
          Reviews
        </h1>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
          Late-night critiques, deep dives, and impressions on books, cinema, software, and cultural craft.
        </p>
      </div>

      {/* Review Posts / View */}
      <ReviewsView posts={reviewPosts} />
    </main>
  );
}
