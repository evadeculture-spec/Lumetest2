import type { Task, Transaction, Workout } from '@/types';
import { uid } from '@/lib/utils';

// Dados demo para a app não abrir vazia na primeira utilização.
// As datas são calculadas a partir de "hoje" para parecerem sempre atuais.

const iso = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

export const seedTasks: Task[] = [
  {
    id: uid(),
    title: 'Planear a semana',
    description: 'Rever objetivos e marcar prioridades.',
    priority: 'alta',
    category: 'Pessoal',
    dueDate: iso(0),
    completed: false,
    createdAt: iso(-1),
  },
  {
    id: uid(),
    title: 'Comprar prendas de aniversário',
    priority: 'média',
    category: 'Compras',
    dueDate: iso(3),
    completed: false,
    createdAt: iso(-2),
  },
  {
    id: uid(),
    title: 'Responder a emails do trabalho',
    priority: 'média',
    category: 'Trabalho',
    completed: true,
    createdAt: iso(-1),
  },
  {
    id: uid(),
    title: 'Marcar consulta',
    priority: 'baixa',
    category: 'Saúde',
    completed: false,
    createdAt: iso(-3),
  },
];

export const seedTransactions: Transaction[] = [
  {
    id: uid(),
    type: 'receita',
    amount: 1450,
    category: 'Trabalho',
    description: 'Salário',
    date: iso(-10),
    paymentMethod: 'Transferência',
  },
  {
    id: uid(),
    type: 'despesa',
    amount: 42.5,
    category: 'Alimentação',
    description: 'Compras no supermercado',
    date: iso(-2),
    paymentMethod: 'Cartão',
  },
  {
    id: uid(),
    type: 'despesa',
    amount: 12.9,
    category: 'Lazer',
    description: 'Cinema',
    date: iso(-1),
    paymentMethod: 'MB Way',
  },
  {
    id: uid(),
    type: 'despesa',
    amount: 60,
    category: 'Casa',
    description: 'Internet',
    date: iso(-5),
    paymentMethod: 'Cartão',
  },
];

export const seedWorkouts: Workout[] = [
  {
    id: uid(),
    type: 'pilates',
    durationMin: 50,
    intensity: 'média',
    notes: 'Aula de manhã, foco no core.',
    date: iso(-1),
    calories: 220,
  },
  {
    id: uid(),
    type: 'caminhada',
    durationMin: 40,
    intensity: 'baixa',
    date: iso(-2),
    calories: 180,
    distanceKm: 4.2,
  },
  {
    id: uid(),
    type: 'força',
    durationMin: 55,
    intensity: 'alta',
    notes: 'Treino de pernas.',
    date: iso(-4),
    calories: 310,
  },
];
