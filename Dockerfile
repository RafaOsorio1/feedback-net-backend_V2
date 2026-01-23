# ---------- Base ----------
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# System deps (PRISMA NEEDS THIS)
RUN apt-get update -y \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

RUN corepack enable
WORKDIR /app

# ---------- Dependencies ----------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install

# ---------- Build ----------
FROM deps AS build

COPY . .

RUN pnpm prisma generate
RUN pnpm run build

# ---------- Production ----------
FROM node:20-slim AS production

WORKDIR /app

# OpenSSL ALSO needed at runtime
RUN apt-get update -y \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

# Copy only what is needed
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json

EXPOSE 3111

CMD ["node", "dist/main.js"]
