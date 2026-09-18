import uuid
from pathlib import Path

from fastapi import BackgroundTasks, FastAPI, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select

from db import get_session, init_db
from models import Interview
from pipeline import run_pipeline

AUDIO_DIR = Path(__file__).parent / "audio"
AUDIO_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Interview Insights API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/interviews")
def list_interviews() -> list[dict]:
    with get_session() as session:
        interviews = session.exec(
            select(Interview).order_by(Interview.created_at.desc())
        ).all()
        return [i.to_public_dict() for i in interviews]


@app.get("/interviews/{interview_id}")
def get_interview(interview_id: str) -> dict:
    with get_session() as session:
        interview = session.get(Interview, interview_id)
        if interview is None:
            raise HTTPException(status_code=404, detail="Interview not found")
        return interview.to_public_dict()


@app.post("/interviews")
async def create_interview(
    background_tasks: BackgroundTasks,
    audio: UploadFile,
    candidate_name: str = Form(...),
    role: str = Form(...),
    company: str = Form(...),
    interviewer: str = Form(""),
) -> dict:
    interview_id = f"int_{uuid.uuid4().hex[:10]}"
    audio_path = AUDIO_DIR / f"{interview_id}_{audio.filename}"
    audio_path.write_bytes(await audio.read())

    interview = Interview(
        id=interview_id,
        candidate_name=candidate_name,
        role=role,
        company=company,
        interviewer=interviewer,
        audio_file_name=audio.filename or "recording.mp3",
        audio_path=str(audio_path),
        status="queued",
    )

    with get_session() as session:
        session.add(interview)
        session.commit()
        session.refresh(interview)
        result = interview.to_public_dict()

    background_tasks.add_task(run_pipeline, interview_id)
    return result
