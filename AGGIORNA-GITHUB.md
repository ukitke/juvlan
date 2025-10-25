# 🚀 Come Aggiornare il Gioco su GitHub

Dopo aver fatto modifiche al gioco, usa uno di questi metodi per aggiornare GitHub Pages.

## 🖱️ Metodo 1: Script Automatico (PIÙ FACILE)

### Windows - Doppio Click

1. Fai doppio click su `update-github.bat`
2. Inserisci un messaggio (es. "Aggiunte nuove domande") oppure premi Invio
3. Lo script fa tutto automaticamente!

### PowerShell

1. Tasto destro su `update-github.ps1` → "Esegui con PowerShell"
2. Oppure nel terminale: `.\update-github.ps1`

## ⌨️ Metodo 2: Comandi Manuali

Apri il terminale nella cartella del progetto e esegui:

```powershell
git add .
git commit -m "Descrizione delle modifiche"
git push
```

## ⏱️ Tempo di Aggiornamento

Dopo il push, GitHub Pages impiega **2-3 minuti** per aggiornare il sito.

Puoi verificare lo stato su:
- Repository → Actions (vedi il deploy in corso)

## 🐛 Problemi Comuni

### "Permission denied" o errore autenticazione
- Usa un Personal Access Token invece della password
- Vai su: https://github.com/settings/tokens
- Genera un nuovo token con scope "repo"
- Usa il token come password quando richiesto

### "Nothing to commit"
- Non ci sono modifiche da salvare
- Verifica di aver modificato qualche file

### "Failed to push"
- Verifica la connessione internet
- Controlla di aver fatto `git init` e `git remote add origin`

## 📊 Verifica Aggiornamento

1. Vai su: `https://TUO-USERNAME.github.io/juvlan/`
2. Premi `Ctrl + Shift + R` per ricaricare senza cache
3. Verifica che le modifiche siano visibili

## 🔄 Workflow Consigliato

1. Fai modifiche al codice
2. Testa in locale (apri `index.html` nel browser)
3. Quando funziona, esegui `update-github.bat`
4. Aspetta 2-3 minuti
5. Testa sul telefono!

## 💡 Suggerimenti

- Fai commit frequenti con messaggi descrittivi
- Testa sempre in locale prima di pushare
- Usa messaggi commit chiari: "Fix bug quiz", "Aggiunte 20 domande", etc.
- Se fai molte modifiche, fai commit separati per ogni feature

## 📝 Esempi di Messaggi Commit

Buoni:
- ✅ "Fix bug prima domanda non cliccabile"
- ✅ "Aggiunte 50 nuove domande quiz"
- ✅ "Migliorata grafica Fase 2"

Cattivi:
- ❌ "Update"
- ❌ "Fix"
- ❌ "Modifiche varie"
