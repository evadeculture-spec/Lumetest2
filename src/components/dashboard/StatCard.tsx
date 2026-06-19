import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "rose" | "lilac" | "sage" | "gold";
}

const TONES: Record<NonNullable<StatCardProps["tone"]>, string> = {
  rose: "bg-rose-soft text-rose",
  lilac: "bg-lilac-soft text-lilac",
  sage: "bg-sage-soft text-sage",
  gold: "bg-gold-soft text-gold",
};

/** Cartão pequeno com um número-chave para o dashboard. */
export function StatCard({ label, value, icon: Icon, tone = "rose" }: StatCardProps) {
  return (
    <Card className="p-5">
      <div
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
          TONES[tone],
        )}
      >
        <Icon size={18} />
      </div>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{value}</p>
    </Card>
  );
}
