# ForgeFlow AI Release Notes

## v0.15.0 Community Showcase & Platform Evolution

v0.15.0 updates the public showcase and Community Edition to reflect the major architectural milestones shipped in the core platform, including multi-tenant team workspaces, role-based onboarding, tri-lingual internationalization, adaptive theming, and multi-cloud deployment readiness.

### Added

- **Multi-Tenant Team Workspaces (Public Spec & Demo)**:
  - Architecture documentation for isolated team environments, invite tokens, and custom rule-based permissions.
  - Interactive community demo endpoint (`/api/demo/teams`) and UI indicators for active team and role context.
- **User Onboarding & Authentication Architecture**:
  - Documented role-aware self-registration flows (Student, Professor, Team Lead).
- **Tri-Lingual Internationalization (EN / DE / FA)**:
  - Language parity across English, German, and Persian with RTL layout support.
- **Adaptive Theme System**:
  - Real-time Day/Night toggle, Theme drawer specification with System/Light/Dark mode memory.
- **Multi-Cloud Deployment Readiness**:
  - Validated deployment targets across Docker Compose, Vercel Serverless (FastAPI + Vite), and Railway containers.
- **Showcase Landing Page Refresh**:
  - Live GitHub Pages site ([hoosseinrahimi.github.io/ForgeFlow-AI](https://hoosseinrahimi.github.io/ForgeFlow-AI/)) updated with new cockpit hero interface, capability cards, and v0.15.0 release pointers.

### Security and Privacy Boundary

The Community Edition strictly maintains the established privacy boundary:
- No private SQLite databases, real user data, or production sessions.
- No production credentials, AI API keys, or write tokens.
- Bounded repository retrieval remains scoped to public project documentation (`README.md`, `FEATURES.md`, `ARCHITECTURE.md`, `SECURITY.md`).

---

## v0.14.0 Community Edition

v0.14.0 turned ForgeFlow AI from a documentation-only public showcase into a **runnable, privacy-safe Community Edition**.

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

---

## v0.13.0 Community Showcase

v0.13.0 was the first curated public milestone derived from the private ForgeFlow AI development platform. It published architecture, feature, security and release documentation plus the static GitHub Pages showcase while deliberately excluding the private production codebase and operational state.
