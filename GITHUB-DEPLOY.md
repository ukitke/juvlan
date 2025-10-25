# 🚀 Deploy su GitHub Pages - Guida Passo-Passo

## Prerequisiti

- Account GitHub (gratuito): https://github.com/signup
- Git installato sul PC

## 📝 Step 1: Verifica Git

Apri il terminale e verifica che Git sia installato:

```bash
git --version
```

Se non è installato, scaricalo da: https://git-scm.com/download/win

## 🔧 Step 2: Configura Git (solo la prima volta)

```bash
git config --global user.name "Tuo Nome"
git config --global user.email "tua-email@example.com"
```

## 📦 Step 3: Inizializza Repository Locale

Nella cartella del progetto, esegui:

```bash
# Inizializza git
git init

# Aggiungi tutti i file
git add .

# Crea il primo commit
git commit -m "Initial commit - JUVLAN game"

# Rinomina branch in main
git branch -M main
```

## 🌐 Step 4: Crea Repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `juvlan` (o quello che preferisci)
3. Descrizione: "JUVLAN - Serie A Trivia Game"
4. Scegli **Public** (necessario per GitHub Pages gratuito)
5. **NON** selezionare "Add README" o altri file
6. Click "Create repository"

## 🔗 Step 5: Collega e Pusha

GitHub ti mostrerà dei comandi. Usa questi (sostituisci TUO-USERNAME):

```bash
# Aggiungi remote
git remote add origin https://github.com/TUO-USERNAME/juvlan.git

# Pusha il codice
git push -u origin main
```

Se ti chiede username/password:
- Username: il tuo username GitHub
- Password: usa un **Personal Access Token** (non la password normale)
  - Vai su: https://github.com/settings/tokens
  - "Generate new token (classic)"
  - Seleziona "repo" scope
  - Copia il token e usalo come password

## 🌍 Step 6: Abilita GitHub Pages

1. Vai sul tuo repository: `https://github.com/TUO-USERNAME/juvlan`
2. Click su **Settings** (in alto a destra)
3. Nel menu laterale, click su **Pages**
4. Sotto "Source":
   - Branch: seleziona `main`
   - Folder: seleziona `/ (root)`
5. Click **Save**

## ⏳ Step 7: Aspetta il Deploy

- GitHub impiegherà 1-2 minuti per deployare
- Vedrai un messaggio: "Your site is live at https://TUO-USERNAME.github.io/juvlan/"
- Clicca sul link per aprire il gioco!

## 📱 Step 8: Testa sul Telefono

1. Apri l'URL sul telefono: `https://TUO-USERNAME.github.io/juvlan/`
2. Il gioco dovrebbe caricarsi
3. **Chrome Android**: Menu (⋮) → "Aggiungi a Home"
4. **Safari iOS**: Condividi (□↑) → "Aggiungi a Home"
5. L'icona apparirà sulla home screen!

## 🔄 Aggiornamenti Futuri

Quando modifichi il codice:

```bash
# Aggiungi modifiche
git add .

# Commit
git commit -m "Descrizione modifiche"

# Pusha
git push
```

GitHub Pages si aggiornerà automaticamente in 1-2 minuti.

## 🐛 Troubleshooting

### "Permission denied" durante push
- Usa un Personal Access Token invece della password
- Oppure configura SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Pagina 404 dopo deploy
- Aspetta 2-3 minuti
- Verifica che il branch sia `main` nelle impostazioni Pages
- Controlla che il file `index.html` sia nella root

### Service Worker non funziona
- GitHub Pages usa HTTPS automaticamente ✅
- Apri DevTools (F12) → Console per vedere errori
- Prova in modalità incognito

### Icone non appaiono
- Genera le icone con `icons/generate-icons.html`
- Salva nella cartella `icons/`
- Fai commit e push delle nuove icone

## 🎯 URL Finale

Il tuo gioco sarà disponibile a:
```
https://TUO-USERNAME.github.io/juvlan/
```

Condividi questo link con gli amici! 🎮

## 📊 Statistiche (Opzionale)

Puoi vedere le visite al sito:
1. Repository → Insights → Traffic
2. Vedrai visualizzazioni e visitatori unici

## 🎨 Custom Domain (Opzionale)

Se hai un dominio (es. juvlan.com):
1. Settings → Pages → Custom domain
2. Inserisci il dominio
3. Configura DNS secondo le istruzioni GitHub

---

**Hai bisogno di aiuto?** Apri un issue sul repository!
