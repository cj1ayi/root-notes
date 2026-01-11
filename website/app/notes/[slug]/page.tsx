import { getAllNotes, getNoteBySlug } from '@/lib/notes';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import BackButton from '@/components/BackButton';
import { format } from 'date-fns';

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map(note => ({ slug: note.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  
  if (!note) {
    notFound();
  }
  
  const htmlContent = await markdownToHtml(note.content);
  
  return (
    <div className="min-h-screen">
      <div className="border-b border-[var(--color-terminal-border)] bg-[var(--color-terminal-surface)]/30 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <BackButton />
        </div>
      </div>
      
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12">
          {note.category && (
            <div className="text-sm text-[var(--color-accent-cyan)] mb-3 font-semibold uppercase tracking-wider">
              [{note.category}]
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-accent-pink)] glow-text mb-4">
            {note.title}
          </h1>
          
          {note.date && (
            <p className="text-[var(--color-terminal-muted)] mb-4">
              {format(new Date(note.date), 'MMMM dd, yyyy')}
            </p>
          )}
          
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-[var(--color-terminal-surface)] text-[var(--color-accent-purple)] px-3 py-1 rounded text-sm border border-[var(--color-terminal-border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}