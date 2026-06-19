import {
  ListTodo,
  CheckCircle2,
  Wallet,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { WORKOUT_ICON_MAP } from "@/components/workouts/workoutIcons";
import { useAppData } from "@/store/AppData";
import {
  cn,
  formatCurrency,
  formatDate,
  greeting,
} from "@/lib/utils";
import { PRIORITY_STYLES, PRIORITY_LABELS } from "@/lib/constants";
import type { PageId } from "@/components/layout/navigation";

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { tasks, finance, workouts } = useAppData();

  const todayLabel = formatDate(new Date().toISOString(), {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const recentTasks = tasks.tasks.slice(0, 4);
  const recentTx = finance.transactions.slice(0, 4);
  const recentWorkouts = workouts.workouts.slice(0, 3);

  return (
    <>
      <PageHeader
        title={`${greeting()} ✨`}
        subtitle={todayLabel.charAt(0).toUpperCase() + todayLabel.slice(1)}
      />

      {/* Números-chave */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Tarefas pendentes"
          value={String(tasks.stats.pending)}
          icon={ListTodo}
          tone="rose"
        />
        <StatCard
          label="Tarefas concluídas"
          value={String(tasks.stats.completed)}
          icon={CheckCircle2}
          tone="sage"
        />
        <StatCard
          label="Saldo do mês"
          value={formatCurrency(finance.monthSummary.balance)}
          icon={Wallet}
          tone="lilac"
        />
        <StatCard
          label="Treinos na semana"
          value={String(workouts.weekSummary.count)}
          icon={Dumbbell}
          tone="gold"
        />
      </div>

      {/* Resumo financeiro do mês */}
      <Card className="mb-6 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <div>
              <p className="text-sm text-muted">Receitas do mês</p>
              <p className="text-xl font-semibold text-sage">
                {formatCurrency(finance.monthSummary.income)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted">Despesas do mês</p>
              <p className="text-xl font-semibold text-rose">
                {formatCurrency(finance.monthSummary.expense)}
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate("finance")}
            className="inline-flex items-center gap-1 text-sm font-medium text-lilac hover:underline"
          >
            Ver finanças <ArrowRight size={15} />
          </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Últimas tarefas */}
        <SectionCard
          title="Últimas tarefas"
          onSeeMore={() => onNavigate("tasks")}
          empty={recentTasks.length === 0 ? "Sem tarefas." : undefined}
        >
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 py-2.5">
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full",
                  task.completed ? "bg-sage" : "bg-rose",
                )}
              />
              <p
                className={cn(
                  "flex-1 truncate text-sm",
                  task.completed ? "text-muted line-through" : "text-ink",
                )}
              >
                {task.title}
              </p>
              <Badge className={PRIORITY_STYLES[task.priority]}>
                {PRIORITY_LABELS[task.priority]}
              </Badge>
            </div>
          ))}
        </SectionCard>

        {/* Últimos movimentos */}
        <SectionCard
          title="Últimos movimentos"
          onSeeMore={() => onNavigate("finance")}
          empty={recentTx.length === 0 ? "Sem movimentos." : undefined}
        >
          {recentTx.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 py-2.5">
              <p className="flex-1 truncate text-sm text-ink">{tx.description}</p>
              <span
                className={cn(
                  "text-sm font-semibold tabular-nums",
                  tx.type === "receita" ? "text-sage" : "text-ink",
                )}
              >
                {tx.type === "receita" ? "+" : "−"}
                {formatCurrency(tx.amount)}
              </span>
            </div>
          ))}
        </SectionCard>

        {/* Últimos treinos */}
        <SectionCard
          title="Últimos treinos"
          onSeeMore={() => onNavigate("workouts")}
          empty={recentWorkouts.length === 0 ? "Sem treinos." : undefined}
          className="lg:col-span-2"
        >
          {recentWorkouts.map((w) => {
            const Icon = WORKOUT_ICON_MAP[w.type];
            return (
              <div key={w.id} className="flex items-center gap-3 py-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-lilac-soft text-lilac">
                  <Icon size={15} />
                </span>
                <p className="flex-1 truncate text-sm capitalize text-ink">
                  {w.type}
                </p>
                <span className="text-sm text-muted">{w.duration} min</span>
                <span className="text-xs text-muted">{formatDate(w.date)}</span>
              </div>
            );
          })}
        </SectionCard>
      </div>
    </>
  );
}

/** Cartão de secção reutilizável no dashboard (título + "ver mais"). */
function SectionCard({
  title,
  onSeeMore,
  empty,
  children,
  className,
}: {
  title: string;
  onSeeMore: () => void;
  empty?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <button
          onClick={onSeeMore}
          className="inline-flex items-center gap-1 text-sm font-medium text-lilac hover:underline"
        >
          Ver mais <ArrowRight size={14} />
        </button>
      </CardHeader>
      <CardContent className="pt-2">
        {empty ? (
          <p className="py-4 text-sm text-muted">{empty}</p>
        ) : (
          <div className="divide-y divide-line/60">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
