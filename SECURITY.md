# Security Policy

ForgeFlow AI is a public Community Showcase. Do not publish real credentials, private user data, runtime databases, submission snapshots, or internal deployment state.

## Reporting a vulnerability

Open a minimal security report that describes the affected component and impact without posting secrets, personal data, exploit credentials, or private upstream details. For sensitive disclosure, contact the repository owner privately through GitHub before publishing proof-of-concept material.

## Secrets

Never commit values for AI provider keys, GitHub tokens, session secrets, or deployment credentials. Public examples must use empty values or obvious placeholders.

## AI and automation boundaries

- AI actions are governed by `propose -> approve -> execute`.
- Provider credentials remain server-side.
- GitHub write credentials remain server-side.
- Automatic progress mutation is opt-in.
- Repository retrieval is bounded to allowed paths and file sizes.
- The current architecture uses lexical repository retrieval, not embedding/vector semantic search.

## Public/private separation

The private upstream may contain additional operational configuration and runtime-only state. Public releases are curated rather than mirrored from the private repository.
