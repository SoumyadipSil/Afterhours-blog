'use client';
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';

// Optionally, you can import additional CSS for specific blocks:
// import 'prismjs/themes/prism-tomorrow.css' // for code blocks
// import 'katex/dist/katex.min.css' // for math

interface NotionPageRendererProps {
  recordMap: any;
}

export default function NotionPageRenderer({ recordMap }: NotionPageRendererProps) {
  return (
    <div className="notion-custom-theme">
      <NotionRenderer 
        recordMap={recordMap} 
        fullPage={false} 
        darkMode={true} 
      />
    </div>
  );
}
