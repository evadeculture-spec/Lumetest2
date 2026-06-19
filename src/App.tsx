import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { AppDataProvider } from "@/store/AppData";
import { DashboardPage } from "@/pages/DashboardPage";
import { TasksPage } from "@/pages/TasksPage";
import { FinancePage } from "@/pages/FinancePage";
import { WorkoutsPage } from "@/pages/WorkoutsPage";
import { SettingsPage } from "@/pages/SettingsPage";
import type { PageId } from "@/components/layout/navigation";

/*
  Componente raiz.
  Navegação simples por estado (sem router) para manter o MVP leve.
  O AppDataProvider envolve tudo para partilhar os dados (tarefas,
  finanças e treinos) entre o dashboard e as páginas.
*/
export default function App() {
  const [page, setPage] = useState<PageId>("dashboard");

  return (
    <AppDataProvider>
      <AppLayout current={page} onNavigate={setPage}>
        {page === "dashboard" && <DashboardPage onNavigate={setPage} />}
        {page === "tasks" && <TasksPage />}
        {page === "finance" && <FinancePage />}
        {page === "workouts" && <WorkoutsPage />}
        {page === "settings" && <SettingsPage />}
      </AppLayout>
    </AppDataProvider>
  );
}
