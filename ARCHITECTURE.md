# ForgeFlow AI Architecture

ForgeFlow AI uses a **private-core + public Community Edition** model. The public repository is runnable and demonstrates the core architectural patterns, but remains strictly privacy-safe and free of private upstream data.

## System Overview

```text
Browser / Client (Desktop & Mobile)
  |
  |-- Theme Provider (Light / Dark / System)
  |-- i18n Engine (EN / DE / FA + RTL)
  |-- Team & Tenant Context Provider
  |
  v
React / Vite Cockpit
  |
  | same-origin /api requests
  v
FastAPI Control Plane
  |-- Team Tenancy & Role Permissions
  |-- Project Health Intelligence
  |-- Bounded Documentation Lexical RAG
  |-- Deterministic Debugging Engine
  `-- Governed Action Lifecycle (Propose -> Approve -> Execute)

Deployment Formats:
  |-- Local Docker Compose (FastAPI + Built React SPA)
  |-- Vercel Serverless (FastAPI API Handler + Vite Static)
  `-- Railway Container Platform
```

## Architectural Pillars

### 1. Multi-Tenant Team Isolation & Governance
In the platform architecture, data models and operational workflows are isolated by team tenancy boundaries.
- **Teams & Workspaces**: Users can create or belong to multiple teams.
- **Invitation Flow**: Team invitations utilize secure tokens and assign explicit role permissions (Student, Professor, Team Lead, or custom rule sets).
- **Governed Side Effects**: State mutations (such as creating milestones, approving code changes, or triggering deployments) follow an auditable `propose -> approve -> execute` pattern.

### 2. Localization & Theme Adaptation
- **Internationalization (i18n)**: Designed with first-class multilingual support covering English (EN), German (DE), and Persian (FA). Bidirectional layouts ensure natural RTL presentation for Persian users.
- **Theme Personalization**: The frontend supports immediate Day/Night toggling and persists theme preference (System, Light, Dark) across reloads.

### 3. Community Edition Boundary
The public repository includes a clean, standalone Community Edition designed for evaluation:
- **FastAPI Backend**: Serves OpenAPI specifications, `/health`, and demo endpoints.
- **Public-Doc Lexical RAG**: Bounded to approved public documentation (`README.md`, `FEATURES.md`, `ARCHITECTURE.md`, `SECURITY.md`) using lexical tokenization rather than black-box third-party vector databases.
- **In-Memory Demonstration**: State for demo proposals and team contexts is maintained in-memory, ensuring zero leak of private operational databases or sensitive user records.

- `/health`
- synthetic project-health intelligence
- synthetic multi-agent review perspectives
- lexical retrieval over approved public documentation
- deterministic debugging hints
- an in-memory `propose -> approve/reject` action lifecycle

There is no production authentication database, grading data, private project state, provider token or GitHub write credential in the Community runtime.

### Retrieval boundary

Repository intelligence is deliberately bounded to four public files: `README.md`, `FEATURES.md`, `ARCHITECTURE.md` and `SECURITY.md`. Retrieval uses lexical token overlap rather than embeddings or vector search.

This makes the public behavior inspectable and prevents accidental indexing of private upstream material.

### Persistence

The current Community Edition needs no persistent database. Governed demo proposals are process-local and reset when the application restarts. This is intentional: the public runtime demonstrates the control pattern without presenting demo state as production state.

### Container boundary

The root multi-stage `Dockerfile`:

1. builds the React frontend with Node.js;
2. installs the minimal Python runtime;
3. copies only the public backend and approved documentation required by retrieval;
4. copies the built frontend;
5. starts Uvicorn on port 8000.

`docker-compose.yml` exposes port 8000 and validates `/health`.

## Private upstream architecture

The private ForgeFlow platform is broader. It uses a React/TypeScript frontend, FastAPI services, runtime SQLite state, Git-tracked project/activity source data and optional external AI/GitHub integrations. It includes authenticated role-aware workflows, review/submission state, AI memory and threads, progress evidence, notifications, orchestration and governed external actions.

Those private capabilities are not automatically mirrored into the Community Edition.

## Production GitHub boundary

The private platform separates read-oriented contribution intelligence from governed server-side GitHub writes. Production write actions require runtime credentials and explicit approval. The Community Edition contains **no GitHub write implementation or credential path**.

## Security principles

- secrets remain server-side and are never committed to the Community repository
- public retrieval reads only an explicit allow-list of documentation files
- Community demo actions have no external side effects
- no unrestricted shell or filesystem tool is exposed to the public demo
- CI builds the frontend and backend and starts the actual Docker image
- a public-surface workflow rejects obvious committed credential patterns
- private production state remains outside the public repository

## Release model

The public repository is an intentionally curated derivative. New functionality should be reimplemented or extracted only after checking data exposure, credentials, operational side effects and licensing. Public release work should never be treated as a blind mirror or synchronization of the private repository.
### 4. Container & Cloud Deployment
- **Multi-Stage Dockerfile**: Builds the React application with Node.js and packages it inside a lean Python image where FastAPI serves static assets and API routes under a single origin.
- **Serverless Integration**: Designed for low-latency serverless execution on Vercel as well as continuous containerized execution on platforms like Railway.
