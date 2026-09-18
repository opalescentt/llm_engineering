export type InterviewStatus = "queued" | "transcribing" | "analyzing" | "complete" | "failed"

export interface TranscriptSegment {
  speaker: string
  startSeconds: number
  text: string
}

export interface Interview {
  id: string
  candidateName: string
  role: string
  company: string
  interviewer: string
  createdAt: string
  durationSeconds: number
  status: InterviewStatus
  audioFileName: string
  transcript: TranscriptSegment[]
  insights: {
    summary: string
    strengths: string[]
    improvementAreas: string[]
    recommendation: "strong-advance" | "advance" | "hold" | "no-advance"
  } | null
}
