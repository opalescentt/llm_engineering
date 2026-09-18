import { useState } from "react"
import { Field } from "../components/Field"
import { Button } from "../components/Button"
import { Card } from "../components/Card"

export function NewInterview() {
  const [fileName, setFileName] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[1.1fr_0.9fr] gap-10 px-8 py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New interview</h1>
        <p className="mt-1 text-sm text-muted">
          Upload a recording and add context. Transcription and insight generation run after submit.
        </p>

        <form className="mt-8 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <Field id="candidateName" name="candidateName" label="Candidate name" placeholder="Jordan Lee" required />
            <Field id="role" name="role" label="Role" placeholder="Consultant" required />
            <Field id="company" name="company" label="Company" placeholder="Accenture" required />
            <Field id="interviewer" name="interviewer" label="Interviewer" placeholder="Ria Chen" />
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-ink">Audio recording</span>
            <label
              onDragOver={(e) => {
                e.preventDefault()
                setDragActive(true)
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragActive(false)
                const file = e.dataTransfer.files?.[0]
                if (file) setFileName(file.name)
              }}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 border px-6 py-10 text-center transition-colors ${
                dragActive ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong"
              }`}
            >
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              {fileName ? (
                <>
                  <span className="font-mono text-sm">{fileName}</span>
                  <span className="text-xs text-muted">Click or drop to replace</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">Drop an audio file here</span>
                  <span className="text-xs text-muted">MP3, WAV, or M4A</span>
                </>
              )}
            </label>
          </div>

          <div className="flex items-center gap-3 border-t border-line pt-6">
            <Button type="submit">Start processing</Button>
            <Button type="button" variant="secondary">
              Save as draft
            </Button>
          </div>
        </form>
      </div>

      <Card className="h-fit">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-sm font-medium">Pipeline</h2>
          <p className="mt-1 text-xs text-muted">What happens after you submit</p>
        </div>
        <ol className="divide-y divide-line font-mono text-sm">
          <li className="flex items-start gap-3 px-5 py-4">
            <span className="text-muted">01</span>
            <div>
              <p className="font-sans font-medium">Transcription</p>
              <p className="mt-0.5 font-sans text-xs text-muted">Speaker-diarized transcript via speech-to-text</p>
            </div>
          </li>
          <li className="flex items-start gap-3 px-5 py-4">
            <span className="text-muted">02</span>
            <div>
              <p className="font-sans font-medium">Insight generation</p>
              <p className="mt-0.5 font-sans text-xs text-muted">Summary, strengths, and improvement areas</p>
            </div>
          </li>
          <li className="flex items-start gap-3 px-5 py-4">
            <span className="text-muted">03</span>
            <div>
              <p className="font-sans font-medium">Ready to review</p>
              <p className="mt-0.5 font-sans text-xs text-muted">Appears on the dashboard with a recommendation</p>
            </div>
          </li>
        </ol>
      </Card>
    </div>
  )
}
