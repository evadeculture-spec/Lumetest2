import { Check, Pencil, Trash2, Calendar } from 'lucide-react';
import type { Task } from '@/types';
import { cn, formatDateShort } from '@/lib/utils';
import { PRIORITY_STYLES } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onRemove: (id: string) => void;
}

/** Uma linha de tarefa: checkbox, texto, etiquetas e ações */
export function TaskItem({ task, onToggle, onEdit, onRemove }: TaskItemProps) {
  return (
    <div className="group flex items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-shadow hover:shadow-card">
      {/* Checkbox redondo */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Marcar por concluir' : 'Marcar como concluída'}
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
          task.completed
            ? 'border-sage bg-sage text-white'
            : 'border-line hover:border-sage',
        )}
      >
        {task.completed && <Check className="h-4 w-4" />}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'font-medium text-ink',
            task.completed && 'text-muted line-through',
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 line-clamp-2 text-sm text-muted">{task.description}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority}</Badge>
          {task.category && <Badge>{task.category}</Badge>}
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {formatDateShort(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {/* Ações — sempre visíveis no toque, realçadas no hover */}
      <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
        <Button variant="ghost" size="icon" onClick={() => onEdit(task)} aria-label="Editar">
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(task.id)}
          aria-label="Apagar"
          className="text-muted hover:text-rose"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
