import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-2xl border border-line bg-cream/40 px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-muted/70 transition-colors " +
  "focus:outline-none focus:border-rose/50 focus:bg-white focus:ring-2 focus:ring-rose/15";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldBase, "min-h-[88px] resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

/** Etiqueta de campo de formulário. */
export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-sm font-medium text-ink", className)}
      {...props}
    />
  );
}

/** Caixa de seleção (dropdown) com o mesmo estilo dos inputs. */
export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(fieldBase, "cursor-pointer appearance-none", className)}
    {...props}
  />
));
Select.displayName = "Select";
