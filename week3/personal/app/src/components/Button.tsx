import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  children: ReactNode
}

const VARIANTS: Record<string, string> = {
  primary: "bg-accent text-accent-ink border-accent hover:opacity-90",
  secondary: "bg-paper text-ink border-line-strong hover:bg-surface",
  ghost: "bg-transparent text-ink border-transparent hover:bg-surface",
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
