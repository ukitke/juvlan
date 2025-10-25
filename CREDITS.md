# 🎨 JUVLAN - Crediti e Attribuzioni

Documentazione completa delle risorse utilizzate nel gioco JUVLAN.

## 👥 Team di Sviluppo

### Sviluppatore Principale
Progetto creato per il gruppo di amici tifosi di Serie A.

### Concept e Design
Basato sulle conversazioni e dinamiche del gruppo WhatsApp.

## 🖼️ Risorse Grafiche

### Immagini Personaggi

Tutte le immagini dei personaggi sono **foto reali** dei membri del gruppo:

| Personaggio | File | Utilizzo |
|------------|------|----------|
| **Dionis** | `foto/Dionis.jpg` | Giocatore principale (Fase 2) |
| **Denis** | `foto/Denis.jpg` | Boss Livello 1 |
| **Leo** | `foto/Leo.JPG` | Boss Livello 1 |
| **Roland** | `foto/Roland.JPG` | Boss Livello 2 |
| **Vida** | `foto/Vida.jpg` | Boss Livello 3 |
| **Sem** | `foto/Sem.jpg` | Boss Livello 4 |
| **Briks** | `foto/Briks.JPG` | Boss Livello 5 (Boss Finale) |

**Licenza**: Uso privato - Foto del gruppo di amici  
**Copyright**: © Gruppo JUVLAN - Tutti i diritti riservati  
**Utilizzo**: Solo per uso personale e privato tra i membri del gruppo

### Icone PWA

Le icone dell'applicazione sono state generate utilizzando un template SVG personalizzato:

- **Template**: `icons/icon-template.svg`
- **Generatore**: `icons/generate-icons.html`
- **Dimensioni**: 16x16, 32x32, 72x72, 96x96, 128x128, 144x144, 152x152, 180x180, 192x192, 384x384, 512x512
- **Formato**: PNG con trasparenza
- **Design**: Logo personalizzato JUVLAN

**Licenza**: Creazione originale  
**Copyright**: © Progetto JUVLAN

### Emoji

Il gioco utilizza emoji Unicode standard per alcuni elementi grafici:

- 😎 - Dionis (giocatore)
- 💣 - Bomba
- 💥 - Esplosione
- ⚡ - Power-up velocità
- 🔥 - Power-up potenza bomba
- 🎯 - Power-up bombe extra

**Licenza**: Unicode Standard (dominio pubblico)  
**Fonte**: Sistema operativo nativo

### Grafica Procedurale

Tutti gli altri elementi grafici sono generati proceduralmente tramite HTML5 Canvas:

- Muri e blocchi distruttibili
- Effetti esplosione
- Particelle
- Effetti di screen shake
- Animazioni sprite

**Licenza**: Codice originale  
**Copyright**: © Progetto JUVLAN

## 🔊 Risorse Audio

### Effetti Sonori

Tutti gli effetti sonori sono **sintetizzati in tempo reale** utilizzando la Web Audio API:

| Effetto | Tecnica | Parametri |
|---------|---------|-----------|
| **Piazzamento Bomba** | Square Wave | 200 Hz, 0.1s |
| **Esplosione** | Sawtooth + Lowpass | 100→50 Hz, 0.3s |
| **Colpo** | Triangle Wave | 150 Hz, 0.15s |
| **Power-up** | Sine Wave | 400→800 Hz, 0.2s |
| **Vittoria Livello** | Square Wave (melodia) | Do-Mi-Sol-Do, 0.15s/nota |
| **Game Over** | Sine Wave (melodia) | Sol-Fa-Mi-Re, 0.2s/nota |

**Tecnologia**: Web Audio API (OscillatorNode, GainNode, BiquadFilterNode)  
**Licenza**: Codice originale  
**Copyright**: © Progetto JUVLAN  
**Vantaggi**:
- Nessun file audio da scaricare
- Latenza zero
- Dimensione bundle ridotta
- Funziona offline

### Messaggi Vocali

I messaggi vocali sono generati utilizzando la **Web Speech API** del browser:

**Messaggi Personalizzati**:
- "Denis e Leo sconfitti! Troppo facile!"
- "Roland eliminato! Il boss non era così forte!"
- "Vida abbattuto! Tre vite non sono bastate!"
- "Sem sconfitto! Le teorie del complotto non aiutano!"
- "Briks eliminato! Il Pagliaccio Strategico è caduto!"
- "Vittoria totale! Hai sconfitto tutti i Juvlanisti! Dionis ha completato la missione!"
- "Game Over! Sei stato scoperto dai Juvlanisti!"

**Tecnologia**: Web Speech API (SpeechSynthesis)  
**Lingua**: Italiano (it-IT)  
**Voce**: Voce di sistema del browser/dispositivo  
**Licenza**: API nativa del browser (gratuita)  
**Testi**: Contenuto originale © Progetto JUVLAN

**Note**:
- Le voci disponibili dipendono dal sistema operativo
- iOS/macOS: Voci italiane di alta qualità incluse
- Android: Voci Google TTS (se installate)
- Windows: Voci Microsoft (se installate)

## 💻 Tecnologie e Librerie

### Framework e API

| Tecnologia | Versione | Utilizzo | Licenza |
|-----------|----------|----------|---------|
| **HTML5** | Standard | Struttura applicazione | W3C |
| **CSS3** | Standard | Styling e animazioni | W3C |
| **JavaScript** | ES6+ | Logica di gioco | ECMAScript |
| **Canvas API** | HTML5 | Rendering grafico | W3C |
| **Web Audio API** | Standard | Effetti sonori | W3C |
| **Web Speech API** | Standard | Messaggi vocali | W3C |
| **Service Worker API** | Standard | Funzionalità PWA | W3C |
| **Touch Events API** | Standard | Controlli mobile | W3C |
| **Vibration API** | Standard | Haptic feedback | W3C |

**Note**: Tutte le API utilizzate sono standard web nativi, nessuna libreria esterna richiesta.

### Nessuna Dipendenza Esterna

Il progetto è costruito interamente con **Vanilla JavaScript** senza framework o librerie esterne:

- ❌ Nessun jQuery
- ❌ Nessun React/Vue/Angular
- ❌ Nessun Phaser/PixiJS
- ❌ Nessun Howler.js
- ❌ Nessun npm packages

**Vantaggi**:
- Bundle size minimo
- Nessun problema di dipendenze
- Performance ottimale
- Manutenzione semplificata
- Compatibilità a lungo termine

## 📝 Contenuti Testuali

### Domande Quiz

Le 100 domande del quiz sono basate su:

- **Conversazioni reali** del gruppo WhatsApp
- **Previsioni effettive** fatte dai membri
- **Dibattiti reali** su giocatori e partite
- **Inside jokes** del gruppo
- **Eventi fantacalcio** realmente accaduti

**Licenza**: Contenuto originale basato su conversazioni private  
**Copyright**: © Gruppo JUVLAN  
**Utilizzo**: Solo per uso privato tra i membri del gruppo

### Testi di Gioco

Tutti i testi dell'interfaccia, messaggi e istruzioni sono contenuti originali:

- Titoli e descrizioni
- Messaggi di vittoria/sconfitta
- Istruzioni di gioco
- Testi dei pulsanti
- Messaggi di errore

**Licenza**: Contenuto originale  
**Copyright**: © Progetto JUVLAN

## 🎮 Ispirazione e Riferimenti

### Gameplay

Il gioco è ispirato a:

- **Bomberman** (Hudson Soft, 1983): Meccaniche di gioco base
  - Piazzamento bombe
  - Esplosioni a croce
  - Power-up
  - Boss battles

**Nota**: JUVLAN è un'implementazione originale, non utilizza asset o codice da Bomberman.

### Design

- **Stile Inter**: Colori nero e azzurro per esplosioni e UI
- **Estetica mobile-first**: Design ottimizzato per touch
- **PWA moderne**: Best practices per Progressive Web Apps

## 🔒 Licenze e Copyright

### Codice Sorgente

**Licenza**: Proprietaria - Uso Privato  
**Copyright**: © 2024 Progetto JUVLAN  
**Utilizzo**: Solo per uso personale e privato tra i membri del gruppo

Il codice sorgente non è open source e non è disponibile per uso pubblico.

### Contenuti

**Licenza**: Proprietaria - Uso Privato  
**Copyright**: © 2024 Gruppo JUVLAN  
**Utilizzo**: Solo per uso personale e privato tra i membri del gruppo

Tutti i contenuti (foto, testi, domande) sono privati e non possono essere utilizzati al di fuori del gruppo.

### Marchi

- "JUVLAN" è un nome creato per questo progetto privato
- "Bomberman" è un marchio registrato di Konami
- "Inter", "Milan", "Juventus" e altri nomi di squadre sono marchi registrati dei rispettivi club

Questo progetto non è affiliato con, sponsorizzato da, o approvato da nessuna delle entità sopra menzionate.

## 🙏 Ringraziamenti

### Gruppo di Amici

Grazie a tutti i membri del gruppo per:
- Le conversazioni esilaranti che hanno ispirato le domande
- Le foto utilizzate come personaggi
- Il supporto e il testing del gioco
- L'entusiasmo e il divertimento condiviso

### Membri Speciali

- **Dionis**: Protagonista e ispirazione del gioco
- **Denis & Leo**: Primi boss e tester
- **Roland**: Boss di medio livello
- **Vida**: Boss con tre vite
- **Sem**: Teorico del complotto
- **Briks**: "Il Pagliaccio Strategico" - Boss finale

### Community Web

Grazie alle risorse educative che hanno reso possibile questo progetto:

- **MDN Web Docs**: Documentazione eccellente per Web APIs
- **W3C**: Standard web aperti e accessibili
- **Stack Overflow**: Soluzioni a problemi tecnici
- **GitHub**: Hosting e deployment

## 📧 Contatti

Questo è un progetto privato per uso personale.  
Non sono accettate richieste esterne o contributi pubblici.

## 📅 Storia del Progetto

### Versione 1.0 (2024)

**Fase 1 - Quiz**:
- ✅ 100 domande in 6 categorie
- ✅ Sistema di selezione casuale
- ✅ Interfaccia responsive

**Fase 2 - Bomberman**:
- ✅ 5 livelli con boss progressivi
- ✅ Controlli touch ottimizzati
- ✅ Sistema audio completo
- ✅ Grafica migliorata con animazioni
- ✅ Immagini reali dei personaggi
- ✅ Effetti particellari

**PWA**:
- ✅ Installabile come app
- ✅ Funzionalità offline
- ✅ Icone personalizzate
- ✅ Service Worker

## 🔄 Aggiornamenti Futuri

Questo progetto è considerato completo nella sua versione attuale.  
Eventuali aggiornamenti futuri saranno basati sul feedback del gruppo.

---

**Ultimo aggiornamento**: Ottobre 2024  
**Versione**: 1.0  
**Stato**: Completo e funzionante

---

## ⚖️ Disclaimer

Questo è un progetto amatoriale creato per intrattenimento privato tra amici.  
Non ha scopi commerciali e non è destinato alla distribuzione pubblica.

Tutte le foto e i contenuti sono utilizzati con il consenso dei membri del gruppo  
e sono destinati esclusivamente all'uso interno del gruppo stesso.

Il gioco contiene riferimenti scherzosi e battute interne che potrebbero non essere  
comprensibili o appropriati al di fuori del contesto del gruppo di amici.

---

**Made with ❤️ for the JUVLAN crew**
