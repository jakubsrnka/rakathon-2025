FROM node:23-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PORT=80
RUN corepack enable
RUN corepack prepare pnpm@10.7.1 --activate

FROM base AS builder

ARG PUBLIC_PB_URL
ARG PB_SUPERUSER_EMAIL
ARG PB_SUPERUSER_PASSWORD
ARG OPENAI_API_KEY

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . ./
RUN pnpm run build

FROM base
RUN mkdir -p /app
WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
COPY --from=builder /app/build /app/build

ENV PORT=80
EXPOSE 80
CMD ["node", "build"]