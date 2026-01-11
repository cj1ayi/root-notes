'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()}
      className="text-[var(--color-accent-purple)] hover:text-[var(--color-accent-pink)] transition-colors flex items-center gap-2 group"
    >
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      <span>Back</span>
    </button>
  );
}