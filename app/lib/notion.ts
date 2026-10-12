import { Client } from '@notionhq/client';
import { NotionAPI } from 'notion-client';
import { NotionToMarkdown } from 'notion-to-md';

// Official Notion Client (used for querying databases)
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Unofficial Notion Client used to fetch the page record map for metadata such as reading time.
export const notionApi = new NotionAPI();
const notionToMarkdown = new NotionToMarkdown({ notionClient: notion });

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  category: string;
  cover_image: string | null;
  content: string;
  reading_time: number;
  tags: string[];
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
  const getMultiSelect = (prop: unknown): string[] => {
    if (!prop || typeof prop !== 'object' || !('multi_select' in prop)) return [];
    const multiSelect = (prop as { multi_select?: Array<{ name?: string }> }).multi_select;
    return multiSelect?.flatMap((item) => item.name ? [item.name] : []) || [];
  };
  
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
    content: '',
    reading_time: 1,
    tags: getMultiSelect(properties.Tags || properties.Tag),
  };
}

function getReadingTime(content: string): number {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / 200));
}

async function enrichPost(post: BlogPost): Promise<BlogPost> {
  try {
    const markdownBlocks = await notionToMarkdown.pageToMarkdown(post.id);
    const content = notionToMarkdown.toMarkdownString(markdownBlocks).parent;

    return {
      ...post,
      content,
      reading_time: getReadingTime(content),
    };
  } catch (error) {
    console.error(`Error fetching Notion content for post ${post.id}:`, error);
    return post;
  }
}

/**
 * Fetches all published posts from the Notion database.
 */
export async function getAllPublishedPosts(category?: string): Promise<BlogPost[]> {
  try {
    const filters: any[] = [
      {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      }
    ];

    if (category) {
      // Capitalize first letter to match Notion tags (e.g., 'life' -> 'Life')
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      filters.push({
        property: 'Category',
        select: {
          equals: formattedCategory,
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

    const posts = response.results.map(mapNotionPropertiesToPost);
    return Promise.all(posts.map(enrichPost));
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
    const markdownBlocks = await notionToMarkdown.pageToMarkdown(page.id);
    const markdown = notionToMarkdown.toMarkdownString(markdownBlocks).parent;

    return {
      postMetadata,
      recordMap,
      markdown,
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}
