import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "./components/GrainOverlay";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "AfterHours by Soumyadip",
    template: "%s · AfterHours",
  },
  description:
    "Late-night life reflections and coding projects by Soumyadip — with an AI guide through the site.",
};

// Anti-flash script: reads localStorage before paint to set the correct theme class
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('afterhours-theme');
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch(e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
