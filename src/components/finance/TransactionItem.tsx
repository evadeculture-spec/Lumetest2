import { ArrowDownLeft, ArrowUpRight, Pencil, Trash2 } from 'lucide-react';
import type { Transaction } from '@/types';
import { cn, formatCurrency, formatDateShort } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (tx: Transaction) => void;
  onRemove: (id: string) => void;
}

/** Uma linha de movimento financeiro */
export function TransactionItem({ transaction, onEdit, onRemove }: TransactionItemProps) {
  const isIncome = transaction.type === 'receita';

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-shadow hover:shadow-card">
      <div
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          isIncome ? 'bg-sage-soft text-sage' : 'bg-rose-soft text-rose',
        )}
      >
        {isIncome ? (
          <ArrowUpRight className="h-5 w-5" />
        ) : (
          <ArrowDownLeft className="h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">
          {transaction.description || transaction.category}
        </p>
        <div className="mt-0.5 flex flex-wrap items-center gap-2">
          <Badge>{transaction.category}</Badge>
          <span className="text-xs text-muted">{formatDateShort(transaction.date)}</span>
          {transaction.paymentMethod && (
            <span className="text-xs text-muted">· {transaction.paymentMethod}</span>
          )}
        </div>
      </div>

      <span
        className={cn(
          'shrink-0 font-semibold',
          isIncome ? 'text-sage' : 'text-ink',
        )}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(transaction.amount)}
      </span>

      <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(transaction)}
          aria-label="Editar"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(transaction.id)}
          aria-label="Apagar"
          className="text-muted hover:text-rose"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
