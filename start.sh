#!/bin/bash

echo "🚀 Starting SaaS Core Platform with pnpm..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if pnpm is available locally (for development)
if command -v pnpm &> /dev/null; then
    echo "📦 pnpm found locally. You can also run:"
    echo "   Frontend: cd frontend && pnpm dev"
    echo "   Backend: cd backend && ./mvnw spring-boot:run"
    echo ""
fi

# Clean up previous builds if needed
echo "🧹 Cleaning up previous containers..."
docker compose down --remove-orphans 2>/dev/null || true

# Build and start containers
echo "📦 Building and starting containers with pnpm..."
docker compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "🔍 Checking service status..."
docker compose ps

echo ""
echo "✅ Services are starting up!"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8080"
echo ""
echo "📋 To view logs: docker compose logs -f"
echo "🛑 To stop: docker compose down"
echo "🔄 To rebuild: docker compose up --build --force-recreate"
echo "🧹 To clean cache: docker compose down --rmi all"
