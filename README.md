# Mailio

Mailio is a browser-based enterprise mail platform designed for very large mailbox datasets, strong security controls, and multi-user concurrency.

## Workspace

- `apps/web`: enterprise web client
- `services/api`: core API, auth, audit, and mailbox query services
- `services/sync`: mailbox sync, indexing, and attachment ingestion workers
- `packages/shared`: shared domain models and security contracts
- `packages/provider-adapters`: normalized provider interface for IMAP/SMTP, Microsoft 365, and Gmail

## Local development

1. Install dependencies with `npm install`.
2. Start infrastructure with `docker compose up -d`.
3. Run the web app with `npm run dev --workspace @mailio/web`.
4. Run the API with `npm run dev --workspace @mailio/api`.
5. Run the sync worker with `npm run dev --workspace @mailio/sync`.

## Quality and security

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run scan:deps`
- `npm run scan:secrets`

The GitHub workflows run code quality checks, CodeQL, dependency review, secret scanning, and container vulnerability scanning.
