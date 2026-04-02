# Task 73 — Submission Folder Structure

Task ID: 73
Project Type: fullstack
Stack: Angular + Fastify + PostgreSQL

---

## ZIP Root Layout

```
73/
├── docs/
│   ├── api/
│   ├── api-spec.md
│   ├── data-model.md
│   ├── deployment.md
│   ├── design.md
│   ├── questions.md
│   ├── requirements.md
│   ├── security.md
│   ├── structure.md
│   └── test-plan.md
├── repo/                             # project code lives directly here
├── sessions/
│   ├── develop-1.json                # primary development session
│   └── bugfix-1.json                 # remediation session (if needed)
├── metadata.json
└── prompt.md
```

### metadata.json

```json
{
  "task_id": "73",
  "project_type": "repo",
  "frontend_tech": "angular",
  "backend_tech": "fastify",
  "database": "postgresql",
  "language": "typescript"
}
```

---

## repo/ — Full Project Structure

```
repo/
├── backend/
│   ├── src/
│   │   ├── app.ts                    # main application entry
│   │   ├── server.ts                 # server setup
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── types/
│   ├── test/
│   ├── migrations/
│   ├── dist/
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   ├── Dockerfile
│   └── .dockerignore
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── pipes/
│   │   ├── assets/
│   │   ├── environments/
│   │   ├── main.ts
│   │   ├── index.html
│   │   └── styles.css
│   ├── public/
│   ├── dist/
│   ├── node_modules/
│   ├── .angular/
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   ├── proxy.conf.json
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .editorconfig
│   ├── .gitignore
│   └── .prettierrc
│
├── docker-compose.yml
├── run_tests.sh
├── README.md
└── .dockerignore
```

---

## What Must NOT Be in the ZIP

- no `node_modules/` directories
- no `dist/` or compiled output
- no `.env` with real credentials (only `.env.example`)
- no temp or scratch files
- no `.angular/cache` or build artifacts

---

## Sessions Naming Rules

- primary development session → `sessions/develop-1.json`
- remediation session → `sessions/bugfix-1.json`
- additional sessions → `develop-2.json`, `bugfix-2.json`, etc.

---

## Submission Checklist

- [ ] `docker compose up` completes without errors
- [ ] Cold start tested in clean environment
- [ ] README URLs, ports, and credentials match running app
- [ ] `docs/design.md` and `docs/api-spec.md` present
- [ ] `docs/questions.md` has question + assumption + solution for each item
- [ ] Backend and frontend tests exist and pass
- [ ] No `node_modules/`, `dist/`, or compiled output in ZIP
- [ ] No real credentials in any config file
- [ ] All prompt requirements implemented — no silent substitutions
- [ ] `sessions/develop-1.json` trajectory file present
- [ ] `metadata.json` at root with all required fields
- [ ] `prompt.md` at root, unmodified
- [ ] Running application screenshots captured
- [ ] Angular frontend serves correctly
- [ ] Fastify backend API endpoints functional