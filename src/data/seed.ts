/*
  Dados demo iniciais.
  Servem apenas para a app não abrir vazia na primeira utilização.
  As datas são calculadas em relação a hoje, para os resumos
  (semana/mês) já mostrarem algo interessante.
*/
import { createId } from "@/lib/utils";
import type { Task, Transaction, Workout } from "@/types";

/** Devolve uma data ISO curta com `offset` dias em relação a hoje. */
function daysFromNow(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export function seedTasks(): Task[] {
  const now = new Date().toISOString();
  return [
    {
      id: createId(),
      title: "Planear a semana",
      description: "Definir as 3 prioridades principais.",
      priority: "alta",
      category: "Pessoal",
      dueDate: daysFromNow(0),
      completed: false,
      createdAt: now,
    },
    {
      id: createId(),
      title: "Comprar mantimentos",
      priority: "media",
      category: "Casa",
      dueDate: daysFromNow(1),
      completed: false,
      createdAt: now,
    },
    {
      id: createId(),
      title: "Marcar consulta",
      priority: "baixa",
      category: "Saúde",
      completed: true,
      createdAt: now,
    },
  ];
}

export function seedTransactions(): Transaction[] {
  return [
    {
      id: createId(),
      type: "receita",
      amount: 1450,
      category: "Trabalho",
      description: "Salário",
      date: daysFromNow(-10),
      method: "Transferência",
    },
    {
      id: createId(),
      type: "despesa",
      amount: 38.9,
      category: "Alimentação",
      description: "Compras da semana",
      date: daysFromNow(-2),
      method: "MB Way",
    },
    {
      id: createId(),
      type: "despesa",
      amount: 24,
      category: "Lazer",
      description: "Cinema",
      date: daysFromNow(-1),
      method: "Cartão",
    },
  ];
}

export function seedWorkouts(): Workout[] {
  return [
    {
      id: createId(),
      type: "pilates",
      duration: 50,
      intensity: "media",
      notes: "Foco no core.",
      date: daysFromNow(-1),
      calories: 220,
    },
    {
      id: createId(),
      type: "caminhada",
      duration: 40,
      intensity: "baixa",
      date: daysFromNow(-3),
      calories: 180,
      distance: 4.2,
    },
  ];
}
