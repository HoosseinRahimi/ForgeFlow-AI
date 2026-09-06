# ForgeFlow AI Feature Matrix

## Community Edition v0.15.0

The public repository contains a runnable, privacy-safe community subset representing the latest architecture milestones.

### Runnable public features

- **React Community Cockpit**: interactive dashboard with health scoring, team switching preview, lexical RAG, and action approval.
- **FastAPI Backend**: OpenAPI documentation at `/docs`, health endpoints, and demo services.
- **Team Workspace Demo**: preview multi-tenant team contexts and role scopes via `/api/demo/teams`.
- **Project-Health Demo**: synthetic signals across delivery, quality, and risk.
- **Bounded Lexical Repository Retrieval**: lexical search scoped strictly to public documentation (`README.md`, `FEATURES.md`, `ARCHITECTURE.md`, `SECURITY.md`).
- **Deterministic Local Debugging Assistant**: offline diagnostic hints with zero external model calls.
- **Governed Action Lifecycle**: demonstration of `propose -> approve/reject` action workflow.
- **Single-Service Docker Image**: multi-stage build serving built React frontend directly from FastAPI.
- **Docker Compose Startup**: one-command local evaluation.
- **GitHub Actions CI**: backend tests, frontend build verification, and container smoke testing.

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
