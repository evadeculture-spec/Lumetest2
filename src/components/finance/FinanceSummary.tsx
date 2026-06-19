import { TrendingUp, TrendingDown, Scale } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn, formatCurrency } from "@/lib/utils";

interface FinanceSummaryProps {
  income: number;
  expense: number;
  balance: number;
}

/** Três cartões com o resumo do mês: receitas, despesas e saldo. */
export function FinanceSummary({ income, expense, balance }: FinanceSummaryProps) {
  const items = [
    {
      label: "Receitas",
      value: income,
      icon: TrendingUp,
      tone: "bg-sage-soft text-sage",
    },
    {
      label: "Despesas",
      value: expense,
      icon: TrendingDown,
      tone: "bg-rose-soft text-rose",
    },
    {
      label: "Saldo",
      value: balance,
      icon: Scale,
      tone: "bg-lilac-soft text-lilac",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <div
            className={cn(
              "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
              item.tone,
            )}
          >
            <item.icon size={18} />
          </div>
          <p className="text-sm text-muted">{item.label}</p>
          <p
            className={cn(
              "mt-1 text-2xl font-semibold tabular-nums text-ink",
              item.label === "Saldo" && balance < 0 && "text-rose",
            )}
          >
            {formatCurrency(item.value)}
          </p>
        </Card>
      ))}
    </div>
  );
}
