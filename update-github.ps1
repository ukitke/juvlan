# JUVLAN - GitHub Update Script (PowerShell)
# Questo script aggiorna automaticamente il repository GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  JUVLAN - GitHub Update Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Chiedi messaggio di commit
$commitMessage = Read-Host "Inserisci messaggio commit (o premi Invio per usare timestamp)"

# Se non inserito, usa timestamp
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $commitMessage = "Update $timestamp"
}

Write-Host ""
Write-Host "Aggiungendo file..." -ForegroundColor Yellow
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRORE: Impossibile aggiungere i file" -ForegroundColor Red
    Read-Host "Premi Invio per uscire"
    exit 1
}

Write-Host ""
Write-Host "Creando commit: '$commitMessage'" -ForegroundColor Yellow
git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRORE: Impossibile creare il commit" -ForegroundColor Red
    Write-Host "Forse non ci sono modifiche da committare?" -ForegroundColor Yellow
    Read-Host "Premi Invio per uscire"
    exit 1
}

Write-Host ""
Write-Host "Pushando su GitHub..." -ForegroundColor Yellow
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRORE: Impossibile pushare su GitHub" -ForegroundColor Red
    Write-Host "Verifica la connessione e le credenziali" -ForegroundColor Yellow
    Read-Host "Premi Invio per uscire"
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SUCCESSO! Gioco aggiornato su GitHub" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Il sito sara' aggiornato in 2-3 minuti su:" -ForegroundColor Cyan
Write-Host "https://TUO-USERNAME.github.io/juvlan/" -ForegroundColor White
Write-Host ""
Read-Host "Premi Invio per uscire"
