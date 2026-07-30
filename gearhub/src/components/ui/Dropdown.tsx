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
    <div className="flex flex-col gap-1 mt-1 mr-1 lg:mr-0">
      {label ? <label className="text-xs font-semibold uppercase tracking-wider text-black">{label}</label> : null}
      <select
        className={`rounded-lg border border-green bg-offgrey px-3 py-2 text-sm text-black transition-all focus:outline-none focus:ring-2 focus:ring-green ${className}`.trim()}
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
