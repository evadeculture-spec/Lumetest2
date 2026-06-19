import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import type { PageId } from "./navigation";

interface AppLayoutProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
}

/** Estrutura principal: sidebar (desktop) + conteúdo + nav inferior (mobile). */
export function AppLayout({ current, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar current={current} onNavigate={onNavigate} />

      <main className="flex-1 overflow-x-hidden">
        {/* Cabeçalho da marca, só visível no telemóvel. */}
        <div className="flex items-center gap-2 px-5 pt-6 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose font-display text-white">
            L
          </div>
          <span className="font-display text-xl text-ink">Lumé</span>
        </div>

        <div className="mx-auto max-w-5xl px-5 pb-28 pt-6 md:px-10 md:pb-12 md:pt-10">
          {children}
        </div>
      </main>

      <MobileNav current={current} onNavigate={onNavigate} />
    </div>
  );
}
