import { cn } from "@/lib/utils";
import { NAV_ITEMS, type PageId } from "./navigation";

interface SidebarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

/** Barra lateral elegante para desktop e iPad. */
export function Sidebar({ current, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-cream/60 px-4 py-8 md:flex">
      <div className="mb-10 flex items-center gap-2.5 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose font-display text-lg text-white">
          L
        </div>
        <span className="font-display text-2xl text-ink">Lumé</span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:bg-white/60 hover:text-ink",
              )}
            >
              <item.icon
                size={19}
                className={active ? "text-rose" : "text-muted"}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <p className="mt-auto px-3 text-xs text-muted/70">
        Lumé · MVP local
      </p>
    </aside>
  );
}
