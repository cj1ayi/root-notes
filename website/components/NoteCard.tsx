import Link from 'next/link';
import { format } from 'date-fns';

interface NoteCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  category?: string;
}

export default function NoteCard({ slug, title, excerpt, date, tags, category }: NoteCardProps) {
  return (
    <Link href={`/notes/${slug}`}>
      <div className="card-hover bg-[var(--color-terminal-surface)] border border-[var(--color-terminal-border)] rounded-lg p-6 h-full flex flex-col">
        {category && (
          <div className="text-xs text-[var(--color-accent-cyan)] mb-2 font-semibold uppercase tracking-wider">
            [{category}]
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-[var(--color-accent-pink)] mb-2 line-clamp-2">
          {title}
        </h3>
        
        {date && (
          <p className="text-xs text-[var(--color-terminal-muted)] mb-3">
            {format(new Date(date), 'MMM dd, yyyy')}
          </p>
        )}
        
        {excerpt && (
          <p className="text-sm text-[var(--color-terminal-text)]/70 mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="text-xs bg-[var(--color-terminal-bg)]/50 text-[var(--color-accent-purple)] px-2 py-1 rounded border border-[var(--color-terminal-border)]"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-[var(--color-terminal-muted)]">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}