import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';

type Accent = 'rose' | 'lilac' | 'sage' | 'gold';

const ACCENTS: Record<Accent, string> = {
  rose: 'bg-rose-soft text-rose',
  lilac: 'bg-lilac-soft text-lilac',
  sage: 'bg-sage-soft text-sage',
  gold: 'bg-gold-soft text-gold',
};

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: Accent;
}

/** Cartão de estatística para o dashboard */
export function StatCard({ icon: Icon, label, value, accent = 'rose' }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      <div
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
          ACCENTS[accent],
        )}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted">{label}</p>
        <p className="text-xl font-semibold text-ink">{value}</p>
      </div>
    </Card>
  );
}
