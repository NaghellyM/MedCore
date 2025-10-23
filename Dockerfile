FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./ 

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init curl

RUN addgroup -g 1001 -S nodejs
RUN adduser -S medcore -u 1001

WORKDIR /app

COPY --from=builder --chown=medcore:nodejs /app/dist ./dist
COPY --from=builder --chown=medcore:nodejs /app/package*.json ./

RUN npm prune --omit=dev
RUN npm install module-alias --production

USER medcore
EXPOSE 5173

ENTRYPOINT ["dumb-init", "--"]
CMD ["npx", "http-server", "dist", "-p", "5173"]


