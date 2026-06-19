import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { Transaction } from "@/types";

interface TransactionItemProps {
  tx: Transaction;
  onEdit: (tx: Transaction) => void;
  onRemove: (id: string) => void;
}

/** Uma linha de movimento financeiro. */
export function TransactionItem({ tx, onEdit, onRemove }: TransactionItemProps) {
  const isIncome = tx.type === "receita";
  return (
    <div className="group flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-cream/60">
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          isIncome ? "bg-sage-soft text-sage" : "bg-rose-soft text-rose",
        )}
      >
        {isIncome ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{tx.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge>{tx.category}</Badge>
          <span className="text-xs text-muted">{formatDate(tx.date)}</span>
          {tx.method && <span className="text-xs text-muted">· {tx.method}</span>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            "font-semibold tabular-nums",
            isIncome ? "text-sage" : "text-ink",
          )}
        >
          {isIncome ? "+" : "−"}
          {formatCurrency(tx.amount)}
        </span>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(tx)}
            className="rounded-full p-2 text-muted hover:bg-white hover:text-ink"
            aria-label="Editar"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onRemove(tx.id)}
            className="rounded-full p-2 text-muted hover:bg-rose-soft hover:text-rose"
            aria-label="Apagar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
