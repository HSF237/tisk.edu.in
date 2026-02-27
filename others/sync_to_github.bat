@echo off
echo 🚀 Starting GitHub Sync...
echo.

:: Add all changes
echo 📝 Staging changes...
git add .

:: Commit with a timestamped message
set "msg=Update: %date% %time%"
echo 💬 Committing with message: "%msg%"
git commit -m "%msg%"

:: Push to GitHub
echo 📤 Uploading to GitHub...
git push origin main

echo.
echo ✅ Done! Your changes are now live on GitHub.
echo.
pause
