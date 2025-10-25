@echo off
REM JUVLAN - GitHub Update Script
REM Questo script aggiorna automaticamente il repository GitHub

echo ========================================
echo   JUVLAN - GitHub Update Script
echo ========================================
echo.

REM Chiedi messaggio di commit
set /p commit_message="Inserisci messaggio commit (o premi Invio per usare timestamp): "

REM Se non inserito, usa timestamp
if "%commit_message%"=="" (
    for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
    set commit_message=Update %datetime:~0,8%-%datetime:~8,6%
)

echo.
echo Aggiungendo file...
git add .

if %errorlevel% neq 0 (
    echo ERRORE: Impossibile aggiungere i file
    pause
    exit /b 1
)

echo.
echo Creando commit: "%commit_message%"
git commit -m "%commit_message%"

if %errorlevel% neq 0 (
    echo ERRORE: Impossibile creare il commit
    echo Forse non ci sono modifiche da committare?
    pause
    exit /b 1
)

echo.
echo Pushando su GitHub...
git push

if %errorlevel% neq 0 (
    echo ERRORE: Impossibile pushare su GitHub
    echo Verifica la connessione e le credenziali
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESSO! Gioco aggiornato su GitHub
echo ========================================
echo.
echo Il sito sara' aggiornato in 2-3 minuti su:
echo https://TUO-USERNAME.github.io/juvlan/
echo.
pause
