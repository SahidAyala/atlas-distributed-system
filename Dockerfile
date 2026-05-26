# ─── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Enable corepack so pnpm is available without a separate install step.
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lockfile + manifest first for better layer caching.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build.
COPY . .
RUN pnpm build

# ─── Serve stage ──────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS server

# Remove default nginx config; replace with SPA-friendly routing config.
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from builder.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
