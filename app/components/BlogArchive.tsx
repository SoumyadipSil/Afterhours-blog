'use client';

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import PostCard from '@/app/components/PostCard';
import type { BlogPost } from '@/app/lib/notion';

type SortOrder = 'newest' | 'oldest' | 'reading-time';

interface BlogArchiveProps {
  posts: BlogPost[];
  initialCategory?: string;
}

function getYear(date: string): string {
  return date ? new Date(date).getFullYear().toString() : 'Unknown';
}

export default function BlogArchive({ posts, initialCategory }: BlogArchiveProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory || 'all');
  const [year, setYear] = useState('all');
  const [sort, setSort] = useState<SortOrder>('newest');

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).sort()],
    [posts],
  );
  const years = useMemo(
    () => ['all', ...Array.from(new Set(posts.map((post) => getYear(post.published_at)))).sort((a, b) => b.localeCompare(a))],
    [posts],
  );

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts
      .filter((post) => {
        const searchableText = [
          post.title,
          post.excerpt,
          post.category,
          post.content,
          ...post.tags,
        ].join(' ').toLowerCase();

        return (
          (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
          (category === 'all' || post.category.toLowerCase() === category.toLowerCase()) &&
          (year === 'all' || getYear(post.published_at) === year)
        );
      })
      .sort((a, b) => {
        if (sort === 'reading-time') return a.reading_time - b.reading_time;
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();
        return sort === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [category, posts, query, sort, year]);

  return (
    <>
      <div className="mb-10 space-y-5">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, excerpts, categories, and essays..."
            aria-label="Search posts"
            className="w-full rounded-xl border border-border-subtle bg-bg-elevated/70 py-3 pl-11 pr-4 text-sm text-text-primary outline-none transition placeholder:text-text-tertiary focus:border-accent-amber"
          />
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category.toLowerCase() === item.toLowerCase()}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-xs font-medium capitalize transition ${
                  category === item
                    ? 'border-accent-amber bg-accent-amber/15 text-accent-amber'
                    : 'border-border-subtle text-text-secondary hover:border-text-tertiary hover:text-text-primary'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <span className="sr-only">Filter by year</span>
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-xs text-text-primary outline-none"
              >
                {years.map((item) => <option key={item} value={item}>{item === 'all' ? 'All years' : item}</option>)}
              </select>
            </label>
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">Sort posts</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOrder)}
                className="rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-xs text-text-primary outline-none"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="reading-time">Shortest read</option>
              </select>
            </label>
          </div>
        </div>
        <p className="text-xs text-text-tertiary" aria-live="polite">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}
        </p>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="columns-1 gap-6 [column-fill:balance] md:columns-2 lg:columns-3">
          {filteredPosts.map((post) => (
            <div key={post.id} className="mb-6 break-inside-avoid">
              <PostCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt || ''}
                date={post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}
                category={post.category || 'General'}
                coverImage={post.cover_image || undefined}
                readingTime={post.reading_time}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h2 className="mb-4 font-heading text-4xl italic text-text-secondary">No stories found</h2>
          <p className="text-text-tertiary">Try a different search or filter.</p>
        </div>
      )}
    </>
  );
}
