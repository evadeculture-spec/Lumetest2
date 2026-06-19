import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS, type PageId } from "./navigation";

interface MobileNavProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

/** Barra de navegação inferior para telemóvel. */
export function MobileNav({ current, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 backdrop-blur md:hidden">
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {MOBILE_NAV_ITEMS.map((item) => {
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                active ? "text-rose" : "text-muted",
              )}
            >
              <item.icon size={22} />
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
