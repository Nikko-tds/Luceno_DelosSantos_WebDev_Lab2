'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface PillProps {
  children: ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'muted';
}

export default function Pill({ children, onRemove, variant = 'default' }: PillProps) {
  const styles =
    variant === 'muted'
      ? 'bg-grey text-green'
      : 'bg-green text-white';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${styles}`}>
      {children}
      {onRemove ? (
        <X
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 transition hover:bg-white/50"
          aria-label="Remove"
        >
        </X>
      ) : null}
    </span>
  );
}
