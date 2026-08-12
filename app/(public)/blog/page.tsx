import { createClient } from '@/app/lib/supabase/server';
import PostCard from '@/app/components/PostCard';

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, published_at, category, cover_image')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return (
      <main className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="font-heading text-5xl md:text-7xl text-text-primary mb-12 animate-fade-in opacity-0">
          The Archive
        </h1>
        <div className="bg-accent-amber/10 border border-accent-amber rounded-xl p-8 text-center max-w-2xl mx-auto">
          <p className="text-accent-amber mb-2">Failed to load the archive.</p>
          <p className="text-text-secondary text-sm">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="font-heading text-5xl md:text-7xl text-text-primary mb-16 animate-fade-in opacity-0">
        The Archive
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
                coverImage={post.cover_image}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <h2 className="font-heading text-4xl italic text-text-secondary mb-4">No stories yet...</h2>
          <p className="text-text-tertiary">The archive is currently empty. Check back when the stars are out.</p>
        </div>
      )}
    </main>
  );
}
