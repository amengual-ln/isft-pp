FROM node:24-alpine

RUN npm install --global pnpm@10.12.1

WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages/api-client/package.json packages/api-client/package.json
RUN pnpm install --frozen-lockfile

COPY apps/web apps/web
COPY packages/api-client packages/api-client

EXPOSE 5173

CMD ["pnpm", "--filter", "web", "dev", "--host", "0.0.0.0"]
