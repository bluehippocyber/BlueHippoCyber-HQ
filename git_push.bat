@echo off
cd /d "C:\Users\ronin\OneDrive\Desktop\BLUEHIPPOCYBER_AIOS\bluehippo2.0\BlueHippoCyber-HQ"
echo === GIT STATUS === > git_push_log.txt 2>&1
git status >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT ADD === >> git_push_log.txt 2>&1
git add -A >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT COMMIT === >> git_push_log.txt 2>&1
git commit -m "Update BHC website - latest design implementation" >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === GIT PUSH === >> git_push_log.txt 2>&1
git push origin main >> git_push_log.txt 2>&1
echo. >> git_push_log.txt
echo === DONE === >> git_push_log.txt 2>&1
pause
