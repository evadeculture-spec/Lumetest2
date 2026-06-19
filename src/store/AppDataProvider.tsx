import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useFinance } from '@/hooks/useFinance';
import { useWorkouts } from '@/hooks/useWorkouts';
import { STORAGE_KEYS, clearAllStorage, loadFromStorage, saveToStorage } from '@/lib/storage';
import { seedTasks, seedTransactions, seedWorkouts } from '@/data/seed';

// Reúne os três hooks de dados num só sítio, para que todas as páginas
// partilhem exatamente o mesmo estado (uma única fonte de verdade).

type AppData = ReturnType<typeof useTasks> &
  ReturnType<typeof useFinance> &
  ReturnType<typeof useWorkouts> & {
    resetDemoData: () => void;
    clearData: () => void;
  };

const AppDataContext = createContext<AppData | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const tasks = useTasks();
  const finance = useFinance();
  const workouts = useWorkouts();

  // Na primeiríssima abertura, carrega dados demo para a app não estar vazia.
  useEffect(() => {
    const alreadySeeded = loadFromStorage(STORAGE_KEYS.seeded, false);
    const isEmpty =
      tasks.tasks.length === 0 &&
      finance.transactions.length === 0 &&
      workouts.workouts.length === 0;

    if (!alreadySeeded && isEmpty) {
      seedTasks.forEach(tasks.addTask);
      seedTransactions.forEach(finance.addTransaction);
      seedWorkouts.forEach(workouts.addWorkout);
      saveToStorage(STORAGE_KEYS.seeded, true);
    }
    // Executar apenas uma vez no arranque.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetDemoData = () => {
    clearAllStorage();
    window.location.reload();
  };

  const clearData = () => {
    clearAllStorage();
    saveToStorage(STORAGE_KEYS.seeded, true); // evita voltar a semear
    window.location.reload();
  };

  const value: AppData = {
    ...tasks,
    ...finance,
    ...workouts,
    resetDemoData,
    clearData,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

/** Acede aos dados e ações da app a partir de qualquer componente */
export function useAppData(): AppData {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData tem de ser usado dentro de <AppDataProvider>');
  }
  return ctx;
}
