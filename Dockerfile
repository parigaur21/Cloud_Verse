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

# Copy Frontend Build to standard Debian path
COPY --from=frontend-builder /app/frontend/dist /var/www/html

# Copy Backend Apps
COPY --from=backend-builder /app/backend /app/backend
WORKDIR /app/backend

# Copy custom Nginx config and remove default site configs
COPY nginx.render.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default

# Setup Start Script
RUN echo "#!/bin/sh\n\
echo '🚀 Starting CloudVerse Backend...'\n\
cd /app/backend && PORT=5000 npm start > /app/backend.log 2>&1 &\n\
echo '🌐 Starting Nginx Proxy on port \$PORT...'\n\
sed -i \"s/RENDER_PORT/\${PORT:-10000}/g\" /etc/nginx/nginx.conf\n\
nginx -g 'daemon off;'" > /app/start.sh
RUN chmod +x /app/start.sh

# The EXPOSE is mostly for documentation on Render
EXPOSE 10000

CMD ["/app/start.sh"]
