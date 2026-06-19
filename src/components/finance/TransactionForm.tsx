import { useState, type FormEvent } from 'react';
import type { Transaction, TransactionType } from '@/types';
import type { TransactionInput } from '@/hooks/useFinance';
import { FINANCE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { todayISO } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input, Label, Select } from '@/components/ui/Field';
import { Segmented } from '@/components/ui/Segmented';

interface TransactionFormProps {
  initial?: Transaction;
  onSubmit: (data: TransactionInput) => void;
  onCancel: () => void;
}

/** Formulário partilhado para criar e editar movimentos financeiros */
export function TransactionForm({ initial, onSubmit, onCancel }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(initial?.type ?? 'despesa');
  const [amount, setAmount] = useState(initial ? String(initial.amount) : '');
  const [category, setCategory] = useState(initial?.category ?? FINANCE_CATEGORIES[0]);
  const [description, setDescription] = useState(initial?.description ?? '');
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [paymentMethod, setPaymentMethod] = useState(initial?.paymentMethod ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount.replace(',', '.'));
    if (!Number.isFinite(value) || value <= 0) return;
    onSubmit({
      type,
      amount: value,
      category,
      description: description.trim() || undefined,
      date,
      paymentMethod: paymentMethod || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Segmented
        className="w-full [&>button]:flex-1"
        value={type}
        onChange={setType}
        options={[
          { value: 'despesa', label: 'Despesa' },
          { value: 'receita', label: 'Receita' },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Valor (€)</Label>
          <Input
            id="amount"
            type="text"
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
        <Label htmlFor="category">Categoria</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {FINANCE_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: Compras no supermercado"
        />
      </div>

      <div>
        <Label htmlFor="paymentMethod">Método de pagamento (opcional)</Label>
        <Select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Não especificar</option>
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">{initial ? 'Guardar' : 'Adicionar movimento'}</Button>
      </div>
    </form>
  );
}
