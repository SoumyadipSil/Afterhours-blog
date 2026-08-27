import { getAllPublishedPosts } from '@/app/lib/notion';
import PostCard from '@/app/components/PostCard';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryFilter = resolvedSearchParams?.category as string | undefined;

  const posts = await getAllPublishedPosts(categoryFilter);

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-5xl md:text-7xl text-text-primary mb-16 animate-fade-in opacity-0 capitalize">
        {categoryFilter ? categoryFilter : 'The Archive'}
      </h1>

      {posts && posts.length > 0 ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:balance]">
          {posts.map((post) => (
            <div key={post.id} className="break-inside-avoid mb-6">
              <PostCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt || ''}
                date={post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}
                category={post.category || 'General'}
                coverImage={post.cover_image || undefined}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <h2 className="font-heading text-4xl italic text-text-secondary mb-4">No stories yet...</h2>
          <p className="text-text-tertiary">
            {categoryFilter 
              ? `No posts found in the ${categoryFilter} category.`
              : 'The archive is currently empty. Check back when the stars are out.'}
          </p>
        </div>
      )}
    </main>
  );
}

export const revalidate = 60;
