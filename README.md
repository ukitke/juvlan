# 🎮 JUVLAN - L'Infiltrazione di Dionis

Un gioco web Progressive Web App (PWA) di trivia Serie A con una modalità Bomberman. Dionis si infiltra tra i Juvlanisti per completare la sua missione!

## 🎯 Il Gioco

**FASE 1: Quiz di Infiltrazione**
- Dionis deve infiltrarsi tra i Juvlanisti rispondendo alle domande come farebbero loro
- 100 domande dinamiche in 6 categorie diverse
- 10 domande casuali per partita (nessuna ripetizione nella stessa sessione)
- Obiettivo: 5/10 risposte corrette per passare alla Fase 2

**FASE 2: Bomberman Battle**
- 5 livelli progressivi contro i boss Juvlanisti
- Boss battles con vite multiple e difficoltà crescente
- Controlli touch ottimizzati per mobile + tastiera per desktop
- Grafica migliorata con animazioni e effetti particellari
- Sistema audio completo con effetti sonori e messaggi vocali
- Esplosioni stile Inter (nero e azzurro)

### 🎲 Categorie Quiz (100 Domande)
- **Prediction Fails** (20 domande): Previsioni sbagliate memorabili
- **Controversial Statements** (20 domande): Dichiarazioni controverse
- **Referee Conspiracy** (15 domande): Teorie del complotto arbitrale
- **Player Debates** (20 domande): Dibattiti sui giocatori
- **Inside Jokes** (15 domande): Battute interne del gruppo
- **Fantacalcio Disasters** (10 domande): Disastri fantacalcistici

### 👥 Boss Juvlanisti (Fase 2)
- **Livello 1**: Denis + Leo (2 nemici)
- **Livello 2**: Roland (Boss con 2 vite)
- **Livello 3**: Vida (Boss con 3 vite)
- **Livello 4**: Sem (Boss con 3 vite)
- **Livello 5**: Briks "Il Pagliaccio Strategico" (Boss finale con 4 vite)

## 🚀 Gioca Ora

[**▶️ Gioca a JUVLAN**](https://TUO-USERNAME.github.io/juvlan/)

## 📱 Installazione

Il gioco è una PWA - puoi installarlo come app:

- **Android Chrome**: Menu → "Aggiungi a Home"
- **iOS Safari**: Condividi → "Aggiungi a Home"
- **Desktop**: Icona "+" nella barra degli indirizzi

## 🎮 Controlli

### Fase 1 (Quiz)
- **Touch/Click**: Seleziona le risposte
- **Interfaccia responsive**: Ottimizzata per schermi di tutte le dimensioni

### Fase 2 (Bomberman)

#### 📱 Mobile (Touch Controls)
- **Joystick Virtuale** (sinistra): Muovi Dionis in tutte le direzioni
  - Touch e trascina per controllare il movimento
  - Raggio di azione: 50px dal centro
  - Feedback visivo in tempo reale
- **Pulsante Bomba** (destra): Piazza bombe
  - Grande pulsante touch-friendly
  - Feedback visivo al tocco
  - Supporto haptic (se disponibile)

#### ⌨️ Desktop (Tastiera)
- **Frecce Direzionali**: Muovi Dionis (↑ ↓ ← →)
- **Spazio**: Piazza bomba
- **M**: Mute/Unmute audio

#### 🎯 Caratteristiche Controlli
- Movimento fluido con animazioni
- Dead zone ottimizzate per precisione
- Nessun lag o ritardo percepibile
- Testato su iOS, Android e desktop

## ✨ Caratteristiche

### 🎨 Grafica Avanzata
- **Sprite personalizzati**: Immagini reali dei personaggi
- **Animazioni fluide**: Movimento, esplosioni, power-up
- **Effetti particellari**: Esplosioni con particelle dinamiche
- **Screen shake**: Feedback visivo sulle esplosioni
- **Tema Inter**: Colori nero e azzurro per esplosioni e UI

### 🔊 Sistema Audio
- **Effetti sonori sintetizzati**: Web Audio API
  - Piazzamento bombe
  - Esplosioni
  - Colpi ricevuti/inflitti
  - Raccolta power-up
  - Fanfare vittoria/sconfitta
- **Messaggi vocali**: Web Speech API (italiano)
  - Messaggi personalizzati per ogni boss sconfitto
  - Annunci vittoria/game over
- **Controlli audio completi**:
  - Volume regolabile
  - Toggle effetti sonori
  - Toggle messaggi vocali
  - Tasto rapido mute (M)

### 📱 Mobile-First Design
- **Touch controls ottimizzati**: Joystick virtuale + pulsante bomba
- **Responsive**: Funziona su tutti i dispositivi
- **PWA**: Installabile come app nativa
- **Offline-ready**: Gioca senza connessione
- **Performance**: 60 FPS su dispositivi mobili

## 🛠️ Tecnologie

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Graphics**: HTML5 Canvas con animazioni custom
- **Audio**: Web Audio API + Web Speech API
- **PWA**: Service Worker per funzionalità offline
- **Design**: Mobile-first responsive con CSS Grid/Flexbox
- **Deployment**: GitHub Pages (hosting statico)

## 🏗️ Sviluppo Locale

```bash
# Clona il repository
git clone https://github.com/TUO-USERNAME/juvlan.git
cd juvlan

# Avvia un server locale
python -m http.server 8000

# Apri nel browser
http://localhost:8000
```

## 📦 Deploy

Il gioco è deployato automaticamente su GitHub Pages.

## 📚 Documentazione

### Guide Tecniche
- **[AUDIO-SYSTEM.md](AUDIO-SYSTEM.md)**: Documentazione completa del sistema audio
  - Web Audio API per effetti sonori
  - Web Speech API per messaggi vocali
  - Controlli e personalizzazione
- **[MOBILE-CONTROLS.md](MOBILE-CONTROLS.md)**: Guida ai controlli touch
  - Joystick virtuale
  - Pulsante bomba
  - Ottimizzazioni e best practices
- **[CREDITS.md](CREDITS.md)**: Crediti e attribuzioni
  - Risorse utilizzate
  - Tecnologie
  - Licenze

### Guide Testing
- **[TEST-RESULTS.md](TEST-RESULTS.md)**: Risultati completi dei test
- **[MOBILE-TEST-GUIDE.md](MOBILE-TEST-GUIDE.md)**: Guida per test su dispositivi mobili
- **[TESTING-SUMMARY.md](TESTING-SUMMARY.md)**: Riepilogo dello stato dei test

### Guide Deployment
- **[PWA-SETUP.md](PWA-SETUP.md)**: Setup Progressive Web App
- **[GITHUB-DEPLOY.md](GITHUB-DEPLOY.md)**: Deploy su GitHub Pages

## 🧪 Testing

### Test Automatici
```bash
# Apri il test suite nel browser
open test-game.html
```

Il test suite verifica:
- ✅ 100 domande con struttura corretta
- ✅ Sistema audio funzionante
- ✅ Nessun errore nel codice

### Caratteristiche Testate
- ✅ 100 domande di trivia (6 categorie)
- ✅ Controlli touch mobile (joystick + bomba)
- ✅ Sistema audio (effetti sonori + voce)
- ✅ Grafica migliorata (animazioni, particelle)
- ✅ Compatibilità cross-browser
- ✅ Funzionalità PWA

## 🎯 Roadmap Completata

- ✅ 100 domande dinamiche con 6 categorie
- ✅ Sistema audio completo (effetti + voce)
- ✅ Grafica migliorata con animazioni
- ✅ Controlli touch ottimizzati per mobile
- ✅ Immagini personaggi reali
- ✅ Effetti particellari e screen shake
- ✅ PWA con funzionalità offline
- ✅ Cross-browser e cross-device testing

## 📄 Licenza

Progetto personale per uso privato tra amici.

## 🎨 Crediti

### Sviluppo
Creato per il gruppo di amici tifosi di Serie A.

### Risorse
- **Immagini personaggi**: Foto del gruppo (Denis, Leo, Roland, Vida, Sem, Briks, Dionis)
- **Audio**: Effetti sonori sintetizzati con Web Audio API
- **Voce**: Web Speech API (browser nativo)
- **Icone**: Generate con SVG template custom

### Tecnologie Open Source
- Web Audio API
- Web Speech API
- HTML5 Canvas
- Service Worker API

## 🤝 Contributi

Progetto privato - non accetta contributi esterni.
