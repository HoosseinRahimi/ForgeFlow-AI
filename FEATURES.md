# ForgeFlow AI Feature Matrix

## Community Edition v0.15.0

The public repository contains a runnable, privacy-safe community subset representing the latest architecture milestones.

### Runnable public features

- React community cockpit
- FastAPI backend and interactive OpenAPI docs
- project-health demo using explicit synthetic data
- bounded lexical repository retrieval over public ForgeFlow documentation only
- deterministic local debugging assistance with no external model call
- governed demo actions using `propose -> approve/reject`
- multi-agent review demo using explicit synthetic agent perspectives
- single-service Docker image serving the built React frontend from FastAPI
- Docker Compose startup and `/health` readiness endpoint
- backend API tests, frontend build validation and container smoke testing in GitHub Actions
- public-surface checks for semantic versioning, boundary language and obvious committed credentials

### Intentionally not included in the public runtime

- real users, team accounts, or live production project state
- production sessions, persistent SQLite/MySQL databases, or grading records
- AI model provider credentials or API secrets
- production GitHub write access or external webhooks
- private agent memory, background scheduling, or internal deployment tokens

## Private upstream platform capabilities

The private ForgeFlow development platform contains the complete production surface:

1. **Multi-Tenant Team Management**:
   - Organization and team boundaries with isolated workspaces.
   - Member invitation tokens with expiration and role selection.
   - Granular, rule-based custom permissions (e.g. view-only, reviewer, manager).
2. **Role-Aware Authentication & Onboarding**:
   - Self-service signup for Students, Professors, and Team Leads.
   - Session authentication, password hashing, and user profile management.
3. **Tri-Lingual Internationalization (EN / DE / FA)**:
   - Full translation coverage for English, German, and Persian.
   - Bidirectional layout handling for RTL languages.
4. **Adaptive Theme System**:
   - Fast Day/Night toggle and Settings drawer with System, Light, and Dark modes.
   - Theme memory persistence across sessions.
5. **AI Engineering & Multi-Agent Orchestration**:
   - Seven specialist agents (Planner, PM, Code Reviewer, Debugger, Progress Tracker, GitHub Agent, Docs Agent).
   - Diff-aware code review, log-grounded debugging, and evidence-backed progress tracking.
6. **Multi-Cloud Deployment**:
   - Vercel Serverless (FastAPI backend + Vite frontend).
   - Railway container deployment and reproducible SQLite bootstrap.

## Public retrieval boundary

The runnable Community Edition repository query endpoint reads only these public files:

- `README.md`
- `FEATURES.md`
- `ARCHITECTURE.md`
- `SECURITY.md`

It uses lexical token overlap, not external embeddings or vector databases.

## Governed action boundary

The public demo preserves the control pattern without exposing production side effects:

1. propose
2. approve or reject

Community proposals are stored in process memory and do not mutate external systems, private databases, or production state.

## Engineering quality

Community v0.15.0 is validated with:

- Python 3.12+
- FastAPI
- React + Vite
- pytest API test suite
- Docker multi-stage container build
- Container health smoke test
- Public secret-pattern scanning
