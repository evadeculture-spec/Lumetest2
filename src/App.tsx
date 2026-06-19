import { useState } from 'react';
import type { PageKey } from '@/types';
import { AppDataProvider } from '@/store/AppDataProvider';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { TasksPage } from '@/components/tasks/TasksPage';
import { FinancePage } from '@/components/finance/FinancePage';
import { WorkoutsPage } from '@/components/workouts/WorkoutsPage';
import { SettingsPage } from '@/components/settings/SettingsPage';

/**
 * Ponto central da app.
 * A navegação é feita por estado (simples e suficiente para o MVP).
 * No futuro, pode ser trocada por react-router sem afetar as páginas.
 */
export default function App() {
  const [page, setPage] = useState<PageKey>('dashboard');

  return (
    <AppDataProvider>
      <AppLayout current={page} onNavigate={setPage}>
        {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
        {page === 'tasks' && <TasksPage />}
        {page === 'finance' && <FinancePage />}
        {page === 'workouts' && <WorkoutsPage />}
        {page === 'settings' && <SettingsPage />}
      </AppLayout>
    </AppDataProvider>
  );
}
