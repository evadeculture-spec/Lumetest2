import { Clock, Flame, MapPin, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { WORKOUT_ICON_MAP } from "./workoutIcons";
import type { Intensity, Workout } from "@/types";

interface WorkoutItemProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
  onRemove: (id: string) => void;
}

const INTENSITY_STYLES: Record<Intensity, string> = {
  baixa: "bg-sage-soft text-sage",
  media: "bg-gold-soft text-gold",
  alta: "bg-rose-soft text-rose",
};

const INTENSITY_LABELS: Record<Intensity, string> = {
  baixa: "Intensidade baixa",
  media: "Intensidade média",
  alta: "Intensidade alta",
};

/** Uma linha de treino no histórico. */
export function WorkoutItem({ workout, onEdit, onRemove }: WorkoutItemProps) {
  const Icon = WORKOUT_ICON_MAP[workout.type];

  return (
    <div className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-cream/60">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac-soft text-lilac">
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium capitalize text-ink">{workout.type}</p>
          <span className="text-xs text-muted">{formatDate(workout.date)}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={13} /> {workout.duration} min
          </span>
          {workout.calories != null && (
            <span className="inline-flex items-center gap-1">
              <Flame size={13} /> {workout.calories} kcal
            </span>
          )}
          {workout.distance != null && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {workout.distance} km
            </span>
          )}
          <Badge className={INTENSITY_STYLES[workout.intensity]}>
            {INTENSITY_LABELS[workout.intensity]}
          </Badge>
        </div>
        {workout.notes && (
          <p className="mt-1.5 text-sm text-muted">{workout.notes}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(workout)}
          className="rounded-full p-2 text-muted hover:bg-white hover:text-ink"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onRemove(workout.id)}
          className="rounded-full p-2 text-muted hover:bg-rose-soft hover:text-rose"
          aria-label="Apagar"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
