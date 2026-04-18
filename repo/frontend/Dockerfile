FROM node:20-bookworm-slim AS build
WORKDIR /app
# Debian-slim base: avoids the Alpine-on-some-hosts npm "Exit handler never
# called" intermittent failure we have observed during CI.
COPY package.json package-lock.json ./
RUN set -eu; \
    npm config set fetch-retries 5; \
    npm config set fetch-retry-mintimeout 20000; \
    npm config set fetch-retry-maxtimeout 120000; \
    for i in 1 2 3; do \
      rm -rf node_modules; \
      npm ci --no-audit --no-fund --include=dev --loglevel=error || true; \
      if [ -x node_modules/.bin/ng ]; then \
        echo "npm ci succeeded (ng present on attempt $i)"; break; \
      fi; \
      echo "attempt $i did not install @angular/cli; retrying"; \
      sleep 5; \
    done; \
    test -x node_modules/.bin/ng
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
