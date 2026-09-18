import json

from db import get_session
from models import Interview


def run_pipeline(interview_id: str) -> None:
    """Background job: transcribe the audio, then generate insights.

    Mirrors the two stages in meeting_minutes.ipynb:
      1. POST the audio to Deepgram, get back a diarized transcript.
      2. Send that transcript to Claude, get back structured insights.
    Each stage updates the interview's status so the frontend's polling
    picks up progress.
    """
    with get_session() as session:
        interview = session.get(Interview, interview_id)
        if interview is None:
            return

        try:
            interview.status = "transcribing"
            session.add(interview)
            session.commit()

            # TODO: port the Deepgram call from meeting_minutes.ipynb here.
            # Request params to reuse: model="nova-3", smart_format=True,
            # punctuate=True, diarize=True.
            # Group the diarized words into speaker turns and build a list of
            # segments shaped like the frontend's TranscriptSegment type:
            #   [{"speaker": str, "startSeconds": float, "text": str}, ...]
            transcript_segments: list[dict] = []
            full_transcript_text = ""

            interview.transcript_json = json.dumps(transcript_segments)
            interview.status = "analyzing"
            session.add(interview)
            session.commit()

            # TODO: port the Claude call from meeting_minutes.ipynb here.
            # Reuse the existing system_prompt / user_prompt pattern, but ask
            # Claude to return ONLY a JSON object matching:
            #   {"summary": str, "strengths": [str], "improvementAreas": [str],
            #    "recommendation": "strong-advance"|"advance"|"hold"|"no-advance"}
            # so it can be parsed directly instead of scraped out of markdown.
            insights = {
                "summary": "",
                "strengths": [],
                "improvementAreas": [],
                "recommendation": "hold",
            }

            interview.summary = insights["summary"]
            interview.strengths_json = json.dumps(insights["strengths"])
            interview.improvement_areas_json = json.dumps(insights["improvementAreas"])
            interview.recommendation = insights["recommendation"]
            interview.status = "complete"
            session.add(interview)
            session.commit()

        except Exception as exc:  # noqa: BLE001 - surface any failure to the UI
            interview.status = "failed"
            interview.error_message = str(exc)
            session.add(interview)
            session.commit()
