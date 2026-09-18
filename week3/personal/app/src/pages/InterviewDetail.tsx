import { Link, useParams } from "react-router-dom"
import { mockInterviews } from "../data/mockInterviews"
import { StatusTag } from "../components/StatusTag"
import { Card } from "../components/Card"
import { Button } from "../components/Button"

function formatTimestamp(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

const RECOMMENDATION_LABEL: Record<string, string> = {
  "strong-advance": "Strong advance",
  advance: "Advance",
  hold: "Hold",
  "no-advance": "No advance",
}

export function InterviewDetail() {
  const { id } = useParams()
  const interview = mockInterviews.find((i) => i.id === id)

  if (!interview) {
    return (
      <div className="mx-auto max-w-5xl px-8 py-8">
        <p className="text-sm text-muted">Interview not found.</p>
        <Link to="/" className="mt-2 inline-block text-sm text-accent">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      <Link to="/" className="text-xs text-muted hover:text-ink">
        &larr; All interviews
      </Link>

      <div className="mt-3 flex items-start justify-between gap-6 border-b border-line pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{interview.candidateName}</h1>
          <p className="mt-1 text-sm text-muted">
            {interview.role} &middot; {interview.company} &middot; interviewed by {interview.interviewer}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusTag status={interview.status} />
          <Button variant="secondary">Export</Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_1fr] gap-8">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Transcript</h2>
            <span className="font-mono text-xs text-muted">{interview.audioFileName}</span>
          </div>

          <div className="mt-3 max-h-[560px] overflow-y-auto border border-line">
            {interview.transcript.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted">
                {interview.status === "queued" || interview.status === "transcribing"
                  ? "Transcript not ready yet."
                  : "No transcript available."}
              </p>
            ) : (
              <div className="divide-y divide-line">
                {interview.transcript.map((segment, idx) => (
                  <div key={idx} className="flex gap-4 px-4 py-3">
                    <span className="w-12 flex-none font-mono text-xs text-muted">
                      {formatTimestamp(segment.startSeconds)}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted">{segment.speaker}</p>
                      <p className="mt-0.5 text-sm leading-relaxed">{segment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium">Insights</h2>

          {!interview.insights ? (
            <Card className="mt-3 px-4 py-6">
              <p className="text-sm text-muted">Insights will appear once analysis finishes.</p>
            </Card>
          ) : (
            <div className="mt-3 flex flex-col gap-4">
              <Card className="px-5 py-4">
                <p className="text-xs font-medium text-muted">Recommendation</p>
                <p className="mt-1 font-mono text-lg">
                  {RECOMMENDATION_LABEL[interview.insights.recommendation]}
                </p>
              </Card>

              <Card className="px-5 py-4">
                <p className="text-xs font-medium text-muted">Summary</p>
                <p className="mt-2 text-sm leading-relaxed">{interview.insights.summary}</p>
              </Card>

              <Card className="px-5 py-4">
                <p className="text-xs font-medium text-muted">Strengths</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {interview.insights.strengths.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-ok">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="px-5 py-4">
                <p className="text-xs font-medium text-muted">Opportunities for improvement</p>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {interview.insights.improvementAreas.map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <span className="text-warn">-</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
