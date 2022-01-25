#stage 1 Building
FROM node:latest AS builder
WORKDIR /app
COPY . .
RUN corepack enable
RUN yarn
RUN yarn build
COPY  package*.json ./dist/

# Stage 2 to production
FROM node:latest AS production

COPY --from=builder /app/dist/ ./
COPY --from=builder /app/node_modules/ ./

RUN corepack enable
RUN yarn global add serve

EXPOSE 3000
CMD [ "serve", "-s", "dist" ]
