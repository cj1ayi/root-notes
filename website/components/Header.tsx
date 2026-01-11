import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-2xl">🔒</div>
          <div>
            <h1 className="text-xl font-bold text-[var(--color-accent-pink)] glow-text group-hover:text-[var(--color-accent-purple)] transition-colors">
              root@notes
            </h1>
            <p className="text-xs text-[var(--color-terminal-muted)]">Cybersecurity Knowledge Base</p>
          </div>
        </Link>
        
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="text-[var(--color-terminal-text)] hover:text-[var(--color-accent-pink)] transition-colors">
            Notes
          </Link>
        </nav>
      </div>
    </header>
  );
}