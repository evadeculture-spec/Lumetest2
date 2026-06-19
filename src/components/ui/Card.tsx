import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Cartão branco arredondado com sombra suave — a base visual da app */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-line bg-white p-5 shadow-soft',
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-lg font-semibold text-ink', className)} {...props} />
  );
}
