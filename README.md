# ForgeFlow AI

**AI-native project operations for teams that build software.**

🌐 **Live showcase:** https://hoosseinrahimi.github.io/ForgeFlow-AI/

ForgeFlow AI Community Edition is a runnable, privacy-safe public subset derived from a private production platform for project management, repository intelligence, AI-assisted engineering, governed automation, progress tracking, and team review workflows.

The private upstream remains the active development and production repository. This public edition deliberately excludes private team data, runtime databases, credentials, submissions, grading records, production GitHub write automation, and internal deployment state.

## What is runnable in v0.14.0

- React community cockpit
- FastAPI backend
- project health demo endpoint
- bounded lexical retrieval over **public repository documentation only**
- deterministic local debugging assistant
- governed action demo using `propose -> approve/reject`
- single-service production Docker image
- Docker Compose one-command startup
- backend tests, frontend build validation, and Docker smoke testing in GitHub Actions

The richer private platform still contains capabilities that are intentionally not mirrored here, including private user/project state, production integrations, internal autonomous workflows, grading/submission data, and credentials.

## Run locally

Requirements: Docker + Docker Compose.

```bash
git clone https://github.com/HoosseinRahimi/ForgeFlow-AI.git
cd ForgeFlow-AI
docker compose up --build
```

Open:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/health
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

## Development mode

Backend:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt
uvicorn backend.app:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api` and `/health` to the local FastAPI server.

## Public vs private boundary

The Community Edition contains demo data and public-only logic. It does **not** contain real team/user data, runtime SQLite databases or sessions, environment secrets or tokens, private submissions or grading records, production credentials, private GitHub automation configuration, or internal deployment state.

Repository retrieval is intentionally limited to `README.md`, `FEATURES.md`, `ARCHITECTURE.md`, and `SECURITY.md` in this public repository.

## Documentation

- [Feature matrix](FEATURES.md)
- [Architecture](ARCHITECTURE.md)
- [Security policy](SECURITY.md)
- [Release notes](RELEASE_NOTES.md)

## Version

Current runnable Community Edition: **v0.14.0**.

## Deployment

The marketing/showcase landing page remains deployed to GitHub Pages from `main`. The runnable application is designed for local Docker execution or deployment to a container platform.

## License

MIT. See [LICENSE](LICENSE).

## Status

ForgeFlow AI is a curated open-source Community Edition, not a mirror of the private production repository. Public code is added only when its data, security, and operational boundaries are appropriate for open-source release.
