import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testOpenRouter() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error('No OPENROUTER_API_KEY found in .env.local');
    return;
  }

  const model = 'google/gemma-4-31b-it:free';
  console.log(`Testing model: ${model}`);

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: 'Say hello' }],
      })
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`HTTP ${res.status}:`, text);
    } else {
      const data = await res.json();
      console.log('Success:', data.choices[0].message.content);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

testOpenRouter();
