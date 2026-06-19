import {
  Dumbbell,
  HeartPulse,
  Bike,
  Footprints,
  Flower2,
  Activity,
  type LucideIcon,
} from "lucide-react";
import type { WorkoutType } from "@/types";

/** Mapa de tipo de treino -> ícone lucide. */
export const WORKOUT_ICON_MAP: Record<WorkoutType, LucideIcon> = {
  força: Dumbbell,
  cardio: HeartPulse,
  ciclismo: Bike,
  caminhada: Footprints,
  pilates: Flower2,
  outro: Activity,
};
