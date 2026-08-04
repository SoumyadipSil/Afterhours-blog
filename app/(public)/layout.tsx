import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-zinc-200/80 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            AfterHours
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/blog" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
              Blog
            </Link>
            <Link href="/about" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50">
              About
            </Link>
          </div>
        </nav>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-zinc-200/80 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        AfterHours by Soumyadip
      </footer>
    </>
  );
}
