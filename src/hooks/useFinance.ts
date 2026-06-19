import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { createId, isSameMonth } from "@/lib/utils";
import { seedTransactions } from "@/data/seed";
import type { Transaction } from "@/types";

export type TransactionInput = Omit<Transaction, "id">;

/**
 * Hook que gere os movimentos financeiros e calcula o resumo do mês.
 */
export function useFinance() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.transactions,
    seedTransactions(),
  );

  function addTransaction(input: TransactionInput) {
    const tx: Transaction = { ...input, id: createId() };
    setTransactions((prev) => [tx, ...prev]);
  }

  function updateTransaction(id: string, patch: Partial<TransactionInput>) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }

  function removeTransaction(id: string) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  // Movimentos ordenados por data (mais recentes primeiro).
  const sorted = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)),
    [transactions],
  );

  // Resumo do mês atual: receitas, despesas e saldo.
  const monthSummary = useMemo(() => {
    const thisMonth = transactions.filter((t) => isSameMonth(t.date));
    const income = thisMonth
      .filter((t) => t.type === "receita")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = thisMonth
      .filter((t) => t.type === "despesa")
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return {
    transactions: sorted,
    monthSummary,
    addTransaction,
    updateTransaction,
    removeTransaction,
  };
}
