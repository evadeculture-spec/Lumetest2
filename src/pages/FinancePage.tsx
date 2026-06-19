import { useState } from "react";
import { Plus, Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { FinanceSummary } from "@/components/finance/FinanceSummary";
import { TransactionItem } from "@/components/finance/TransactionItem";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { useAppData } from "@/store/AppData";
import type { Transaction } from "@/types";

export function FinancePage() {
  const { finance } = useAppData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(tx: Transaction) {
    setEditing(tx);
    setOpen(true);
  }

  return (
    <>
      <PageHeader
        title="Finanças"
        subtitle="Resumo do mês atual"
        action={
          <Button onClick={openCreate}>
            <Plus size={18} /> Novo movimento
          </Button>
        }
      />

      <div className="mb-6">
        <FinanceSummary
          income={finance.monthSummary.income}
          expense={finance.monthSummary.expense}
          balance={finance.monthSummary.balance}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movimentos</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {finance.transactions.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="Sem movimentos"
              description="Regista a tua primeira receita ou despesa."
            />
          ) : (
            <div className="divide-y divide-line/60">
              {finance.transactions.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  tx={tx}
                  onEdit={openEdit}
                  onRemove={finance.removeTransaction}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Editar movimento" : "Novo movimento"}
      >
        <TransactionForm
          initial={editing ?? undefined}
          onCancel={() => setOpen(false)}
          onSubmit={(input) => {
            if (editing) finance.updateTransaction(editing.id, input);
            else finance.addTransaction(input);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
