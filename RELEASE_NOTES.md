# ForgeFlow AI Release Notes

## v0.14.0 Community Edition

v0.14.0 turns ForgeFlow AI from a documentation-only public showcase into a **runnable, privacy-safe Community Edition**.

### Added

- React community cockpit
- FastAPI community backend
- `/health` readiness endpoint
- synthetic project-health demo
- bounded lexical retrieval over approved public documentation
- deterministic local debugging assistant with no external model call
- governed `propose -> approve/reject` action demo with no external side effects
- single-service multi-stage Docker image
- Docker Compose startup
- backend API tests
- frontend production build validation
- Docker build/start/health smoke testing in GitHub Actions
- branch-level Community CI for contributor changes
- semantic version validation and obvious-secret scanning for the public surface

### Security and privacy boundary

The runnable edition still excludes real team/user data, private runtime databases, sessions, submissions, grading records, provider tokens, production credentials, private GitHub write automation, private memory/orchestration state and internal deployment state.

Repository retrieval is restricted to `README.md`, `FEATURES.md`, `ARCHITECTURE.md` and `SECURITY.md` in this public repository.

### Run

```bash
git clone https://github.com/HoosseinRahimi/ForgeFlow-AI.git
cd ForgeFlow-AI
docker compose up --build
```

Then open `http://localhost:8000`.

## v0.13.0 Community Showcase

v0.13.0 was the first curated public milestone derived from the private ForgeFlow AI development platform. It published architecture, feature, security and release documentation plus the static GitHub Pages showcase while deliberately excluding the private production codebase and operational state.

The v0.13.0 GitHub release remains the historical showcase baseline. v0.14.0 introduces the first runnable Community Edition code surface.
