import { useState } from 'react';
import { Plus, Dumbbell, Clock, Flame } from 'lucide-react';
import type { Workout } from '@/types';
import { useAppData } from '@/store/AppDataProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { WorkoutItem } from './WorkoutItem';
import { WorkoutForm } from './WorkoutForm';

export function WorkoutsPage() {
  const { workouts, addWorkout, updateWorkout, removeWorkout, weekSummary } =
    useAppData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Workout | null>(null);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (w: Workout) => {
    setEditing(w);
    setModalOpen(true);
  };

  return (
    <div className="animate-in">
      <PageHeader
        title="Treinos"
        subtitle="O teu histórico de movimento"
        action={
          <Button onClick={openNew} className="shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo treino</span>
          </Button>
        }
      />

      {/* Resumo da semana */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lilac-soft text-lilac">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Treinos esta semana</p>
            <p className="text-lg font-semibold text-ink">{weekSummary.count}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-soft text-sage">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Minutos totais</p>
            <p className="text-lg font-semibold text-ink">{weekSummary.totalMinutes}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted">Calorias estimadas</p>
            <p className="text-lg font-semibold text-ink">{weekSummary.totalCalories}</p>
          </div>
        </Card>
      </div>

      <h2 className="mb-3 text-lg font-semibold text-ink">Histórico</h2>

      {workouts.length === 0 ? (
        <EmptyState
          icon={Dumbbell}
          title="Sem treinos registados"
          description="Regista o teu primeiro treino e começa a acompanhar o progresso."
        />
      ) : (
        <div className="space-y-3">
          {workouts.map((w) => (
            <WorkoutItem
              key={w.id}
              workout={w}
              onEdit={openEdit}
              onRemove={removeWorkout}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar treino' : 'Novo treino'}
        onClose={() => setModalOpen(false)}
      >
        <WorkoutForm
          initial={editing ?? undefined}
          onCancel={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editing) {
              updateWorkout(editing.id, data);
            } else {
              addWorkout(data);
            }
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
