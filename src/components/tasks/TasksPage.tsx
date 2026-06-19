import { useMemo, useState } from 'react';
import { Plus, ListTodo } from 'lucide-react';
import type { Task } from '@/types';
import { useAppData } from '@/store/AppDataProvider';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { PageHeader } from '@/components/ui/PageHeader';
import { Segmented } from '@/components/ui/Segmented';
import { EmptyState } from '@/components/ui/EmptyState';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';

type Filter = 'todas' | 'pendentes' | 'concluídas';

export function TasksPage() {
  const { tasks, addTask, updateTask, toggleTask, removeTask } = useAppData();
  const [filter, setFilter] = useState<Filter>('todas');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'pendentes') return tasks.filter((t) => !t.completed);
    if (filter === 'concluídas') return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setModalOpen(true);
  };

  return (
    <div className="animate-in">
      <PageHeader
        title="Tarefas"
        subtitle="Organiza o que tens para fazer"
        action={
          <Button onClick={openNew} className="shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Nova tarefa</span>
          </Button>
        }
      />

      <Segmented
        className="mb-5"
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'todas', label: 'Todas' },
          { value: 'pendentes', label: 'Pendentes' },
          { value: 'concluídas', label: 'Concluídas' },
        ]}
      />

      {filtered.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="Sem tarefas aqui"
          description="Adiciona a tua primeira tarefa para começar."
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={openEdit}
              onRemove={removeTask}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? 'Editar tarefa' : 'Nova tarefa'}
        onClose={() => setModalOpen(false)}
      >
        <TaskForm
          initial={editing ?? undefined}
          onCancel={() => setModalOpen(false)}
          onSubmit={(data) => {
            if (editing) {
              updateTask(editing.id, data);
            } else {
              addTask(data);
            }
            setModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
