import { Check, Pencil, Trash2, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn, formatDate } from "@/lib/utils";
import { PRIORITY_LABELS, PRIORITY_STYLES } from "@/lib/constants";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onRemove: (id: string) => void;
}

/** Uma linha de tarefa, com checkbox, etiquetas e ações. */
export function TaskItem({ task, onToggle, onEdit, onRemove }: TaskItemProps) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-cream/60">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Marcar como pendente" : "Concluir tarefa"}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          task.completed
            ? "border-sage bg-sage text-white"
            : "border-line hover:border-sage",
        )}
      >
        {task.completed && <Check size={13} strokeWidth={3} />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-medium text-ink",
            task.completed && "text-muted line-through",
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 truncate text-sm text-muted">{task.description}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className={PRIORITY_STYLES[task.priority]}>
            {PRIORITY_LABELS[task.priority]}
          </Badge>
          {task.category && <Badge>{task.category}</Badge>}
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Calendar size={13} /> {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          className="rounded-full p-2 text-muted hover:bg-white hover:text-ink"
          aria-label="Editar"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onRemove(task.id)}
          className="rounded-full p-2 text-muted hover:bg-rose-soft hover:text-rose"
          aria-label="Apagar"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
