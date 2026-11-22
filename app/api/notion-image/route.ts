import { NextRequest, NextResponse } from 'next/server';
import { notion } from '@/app/lib/notion';

// In-memory cache for signed URLs (valid for 50 minutes to avoid re-fetching on every hit)
const urlCache = new Map<string, { url: string; expiresAt: number }>();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('id');

  if (!pageId) {
    return new NextResponse('Missing page id', { status: 400 });
  }

  // Check in-memory cache
  const cached = urlCache.get(pageId);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.redirect(cached.url, 307);
  }

  try {
    const page = (await notion.pages.retrieve({ page_id: pageId })) as any;
    let freshUrl = page.cover?.file?.url || page.cover?.external?.url;

    // Check properties if cover is not in page.cover
    if (!freshUrl && page.properties) {
      const propCover =
        page.properties.Cover ||
        page.properties['Cover Image'] ||
        page.properties.Image ||
        page.properties.Thumbnail;
      if (propCover?.type === 'files' && propCover.files?.[0]) {
        freshUrl = propCover.files[0].file?.url || propCover.files[0].external?.url;
      } else if (propCover?.type === 'url') {
        freshUrl = propCover.url;
      }
    }

    if (!freshUrl) {
      return new NextResponse('No cover found', { status: 404 });
    }

    // Cache for 50 minutes (Notion URLs expire at 60 mins)
    urlCache.set(pageId, {
      url: freshUrl,
      expiresAt: Date.now() + 50 * 60 * 1000,
    });

    const response = NextResponse.redirect(freshUrl, 307);
    response.headers.set('Cache-Control', 'public, max-age=3000, s-maxage=3000');
    return response;
  } catch (error) {
    console.error('Error fetching fresh Notion image:', error);
    return new NextResponse('Failed to fetch image', { status: 500 });
  }
}
