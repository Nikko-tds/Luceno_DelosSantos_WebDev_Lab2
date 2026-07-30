'use client';

import { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'muted';
}

export default function Pill({ children, onRemove, variant = 'default' }: PillProps) {
  const styles =
    variant === 'muted'
      ? 'bg-slate-100 text-slate-700'
      : 'bg-slate-900 text-white';

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${styles}`}>
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-0.5 transition hover:bg-white/20"
          aria-label="Remove"
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
