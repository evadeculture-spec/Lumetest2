import type { PageKey } from '@/types';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './navigation';

interface SidebarProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
}

/** Sidebar elegante — visível em tablet e desktop (escondida no mobile) */
export function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white/60 px-4 py-6 md:flex">
      <div className="mb-8 px-3">
        <h1 className="text-2xl font-semibold text-ink">Lumé</h1>
        <p className="text-sm text-muted">a tua vida, com clareza</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-rose-soft text-rose'
                  : 'text-muted hover:bg-cream hover:text-ink',
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          );
        })}
      </nav>

      <p className="px-3 text-xs text-muted/70">MVP local · v0.1</p>
    </aside>
  );
}
