import { getPostBySlug } from '@/app/lib/notion';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReadingProgress from '@/app/components/ReadingProgress';
import NotionPageRenderer from '@/app/components/NotionPageRenderer';

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const data = await getPostBySlug(slug);

  if (!data) {
    notFound();
  }

  const { postMetadata: post, recordMap } = data;

  const readingTime = 5; // Can estimate this based on blocks later

  const isCoding = post.category?.toLowerCase() === 'coding';
  const gradientClass = isCoding
    ? 'from-accent-slate/20 via-bg-primary to-bg-primary'
    : 'from-accent-amber-muted/20 via-bg-primary to-bg-primary';

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen pb-24">
        {/* Hero Section */}
        <header className="relative pt-32 pb-16 px-6 overflow-hidden border-b border-border min-h-[60vh] flex flex-col items-center justify-center">
          {post.cover_image ? (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-bg-primary">
              {/* Blurred Background */}
              <div className="absolute inset-0 z-0">
                <img src={post.cover_image} alt="" className="w-full h-full object-cover opacity-30 blur-2xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent" />
              </div>
              {/* Centered Image */}
              <div className="relative z-10 w-full max-w-4xl px-6 aspect-video mt-20">
                <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover rounded-xl border border-border shadow-2xl" />
              </div>
            </div>
          ) : (
            <div className={`absolute inset-0 z-0 bg-gradient-to-b ${gradientClass}`} />
          )}
          
          <div className="relative z-20 max-w-3xl mx-auto text-center mt-auto pt-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-full bg-bg-elevated border border-border text-xs font-medium text-text-secondary uppercase tracking-wider">
                {post.category || 'General'}
              </span>
              <span className="text-text-tertiary text-sm">
                {post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
              </span>
              <span className="text-text-tertiary text-sm">•</span>
              <span className="text-text-tertiary text-sm">{readingTime} min read</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-8">
              {post.title}
            </h1>
          </div>
        </header>

        {/* Content Section */}
        <div className="max-w-3xl mx-auto px-6 mt-16">
          <div className="prose prose-invert prose-amber max-w-none prose-headings:font-heading prose-a:text-accent-amber hover:prose-a:text-glow-amber transition-colors">
            <NotionPageRenderer recordMap={recordMap} />
          </div>

          {/* Footer Navigation */}
          <div className="mt-24 pt-8 border-t border-border text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              ← Back to Archive
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

