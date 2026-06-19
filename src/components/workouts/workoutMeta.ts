import {
  Dumbbell,
  HeartPulse,
  Bike,
  Footprints,
  Flower2,
  Activity,
  type LucideIcon,
} from 'lucide-react';
import type { WorkoutType } from '@/types';

// Ícone associado a cada tipo de treino, para a lista ficar mais visual.
export const WORKOUT_ICONS: Record<WorkoutType, LucideIcon> = {
  força: Dumbbell,
  cardio: HeartPulse,
  ciclismo: Bike,
  caminhada: Footprints,
  pilates: Flower2,
  outro: Activity,
};
