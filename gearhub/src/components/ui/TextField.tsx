'use client';

import { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextField({ label, className = '', ...props }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      {label ? <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label> : null}
      <input
        className={`rounded-lg border border-green bg-offwhite px-3 py-2 text-sm text-green transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-green ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
