@echo off
REM Maya-Web Development Startup Script for Windows
REM This script starts both the frontend and backend servers

echo 🚀 Starting Maya-Web Development Environment...
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version
echo ✅ npm version: 
npm --version
echo.

REM Install frontend dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
    echo.
)

REM Create backend directory if it doesn't exist
if not exist "backend" (
    echo 📁 Creating backend directory...
    mkdir backend
)

REM Copy backend files
echo 📋 Setting up backend files...
copy backend-package.json backend\package.json
copy server.js backend\
if not exist "backend\routes" mkdir backend\routes
copy src\routes\api.ts backend\routes\
if not exist "backend\middleware" mkdir backend\middleware
copy src\middleware\auth.ts backend\middleware\
if not exist "backend\lib" mkdir backend\lib
copy src\lib\collaborationManager.ts backend\lib\
copy src\lib\supabase.ts backend\lib\
if not exist "backend\services" mkdir backend\services
copy src\services\openai.ts backend\services\
copy src\services\multiModelAI.ts backend\services\
copy backend.env.example backend\.env

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
if not exist "node_modules" (
    npm install
)
cd ..

echo.
echo 🎯 Starting servers...
echo ====================

REM Start backend server
echo 🔧 Starting backend server on port 3001...
start "Maya-Web Backend" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
echo 🎨 Starting frontend server on port 8080...
start "Maya-Web Frontend" cmd /k "npm run dev"

echo.
echo ✅ Maya-Web is now running!
echo ==========================
echo 🌐 Frontend: http://localhost:8080
echo 🔧 Backend API: http://localhost:3001/api
echo 📊 Health Check: http://localhost:3001/health
echo 🤝 WebSocket: ws://localhost:3001
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
