import type { ReactNode } from 'react';
import type { PageKey } from '@/types';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
  children: ReactNode;
}

/** Estrutura geral: sidebar + conteúdo + navegação inferior no mobile */
export function AppLayout({ current, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar current={current} onNavigate={onNavigate} />

      <div className="flex flex-1 flex-col">
        {/* Cabeçalho só no mobile (a sidebar já mostra a marca no desktop) */}
        <header className="flex items-center justify-between px-5 py-4 md:hidden">
          <span className="text-xl font-semibold text-ink font-display">Lumé</span>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 pt-2 md:px-8 md:pb-10 md:pt-8">
          {children}
        </main>
      </div>

      <BottomNav current={current} onNavigate={onNavigate} />
    </div>
  );
}
