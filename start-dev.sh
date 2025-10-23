#!/bin/bash

# Maya-Web Development Startup Script
# This script starts both the frontend and backend servers

echo "🚀 Starting Maya-Web Development Environment..."
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
    echo ""
fi

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo "📁 Creating backend directory..."
    mkdir backend
fi

# Copy backend files
echo "📋 Setting up backend files..."
cp backend-package.json backend/package.json
cp server.js backend/
cp src/routes/api.ts backend/routes/
cp src/middleware/auth.ts backend/middleware/
cp src/lib/collaborationManager.ts backend/lib/
cp src/lib/supabase.ts backend/lib/
cp src/services/openai.ts backend/services/
cp src/services/multiModelAI.ts backend/services/
cp backend.env.example backend/.env

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo ""
echo "🎯 Starting servers..."
echo "===================="

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "🔧 Starting backend server on port 3001..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server on port 8080..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Maya-Web is now running!"
echo "=========================="
echo "🌐 Frontend: http://localhost:8080"
echo "🔧 Backend API: http://localhost:3001/api"
echo "📊 Health Check: http://localhost:3001/health"
echo "🤝 WebSocket: ws://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID
