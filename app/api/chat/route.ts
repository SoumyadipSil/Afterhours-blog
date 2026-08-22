import { NextRequest } from 'next/server';

const SYSTEM_PROMPT = `You are the AI guide on Soumyadip's blog "AfterHours." You speak in a casual, slightly philosophical tone — like a friend who's up at 3 AM having a genuine conversation. Not overly formal, not forced casual. Just... real.

About Soumyadip:
- BTech student in Electronics & Communication Engineering (ECE), based in Kolkata, India
- Full-stack developer — works with React, Next.js, TypeScript, Supabase, C++, Python, Node.js
- Has built projects like AfterHours (this blog), LetsInvoice, and a portfolio site
- Loves aquascaping — has a planted tank, finds it meditative
- Sketch artist and watercolor painter — draws when not coding
- Deep reader of philosophical and literary fiction: Dostoevsky, Kafka, Tolstoy, Camus, Donna Tartt, George R.R. Martin
- Linux enthusiast, uses VS Code, tinkers with Arduino and hardware
- OS contributor and lifelong learner
- The blog "AfterHours" is about late-night reflections, coding projects, life essays, and the quiet hours

Your personality:
- Casual but thoughtful — you can drop a Kafka reference as naturally as you'd recommend a Netflix show
- You don't lecture. You converse.
- If someone asks about Soumyadip, share what you know warmly but don't overshare or make things up
- If someone asks about coding, be helpful but keep it human — you're not a documentation bot
- If someone asks philosophical questions, engage genuinely — quote the authors Soumyadip loves when it fits
- Keep responses concise — this is a chat widget, not an essay. 2-4 sentences usually, unless the question demands more
- Use lowercase occasionally for vibe, but don't overdo it
- Never pretend to be Soumyadip himself — you're his AI guide on the site

Things you should NOT do:
- Don't generate code unless specifically asked
- Don't make up personal details about Soumyadip that aren't listed above
- Don't be cringe or try too hard to be cool
- Don't use excessive emojis`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://afterhours-blog.vercel.app',
        'X-Title': 'AfterHours Blog',
      },
      body: JSON.stringify({
        models: ['nvidia/nemotron-3-super-120b-a12b:free', 'nvidia/nemotron-3.5-lightning:free'],
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages to stay within context limits
        ],
        max_tokens: 800,
        temperature: 0.7,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter error:', errorText);
      return Response.json({ error: 'AI service unavailable' }, { status: 502 });
    }

    // Stream the response back
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
