import { cn } from '../../lib/cn';

interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
  label,
  size = 'md',
  className,
}: SegmentedControlProps<T>) => (
  <div role="radiogroup" aria-label={label} className={cn('flex gap-1 rounded-lg bg-mist p-1', className)}>
    {options.map((option) => {
      const active = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 rounded-md font-medium whitespace-nowrap transition-colors',
            size === 'sm' ? 'h-8 px-3 text-sm' : 'h-10 px-4 text-[15px]',
            active ? 'bg-white text-cobalt shadow-sm' : 'text-muted hover:text-ink',
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);
