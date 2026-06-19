import {
  CheckCircle2,
  Circle,
  TrendingUp,
  TrendingDown,
  Wallet,
  Dumbbell,
  ListTodo,
  ArrowRight,
} from 'lucide-react';
import type { PageKey } from '@/types';
import { useAppData } from '@/store/AppDataProvider';
import {
  cn,
  formatCurrency,
  formatDateLong,
  formatDateShort,
  greeting,
} from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui/Card';
import { StatCard } from './StatCard';
import { WORKOUT_ICONS } from '@/components/workouts/workoutMeta';

interface DashboardProps {
  onNavigate: (page: PageKey) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { tasks, stats, transactions, monthSummary, workouts, weekSummary } =
    useAppData();

  const recentTasks = tasks.filter((t) => !t.completed).slice(0, 4);
  const recentTransactions = transactions.slice(0, 4);
  const recentWorkouts = workouts.slice(0, 3);

  return (
    <div className="animate-in space-y-6">
      {/* Saudação */}
      <header>
        <h1 className="text-2xl font-semibold text-ink md:text-3xl">
          {greeting()} 🌿
        </h1>
        <p className="mt-1 text-sm capitalize text-muted">
          {formatDateLong(new Date().toISOString())}
        </p>
      </header>

      {/* Estatísticas principais */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Circle}
          label="Tarefas pendentes"
          value={stats.pending}
          accent="rose"
        />
        <StatCard
          icon={CheckCircle2}
          label="Tarefas concluídas"
          value={stats.completed}
          accent="sage"
        />
        <StatCard
          icon={Wallet}
          label="Saldo do mês"
          value={formatCurrency(monthSummary.balance)}
          accent="lilac"
        />
        <StatCard
          icon={Dumbbell}
          label="Treinos esta semana"
          value={weekSummary.count}
          accent="gold"
        />
      </section>

      {/* Receitas e despesas do mês */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-sage">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-sm text-muted">Receitas do mês</span>
          </div>
          <span className="font-semibold text-ink">
            {formatCurrency(monthSummary.income)}
          </span>
        </Card>
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-soft text-rose">
              <TrendingDown className="h-5 w-5" />
            </div>
            <span className="text-sm text-muted">Despesas do mês</span>
          </div>
          <span className="font-semibold text-ink">
            {formatCurrency(monthSummary.expense)}
          </span>
        </Card>
      </section>

      {/* Listas recentes */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Últimas tarefas */}
        <Card>
          <SectionHeader
            title="Tarefas a fazer"
            onClick={() => onNavigate('tasks')}
          />
          {recentTasks.length === 0 ? (
            <EmptyRow icon={ListTodo} text="Tudo em dia ✨" />
          ) : (
            <ul className="space-y-3">
              {recentTasks.map((t) => (
                <li key={t.id} className="flex items-center gap-3">
                  <Circle className="h-4 w-4 shrink-0 text-rose" />
                  <span className="flex-1 truncate text-sm text-ink">{t.title}</span>
                  {t.dueDate && (
                    <span className="text-xs text-muted">
                      {formatDateShort(t.dueDate)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Últimos movimentos */}
        <Card>
          <SectionHeader
            title="Movimentos recentes"
            onClick={() => onNavigate('finance')}
          />
          {recentTransactions.length === 0 ? (
            <EmptyRow icon={Wallet} text="Sem movimentos ainda" />
          ) : (
            <ul className="space-y-3">
              {recentTransactions.map((tx) => (
                <li key={tx.id} className="flex items-center gap-3">
                  <span className="flex-1 truncate text-sm text-ink">
                    {tx.description || tx.category}
                  </span>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      tx.type === 'receita' ? 'text-sage' : 'text-ink',
                    )}
                  >
                    {tx.type === 'receita' ? '+' : '−'}
                    {formatCurrency(tx.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Últimos treinos */}
        <Card className="lg:col-span-2">
          <SectionHeader
            title="Treinos recentes"
            onClick={() => onNavigate('workouts')}
          />
          {recentWorkouts.length === 0 ? (
            <EmptyRow icon={Dumbbell} text="Sem treinos registados" />
          ) : (
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {recentWorkouts.map((w) => {
                const Icon = WORKOUT_ICONS[w.type];
                return (
                  <li
                    key={w.id}
                    className="flex items-center gap-3 rounded-xl bg-cream/60 p-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lilac-soft text-lilac">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium capitalize text-ink">
                        {w.type}
                      </p>
                      <p className="text-xs text-muted">
                        {w.durationMin} min · {formatDateShort(w.date)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </section>
    </div>
  );
}

/** Cabeçalho de cada cartão com link "ver tudo" */
function SectionHeader({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1 text-sm font-medium text-rose transition-opacity hover:opacity-80"
      >
        Ver tudo
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyRow({
  icon: Icon,
  text,
}: {
  icon: typeof ListTodo;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 py-2 text-sm text-muted">
      <Icon className="h-4 w-4" />
      {text}
    </div>
  );
}
