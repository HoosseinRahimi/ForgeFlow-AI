# ForgeFlow AI Architecture

ForgeFlow AI uses a **private-core + public Community Edition** model. The public repository is runnable, but it is intentionally smaller than the private production platform.

## Community Edition v0.14.0

```text
Browser
  |
  v
React / Vite UI
  |
  | same-origin /api
  v
FastAPI
  |-- project health demo
  |-- public-doc lexical retrieval
  |-- deterministic debugger
  `-- governed in-memory action demo

Docker image
  `-- built React assets served by FastAPI
```

### Frontend

The Community UI is a small React application that exposes the public demonstration surfaces. Development requests to `/api` and `/health` are proxied to FastAPI by Vite. In the production container, FastAPI serves the built frontend directly, so the application runs behind one origin.

### Backend

The public backend is intentionally compact. It contains:

- `/health`
- synthetic project-health intelligence
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
