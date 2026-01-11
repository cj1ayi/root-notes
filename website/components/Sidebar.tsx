import Link from 'next/link';

interface SidebarProps {
  categories: string[];
}

export default function Sidebar({ categories }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)]/30 p-6 min-h-screen hidden md:block">
      <div className="sticky top-24">
        <h2 className="text-sm font-semibold text-[var(--color-accent-pink)] uppercase mb-4 tracking-wider">
          &gt; Categories
        </h2>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className="block text-[var(--color-terminal-text)] hover:text-[var(--color-accent-purple)] hover:translate-x-1 transition-all py-1"
            >
              <span className="text-[var(--color-accent-pink)] mr-2">›</span>
              All Notes
            </Link>
          </li>
          {categories.map(category => (
            <li key={category}>
              <Link 
                href={`/?category=${encodeURIComponent(category)}`}
                className="block text-[var(--color-terminal-text)] hover:text-[var(--color-accent-purple)] hover:translate-x-1 transition-all py-1"
              >
                <span className="text-[var(--color-accent-pink)] mr-2">›</span>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}