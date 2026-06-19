import { useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { TaskItem } from "@/components/tasks/TaskItem";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useAppData } from "@/store/AppData";
import { cn } from "@/lib/utils";
import type { Task, TaskFilter } from "@/types";

const FILTERS: { value: TaskFilter; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "pendentes", label: "Pendentes" },
  { value: "concluidas", label: "Concluídas" },
];

export function TasksPage() {
  const { tasks } = useAppData();
  const [filter, setFilter] = useState<TaskFilter>("todas");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const list = tasks.filtered(filter);

  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    setOpen(true);
  }

  return (
    <>
      <PageHeader
        title="Tarefas"
        subtitle={`${tasks.stats.pending} pendentes · ${tasks.stats.completed} concluídas`}
        action={
          <Button onClick={openCreate}>
            <Plus size={18} /> Nova tarefa
          </Button>
        }
      />

      {/* Filtros */}
      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-ink text-white"
                : "bg-white text-muted border border-line hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card className="p-2">
        {list.length === 0 ? (
          <EmptyState
            icon={ListTodo}
            title="Sem tarefas aqui"
            description="Adiciona a tua primeira tarefa para começar."
          />
        ) : (
          <div className="divide-y divide-line/60">
            {list.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={tasks.toggleTask}
                onEdit={openEdit}
                onRemove={tasks.removeTask}
              />
            ))}
          </div>
        )}
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Editar tarefa" : "Nova tarefa"}
      >
        <TaskForm
          initial={editing ?? undefined}
          onCancel={() => setOpen(false)}
          onSubmit={(input) => {
            if (editing) tasks.updateTask(editing.id, input);
            else tasks.addTask(input);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
