# LocalTrade Marketplace

**Project type:** fullstack

An offline-first, on-prem, role-based local marketplace. Ships as a
`docker-compose` stack containing a PostgreSQL database, a Fastify backend
API, and an Angular web frontend. No external cloud services are required to
run or verify the product.

---

## Quick start

The entire stack is containerized — no host-side setup is required.

```bash
docker-compose up
```

Equivalent modern command (both work): `docker compose up`. Use `docker-compose up -d` to run detached, and `docker-compose down` to stop.

The `-p localtrade73` project flag is only needed when you want to run tests
against a dedicated database instance (see the [Testing](#testing) section).

### Access (ports and URLs)

Once the stack is up:

| Service | URL |
| --- | --- |
| Web frontend | http://localhost:4200 |
| Backend API | http://localhost:3000 |
| API docs (OpenAPI / Swagger UI) | http://localhost:3000/docs |
| Liveness probe | http://localhost:3000/health/live |
| Readiness probe (checks DB) | http://localhost:3000/health/ready |

PostgreSQL listens on the container network as `postgres:5432`. It is **not**
exposed to the host by the default `docker-compose up` (only
`docker-compose -p localtrade73` with `POSTGRES_PORT=55432` exposes it, for
tests).

### Demo credentials

Authentication is required for all role-based flows. Use these seed accounts:

| Role | Email | Password |
| --- | --- | --- |
| Buyer | `buyer@localtrade.test` | `buyer` |
| Seller | `seller@localtrade.test` | `seller` |
| Moderator | `moderator@localtrade.test` | `moderator` |
| Arbitrator | `arbitrator@localtrade.test` | `arbitrator` |
| Admin | `admin@localtrade.test` | `admin` |

Public storefront, review detail, registration, login, and the signed
download URL do not require authentication.

---

## Verification

### 1. API smoke check

```bash
# Readiness (DB-reachable)
curl -s http://localhost:3000/health/ready
# → {"ok":true}

# Log in as seller, capture JWT
TOKEN=$(curl -s -H 'Content-Type: application/json' \
  -H "X-Request-Nonce: smoke-$RANDOM" \
  -H "X-Request-Timestamp: $(date +%s)" \
  -d '{"email":"seller@localtrade.test","password":"seller"}' \
  http://localhost:3000/api/auth/login | jq -r .accessToken)

# List own listings
curl -s -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/listings | jq .

# Public storefront
curl -s http://localhost:3000/api/storefront/listings | jq .
```

### 2. Web/UI flow (end-to-end)

1. Open http://localhost:4200.
2. Log in as **seller** (`seller@localtrade.test` / `seller`).
3. **My Listings → New listing.** Fill in title, description, price, quantity.
4. **Upload.** Drag one or more files (JPG/PNG/MP4/PDF, ≤ 2 GB each,
   20 files per listing max). Wait for each upload's status to reach `ready`.
5. **Publish** the listing.
6. Log out and log back in as **buyer** (`buyer@localtrade.test` / `buyer`).
7. **Browse Listings → View & Order.** Pick a quantity, place the order.
8. **My Orders** should show the order with correct totals.

### 3. Automated verification

See [Testing](#testing).

---

## Testing

The project runs three independent suites. The first two (backend unit +
frontend) require **no database**. The third (backend API integration) uses
a dockerized Postgres on a non-default host port so it does not collide with
any other local stack.

### Backend unit / security / worker tests (no DB required)

```bash
npm --prefix backend install
npm --prefix backend test -- test/domain.test.ts test/security.test.ts test/security-hardening.test.ts test/worker.test.ts
```

Validates: domain invariants (refund threshold, review window, publish gate,
credit metrics), signed-URL HMAC, token handling, worker retry lifecycle, and
stale-job recovery.

### Frontend unit tests and production build

```bash
npm --prefix frontend install
npm --prefix frontend test -- --watch=false
npm --prefix frontend run build
```

Validates: auth guard, auth/api services, role-based routing, upload
component state/validation, admin/storefront/reviews components, and that the
production bundle builds successfully.

### Backend API integration tests (DB-backed, no mocks)

This suite bootstraps the real Fastify server via `buildServer()` and
exercises every endpoint through `app.inject` (true HTTP path, no service
mocks). It requires a running Postgres.

```bash
# 1) Start an isolated Postgres on host port 55432.
POSTGRES_PORT=55432 docker-compose -p localtrade73 up -d postgres

# 2) Apply schema migrations and seed demo data.
DATABASE_URL=postgres://localtrade:localtrade@localhost:55432/localtrade \
  npm --prefix backend run migrate
DATABASE_URL=postgres://localtrade:localtrade@localhost:55432/localtrade \
  npm --prefix backend run seed

# 3) Run the API integration suite.
DATABASE_URL=postgres://localtrade:localtrade@localhost:55432/localtrade \
  npm --prefix backend test -- test/api.test.ts

# 4) Tear the test DB down when finished.
docker-compose -p localtrade73 down
```

The `-p localtrade73` project label and `POSTGRES_PORT=55432` keep this test
database isolated from the default `docker-compose up` stack.

### Shortcut: one command

```bash
bash run_tests.sh
```

Runs backend unit + frontend tests + frontend build in sequence. Optional —
the individual commands above are authoritative.

---

## Encrypted backups and restore

- Admin backup jobs are produced by `POST /api/admin/backups/run` and
  processed by the worker.
- Encrypted files are written to `MEDIA_ROOT_PATH/backups/` with format
  `backup-YYYY-MM-DD-<timestamp>.sql.enc` (AES-256-GCM).
- Files older than 30 days are auto-pruned.
- **RTO:** 4 hours from backup selection to verified API readiness.

### Restore procedure

1. Put the API in maintenance mode or stop the API container.
2. Decrypt the backup with the same `ENCRYPTION_KEY_HEX` that was active at
   backup time.
3. Restore into Postgres:

   ```bash
   psql "$DATABASE_URL" < decrypted-backup.sql
   ```

4. Restart the API and verify:

   ```bash
   curl -s http://localhost:3000/health/ready
   # → {"ok":true}
   ```

---

## Environment policy

- **Docker-first.** Normal development and verification happens inside the
  provided `docker-compose` stack. No manual host-side install of Postgres,
  Node, or system packages is required.
- **Optional (non-required):** running `npm install` on the host is only
  useful if you want to iterate on `backend/` or `frontend/` outside Docker.
  It is not part of the verification flow.
- **Secrets policy:** dev defaults are used only when `NODE_ENV` ≠
  `production`. Production deployments **must** set:
  - `NODE_ENV=production`
  - `JWT_SECRET` — ≥ 32 random characters
  - `SIGNED_URL_SECRET` — ≥ 32 random characters
  - `ENCRYPTION_KEY_HEX` — exactly 64 hex characters (32 bytes)
  - `CORS_ALLOWED_ORIGINS` — comma-separated allow-list

  If any of these are left as defaults with `NODE_ENV=production`, the API
  refuses to start.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `docker-compose up` reports `port is already allocated` on 3000/4200 | another local service holds the port | stop the other service, or remap the host port in `docker-compose.yml` |
| `role "localtrade" does not exist` when running `api.test.ts` | test DB container not started, or wrong port | run `POSTGRES_PORT=55432 docker-compose -p localtrade73 up -d postgres` first |
| API logs `pool: cannot connect` on boot | Postgres is still initializing | compose `depends_on: healthy` handles this — if running outside compose, wait until `pg_isready` returns ok |
| Frontend shows CORS errors | `CORS_ALLOWED_ORIGINS` doesn't include the origin you're hitting | set `CORS_ALLOWED_ORIGINS=http://localhost:4200` (or your LAN IP) and restart the API |
| Integration tests fail with `relation ... does not exist` | migrations were not re-run after `docker-compose down -v` | re-run `npm --prefix backend run migrate` with the right `DATABASE_URL` |
| API refuses to start in production with `INSECURE_DEFAULT_SECRETS` | default dev secrets still in effect | set all variables listed under **Environment policy** |
| `api.test.ts` occasionally hangs during finalize | worker scheduler is asynchronously processing the job | tests poll for the `ready` state with a timeout; no action needed |

---

## Reference

- API reference (OpenAPI): http://localhost:3000/docs
- Business-logic questions log: [`docs/questions.md`](docs/questions.md)
- Source layout: `backend/` (Fastify + TypeScript), `frontend/` (Angular).
