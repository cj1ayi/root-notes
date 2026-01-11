import { getAllNotes, getCategories } from '@/lib/notes';
import NoteCard from '@/components/NoteCard';
import Sidebar from '@/components/Sidebar';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const allNotes = getAllNotes();
  const categories = getCategories();
  
  // Filter notes by category if specified
  const notes = category 
    ? allNotes.filter(note => note.category === category)
    : allNotes;
  
  return (
    <div className="flex">
      <Sidebar categories={categories} />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--color-accent-pink)] glow-text mb-2">
              {category ? `> ${category}_` : '> All Notes_'}
            </h2>
            <p className="text-[var(--color-terminal-muted)]">
              {notes.length} note(s) available
            </p>
          </div>
          
          {notes.length === 0 ? (
            <div className="text-center py-16 text-[var(--color-terminal-muted)]">
              <p className="text-lg mb-2">No notes found</p>
              <p className="text-sm">
                {category 
                  ? `No notes in "${category}" category` 
                  : 'Create some .md files in your vault folder!'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map(note => (
                <NoteCard key={note.slug} {...note} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}