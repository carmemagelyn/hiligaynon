#!/bin/bash

# Hiligaynon Vocabulary App - Deploy Script
# This script prepares and deploys your app

echo "🇵🇭 Deploying Hiligaynon Vocabulary Learning App..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
if npm install; then
    print_status "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting (if available)
if npm run lint --if-present; then
    print_status "Code linting passed"
else
    print_warning "Linting not available or failed"
fi

# Build the project
echo "🔨 Building project for production..."
if npm run build; then
    print_status "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    print_error "Build directory 'dist' not found"
    exit 1
fi

print_status "Build files ready in 'dist' directory"

echo ""
echo "🚀 Ready to deploy! Choose your deployment option:"
echo ""
echo "1. 📁 Manual Upload:"
echo "   - Upload the 'dist' folder to your hosting provider"
echo "   - Or drag and drop 'dist' folder to Netlify"
echo ""
echo "2. 🔧 Netlify CLI (if installed):"
echo "   netlify deploy --prod --dir=dist"
echo ""
echo "3. 🔧 Vercel CLI (if installed):"
echo "   vercel --prod"
echo ""
echo "4. 🔧 Firebase (if configured):"
echo "   firebase deploy"
echo ""

# Check for environment variables
echo "🔍 Checking environment configuration..."

if [ -f ".env.local" ]; then
    print_status ".env.local file found - remember to set these variables in your hosting platform"
else
    print_warning "No .env.local file found - you may need to configure environment variables"
fi

echo ""
echo "📋 Required environment variables for production:"
echo "   - VITE_AWS_ACCESS_KEY_ID (for speech synthesis)"
echo "   - VITE_AWS_SECRET_ACCESS_KEY (for speech synthesis)"
echo "   - VITE_AWS_REGION (optional, defaults to ap-southeast-1)"
echo ""

# Show build size
if command -v du &> /dev/null; then
    BUILD_SIZE=$(du -sh dist 2>/dev/null | cut -f1)
    print_status "Build size: $BUILD_SIZE"
fi

echo ""
echo "🎓 Your Hiligaynon vocabulary app is ready for Korean and Chinese students!"
echo "📚 Features included:"
echo "   ✅ Interactive vocabulary cards"
echo "   ✅ Speech synthesis with AWS Polly"
echo "   ✅ Progress tracking"
echo "   ✅ Quiz system"
echo "   ✅ Responsive design"
echo "   ✅ Professional icons"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed deployment instructions"
echo ""

print_status "Deployment preparation complete!"