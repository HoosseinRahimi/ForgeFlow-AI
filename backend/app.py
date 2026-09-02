from __future__ import annotations

import re
from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

APP_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DOCS = [APP_ROOT / name for name in ("README.md", "FEATURES.md", "ARCHITECTURE.md", "SECURITY.md")]
FRONTEND_DIST = APP_ROOT / "frontend" / "dist"

app = FastAPI(
    title="ForgeFlow AI Community Edition",
    version="0.14.0",
    description="Runnable, privacy-safe community subset of ForgeFlow AI.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class RepoQuery(BaseModel):
    query: str = Field(min_length=2, max_length=240)


class DebugRequest(BaseModel):
    error: str = Field(min_length=2, max_length=4000)


class ActionProposal(BaseModel):
    kind: Literal["create-task", "update-progress", "record-decision"]
    summary: str = Field(min_length=3, max_length=240)


class ActionDecision(BaseModel):
    approved: bool


PROPOSALS: dict[int, dict[str, object]] = {}
NEXT_ID = 1


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "edition": "community", "version": "0.14.0"}


@app.get("/api/demo/project-health")
def project_health() -> dict[str, object]:
    return {
        "score": 86,
        "status": "healthy",
        "signals": [
            {"name": "delivery", "score": 90, "detail": "Milestones are moving on schedule."},
            {"name": "quality", "score": 88, "detail": "CI and tests are green."},
            {"name": "risk", "score": 80, "detail": "Two medium-priority risks need review."},
        ],
        "note": "Demo data only. No private upstream state is included.",
    }


def _tokenize(value: str) -> set[str]:
    return {token for token in re.findall(r"[a-z0-9_-]{2,}", value.lower())}


@app.post("/api/demo/repo-query")
def repo_query(payload: RepoQuery) -> dict[str, object]:
    terms = _tokenize(payload.query)
    ranked: list[tuple[int, str, str]] = []
    for path in PUBLIC_DOCS:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        for paragraph in re.split(r"\n\s*\n", text):
            score = len(terms & _tokenize(paragraph))
            if score:
                ranked.append((score, path.name, " ".join(paragraph.split())[:600]))
    ranked.sort(key=lambda item: item[0], reverse=True)
    return {
        "mode": "lexical-rag",
        "query": payload.query,
        "results": [
            {"score": score, "source": source, "excerpt": excerpt}
            for score, source, excerpt in ranked[:5]
        ],
    }


@app.post("/api/demo/debug")
def debug(payload: DebugRequest) -> dict[str, object]:
    error = payload.error.lower()
    suggestions: list[str] = []
    if "connection refused" in error:
        suggestions.append("Confirm the target service is listening on the expected host and port.")
    if "cors" in error:
        suggestions.append("Check the browser origin against the API CORS allow-list.")
    if "module not found" in error or "modulenotfounderror" in error:
        suggestions.append("Verify dependencies are installed in the active runtime environment.")
    if "timeout" in error:
        suggestions.append("Separate network latency from application work and inspect upstream timeouts.")
    if not suggestions:
        suggestions.append("Reduce the failure to the smallest reproducible input and inspect the first causal error.")
    return {
        "analysis": "Deterministic community debugger. It does not send code or logs to an external model.",
        "suggestions": suggestions,
    }


@app.post("/api/demo/actions", status_code=201)
def propose_action(payload: ActionProposal) -> dict[str, object]:
    global NEXT_ID
    proposal = {"id": NEXT_ID, "kind": payload.kind, "summary": payload.summary, "status": "pending"}
    PROPOSALS[NEXT_ID] = proposal
    NEXT_ID += 1
    return proposal


@app.post("/api/demo/actions/{proposal_id}/decision")
def decide_action(proposal_id: int, payload: ActionDecision) -> dict[str, object]:
    proposal = PROPOSALS.get(proposal_id)
    if proposal is None:
        raise HTTPException(status_code=404, detail="proposal not found")
    proposal["status"] = "approved" if payload.approved else "rejected"
    return proposal


@app.get("/api/demo/actions")
def list_actions() -> list[dict[str, object]]:
    return list(PROPOSALS.values())


if FRONTEND_DIST.exists():
    assets = FRONTEND_DIST / "assets"
    if assets.exists():
        app.mount("/assets", StaticFiles(directory=assets), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def spa(full_path: str):
        requested = FRONTEND_DIST / full_path
        if full_path and requested.is_file():
            return FileResponse(requested)
        return FileResponse(FRONTEND_DIST / "index.html")
