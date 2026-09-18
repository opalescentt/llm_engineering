import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", key: "dash" },
  { to: "/new", label: "New interview", key: "new" },
  { to: "/settings", label: "Settings", key: "settings" },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex min-h-screen">
        <aside className="flex w-56 flex-none flex-col border-r border-line bg-surface">
          <div className="flex items-center gap-2 border-b border-line px-5 py-5">
            <span className="h-2.5 w-2.5 bg-accent" />
            <span className="font-mono text-sm font-semibold tracking-tight">debrief</span>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `border px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-line-strong bg-paper font-medium text-ink"
                      : "border-transparent text-muted hover:border-line hover:text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto border-t border-line px-5 py-4 text-xs text-muted">
            <p className="font-mono">v0.1.0</p>
            <p>Skeleton build</p>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  )
}
