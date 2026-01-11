import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VAULT_PATH = path.join(process.cwd(), '../vault');

export interface Note {
  slug: string;
  title: string;
  content: string;
  date?: string;
  tags?: string[];
  category?: string;
  excerpt?: string;
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(VAULT_PATH)) {
    return [];
  }

  const files = getAllMarkdownFiles(VAULT_PATH);
  
const notes = files.map(filePath => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const slug = generateSlug(filePath);
  const excerpt = content.slice(0, 150).trim() + '...';
  
  // Extract category from first folder in path
  const relativePath = filePath.replace(VAULT_PATH, '').replace(/^[\\\/]/, '');
  const pathParts = relativePath.split(/[\\\/]/);
  const folderCategory = pathParts.length > 1 ? pathParts[0] : undefined;
  
  return {
    slug,
    title: data.title || getFileName(filePath),
    content: processObsidianLinks(content),
    date: data.date,
    tags: data.tags || [],
    category: data.category || folderCategory, // Use folder name as category
    excerpt,
  };
});

  return notes;
}

export function getNoteBySlug(slug: string): Note | null {
  const notes = getAllNotes();
  return notes.find(note => note.slug === slug) || null;
}

export function getCategories(): string[] {
  const notes = getAllNotes();
  const categories = notes
    .map(n => n.category)
    .filter(Boolean) as string[];
  return [...new Set(categories)];
}

function getAllMarkdownFiles(dir: string): string[] {
  let files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    if (item.startsWith('.')) continue;
    
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files = files.concat(getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function generateSlug(filePath: string): string {
  return filePath
    .replace(VAULT_PATH, '')
    .replace(/\.md$/, '')
    .replace(/^[\\\/]/, '')
    .replace(/[\\\/]/g, '-')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function getFileName(filePath: string): string {
  return path.basename(filePath, '.md');
}

function processObsidianLinks(content: string): string {
  return content.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (match, p1, p2, p3) => {
    const linkText = p3 || p1;
    const slug = p1.toLowerCase().replace(/\s+/g, '-');
    return `[${linkText}](/notes/${slug})`;
  });
}