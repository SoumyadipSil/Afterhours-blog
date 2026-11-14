'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Film, Sparkles, ArrowRight } from 'lucide-react';
import PostCard from '@/app/components/PostCard';
import type { BlogPost } from '@/app/lib/notion';

interface ReviewsViewProps {
  posts: BlogPost[];
}

export default function ReviewsView({ posts }: ReviewsViewProps) {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Dynamically extract all unique tags from review posts
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return ['all', ...Array.from(tagSet).sort()];
  }, [posts]);

  // Filter posts by search query and tag
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

      const matchesTag =
        selectedTag === 'all' ||
        post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchesQuery && matchesTag;
    });
  }, [posts, query, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Controls: Search and Tag Filters (if posts exist) */}
      {posts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Tags */}
          {availableTags.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all capitalize ${
                    selectedTag.toLowerCase() === tag.toLowerCase()
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reviews..."
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 transition-colors font-mono"
            />
          </div>
        </div>
      )}

      {/* Posts Grid or Empty State */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              date={new Date(post.published_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              category={post.category || 'Reviews'}
              coverImage={post.cover_image || undefined}
              readingTime={post.reading_time}
            />
          ))}
        </div>
      ) : (
        /* Atmospheric Empty State */
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/20 p-12 text-center max-w-2xl mx-auto shadow-2xl">
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>

            <h3 className="font-heading text-2xl text-white mb-3">
              The Critique Ledger is Quiet
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto mb-8">
              No reviews have been published yet. Midnight observations on literature, cinema, and software are currently in drafting.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 bg-zinc-900/80 border border-zinc-800 px-4 py-2.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              <span>To publish a review, set <strong className="text-zinc-300">Category</strong> to <strong className="text-rose-400">&quot;Reviews&quot;</strong> in Notion</span>
            </div>

            <Link
              href="/blog"
              className="btn-shimmer inline-flex items-center gap-2 text-xs font-medium text-white bg-zinc-800/90 hover:bg-zinc-700/80 border border-zinc-700/80 px-6 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
            >
              <span>Explore The Main Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
