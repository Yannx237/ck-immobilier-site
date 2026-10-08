import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

const control = (invalid?: boolean) =>
  cn(
    'w-full rounded-lg border bg-mist px-3.5 text-[15px] text-ink placeholder:text-muted/70',
    'transition-colors focus:bg-white focus:outline-none focus:ring-2',
    invalid ? 'border-red-500 focus:ring-red-500/25' : 'border-transparent focus:border-cobalt focus:ring-cobalt/20',
  );

interface FieldProps {
  id: string;
  label: ReactNode;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const Field = ({ id, label, error, hint, className, children }: FieldProps) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    <label htmlFor={id} className="text-sm font-medium text-ink">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="text-sm text-red-600">
        {error}
      </p>
    ) : (
      hint && <p className="text-sm text-muted">{hint}</p>
    )}
  </div>
);

type Invalid = { invalid?: boolean };

export const TextInput = ({ className, invalid, ...rest }: InputHTMLAttributes<HTMLInputElement> & Invalid) => (
  <input
    className={cn(control(invalid), 'h-11', className)}
    aria-invalid={invalid || undefined}
    aria-describedby={invalid && rest.id ? `${rest.id}-error` : undefined}
    {...rest}
  />
);

export const TextArea = ({ className, invalid, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & Invalid) => (
  <textarea className={cn(control(invalid), 'min-h-32 py-3', className)} aria-invalid={invalid || undefined} {...rest} />
);

export const Select = ({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <div className="relative">
    <select className={cn(control(), 'h-11 appearance-none pr-10', className)} {...rest}>
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
  </div>
);
