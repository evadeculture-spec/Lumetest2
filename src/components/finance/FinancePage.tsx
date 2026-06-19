import { useState } from 'react';
import { Plus, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import type { Transaction } from '@/types';
import { useAppData } from '@/store/AppDataProvider';
import { cn, formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { TransactionItem } from './TransactionItem';
import { TransactionForm } from './TransactionForm';

export function FinancePage() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    monthSummary,
  } = useAppData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (tx: Transaction) => {
    setEditing(tx);
    setModalOpen(true);
  };

  return (
    <div className="animate-in">
      <PageHeader
        title="Finanças"
        subtitle="Acompanha receitas e despesas"
        action={
          <Button onClick={openNew} className="shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo movimento</span>
          </Button>
        }
      />

      {/* Resumo do mês */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-sage">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Receitas do mês</p>
            <p className="text-lg font-semibold text-ink">
              {formatCurrency(monthSummary.income)}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft text-rose">
            <TrendingDown className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Despesas do mês</p>
            <p className="text-lg font-semibold text-ink">
              {formatCurrency(monthSummary.expense)}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lilac-soft text-lilac">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Saldo do mês</p>
            <p
              className={cn(
                'text-lg font-semibold',
                monthSummary.balance >= 0 ? 'text-sage' : 'text-rose',
              )}
            >
              {formatCurrency(monthSummary.balance)}
            </p>
          </div>
        </Card>
      </div>

      <h2 className="mb-3 text-lg font-semibold text-ink">Movimentos</h2>

      {transactions.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Sem movimentos"
          description="Regista a tua primeira receita ou despesa."
        />
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              onEdit={openEdit}
              onRemove={removeTransaction}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar movimento' : 'Novo movimento'}
        onClose={() => setModalOpen(false)}
      >
        <TransactionForm
          initial={editing ?? undefined}
          onCancel={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editing) {
              updateTransaction(editing.id, data);
            } else {
              addTransaction(data);
            }
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
