'use client';

import { SelectHTMLAttributes } from 'react';

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export default function Dropdown({
  label,
  options,
  className = '',
  ...props
}: DropdownProps) {
  return (
    <div className="flex flex-col gap-1 mt-1">
      {label ? <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label> : null}
      <select
        className={`rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900 ${className}`.trim()}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
