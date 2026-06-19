import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { today } from "@/lib/utils";
import { INTENSITIES, WORKOUT_TYPES } from "@/lib/constants";
import type { Intensity, Workout, WorkoutType } from "@/types";
import type { WorkoutInput } from "@/hooks/useWorkouts";

interface WorkoutFormProps {
  initial?: Workout;
  onSubmit: (input: WorkoutInput) => void;
  onCancel: () => void;
}

/** Formulário de criar/editar treino. */
export function WorkoutForm({ initial, onSubmit, onCancel }: WorkoutFormProps) {
  const [type, setType] = useState<WorkoutType>(initial?.type ?? "força");
  const [duration, setDuration] = useState(initial ? String(initial.duration) : "");
  const [intensity, setIntensity] = useState<Intensity>(initial?.intensity ?? "media");
  const [date, setDate] = useState(initial?.date ?? today());
  const [calories, setCalories] = useState(initial?.calories ? String(initial.calories) : "");
  const [distance, setDistance] = useState(initial?.distance ? String(initial.distance) : "");
  const [notes, setNotes] = useState(initial?.notes ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const dur = parseInt(duration, 10);
    if (Number.isNaN(dur) || dur <= 0) return;

    const cal = parseInt(calories, 10);
    const dist = parseFloat(distance.replace(",", "."));

    onSubmit({
      type,
      duration: dur,
      intensity,
      date,
      calories: Number.isNaN(cal) ? undefined : cal,
      distance: Number.isNaN(dist) ? undefined : dist,
      notes: notes.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="type">Tipo de treino</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as WorkoutType)}
          >
            {WORKOUT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="intensity">Intensidade</Label>
          <Select
            id="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value as Intensity)}
          >
            {INTENSITIES.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="duration">Duração (min)</Label>
          <Input
            id="duration"
            inputMode="numeric"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="calories">Calorias (opcional)</Label>
          <Input
            id="calories"
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
            inputMode="decimal"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
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
        <Button type="submit">{initial ? "Guardar" : "Adicionar"}</Button>
      </div>
    </form>
  );
}
