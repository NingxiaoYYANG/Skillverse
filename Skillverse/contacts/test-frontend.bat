@echo off
echo Starting frontend server...
echo.
echo Please keep this window open while the server is running.
echo The server will automatically open in your browser when ready.
echo.
cd /d %~dp0
set PORT=3000
npm run start:frontend
pause
