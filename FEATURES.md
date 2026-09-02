# ForgeFlow AI Feature Matrix

## Community Edition v0.14.0

The public repository now contains a runnable subset rather than documentation alone.

### Runnable public features

- React community cockpit
- FastAPI backend and interactive OpenAPI docs
- project-health demo using explicit synthetic data
- bounded lexical repository retrieval over public ForgeFlow documentation only
- deterministic local debugging assistance with no external model call
- governed demo actions using `propose -> approve/reject`
- single-service Docker image serving the built React frontend from FastAPI
- Docker Compose startup and `/health` readiness endpoint
- backend API tests, frontend build validation and container smoke testing in GitHub Actions
- public-surface checks for semantic versioning, boundary language and obvious committed credentials

### Intentionally not included in the public runtime

- real users, team projects or production project state
- sessions, private SQLite databases or grading/submission records
- provider credentials or AI API tokens
- production GitHub write credentials or autonomous GitHub actions
- private memory, notification, orchestration or deployment state
- unrestricted filesystem, shell or external-service access

## Private upstream capabilities

The private ForgeFlow development platform contains a broader product surface, including role-aware student/professor workspaces, activity/calendar/timeline workflows, project review and submission flows, GitHub contribution intelligence, persistent AI project threads and memory, evidence-backed progress intelligence, project health/briefing workflows, multi-agent orchestration and governed production actions.

Those capabilities are documented here only at a product/architecture level unless an explicitly sanitized implementation is added to the Community Edition.

## Public retrieval boundary

The runnable Community Edition repository query endpoint reads only these public files:

- `README.md`
- `FEATURES.md`
- `ARCHITECTURE.md`
- `SECURITY.md`

It uses lexical token overlap, not embeddings or a vector database.

## Governed action boundary

The public demo preserves the control pattern without exposing production side effects:

1. propose
2. approve or reject

Community proposals are stored in process memory and do not mutate GitHub, external services, private project data or production state.

## Engineering quality

Community v0.14.0 is validated with:

- Python 3.12
- FastAPI
- React + Vite
- pytest
- frontend production build
- Docker image build
- live container health smoke test
- public secret-pattern scanning

## Public/private principle

ForgeFlow AI Community Edition is a curated open-source product surface, not a mirror of the private upstream. A feature moves into the public edition only when its code, data model, credentials and operational behavior are appropriate for public release.
