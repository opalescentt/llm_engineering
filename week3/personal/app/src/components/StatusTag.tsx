import type { InterviewStatus } from "../types"

const STYLES: Record<InterviewStatus, string> = {
  queued: "text-muted border-line",
  transcribing: "text-ink border-line-strong",
  analyzing: "text-ink border-line-strong",
  complete: "text-ok border-ok",
  failed: "text-warn border-warn",
}

const LABELS: Record<InterviewStatus, string> = {
  queued: "Queued",
  transcribing: "Transcribing",
  analyzing: "Analyzing",
  complete: "Complete",
  failed: "Failed",
}

export function StatusTag({ status }: { status: InterviewStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2 py-0.5 text-xs font-mono ${STYLES[status]}`}
    >
      {(status === "transcribing" || status === "analyzing") && (
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
      )}
      {LABELS[status]}
    </span>
  )
}
