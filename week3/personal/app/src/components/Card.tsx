import type { HTMLAttributes, ReactNode } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div className={`border border-line bg-paper ${className}`} {...props}>
      {children}
    </div>
  )
}
