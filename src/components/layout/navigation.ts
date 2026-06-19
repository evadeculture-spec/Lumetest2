import {
  LayoutDashboard,
  ListTodo,
  Wallet,
  Dumbbell,
  Settings,
  type LucideIcon,
} from "lucide-react";

/** Identificadores de cada página (usados na navegação simples por estado). */
export type PageId = "dashboard" | "tasks" | "finance" | "workouts" | "settings";

export interface NavItem {
  id: PageId;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tarefas", icon: ListTodo },
  { id: "finance", label: "Finanças", icon: Wallet },
  { id: "workouts", label: "Treinos", icon: Dumbbell },
  { id: "settings", label: "Definições", icon: Settings },
];

/** Itens mostrados na barra inferior do telemóvel (sem Definições). */
export const MOBILE_NAV_ITEMS = NAV_ITEMS.filter((i) => i.id !== "settings");
