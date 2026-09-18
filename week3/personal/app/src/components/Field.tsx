import type { InputHTMLAttributes, ReactNode } from "react"

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function Field({ label, hint, id, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className="border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-accent"
        {...props}
      />
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  )
}

export function FieldShell({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </div>
  )
}
