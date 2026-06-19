import {
  LayoutDashboard,
  CheckSquare,
  Wallet,
  Dumbbell,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { PageKey } from '@/types';

export interface NavItem {
  key: PageKey;
  label: string;
  icon: LucideIcon;
}

// Fonte única para a sidebar e para a navegação inferior.
export const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Início', icon: LayoutDashboard },
  { key: 'tasks', label: 'Tarefas', icon: CheckSquare },
  { key: 'finance', label: 'Finanças', icon: Wallet },
  { key: 'workouts', label: 'Treinos', icon: Dumbbell },
  { key: 'settings', label: 'Definições', icon: Settings },
];
