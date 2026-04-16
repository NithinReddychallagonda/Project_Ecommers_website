#!/bin/bash

# StyleCart MongoDB Setup Script
# This script helps you set up both frontend and backend

set -e

echo "======================================"
echo "StyleCart - MongoDB Setup"
echo "======================================"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
npm install

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd server
npm install
cd ..

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1️⃣  Configure Backend:"
echo "   - Edit server/.env"
echo "   - Add your MongoDB URI"
echo "   - Update JWT_SECRET (optional)"
echo ""
echo "2️⃣  Start Backend:"
echo "   cd server && npm run dev"
echo ""
echo "3️⃣  Start Frontend (new terminal):"
echo "   npm run dev"
echo ""
echo "4️⃣  Open http://localhost:8080"
echo ""
echo "======================================"
echo "Database: MongoDB Atlas"
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:5000"
echo "======================================"
