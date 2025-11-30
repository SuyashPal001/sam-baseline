#!/bin/bash
set -e

echo "🔨 Building shared TypeScript utilities..."

# Clean previous build
rm -rf dist/shared

# Compile TypeScript: src/shared/ → dist/shared/nodejs/node_modules/shared/
npx tsc --project tsconfig.shared.json

echo "✅ Shared utilities compiled successfully!"
echo "📦 Output: dist/shared/nodejs/node_modules/shared/"

# Verify the build
ls -la dist/shared/nodejs/node_modules/shared/
