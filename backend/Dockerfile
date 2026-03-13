# Stage 1: Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Production stage
FROM node:20-slim

WORKDIR /app

# Copy production node_modules and code from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# SQLite needs a persistent directory if you want data to survive restarts
RUN mkdir -p /app/data

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "start"]
