# AfterHours Blog

A highly customized, immersive personal blog and portfolio platform built with Next.js. It features a seamless Notion CMS integration for frictionless writing, a bespoke design system, and an intelligent AI Guide trained on the author's personal persona.

## ✨ Features

- **Immersive Notion CMS**: Completely decoupled content management. Write your blogs in a private Notion workspace using all of Notion's native features (code blocks, toggles, images, callouts) and have them instantly and flawlessly rendered on the web via `react-notion-x`.
- **Personalized AI Guide**: An interactive AI chat widget integrated directly into the site. Powered by OpenRouter and Nemotron models, the assistant adopts the author's distinct voice—blending a casual tone with philosophical depth—to chat with visitors about technology, art, and literature.
- **Bespoke Glassmorphism Design**: A custom UI crafted with Tailwind CSS v4 featuring a floating pill navigation bar, intelligent dark/light mode switching (`next-themes`), and a refined typographic hierarchy utilizing JetBrains Mono.
- **Dynamic Category Routing**: Modular routing system that automatically filters and serves blogs across genres (e.g., Coding, Life, Movies, Book Reviews) based on Notion database properties.
- **High-Performance Edge Delivery**: Deployed on Vercel with intelligent Next.js cache revalidation, ensuring instant load times while keeping content dynamically synced with Notion.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **CMS Integration**: `@notionhq/client`, `react-notion-x`, `notion-client`
- **AI Integration**: OpenRouter API (`nvidia/nemotron-3-super-120b-a12b:free`)
- **Deployment**: Vercel

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SoumyadipSil/Afterhours-blog.git
cd Afterhours-blog
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your keys:

```env
# Notion CMS
NOTION_TOKEN=your_internal_integration_secret
NOTION_DATABASE_ID=your_notion_database_id

# AI Chat Widget
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Writing a Blog Post

This platform uses a Notion database as a headless CMS. To publish a new post:
1. Open your configured Notion database.
2. Create a new row and fill in the properties: `Name`, `Slug` (e.g., `my-post`), and `Category`.
3. Set the `Status` property to **Published**.
4. Write your content directly in the Notion page using any block types.
5. The post will automatically appear on the live site, perfectly rendered.

*(Note: The Notion page must be "Published to web" in Notion's share menu for the advanced blocks to render correctly).*

## 📄 License

MIT
