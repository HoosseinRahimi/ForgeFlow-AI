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

### 4. Container & Cloud Deployment
- **Multi-Stage Dockerfile**: Builds the React application with Node.js and packages it inside a lean Python image where FastAPI serves static assets and API routes under a single origin.
- **Serverless Integration**: Designed for low-latency serverless execution on Vercel as well as continuous containerized execution on platforms like Railway.
