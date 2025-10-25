# JUVLAN - Progressive Web App Setup

## ✅ Funzionalità PWA Implementate

### 1. Web App Manifest (`manifest.json`)
- Nome app: "JUVLAN - Serie A Trivia Game"
- Modalità standalone (app-like experience)
- Icone per tutte le dimensioni richieste
- Colori tema personalizzati
- Orientamento portrait

### 2. Service Worker (`service-worker.js`)
- Cache delle risorse statiche (HTML, CSS, JS)
- Funzionalità offline completa
- Strategia cache-first per performance
- Auto-update delle risorse

### 3. Install Prompt (`js/pwa-handler.js`)
- Prompt di installazione personalizzato
- Gestione dismissal (7 giorni)
- Indicatore offline/online
- Rilevamento app installata

## 🚀 Come Testare

### Opzione 1: Server Locale (Consigliato)

1. **Installa un server HTTP locale:**
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (npx)
   npx http-server -p 8000
   
   # Con PHP
   php -S localhost:8000
   ```

2. **Apri nel browser:**
   - Chrome/Edge: `http://localhost:8000`
   - Apri DevTools (F12) → Application → Service Workers
   - Verifica che il service worker sia registrato

3. **Testa l'installazione:**
   - Dovresti vedere il prompt di installazione in basso
   - Oppure clicca l'icona "+" nella barra degli indirizzi
   - Installa l'app

4. **Testa offline:**
   - DevTools → Network → Throttling → Offline
   - Ricarica la pagina - dovrebbe funzionare!

### Opzione 2: Deploy su Hosting

1. **Deploy su servizio gratuito:**
   - **Netlify**: Drag & drop della cartella
   - **Vercel**: `vercel --prod`
   - **GitHub Pages**: Push su repository

2. **Verifica HTTPS:**
   - Le PWA richiedono HTTPS (o localhost)
   - I servizi sopra forniscono HTTPS automaticamente

3. **Testa su mobile:**
   - Apri l'URL sul telefono
   - Chrome/Safari mostrerà "Aggiungi alla home screen"
   - Installa e apri come app

## 📱 Generazione Icone

### Metodo Rapido (Browser)
1. Apri `icons/generate-icons.html` nel browser
2. Clicca "Generate All Icons"
3. Scarica ogni icona con il pulsante "Download"
4. Salva nella cartella `icons/` con i nomi corretti

### Metodo Online
1. Vai su https://realfavicongenerator.net/
2. Carica `icons/icon-template.svg`
3. Scarica il pacchetto completo
4. Estrai nella cartella `icons/`

### Metodo ImageMagick (Command Line)
```bash
cd icons
magick icon-template.svg -resize 72x72 icon-72x72.png
magick icon-template.svg -resize 96x96 icon-96x96.png
magick icon-template.svg -resize 128x128 icon-128x128.png
magick icon-template.svg -resize 144x144 icon-144x144.png
magick icon-template.svg -resize 152x152 icon-152x152.png
magick icon-template.svg -resize 192x192 icon-192x192.png
magick icon-template.svg -resize 384x384 icon-384x384.png
magick icon-template.svg -resize 512x512 icon-512x512.png
magick icon-template.svg -resize 16x16 icon-16x16.png
magick icon-template.svg -resize 32x32 icon-32x32.png
magick icon-template.svg -resize 180x180 icon-180x180.png
```

## 🔍 Verifica PWA

### Chrome DevTools
1. Apri DevTools (F12)
2. Tab "Application"
3. Verifica:
   - **Manifest**: Tutte le proprietà corrette
   - **Service Workers**: Stato "activated and running"
   - **Cache Storage**: File cached correttamente

### Lighthouse Audit
1. DevTools → Lighthouse
2. Seleziona "Progressive Web App"
3. Click "Generate report"
4. Obiettivo: Score > 90

### Test Checklist
- [ ] Service worker registrato
- [ ] Manifest valido
- [ ] Icone caricate
- [ ] Funziona offline
- [ ] Installabile su desktop
- [ ] Installabile su mobile
- [ ] Indicatore offline appare quando disconnesso
- [ ] Prompt installazione appare (se non già installato)

## 🐛 Troubleshooting

### Service Worker non si registra
- Verifica che il file sia in `/service-worker.js` (root)
- Controlla la console per errori
- Assicurati di usare HTTPS o localhost
- Prova in modalità incognito

### Prompt installazione non appare
- Verifica che l'app non sia già installata
- Controlla che il manifest sia valido
- Alcuni browser richiedono interazione utente prima
- Prova a dismissare e ricaricare dopo 7 giorni

### App non funziona offline
- Verifica che i file siano nella cache
- DevTools → Application → Cache Storage
- Controlla che i path nel service worker siano corretti
- Ricarica con Ctrl+Shift+R per forzare update

### Icone non appaiono
- Verifica che i file esistano in `/icons/`
- Controlla i path nel manifest.json
- Genera le icone con uno dei metodi sopra
- Usa dimensioni esatte (es. 192x192, non 190x190)

## 📊 Requisiti PWA

### Obbligatori ✅
- [x] HTTPS (o localhost)
- [x] Web App Manifest
- [x] Service Worker
- [x] Icone (almeno 192x192 e 512x512)
- [x] Funziona offline

### Raccomandati ✅
- [x] Prompt installazione personalizzato
- [x] Indicatore stato offline
- [x] Theme color
- [x] Splash screen (automatico con icone)
- [x] Orientamento definito

## 🎯 Prossimi Passi

1. **Genera le icone** usando uno dei metodi sopra
2. **Testa localmente** con un server HTTP
3. **Deploy** su hosting con HTTPS
4. **Testa su mobile** per l'esperienza completa
5. **Condividi** con gli amici!

## 📚 Risorse

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Workbox](https://developers.google.com/web/tools/workbox) - Advanced service worker library
