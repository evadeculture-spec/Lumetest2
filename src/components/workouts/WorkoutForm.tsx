import { useState, type FormEvent } from 'react';
import type { Workout } from '@/types';
import type { WorkoutInput } from '@/hooks/useWorkouts';
import { INTENSITIES, WORKOUT_TYPES } from '@/lib/constants';
import { todayISO } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Field';

interface WorkoutFormProps {
  initial?: Workout;
  onSubmit: (data: WorkoutInput) => void;
  onCancel: () => void;
}

/** Formulário partilhado para criar e editar treinos */
export function WorkoutForm({ initial, onSubmit, onCancel }: WorkoutFormProps) {
  const [type, setType] = useState<Workout['type']>(initial?.type ?? 'força');
  const [durationMin, setDurationMin] = useState(
    initial ? String(initial.durationMin) : '',
  );
  const [intensity, setIntensity] = useState<Workout['intensity']>(
    initial?.intensity ?? 'média',
  );
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [calories, setCalories] = useState(
    initial?.calories ? String(initial.calories) : '',
  );
  const [distanceKm, setDistanceKm] = useState(
    initial?.distanceKm ? String(initial.distanceKm) : '',
  );
  const [notes, setNotes] = useState(initial?.notes ?? '');

  const toNumber = (v: string) => {
    const n = parseFloat(v.replace(',', '.'));
    return Number.isFinite(n) ? n : undefined;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const duration = toNumber(durationMin);
    if (!duration || duration <= 0) return;
    onSubmit({
      type,
      durationMin: duration,
      intensity,
      date,
      calories: toNumber(calories),
      distanceKm: toNumber(distanceKm),
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Tipo de treino</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as Workout['type'])}
          >
            {WORKOUT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="intensity">Intensidade</Label>
          <Select
            id="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value as Workout['intensity'])}
          >
            {INTENSITIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duração (min)</Label>
          <Input
            id="duration"
            type="text"
            inputMode="numeric"
            value={durationMin}
            onChange={(e) => setDurationMin(e.target.value)}
            placeholder="Ex.: 45"
            autoFocus
          />
        </div>
        <div>
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="calories">Calorias (opcional)</Label>
          <Input
            id="calories"
            type="text"
            inputMode="numeric"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Ex.: 250"
          />
        </div>
        <div>
          <Label htmlFor="distance">Distância km (opcional)</Label>
          <Input
            id="distance"
            type="text"
            inputMode="decimal"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            placeholder="Ex.: 5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notas (opcional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Como correu o treino?"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initial ? 'Guardar' : 'Adicionar treino'}</Button>
      </div>
    </form>
  );
}
