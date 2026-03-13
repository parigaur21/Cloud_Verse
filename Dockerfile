# Stage 1: Build Frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY cloudverse-frontend/package*.json ./
RUN npm install
COPY cloudverse-frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:20-slim AS backend-builder
WORKDIR /app/backend
# Install build dependencies for native modules
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Stage 3: Final Production Image
FROM node:20-slim
WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy Frontend Build
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

# Copy Backend Apps
COPY --from=backend-builder /app/backend /app/backend
WORKDIR /app/backend

# Copy custom Nginx config
COPY nginx.render.conf /etc/nginx/nginx.conf

# Setup Start Script
RUN echo "#!/bin/sh\n\
npm start &\n\
nginx -g 'daemon off;'" > /app/start.sh
RUN chmod +x /app/start.sh

# Render uses port 80 by default for Nginx
EXPOSE 80

CMD ["/app/start.sh"]
