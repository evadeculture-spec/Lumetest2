import type { PageKey } from '@/types';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './navigation';

interface BottomNavProps {
  current: PageKey;
  onNavigate: (page: PageKey) => void;
}

/** Navegação inferior — apenas no mobile */
export function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = current === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                active ? 'text-rose' : 'text-muted',
              )}
            >
              <Icon className={cn('h-5 w-5', active && 'scale-110')} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
