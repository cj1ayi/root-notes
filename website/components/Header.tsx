import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="border-b border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image 
            src="/heartlock.png" 
            alt="root@notes logo" 
            width={40} 
            height={40}
            className="group-hover:opacity-80 transition-opacity"
          />
          <div>
            <h1 className="text-xl font-bold text-[var(--color-accent-pink)] glow-text group-hover:text-[var(--color-accent-purple)] transition-colors">
              root@notes
            </h1>
            <p className="text-xs text-[var(--color-terminal-muted)]">nate&apos;s personal cybersecurity knowledge base</p>
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