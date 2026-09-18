import { Field } from "../components/Field"
import { Button } from "../components/Button"
import { Card } from "../components/Card"

export function Settings() {
  return (
    <div className="mx-auto max-w-3xl px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted">Connections and defaults used when processing interviews</p>

      <Card className="mt-8">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-sm font-medium">API connections</h2>
          <p className="mt-1 text-xs text-muted">Keys are used only to call each provider directly</p>
        </div>
        <div className="flex flex-col gap-5 px-5 py-5">
          <Field
            id="deepgramKey"
            name="deepgramKey"
            type="password"
            label="Deepgram API key"
            placeholder="dg_..."
            hint="Used for speech-to-text transcription with speaker diarization"
          />
          <Field
            id="anthropicKey"
            name="anthropicKey"
            type="password"
            label="Anthropic API key"
            placeholder="sk-ant-..."
            hint="Used to generate summaries, strengths, and improvement notes from the transcript"
          />
        </div>
        <div className="border-t border-line px-5 py-4">
          <Button type="button">Save connections</Button>
        </div>
      </Card>

      <Card className="mt-6">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-sm font-medium">Defaults</h2>
        </div>
        <div className="flex flex-col gap-5 px-5 py-5">
          <Field
            id="defaultInterviewer"
            name="defaultInterviewer"
            label="Default interviewer name"
            placeholder="Ria Chen"
          />
          <Field
            id="defaultCompany"
            name="defaultCompany"
            label="Default company"
            placeholder="Accenture"
          />
        </div>
        <div className="border-t border-line px-5 py-4">
          <Button type="button" variant="secondary">
            Save defaults
          </Button>
        </div>
      </Card>

      <Card className="mt-6 border-warn">
        <div className="px-5 py-4">
          <h2 className="text-sm font-medium">Danger zone</h2>
          <p className="mt-1 text-xs text-muted">Remove all stored interviews and transcripts. Cannot be undone.</p>
        </div>
        <div className="border-t border-line px-5 py-4">
          <Button type="button" variant="secondary" className="border-warn text-warn hover:bg-warn/10">
            Clear all data
          </Button>
        </div>
      </Card>
    </div>
  )
}
