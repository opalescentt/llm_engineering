import { Link } from "react-router-dom"
import { mockInterviews } from "../data/mockInterviews"
import { StatusTag } from "../components/StatusTag"
import { Button } from "../components/Button"

function formatDuration(seconds: number) {
  if (!seconds) return "--:--"
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

const RECOMMENDATION_LABEL: Record<string, string> = {
  "strong-advance": "Strong advance",
  advance: "Advance",
  hold: "Hold",
  "no-advance": "No advance",
}

export function Dashboard() {
  const complete = mockInterviews.filter((i) => i.status === "complete").length
  const inProgress = mockInterviews.filter((i) => i.status === "transcribing" || i.status === "analyzing").length
  const avgDuration =
    mockInterviews.filter((i) => i.durationSeconds > 0).reduce((sum, i) => sum + i.durationSeconds, 0) /
    Math.max(1, mockInterviews.filter((i) => i.durationSeconds > 0).length)

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <div className="flex items-start justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Interviews</h1>
          <p className="mt-1 text-sm text-muted">Transcripts and generated insights across your pipeline</p>
        </div>
        <Link to="/new">
          <Button>New interview</Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <div className="px-1 py-5">
          <p className="font-mono text-3xl tabular-nums">{mockInterviews.length}</p>
          <p className="mt-1 text-sm text-muted">Total interviews</p>
        </div>
        <div className="px-6 py-5">
          <p className="whitespace-nowrap font-mono text-3xl tabular-nums">
            {complete} <span className="text-base text-muted">/ {inProgress} processing</span>
          </p>
          <p className="mt-1 text-sm text-muted">Complete vs. in progress</p>
        </div>
        <div className="px-6 py-5">
          <p className="font-mono text-3xl tabular-nums">{formatDuration(Math.round(avgDuration))}</p>
          <p className="mt-1 text-sm text-muted">Average length</p>
        </div>
      </div>

      <table className="mt-6 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line-strong text-left text-xs text-muted">
            <th className="py-2 pr-4 font-medium">Candidate</th>
            <th className="py-2 pr-4 font-medium">Role</th>
            <th className="py-2 pr-4 font-medium">Company</th>
            <th className="py-2 pr-4 font-medium">Interviewer</th>
            <th className="py-2 pr-4 font-medium">Date</th>
            <th className="py-2 pr-4 font-medium">Duration</th>
            <th className="py-2 pr-4 font-medium">Recommendation</th>
            <th className="py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockInterviews.map((interview) => (
            <tr key={interview.id} className="border-b border-line hover:bg-surface">
              <td className="py-3 pr-4">
                <Link to={`/interviews/${interview.id}`} className="font-medium text-ink hover:text-accent">
                  {interview.candidateName}
                </Link>
              </td>
              <td className="py-3 pr-4 text-muted">{interview.role}</td>
              <td className="py-3 pr-4 text-muted">{interview.company}</td>
              <td className="py-3 pr-4 text-muted">{interview.interviewer}</td>
              <td className="py-3 pr-4 font-mono text-muted">{formatDate(interview.createdAt)}</td>
              <td className="py-3 pr-4 font-mono text-muted">{formatDuration(interview.durationSeconds)}</td>
              <td className="py-3 pr-4 text-muted">
                {interview.insights ? RECOMMENDATION_LABEL[interview.insights.recommendation] : "--"}
              </td>
              <td className="py-3">
                <StatusTag status={interview.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
