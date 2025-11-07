#!/usr/bin/env sh
set -x  # show commands as they run

npm run build || { echo "❌ Build failed"; read -p "Press enter to close..."; exit 1; }

cd dist || { echo "❌ Missing dist folder"; read -p "Press enter to close..."; exit 1; }

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:DylanLafitte/dazadoop.git master:gh-pages

cd -
read -p "Press enter to close..."
