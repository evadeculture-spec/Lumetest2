import { useMemo } from 'react';
import type { Transaction } from '@/types';
import { STORAGE_KEYS } from '@/lib/storage';
import { isSameMonth, uid } from '@/lib/utils';
import { useLocalStorage } from './useLocalStorage';

export type TransactionInput = Omit<Transaction, 'id'>;

/**
 * Gere os movimentos financeiros e calcula o resumo mensal.
 */
export function useFinance() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.transactions,
    [],
  );

  const addTransaction = (input: TransactionInput) => {
    const tx: Transaction = { ...input, id: uid() };
    setTransactions((prev) => [tx, ...prev]);
  };

  const updateTransaction = (id: string, patch: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  };

  const removeTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Lista ordenada por data (mais recente primeiro).
  const sorted = useMemo(
    () =>
      [...transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [transactions],
  );

  // Resumo do mês atual.
  const monthSummary = useMemo(() => {
    const month = transactions.filter((t) => isSameMonth(t.date));
    const income = month
      .filter((t) => t.type === 'receita')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = month
      .filter((t) => t.type === 'despesa')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return {
    transactions: sorted,
    addTransaction,
    updateTransaction,
    removeTransaction,
    monthSummary,
  };
}
