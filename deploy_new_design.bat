@echo off
cd /d "C:\Users\ronin\OneDrive\Desktop\BLUEHIPPOCYBER_AIOS\15_BLUEHIPPOCYBER_WEBSITE\BlueHippoCyber-HQ"

echo === COPYING NEW DESIGN FROM bluehippocyber/project/ === > deploy_log.txt 2>&1

set SRC=C:\Users\ronin\OneDrive\Desktop\BLUEHIPPOCYBER_AIOS\15_BLUEHIPPOCYBER_WEBSITE\bluehippocyber\project

copy /Y "%SRC%\components.jsx" "components.jsx" >> deploy_log.txt 2>&1
copy /Y "%SRC%\styles.css" "styles.css" >> deploy_log.txt 2>&1
copy /Y "%SRC%\chat-and-solutions.jsx" "chat-and-solutions.jsx" >> deploy_log.txt 2>&1
copy /Y "%SRC%\tweaks-panel.jsx" "tweaks-panel.jsx" >> deploy_log.txt 2>&1
copy /Y "%SRC%\vault.jsx" "vault.jsx" >> deploy_log.txt 2>&1
copy /Y "%SRC%\BlueHippoCyber HQ.html" "index.html" >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === COPYING ASSETS === >> deploy_log.txt 2>&1
if not exist "assets" mkdir assets
copy /Y "%SRC%\assets\hero-loop.mp4" "assets\hero-loop.mp4" >> deploy_log.txt 2>&1
copy /Y "%SRC%\assets\hippo-logo.png" "assets\hippo-logo.png" >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === GIT STATUS === >> deploy_log.txt 2>&1
git status >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === GIT ADD === >> deploy_log.txt 2>&1
git add -A >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === GIT COMMIT === >> deploy_log.txt 2>&1
git commit -m "Deploy new design: Stop losing jobs to businesses that answer faster" >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === GIT PUSH === >> deploy_log.txt 2>&1
git push origin main >> deploy_log.txt 2>&1

echo. >> deploy_log.txt
echo === DONE === >> deploy_log.txt 2>&1

type deploy_log.txt
pause
