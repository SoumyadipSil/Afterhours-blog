import Link from 'next/link';

interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage?: string;
  readingTime?: number;
}

export default function PostCard({ title, slug, excerpt, date, category, coverImage, readingTime }: PostCardProps) {
  const normalizedCategory = category.toLowerCase();
  const isCoding = normalizedCategory === 'coding';
  const isReview = normalizedCategory.includes('review');

  const gradientClass = isCoding
    ? 'from-accent-slate/20 to-bg-elevated'
    : isReview
    ? 'from-rose-500/20 to-bg-elevated'
    : 'from-accent-amber-muted/20 to-bg-elevated';

  const badgeColorClass = isReview
    ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
    : isCoding
    ? 'text-accent-slate bg-accent-slate/10'
    : 'text-accent-amber bg-accent-amber/10';

  return (
    <Link href={`/blog/${slug}`} className="block glow-card rounded-xl overflow-hidden group">
      <div className={`h-48 w-full relative overflow-hidden bg-gradient-to-br ${gradientClass}`}>
        {coverImage && (
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColorClass}`}>
            {category}
          </span>
          <span className="text-xs text-text-tertiary">{date}</span>
          {readingTime && <span className="text-xs text-text-tertiary">{readingTime} min read</span>}
        </div>
        <h3 className="font-heading text-xl font-semibold text-text-primary mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
