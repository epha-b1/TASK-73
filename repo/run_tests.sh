#!/usr/bin/env bash
set -euo pipefail

POSTGRES_PORT="55432"
DATABASE_URL="postgres://localtrade:localtrade@localhost:${POSTGRES_PORT}/localtrade"
COMPOSE_PROJECT_NAME="localtrade73"

backend_passed=0
backend_failed=0
backend_total=0
frontend_passed=0
frontend_failed=0
frontend_total=0

parse_vitest_counts() {
  python3 - "$1" <<'PY'
import re
import sys

path = sys.argv[1]
text = open(path, 'r', encoding='utf-8', errors='ignore').read()
text = re.sub(r'\x1b\[[0-9;]*[A-Za-z]', '', text)
lines = [line for line in text.splitlines() if 'Tests' in line]
line = lines[-1] if lines else ''

passed = 0
failed = 0
total = 0

m = re.search(r'(\d+)\s+passed', line)
if m:
    passed = int(m.group(1))

m = re.search(r'(\d+)\s+failed', line)
if m:
    failed = int(m.group(1))

m = re.search(r'\((\d+)\)', line)
if m:
    total = int(m.group(1))
else:
    total = passed + failed

print(f"{passed} {failed} {total}")
PY
}

echo "Starting postgres test dependency..."
POSTGRES_PORT="$POSTGRES_PORT" docker compose -p "$COMPOSE_PROJECT_NAME" up -d postgres

echo "Installing backend dependencies..."
npm --prefix backend ci

echo "Running backend migrations..."
DATABASE_URL="$DATABASE_URL" npm --prefix backend run migrate

echo "Seeding backend users/roles..."
DATABASE_URL="$DATABASE_URL" npm --prefix backend run seed

echo "Running backend tests..."
backend_log="$(mktemp)"
set +e
DATABASE_URL="$DATABASE_URL" npm --prefix backend test | tee "$backend_log"
backend_status=${PIPESTATUS[0]}
set -e
read -r backend_passed backend_failed backend_total < <(parse_vitest_counts "$backend_log")

node_major="$(node -p "process.versions.node.split('.')[0]")"

if [ "$node_major" -ge 20 ]; then
  echo "Installing frontend dependencies..."
  npm --prefix frontend ci

  echo "Running frontend tests..."
  frontend_log="$(mktemp)"
  set +e
  npm --prefix frontend test -- --watch=false | tee "$frontend_log"
  frontend_status=${PIPESTATUS[0]}
  set -e
  read -r frontend_passed frontend_failed frontend_total < <(parse_vitest_counts "$frontend_log")

  echo "Running frontend build check..."
  npm --prefix frontend run build
else
  echo "Host Node.js $(node -v) is below frontend requirement. Running frontend checks in Node 20 container..."
  frontend_log="$(mktemp)"
  set +e
  docker run --rm \
    -v "$PWD/frontend:/workspace/frontend" \
    -w /workspace/frontend \
    node:20-alpine \
    sh -lc 'npm ci && npm test -- --watch=false && npm run build' | tee "$frontend_log"
  frontend_status=${PIPESTATUS[0]}
  set -e
  read -r frontend_passed frontend_failed frontend_total < <(parse_vitest_counts "$frontend_log")
fi

total_passed=$((backend_passed + frontend_passed))
total_failed=$((backend_failed + frontend_failed))
total_tests=$((backend_total + frontend_total))

echo "Tests: ${total_passed} passed, ${total_failed} failed, ${total_tests} total"

if [ "$backend_status" -ne 0 ] || [ "$frontend_status" -ne 0 ] || [ "$total_failed" -ne 0 ]; then
  exit 1
fi

exit 0
