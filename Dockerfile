FROM docker.registry.moah/library/node:18.14.1-alpine AS builder

ENV NODE_ENV build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --production

FROM docker.registry.moah/library/node:18.14.1-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

CMD ["node", "dist/main.js"]