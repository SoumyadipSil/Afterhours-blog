'use client';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface NotionPageRendererProps {
  markdown: string;
}

export default function NotionPageRenderer({ markdown }: NotionPageRendererProps) {
  return (
    <div className="notion-custom-theme markdown-body">
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
