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
        className={`rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700 transition-all focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
