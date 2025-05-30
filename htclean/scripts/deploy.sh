#!/bin/bash

# Configuration
VPS_USER="mohamed"
VPS_HOST="107.172.3.187"
APP_NAME="htclean"
REMOTE_DIR="/home/mohamed/sites/htclean"

echo "🚀 Starting deployment process..."

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# Create deployment directory
echo "📁 Creating deployment package..."
rm -rf deploy
mkdir -p deploy

# Copy necessary files
cp -r .next deploy/
cp -r public deploy/

# Create .env file
cat > deploy/.env << EOL
NEXT_PUBLIC_SUPABASE_URL=https://yzldswxmkqoereaqtudu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bGRzd3hta3FvZXJlYXF0dWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTA1NjgsImV4cCI6MjA2MzY4NjU2OH0.cEKtQ79FoEONzIHBbUoJyCkYT7u85ffXU8kZxA82hZ4
NODE_ENV=production
EOL

# Create docker-compose.yml
cat > deploy/docker-compose.yml << EOL
services:
  app:
    build: .
    container_name: htclean
    restart: always
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    networks:
      - proxy-network

networks:
  proxy-network:
    external: true
EOL

# Create deployment archive
echo "📦 Creating deployment archive..."
cd deploy && tar -czf ../deploy.tar.gz . && cd ..

# Copy to VPS
echo "📤 Copying to VPS..."
ssh $VPS_USER@$VPS_HOST -i /Users/mohamedhamed/.ssh/racknerd/racknerd1 "mkdir -p $REMOTE_DIR"
scp deploy.tar.gz -i /Users/mohamedhamed/.ssh/racknerd/racknerd1 $VPS_USER@$VPS_HOST:$REMOTE_DIR/

# Deploy on VPS
echo "🚀 Deploying on VPS..."
ssh $VPS_USER@$VPS_HOST -i /Users/mohamedhamed/.ssh/racknerd/racknerd1 "cd $REMOTE_DIR && \
    tar -xzf deploy.tar.gz && \
    docker compose down || true && \
    docker compose build --no-cache && \
    docker compose up -d && \
    rm deploy.tar.gz"

# Cleanup
echo "🧹 Cleaning up..."
rm -rf deploy deploy.tar.gz

echo "✅ Deployment complete!"