import { useState, type FormEvent } from 'react';
import type { Task } from '@/types';
import type { TaskInput } from '@/hooks/useTasks';
import { PRIORITIES, TASK_CATEGORIES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Input, Label, Select, Textarea } from '@/components/ui/Field';

interface TaskFormProps {
  /** Quando presente, o formulário está em modo de edição */
  initial?: Task;
  onSubmit: (data: TaskInput) => void;
  onCancel: () => void;
}

/** Formulário partilhado para criar e editar tarefas */
export function TaskForm({ initial, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [priority, setPriority] = useState<Task['priority']>(
    initial?.priority ?? 'média',
  );
  const [category, setCategory] = useState(initial?.category ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category: category || undefined,
      dueDate: dueDate || undefined,
      completed: initial?.completed,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex.: Marcar consulta"
          autoFocus
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes da tarefa..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="priority">Prioridade</Label>
          <Select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Sem categoria</option>
            {TASK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="dueDate">Data limite (opcional)</Label>
        <Input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initial ? 'Guardar' : 'Adicionar tarefa'}</Button>
      </div>
    </form>
  );
}
