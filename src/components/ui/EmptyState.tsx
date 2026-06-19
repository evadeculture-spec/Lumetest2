import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

/** Mensagem amigável para quando uma lista está vazia. */
export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-muted">
        <Icon size={26} />
      </div>
      <div>
        <p className="font-medium text-ink">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
