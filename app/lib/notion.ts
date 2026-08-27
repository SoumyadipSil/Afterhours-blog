import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';

// Official Notion Client (used for querying databases)
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Unofficial Notion Client (used by react-notion-x to fetch full page content)
export const notionApi = new NotionAPI();

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  category: string;
  cover_image: string | null;
}

/**
 * Transforms a raw Notion page property into our standard BlogPost object.
 */
function mapNotionPropertiesToPost(page: any): BlogPost {
  const properties = page.properties;
  
  // Extract simple string values safely
  const getRichText = (prop: any) => prop?.rich_text?.[0]?.plain_text || '';
  const getTitle = (prop: any) => prop?.title?.[0]?.plain_text || 'Untitled';
  const getSelect = (prop: any) => prop?.select?.name || 'General';
  const getDate = (prop: any) => prop?.date?.start || page.created_time;
  
  // Extract cover image if present
  let coverImage = null;
  if (page.cover) {
    if (page.cover.type === 'external') {
      coverImage = page.cover.external.url;
    } else if (page.cover.type === 'file') {
      coverImage = page.cover.file.url;
    }
  }

  return {
    id: page.id,
    title: getTitle(properties.Title || properties.Name),
    slug: getRichText(properties.Slug),
    excerpt: getRichText(properties.Excerpt),
    published_at: getDate(properties.Date || properties.Published),
    category: getSelect(properties.Category),
    cover_image: coverImage,
  };
}

/**
 * Fetches all published posts from the Notion database.
 */
export async function getAllPublishedPosts(category?: string): Promise<BlogPost[]> {
  try {
    const filters: any[] = [
      {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      }
    ];

    if (category) {
      filters.push({
        property: 'Category',
        select: {
          equals: category,
        },
      });
    }

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: filters,
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return response.results.map(mapNotionPropertiesToPost);
  } catch (error) {
    console.error('Error fetching posts from Notion:', error);
    return [];
  }
}

/**
 * Fetches a single post by its slug.
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug,
        },
      },
    });

    if (!response.results.length) {
      return null;
    }

    const page = response.results[0];
    const postMetadata = mapNotionPropertiesToPost(page);
    
    // Fetch the actual page blocks for rendering
    const recordMap = await notionApi.getPage(page.id);

    return {
      postMetadata,
      recordMap,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}
