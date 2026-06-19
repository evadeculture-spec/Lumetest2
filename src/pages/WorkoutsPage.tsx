import { useState } from "react";
import { Plus, Dumbbell, Clock, Flame } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { WorkoutItem } from "@/components/workouts/WorkoutItem";
import { WorkoutForm } from "@/components/workouts/WorkoutForm";
import { useAppData } from "@/store/AppData";
import type { Workout } from "@/types";

export function WorkoutsPage() {
  const { workouts } = useAppData();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Workout | null>(null);

  const { count, minutes, calories } = workouts.weekSummary;

  const summaryCards = [
    { label: "Treinos esta semana", value: String(count), icon: Dumbbell },
    { label: "Minutos", value: String(minutes), icon: Clock },
    { label: "Calorias", value: String(calories), icon: Flame },
  ];

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(workout: Workout) {
    setEditing(workout);
    setOpen(true);
  }

  return (
    <>
      <PageHeader
        title="Treinos"
        subtitle="Resumo da semana"
        action={
          <Button onClick={openCreate}>
            <Plus size={18} /> Novo treino
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaryCards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-lilac-soft text-lilac">
              <c.icon size={18} />
            </div>
            <p className="text-sm text-muted">{c.label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-ink">
              {c.value}
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {workouts.workouts.length === 0 ? (
            <EmptyState
              icon={Dumbbell}
              title="Sem treinos"
              description="Regista o teu primeiro treino para começares o histórico."
            />
          ) : (
            <div className="divide-y divide-line/60">
              {workouts.workouts.map((workout) => (
                <WorkoutItem
                  key={workout.id}
                  workout={workout}
                  onEdit={openEdit}
                  onRemove={workouts.removeWorkout}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Editar treino" : "Novo treino"}
      >
        <WorkoutForm
          initial={editing ?? undefined}
          onCancel={() => setOpen(false)}
          onSubmit={(input) => {
            if (editing) workouts.updateWorkout(editing.id, input);
            else workouts.addWorkout(input);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
