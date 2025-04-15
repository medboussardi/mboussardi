#!/bin/bash

# Exit on error
set -e

# Make sure we're on the right branch
echo "Making sure we're on the main branch..."
git checkout main

# Install dependencies if not already installed
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

# Add .nojekyll file to disable Jekyll
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Save the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch is $current_branch"

# Save current files that might cause conflicts
echo "Backing up current manual-deploy.sh..."
cp manual-deploy.sh manual-deploy.sh.backup

# Create or checkout gh-pages branch
echo "Checking if gh-pages branch exists..."
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  echo "Checking out gh-pages branch..."
  git checkout gh-pages || { echo "Failed to checkout gh-pages branch"; exit 1; }
else
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  # Initialize with README if this is a new branch
  echo "# Deployed website" > README.md
  git add README.md
  git commit -m "Initialize gh-pages branch"
fi

# Clean current working directory but keep .git
echo "Preparing directory for new files..."
find . -maxdepth 1 -not -path "./.git" -not -path "." -exec rm -rf {} \;

# Copy dist contents
echo "Copying dist contents to gh-pages branch..."
cp -r ../dist/* .
cp ../dist/.nojekyll .

# Add all files
echo "Adding files to git..."
git add .

# Commit files
echo "Committing changes..."
git commit -m "Manual deployment $(date)" || echo "No changes to commit"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin gh-pages || { echo "Failed to push to GitHub. Try running: git push -f origin gh-pages"; }

# Return to original branch
echo "Returning to $current_branch branch..."
git checkout $current_branch

# Restore the script
echo "Restoring manual-deploy.sh..."
mv manual-deploy.sh.backup manual-deploy.sh

echo "Deployment complete!" 