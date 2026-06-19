import { createContext, useContext, type ReactNode } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useFinance } from "@/hooks/useFinance";
import { useWorkouts } from "@/hooks/useWorkouts";

/*
  "Loja" central de dados.
  Em vez de cada página criar os seus próprios hooks (e ter cópias dos dados
  desalinhadas), criamos os hooks UMA vez aqui e partilhamo-los via Context.
  Assim, o Dashboard e as páginas vêem sempre os mesmos dados.
*/

type AppData = {
  tasks: ReturnType<typeof useTasks>;
  finance: ReturnType<typeof useFinance>;
  workouts: ReturnType<typeof useWorkouts>;
};

const AppDataContext = createContext<AppData | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const tasks = useTasks();
  const finance = useFinance();
  const workouts = useWorkouts();

  return (
    <AppDataContext.Provider value={{ tasks, finance, workouts }}>
      {children}
    </AppDataContext.Provider>
  );
}

/** Acesso aos dados da app. Tem de ser usado dentro de <AppDataProvider>. */
export function useAppData(): AppData {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error("useAppData tem de ser usado dentro de <AppDataProvider>");
  }
  return ctx;
}
