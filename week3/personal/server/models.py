import json
from datetime import datetime, timezone
from typing import Literal, Optional

from sqlmodel import Field, SQLModel

InterviewStatus = Literal["queued", "transcribing", "analyzing", "complete", "failed"]
Recommendation = Literal["strong-advance", "advance", "hold", "no-advance"]


class Interview(SQLModel, table=True):
    id: str = Field(primary_key=True)
    candidate_name: str
    role: str
    company: str
    interviewer: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    duration_seconds: int = 0
    status: str = "queued"  # InterviewStatus, kept as plain str for SQLModel's column mapping
    audio_file_name: str
    audio_path: str

    # Stored as JSON text; encoded/decoded via the helpers below.
    transcript_json: str = Field(default="[]")
    summary: Optional[str] = None
    strengths_json: str = Field(default="[]")
    improvement_areas_json: str = Field(default="[]")
    recommendation: Optional[str] = None  # Recommendation, see note on status above
    error_message: Optional[str] = None

    def to_public_dict(self) -> dict:
        insights = None
        if self.summary is not None and self.recommendation is not None:
            insights = {
                "summary": self.summary,
                "strengths": json.loads(self.strengths_json),
                "improvementAreas": json.loads(self.improvement_areas_json),
                "recommendation": self.recommendation,
            }

        return {
            "id": self.id,
            "candidateName": self.candidate_name,
            "role": self.role,
            "company": self.company,
            "interviewer": self.interviewer,
            "createdAt": self.created_at.isoformat(),
            "durationSeconds": self.duration_seconds,
            "status": self.status,
            "audioFileName": self.audio_file_name,
            "transcript": json.loads(self.transcript_json),
            "insights": insights,
            "errorMessage": self.error_message,
        }
