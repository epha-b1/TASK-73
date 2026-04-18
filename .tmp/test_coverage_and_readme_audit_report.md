# Unified Test Coverage + README Audit Report (Strict Mode)

## Project Type Detection
- Declared in README top: **missing** (`repo/README.md:1` only has title).
- Inferred project type (strict): **fullstack** (Angular frontend + Fastify backend evidence in `repo/frontend/package.json:14` and `repo/backend/package.json:19`).

## 1) Test Coverage Audit

### Backend Endpoint Inventory
- `GET /api/admin/users` (repo/backend/src/routes/admin.ts:12)
- `GET /api/admin/users/:id/pending-reset-token` (repo/backend/src/routes/admin.ts:21)
- `PATCH /api/admin/users/:id/roles` (repo/backend/src/routes/admin.ts:31)
- `GET /api/admin/refunds/pending` (repo/backend/src/routes/admin.ts:42)
- `GET /api/admin/refunds` (repo/backend/src/routes/admin.ts:50)
- `POST /api/admin/users/:id/store-credit` (repo/backend/src/routes/admin.ts:58)
- `POST /api/admin/webhooks/subscriptions` (repo/backend/src/routes/admin.ts:69)
- `PATCH /api/admin/webhooks/subscriptions/:id` (repo/backend/src/routes/admin.ts:79)
- `POST /api/admin/orders/:id/force-complete` (repo/backend/src/routes/admin.ts:90)
- `POST /api/admin/backups/run` (repo/backend/src/routes/admin.ts:101)
- `POST /api/reviews/:id/appeal` (repo/backend/src/routes/appeals.ts:9)
- `POST /api/appeals` (repo/backend/src/routes/appeals.ts:20)
- `GET /api/arbitration/appeals` (repo/backend/src/routes/appeals.ts:30)
- `POST /api/arbitration/appeals/:id/resolve` (repo/backend/src/routes/appeals.ts:38)
- `GET /api/assets/:id` (repo/backend/src/routes/assets.ts:12)
- `GET /api/assets/:id/metadata` (repo/backend/src/routes/assets.ts:33)
- `GET /download/:assetId` (repo/backend/src/routes/assets.ts:47)
- `GET /api/admin/audit-logs` (repo/backend/src/routes/audit-logs.ts:8)
- `GET /api/admin/audit-logs/:id` (repo/backend/src/routes/audit-logs.ts:28)
- `POST /api/auth/register` (repo/backend/src/routes/auth.ts:10)
- `POST /api/auth/forgot-password` (repo/backend/src/routes/auth.ts:52)
- `POST /api/auth/reset-password` (repo/backend/src/routes/auth.ts:72)
- `POST /api/auth/login` (repo/backend/src/routes/auth.ts:101)
- `POST /api/auth/refresh` (repo/backend/src/routes/auth.ts:111)
- `POST /api/auth/logout` (repo/backend/src/routes/auth.ts:121)
- `GET /api/admin/content-rules` (repo/backend/src/routes/content-safety.ts:9)
- `POST /api/admin/content-rules` (repo/backend/src/routes/content-safety.ts:17)
- `PATCH /api/admin/content-rules/:id` (repo/backend/src/routes/content-safety.ts:27)
- `DELETE /api/admin/content-rules/:id` (repo/backend/src/routes/content-safety.ts:45)
- `POST /api/admin/content-rules/:id/test` (repo/backend/src/routes/content-safety.ts:55)
- `GET /api/admin/jobs` (repo/backend/src/routes/jobs.ts:8)
- `POST /api/admin/jobs/:id/retry` (repo/backend/src/routes/jobs.ts:16)
- `GET /api/listings` (repo/backend/src/routes/listings.ts:9)
- `GET /api/listings/:id` (repo/backend/src/routes/listings.ts:19)
- `POST /api/listings` (repo/backend/src/routes/listings.ts:29)
- `PATCH /api/listings/:id` (repo/backend/src/routes/listings.ts:40)
- `POST /api/listings/:id/publish` (repo/backend/src/routes/listings.ts:52)
- `DELETE /api/listings/:id` (repo/backend/src/routes/listings.ts:62)
- `GET /api/storefront/listings` (repo/backend/src/routes/listings.ts:73)
- `POST /api/media/upload-sessions` (repo/backend/src/routes/media.ts:11)
- `PUT /api/media/upload-sessions/:sessionId/chunks/:chunkIndex` (repo/backend/src/routes/media.ts:22)
- `POST /api/media/upload-sessions/:sessionId/finalize` (repo/backend/src/routes/media.ts:33)
- `GET /api/media/assets/:assetId/signed-url` (repo/backend/src/routes/media.ts:44)
- `GET /api/moderation/queue` (repo/backend/src/routes/moderation.ts:9)
- `POST /api/moderation/listings/:listingId/decision` (repo/backend/src/routes/moderation.ts:17)
- `GET /api/orders` (repo/backend/src/routes/orders.ts:9)
- `POST /api/orders` (repo/backend/src/routes/orders.ts:23)
- `GET /api/orders/:id` (repo/backend/src/routes/orders.ts:33)
- `POST /api/orders/:id/cancel` (repo/backend/src/routes/orders.ts:43)
- `POST /api/orders/:id/complete` (repo/backend/src/routes/orders.ts:53)
- `POST /api/payments/capture` (repo/backend/src/routes/payments.ts:9)
- `POST /api/payments/import-settlement` (repo/backend/src/routes/payments.ts:19)
- `GET /api/payments/:id` (repo/backend/src/routes/payments.ts:29)
- `GET /api/refunds` (repo/backend/src/routes/refunds.ts:9)
- `POST /api/refunds` (repo/backend/src/routes/refunds.ts:19)
- `POST /api/refunds/:id/approve` (repo/backend/src/routes/refunds.ts:29)
- `POST /api/refunds/import-confirmation` (repo/backend/src/routes/refunds.ts:40)
- `POST /api/reviews` (repo/backend/src/routes/reviews.ts:9)
- `POST /api/reviews/:id/images` (repo/backend/src/routes/reviews.ts:19)
- `GET /api/reviews/:id` (repo/backend/src/routes/reviews.ts:30)
- `GET /api/storefront/sellers/:sellerId/credit-metrics` (repo/backend/src/routes/storefront.ts:7)
- `GET /api/storefront/sellers/:sellerId/reviews` (repo/backend/src/routes/storefront.ts:16)
- `GET /api/users/me` (repo/backend/src/routes/users.ts:10)
- `GET /api/users/me/store-credit` (repo/backend/src/routes/users.ts:19)
- `PATCH /api/users/me/seller-profile` (repo/backend/src/routes/users.ts:28)
- `POST /api/admin/users` (repo/backend/src/routes/users.ts:45)
- `PATCH /api/admin/users/:id/status` (repo/backend/src/routes/users.ts:61)
- `GET /health/live` (repo/backend/src/server.ts:92)
- `GET /health/ready` (repo/backend/src/server.ts:93)

### API Test Mapping Table
| Endpoint | Covered | Test type | Test files | Evidence |
|---|---|---|---|---|
| `GET /api/admin/users` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:280 (admin can manage content rules and seller deactivation removes published listings) |
| `GET /api/admin/users/:id/pending-reset-token` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1256 (forgot password does not expose token and reset flow works) |
| `PATCH /api/admin/users/:id/roles` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:565 (admin user list roles update pending refunds and store credit endpoints work) |
| `GET /api/admin/refunds/pending` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:586 (admin user list roles update pending refunds and store credit endpoints work) |
| `GET /api/admin/refunds` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:586 (admin user list roles update pending refunds and store credit endpoints work) |
| `POST /api/admin/users/:id/store-credit` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:568 (admin user list roles update pending refunds and store credit endpoints work) |
| `POST /api/admin/webhooks/subscriptions` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:614 (webhook subscription created and disallowed CIDR target rejected) |
| `PATCH /api/admin/webhooks/subscriptions/:id` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/admin/orders/:id/force-complete` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/admin/backups/run` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/reviews/:id/appeal` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:746 (review image attach enforces max 5 and appeal duplicate rejected) |
| `POST /api/appeals` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:184 (order, payment, completion, review, appeal flow works) |
| `GET /api/arbitration/appeals` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1436 (negative RBAC checks return 403 for wrong roles) |
| `POST /api/arbitration/appeals/:id/resolve` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:193 (order, payment, completion, review, appeal flow works) |
| `GET /api/assets/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1742 (security regression: cross-seller capture and foreign asset access are rejected) |
| `GET /api/assets/:id/metadata` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1742 (security regression: cross-seller capture and foreign asset access are rejected) |
| `GET /download/:assetId` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:486 (signed URL download validates valid expired and tampered signatures); URL built dynamically from signed URL response |
| `GET /api/admin/audit-logs` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `GET /api/admin/audit-logs/:id` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/auth/register` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1101 (public register creates account and rejects duplicate email) |
| `POST /api/auth/forgot-password` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1246 (forgot password does not expose token and reset flow works) |
| `POST /api/auth/reset-password` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1285 (forgot password does not expose token and reset flow works) |
| `POST /api/auth/login` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:35 ((outside test)) |
| `POST /api/auth/refresh` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1490 (jwt tamper missing auth and old refresh token are rejected) |
| `POST /api/auth/logout` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1490 (jwt tamper missing auth and old refresh token are rejected) |
| `GET /api/admin/content-rules` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/admin/content-rules` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:251 (admin can manage content rules and seller deactivation removes published listings) |
| `PATCH /api/admin/content-rules/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1335 (admin can update and soft-delete content rules) |
| `DELETE /api/admin/content-rules/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1344 (admin can update and soft-delete content rules) |
| `POST /api/admin/content-rules/:id/test` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `GET /api/admin/jobs` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/admin/jobs/:id/retry` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `GET /api/listings` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:571 (admin user list roles update pending refunds and store credit endpoints work) |
| `GET /api/listings/:id` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/listings` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:57 (seller can create listing, upload media, and publish) |
| `PATCH /api/listings/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1455 (cross-user object authorization is enforced) |
| `POST /api/listings/:id/publish` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:117 (seller can create listing, upload media, and publish) |
| `DELETE /api/listings/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1377 (seller listings management and order detail auth) |
| `GET /api/storefront/listings` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `POST /api/media/upload-sessions` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:66 (seller can create listing, upload media, and publish) |
| `PUT /api/media/upload-sessions/:sessionId/chunks/:chunkIndex` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:83 (seller can create listing, upload media, and publish) |
| `POST /api/media/upload-sessions/:sessionId/finalize` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:109 (seller can create listing, upload media, and publish) |
| `GET /api/media/assets/:assetId/signed-url` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:482 (signed URL download validates valid expired and tampered signatures) |
| `GET /api/moderation/queue` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1414 (negative RBAC checks return 403 for wrong roles) |
| `POST /api/moderation/listings/:listingId/decision` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:2377 (audit log records key operations across listing, moderation, order, payment, review, appeal, and refund) |
| `GET /api/orders` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1225 (orders list returns actor-scoped rows) |
| `POST /api/orders` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:147 (order, payment, completion, review, appeal flow works) |
| `GET /api/orders/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1384 (seller listings management and order detail auth) |
| `POST /api/orders/:id/cancel` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1464 (cross-user object authorization is enforced) |
| `POST /api/orders/:id/complete` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:167 (order, payment, completion, review, appeal flow works) |
| `POST /api/payments/capture` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:159 (order, payment, completion, review, appeal flow works) |
| `POST /api/payments/import-settlement` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1528 (settlement import deduplication skips duplicate records) |
| `GET /api/payments/:id` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:2213 (payment data isolation blocks unrelated buyer from viewing payment) |
| `GET /api/refunds` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:546 (refund list enforces object auth and returns history) |
| `POST /api/refunds` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:216 (refund threshold and approval path enforced) |
| `POST /api/refunds/:id/approve` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:237 (refund threshold and approval path enforced) |
| `POST /api/refunds/import-confirmation` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:1564 (refund confirmation import persists reconciliation record) |
| `POST /api/reviews` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:175 (order, payment, completion, review, appeal flow works) |
| `POST /api/reviews/:id/images` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:743 (review image attach enforces max 5 and appeal duplicate rejected) |
| `GET /api/reviews/:id` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `GET /api/storefront/sellers/:sellerId/credit-metrics` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:2165 (storefront credit metrics endpoint returns expected values) |
| `GET /api/storefront/sellers/:sellerId/reviews` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:516 (storefront ranking supports verified purchase first and returns badges) |
| `GET /api/users/me` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:280 (admin can manage content rules and seller deactivation removes published listings) |
| `GET /api/users/me/store-credit` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:571 (admin user list roles update pending refunds and store credit endpoints work) |
| `PATCH /api/users/me/seller-profile` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:2176 (sensitive seller fields are encrypted at rest and returned masked) |
| `POST /api/admin/users` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:568 (admin user list roles update pending refunds and store credit endpoints work) |
| `PATCH /api/admin/users/:id/status` | yes | true no-mock HTTP | `repo/backend/test/api.test.ts` | repo/backend/test/api.test.ts:283 (admin can manage content rules and seller deactivation removes published listings) |
| `GET /health/live` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |
| `GET /health/ready` | no | unit-only / indirect | `-` | No matching request found in repo/backend/test/api.test.ts |

### API Test Classification
- **True No-Mock HTTP:** `repo/backend/test/api.test.ts` (bootstraps real app with `buildServer()` and uses `app.inject`, no `vi.mock`/`jest.mock` in this file; see `repo/backend/test/api.test.ts:10`, `repo/backend/test/api.test.ts:35`).
- **HTTP with Mocking:** none found in backend test files.
- **Non-HTTP (unit/integration without HTTP):** `repo/backend/test/domain.test.ts`, `repo/backend/test/security.test.ts`, `repo/backend/test/security-hardening.test.ts`, `repo/backend/test/worker.test.ts`.

### Mock Detection
- Mocking detected in `repo/backend/test/worker.test.ts` only: `vi.mock` of `node:child_process` (`:39`), `node:util` (`:43`), `../src/config.js` (`:47`), `../src/repositories/admin-repository.js` (`:55`), `../src/repositories/media-repository.js` (`:64`), `../src/db/pool.js` (`:77`), `../src/storage/file-storage.js` (`:83`), `sharp` (`:89`).
- No backend API route tests are classified as mocked HTTP tests.

### Coverage Summary
- Total endpoints: **69**
- Endpoints with HTTP tests: **55**
- Endpoints with TRUE no-mock HTTP tests: **55**
- HTTP coverage: **79.71%**
- True API coverage: **79.71%**

### Unit Test Summary
#### Backend Unit Tests
- Test files: `repo/backend/test/domain.test.ts`, `repo/backend/test/security.test.ts`, `repo/backend/test/security-hardening.test.ts`, `repo/backend/test/worker.test.ts`.
- Modules covered: domain invariants/constants (`repo/backend/src/domain.ts` via `domain.test.ts`), security helpers (`repo/backend/src/security/encryption.ts`, `repo/backend/src/security/network.ts`, `repo/backend/src/security/regex-safety.ts` via security tests), worker/job orchestration (`repo/backend/src/jobs/worker.ts` via `worker.test.ts`).
- Important backend modules not unit-tested directly: route handlers under `repo/backend/src/routes/*.ts`, auth plugin/guards in `repo/backend/src/plugins/auth.ts`, rate-limit/replay-guard plugins (`repo/backend/src/plugins/rate-limit.ts`, `repo/backend/src/plugins/replay-guard.ts`), and most service classes (`repo/backend/src/services/*.ts`) as isolated unit tests.

#### Frontend Unit Tests (STRICT REQUIREMENT)
- Frontend test files found: `repo/frontend/src/app/app.spec.ts`, `repo/frontend/src/app/core/api.service.spec.ts`, `repo/frontend/src/app/core/auth.guard.spec.ts`, `repo/frontend/src/app/core/auth.service.spec.ts`, `repo/frontend/src/app/features/auth/login.component.spec.ts`, `repo/frontend/src/app/features/upload/upload.component.spec.ts`, `repo/frontend/src/app/features/orders/payment-capture.component.spec.ts`, `repo/frontend/src/app/features/storefront/seller-storefront.component.spec.ts`, `repo/frontend/src/app/features/admin/keyword-rules.component.spec.ts`, `repo/frontend/src/app/features/admin/refund-approval.component.spec.ts`, `repo/frontend/src/app/features/admin/user-management.component.spec.ts`.
- Framework/tools detected with direct evidence: Angular TestBed (`repo/frontend/src/app/app.spec.ts:1`), Vitest (`repo/frontend/src/app/core/api.service.spec.ts:4`), component imports/render (`repo/frontend/src/app/features/auth/login.component.spec.ts:7`, `repo/frontend/src/app/features/upload/upload.component.spec.ts:10`).
- Components/modules covered: `App`, `ApiService`, `AuthService`, `authOnlyGuard/landingGuard/roleGuard`, `LoginComponent`, `UploadComponent`, `PaymentCaptureComponent`, `SellerStorefrontComponent`, `KeywordRulesComponent`, `RefundApprovalComponent`, `UserManagementComponent`.
- Important frontend components/modules not tested: `RegisterComponent`, `ForgotPasswordComponent`, `ResetPasswordComponent`, `ListingBrowseComponent`, `ListingCreateComponent`, `ListingDetailComponent`, `MyListingsComponent`, `OrderListComponent`, `OrderDetailComponent`, `ReviewFormComponent`, `ReviewListComponent`, `ModerationQueueComponent`, `ModerationDecisionComponent`, `AppealQueueComponent`, `AppealDecisionComponent`, `AuditLogComponent`, `jwt.interceptor.ts`, `token-refresh.interceptor.ts`, `toast.service.ts`.
- **Frontend unit tests: PRESENT**
- Cross-layer observation: backend API coverage breadth is higher than frontend component coverage breadth; not missing, but frontend test depth is comparatively thinner on critical screens.

### API Observability Check
- Strong: most API tests show explicit method/path/payload and status/body assertions (e.g., `repo/backend/test/api.test.ts:150`, `repo/backend/test/api.test.ts:219`, `repo/backend/test/api.test.ts:483`).
- Weak spots: a minority of flows rely on indirect URL composition (signed-download via `parsed.pathname` at `repo/backend/test/api.test.ts:486`), reducing direct endpoint readability.

### Tests Check
- Success/failure/edge coverage is broad in `api.test.ts` (auth, RBAC, quotas, replay, rate-limit, refund thresholds, appeal outcomes, regex safety, signed URLs).
- `run_tests.sh` is Docker-assisted for PostgreSQL (`repo/run_tests.sh:49`), but still requires host/package-manager execution (`npm --prefix ...`) and optional host Node path (`repo/run_tests.sh:52`, `repo/run_tests.sh:72`, `repo/run_tests.sh:85`).
- Fullstack real FE↔BE end-to-end tests are not present; frontend tests are component/unit with mocked API service or HttpClient.

### Test Quality & Sufficiency
- Verdict: **PARTIAL PASS** (strong backend API rigor; incomplete endpoint coverage and missing fullstack E2E).

### Test Coverage Score (0–100)
- **78/100**

### Score Rationale
- + strong no-mock HTTP integration suite depth in `repo/backend/test/api.test.ts`
- + frontend unit tests clearly present with direct component evidence
- - 16/69 endpoints remain unverified by direct HTTP test calls
- - no real frontend-backend end-to-end flow automation

### Key Gaps
- Uncovered backend endpoints include admin jobs/audit logs/backup run, `/api/storefront/listings`, `/api/listings/:id`, `/api/reviews/:id`, and health endpoints.
- Frontend critical feature screens lack tests (listing creation/browse/detail, moderation/arbitration queues/decisions, review form/list, audit log).

### Confidence & Assumptions
- Confidence: **high** for static endpoint/test mapping, **medium** for dynamic-path coverage inference (`/download/:assetId`).
- Assumptions: static source reflects active runtime routing; no hidden/generated routes outside inspected files.

## 2) README Audit

### High Priority Issues
- Missing exact `docker-compose up` command (README uses `docker compose -p localtrade73 up` instead).
- README includes runtime package-manager steps (`npm ...`), violating strict Docker-contained environment rule.
- README requires manual DB CLI restore step (`psql`), violating strict no-manual-DB-setup rule.
- README does not explicitly declare project type at top (`repo/README.md:1`).

### Medium Priority Issues
- Verification section is UI-only and does not provide explicit API curl/Postman examples despite backend availability (`repo/README.md:71`).

### Low Priority Issues
- Startup and test instructions are split across sections and mix strict-production notes with local usage; could be separated more clearly.

### Hard Gate Failures
- Missing exact `docker-compose up` command (README uses `docker compose -p localtrade73 up` instead).
- README includes runtime package-manager steps (`npm ...`), violating strict Docker-contained environment rule.
- README requires manual DB CLI restore step (`psql`), violating strict no-manual-DB-setup rule.

### README Verdict (PASS / PARTIAL PASS / FAIL)
- **FAIL**

### README Gate-by-Gate Status
- Formatting/readability: **PASS** (`repo/README.md:1`)
- Startup instructions (backend/fullstack strict gate requiring exact `docker-compose up`): **FAIL** (`repo/README.md:8`)
- Access method (URL + port): **PASS** (`repo/README.md:13`)
- Verification method: **PASS** (`repo/README.md:71`)
- Environment rule (Docker-contained/no runtime installs/manual DB setup): **FAIL** (`repo/README.md:37`, `repo/README.md:66`)
- Demo credentials (all roles): **PASS** (`repo/README.md:19`)

## Final Verdicts
- Test Coverage Audit: **PARTIAL PASS**
- README Audit: **FAIL**
