import { Clock, Flame, MapPin, Pencil, Trash2 } from 'lucide-react';
import type { Workout } from '@/types';
import { formatDateShort } from '@/lib/utils';
import { INTENSITY_STYLES } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { WORKOUT_ICONS } from './workoutMeta';

interface WorkoutItemProps {
  workout: Workout;
  onEdit: (w: Workout) => void;
  onRemove: (id: string) => void;
}

/** Uma linha do histórico de treinos */
export function WorkoutItem({ workout, onEdit, onRemove }: WorkoutItemProps) {
  const Icon = WORKOUT_ICONS[workout.type];

  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lilac-soft text-lilac">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium capitalize text-ink">{workout.type}</p>
          <Badge className={INTENSITY_STYLES[workout.intensity]}>
            {workout.intensity}
          </Badge>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {workout.durationMin} min
          </span>
          {workout.calories != null && (
            <span className="inline-flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" />
              {workout.calories} kcal
            </span>
          )}
          {workout.distanceKm != null && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {workout.distanceKm} km
            </span>
          )}
          <span>· {formatDateShort(workout.date)}</span>
        </div>

        {workout.notes && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted">{workout.notes}</p>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
        <Button variant="ghost" size="icon" onClick={() => onEdit(workout)} aria-label="Editar">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(workout.id)}
          aria-label="Apagar"
          className="text-muted hover:text-rose"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
