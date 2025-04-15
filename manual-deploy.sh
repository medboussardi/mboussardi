#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Add .nojekyll file to disable Jekyll
echo "Creating .nojekyll file..."
touch dist/.nojekyll

# Save the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch is $current_branch"

# Create or checkout gh-pages branch
echo "Checking if gh-pages branch exists..."
if git rev-parse --verify gh-pages >/dev/null 2>&1; then
  echo "Checking out gh-pages branch..."
  git checkout gh-pages
else
  echo "Creating gh-pages branch..."
  git checkout --orphan gh-pages
  # Initialize with README if this is a new branch
  echo "# Deployed website" > README.md
  git add README.md
  git commit -m "Initialize gh-pages branch"
fi

# Copy dist contents (without removing existing files)
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
git push origin gh-pages

# Return to original branch
echo "Returning to $current_branch branch..."
git checkout $current_branch

echo "Deployment complete!" 