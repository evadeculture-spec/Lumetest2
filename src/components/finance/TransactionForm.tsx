import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select } from "@/components/ui/Input";
import { cn, today } from "@/lib/utils";
import { FINANCE_CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";
import type {
  FinanceCategory,
  PaymentMethod,
  Transaction,
  TransactionType,
} from "@/types";
import type { TransactionInput } from "@/hooks/useFinance";

interface TransactionFormProps {
  initial?: Transaction;
  onSubmit: (input: TransactionInput) => void;
  onCancel: () => void;
}

/** Formulário de criar/editar movimento (receita ou despesa). */
export function TransactionForm({ initial, onSubmit, onCancel }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initial?.type ?? "despesa");
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [category, setCategory] = useState<FinanceCategory>(
    initial?.category ?? "Alimentação",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date ?? today());
  const [method, setMethod] = useState<PaymentMethod | "">(initial?.method ?? "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = parseFloat(amount.replace(",", "."));
    if (!description.trim() || Number.isNaN(value) || value <= 0) return;
    onSubmit({
      type,
      amount: value,
      category,
      description: description.trim(),
      date,
      method: method || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Alternador receita/despesa */}
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-cream p-1">
        {(["despesa", "receita"] as TransactionType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={cn(
              "rounded-xl py-2 text-sm font-medium capitalize transition-colors",
              type === t
                ? t === "receita"
                  ? "bg-white text-sage shadow-sm"
                  : "bg-white text-rose shadow-sm"
                : "text-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="amount">Valor (€)</Label>
          <Input
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0,00"
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

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: Compras da semana"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as FinanceCategory)}
          >
            {FINANCE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="method">Método (opcional)</Label>
          <Select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value as PaymentMethod | "")}
          >
            <option value="">—</option>
            {PAYMENT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
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
