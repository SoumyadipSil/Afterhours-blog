'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages([...newMessages, { role: 'assistant', content: '' }]);

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  assistantContent += delta;
                  // Remove <think>...</think> blocks from the output
                  const displayContent = assistantContent.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim();
                  setMessages([...newMessages, { role: 'assistant', content: displayContent }]);
                }
              } catch {
                // Skip malformed chunks
              }
            }
          }
        }
      }

      // If no streaming content was received, try parsing as regular JSON
      if (!assistantContent) {
        setMessages([...newMessages, { role: 'assistant', content: 'hmm, i seem to be taking a nap. try again in a moment.' }]);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'something went wrong on my end. try again?' }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="glass rounded-3xl overflow-hidden border border-border flex flex-col" style={{ height: '480px' }}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 bg-bg-elevated rounded-lg flex items-center justify-center border border-border">
          <span className="text-sm">✦</span>
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-text-primary">AI Guide</h3>
          <p className="text-xs text-text-tertiary">ask me anything about soumyadip or the blog</p>
        </div>
        {isLoading && (
          <div className="ml-auto flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent-amber animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3">
            <span className="text-3xl">✦</span>
            <p className="text-text-secondary text-sm">
              hey, i&apos;m the afterhours guide.
            </p>
            <p className="text-text-tertiary text-xs max-w-xs">
              ask me about soumyadip, his projects, book recommendations, or just chat about life at 3 AM.
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {['who is soumyadip?', 'recommend a book', 'what is afterhours?'].map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-accent-amber text-bg-primary rounded-br-sm'
                  : 'bg-bg-surface text-text-primary rounded-bl-sm border border-border'
              }`}
            >
              {msg.content || (
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type something..."
            disabled={isLoading}
            className="flex-1 bg-bg-surface border border-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-amber transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full bg-accent-amber text-bg-primary flex items-center justify-center hover:shadow-lg hover:shadow-glow-amber transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
