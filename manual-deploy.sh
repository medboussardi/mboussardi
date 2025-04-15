#!/bin/bash

# Exit on error
set -e

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Create .nojekyll file if not exists
echo "Ensuring .nojekyll file exists..."
touch dist/.nojekyll

# Use the gh-pages npm package to handle the deployment
echo "Deploying to GitHub Pages..."
npx gh-pages -d dist

echo "Deployment complete! Your site should be available at: https://medboussardi.github.io/mboussardi/" 