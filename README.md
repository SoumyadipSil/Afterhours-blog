# Personal Blog + AI Assistant

A personal blog with **Life** and **Coding** posts, owner-only writing, visitor reactions and moderated comments, and a visitor-facing AI assistant with RAG over published content.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS**
- **Supabase** (PostgreSQL, Auth, Storage, pgvector)
- **NextAuth.js**
- **OpenRouter / Anthropic** + embeddings for the assistant

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values as you add features
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Route structure

```
app/
  (public)/          # visitor-facing pages
    page.tsx         # home
    blog/            # list + [slug]
    about/
  (admin)/           # owner only (auth in step 4)
    dashboard/
    write/           # create + [id] edit
  api/               # added in later steps
```

## Build order

1. Scaffold (this step)
2. Database (Supabase schema)
3. Public read pages
4. Owner auth + write flow
5. Reactions
6. Comments + moderation
7. AI assistant (phase 1 — chat UI)
8. AI assistant (phase 2 — RAG)
9. Design pass
10. SEO + polish

## Deploy

Push to GitHub and connect the repo in [Vercel](https://vercel.com/new). No env vars are required until step 2 (Supabase).
