# ForgeFlow AI

**AI-native project operations for teams that build software.**

🌐 **Live showcase:** https://hoosseinrahimi.github.io/ForgeFlow-AI/

ForgeFlow AI Community Edition is a runnable, privacy-safe public subset derived from a private production platform for team collaboration, multi-tenant workspaces, repository intelligence, AI-assisted engineering, governed automation, progress tracking, and code review workflows.

The private upstream remains the active production platform. This public edition demonstrates the architecture, control plane, and core concepts while deliberately excluding private team databases, runtime credentials, submissions, grading records, and production GitHub write automation.

## What is runnable in v0.15.0

- React community cockpit with team preview and adaptive theming
- FastAPI backend with interactive OpenAPI docs at `/docs`
- Multi-tenant team workspace preview endpoint (`/api/demo/teams`)
- Project health demo endpoint
- Bounded lexical retrieval over **public repository documentation only**
- Deterministic local debugging assistant with zero external model calls
- Governed action demo using `propose -> approve/reject`
- Single-service multi-stage Docker image
- Docker Compose one-command startup
- Backend API tests, frontend build validation, and GitHub Actions CI

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
- [Contributing guide](CONTRIBUTING.md)

## Community & Discussions

Have questions, ideas, or feedback? Join our [GitHub Discussions](https://github.com/HoosseinRahimi/ForgeFlow-AI/discussions) to connect with the community and share project updates.

## Version

Current runnable Community Edition: **v0.15.0**.

## Deployment

The marketing/showcase landing page is deployed to GitHub Pages from `main` ([hoosseinrahimi.github.io/ForgeFlow-AI](https://hoosseinrahimi.github.io/ForgeFlow-AI/)). The runnable application is packaged for local Docker execution, Vercel Serverless, or Railway container deployment.

## License

MIT. See [LICENSE](LICENSE).
