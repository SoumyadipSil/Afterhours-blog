import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg-surface flex flex-col">
      <header className="border-b border-border bg-bg-elevated px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-heading text-xl text-text-primary hover:text-accent-amber transition-colors">
            AfterHours
          </Link>
          <span className="text-border">/</span>
          <p className="text-sm font-medium text-accent-amber uppercase tracking-wider">
            Admin Workspace
          </p>
        </div>
        <div className="text-xs text-text-tertiary">
          Secure Zone
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
