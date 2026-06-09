@echo off
cd /d "C:\Users\ronin\OneDrive\Desktop\BLUEHIPPOCYBER_AIOS\bluehippo2.0\BlueHippoCyber-HQ"

echo === COPYING DESIGN FILES FROM bluehippocyber/project/ TO ROOT === > git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\components.jsx" "components.jsx" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\styles.css" "styles.css" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\chat-and-solutions.jsx" "chat-and-solutions.jsx" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\tweaks-panel.jsx" "tweaks-panel.jsx" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\vault.jsx" "vault.jsx" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\BlueHippoCyber HQ.html" "index.html" >> git_push_log.txt 2>&1
echo. >> git_push_log.txt

echo === COPYING ASSETS === >> git_push_log.txt 2>&1
if not exist "assets" mkdir assets
copy /Y "bluehippocyber\project\assets\hero-loop.mp4" "assets\hero-loop.mp4" >> git_push_log.txt 2>&1
copy /Y "bluehippocyber\project\assets\hippo-logo.png" "assets\hippo-logo.png" >> git_push_log.txt 2>&1
echo. >> git_push_log.txt

echo === GIT STATUS === >> git_push_log.txt 2>&1
git status >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT ADD === >> git_push_log.txt 2>&1
git add -A >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT COMMIT === >> git_push_log.txt 2>&1
git commit -m "Implement BlueHippoCyber HQ redesign — new hero, pricing, and messaging" >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT PUSH === >> git_push_log.txt 2>&1
git push origin main >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === DONE === >> git_push_log.txt 2>&1
pause
