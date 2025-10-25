# 🔊 JUVLAN - Sistema Audio

Documentazione completa del sistema audio del gioco JUVLAN.

## Panoramica

Il sistema audio di JUVLAN utilizza due tecnologie web native:
- **Web Audio API**: Per effetti sonori sintetizzati in tempo reale
- **Web Speech API**: Per messaggi vocali in italiano

## Architettura

### AudioManager Class

La classe `AudioManager` (in `js/audio-manager.js`) gestisce tutti gli aspetti audio del gioco.

```javascript
const audioManager = new AudioManager();
```

### Proprietà Principali

- `enabled`: Boolean - Abilita/disabilita effetti sonori
- `volume`: Number (0-1) - Volume generale
- `speechEnabled`: Boolean - Abilita/disabilita messaggi vocali
- `audioContext`: AudioContext - Contesto Web Audio API

## Effetti Sonori

### Metodi Disponibili

#### `playBombPlace()`
Suono quando il giocatore piazza una bomba.
- **Tipo**: Square wave
- **Frequenza**: 200 Hz
- **Durata**: 0.1s
- **Volume**: 30% del volume generale

#### `playExplosion()`
Suono dell'esplosione della bomba.
- **Tipo**: Sawtooth wave con lowpass filter
- **Frequenza**: 100 Hz → 50 Hz (rampa)
- **Durata**: 0.3s
- **Volume**: 50% del volume generale
- **Effetto**: Filtro passa-basso a 2000 Hz

#### `playHit()`
Suono quando un personaggio viene colpito.
- **Tipo**: Triangle wave
- **Frequenza**: 150 Hz
- **Durata**: 0.15s
- **Volume**: 40% del volume generale

#### `playPowerUp()`
Suono quando si raccoglie un power-up.
- **Tipo**: Sine wave
- **Frequenza**: 400 Hz → 800 Hz (rampa ascendente)
- **Durata**: 0.2s
- **Volume**: 30% del volume generale

#### `playLevelComplete()`
Fanfara di vittoria al completamento di un livello.
- **Note**: Do (523 Hz), Mi (659 Hz), Sol (784 Hz), Do alto (1047 Hz)
- **Tipo**: Square wave
- **Durata**: 0.15s per nota
- **Volume**: 30% del volume generale

#### `playGameOver()`
Suono triste per il game over.
- **Note**: Sol (392 Hz), Fa (349 Hz), Mi (330 Hz), Re (294 Hz) - scala discendente
- **Tipo**: Sine wave
- **Durata**: 0.2s per nota
- **Volume**: 30% del volume generale

## Messaggi Vocali

### Web Speech API

Il sistema utilizza la sintesi vocale del browser per messaggi in italiano.

### Metodi Vocali

#### `speak(text)`
Pronuncia un testo generico.
```javascript
audioManager.speak("Ciao, benvenuto!");
```

**Parametri vocali**:
- **Lingua**: `it-IT` (Italiano)
- **Velocità**: 1.1 (leggermente più veloce del normale)
- **Pitch**: 1.0 (tono normale)
- **Volume**: Segue il volume generale

#### `speakLevelComplete(level)`
Pronuncia il messaggio di vittoria per un livello specifico.

**Messaggi per livello**:
- **Livello 1**: "Denis e Leo sconfitti! Troppo facile!"
- **Livello 2**: "Roland eliminato! Il boss non era così forte!"
- **Livello 3**: "Vida abbattuto! Tre vite non sono bastate!"
- **Livello 4**: "Sem sconfitto! Le teorie del complotto non aiutano!"
- **Livello 5**: "Briks eliminato! Il Pagliaccio Strategico è caduto!"

#### `speakVictory()`
Messaggio di vittoria finale.
```javascript
audioManager.speakVictory();
// "Vittoria totale! Hai sconfitto tutti i Juvlanisti! Dionis ha completato la missione!"
```

#### `speakGameOver()`
Messaggio di game over.
```javascript
audioManager.speakGameOver();
// "Game Over! Sei stato scoperto dai Juvlanisti!"
```

## Controlli Audio

### Regolazione Volume

```javascript
// Imposta volume (0.0 - 1.0)
audioManager.setVolume(0.5); // 50%
```

### Toggle Effetti Sonori

```javascript
// Attiva/disattiva effetti sonori
const isEnabled = audioManager.toggleSound();
console.log(`Effetti sonori: ${isEnabled ? 'ON' : 'OFF'}`);
```

### Toggle Messaggi Vocali

```javascript
// Attiva/disattiva messaggi vocali
const isSpeechEnabled = audioManager.toggleSpeech();
console.log(`Voce: ${isSpeechEnabled ? 'ON' : 'OFF'}`);
```

### Mute/Unmute Completo

```javascript
// Silenzia tutto
audioManager.mute();

// Riattiva tutto
audioManager.unmute();
```

## Utilizzo nel Gioco

### Esempio: Piazzare una Bomba

```javascript
// Nel BombermanGame
placeBomb() {
    if (this.canPlaceBomb()) {
        // Crea bomba
        this.bombs.push(new Bomb(x, y));
        
        // Riproduci suono
        this.audioManager.playBombPlace();
    }
}
```

### Esempio: Esplosione

```javascript
// Quando una bomba esplode
explode(bomb) {
    // Crea esplosione
    this.explosions.push(new Explosion(bomb.x, bomb.y));
    
    // Riproduci suono
    this.audioManager.playExplosion();
    
    // Screen shake per feedback visivo
    this.startScreenShake(5, 200);
}
```

### Esempio: Completamento Livello

```javascript
// Quando tutti i nemici sono sconfitti
checkLevelComplete() {
    if (this.enemies.every(e => !e.alive)) {
        this.levelComplete = true;
        
        // Effetti audio
        this.audioManager.playLevelComplete();
        this.audioManager.speakLevelComplete(this.currentLevel);
    }
}
```

## Compatibilità Browser

### Web Audio API
- ✅ Chrome/Edge: Supporto completo
- ✅ Firefox: Supporto completo
- ✅ Safari: Supporto completo (con prefisso webkit)
- ✅ Mobile: Supporto completo su iOS e Android

### Web Speech API
- ✅ Chrome/Edge: Supporto completo
- ✅ Firefox: Supporto limitato (dipende dal sistema)
- ✅ Safari: Supporto completo su iOS 14+
- ⚠️ Alcuni browser potrebbero non avere voci italiane installate

## Fallback e Gestione Errori

### Audio Context Non Disponibile

```javascript
initAudioContext() {
    try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API non supportata');
        // Il gioco continua senza audio
    }
}
```

### Speech Synthesis Non Disponibile

```javascript
speak(text) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) {
        console.log('Speech:', text);
        return; // Fallback silenzioso
    }
    // ... pronuncia il testo
}
```

## Best Practices

### 1. Inizializzazione Audio Context

L'Audio Context deve essere inizializzato dopo un'interazione utente (click/touch) per rispettare le policy dei browser:

```javascript
// Nel primo click/touch del gioco
if (this.audioManager.audioContext.state === 'suspended') {
    this.audioManager.audioContext.resume();
}
```

### 2. Cancellazione Messaggi Vocali

Prima di pronunciare un nuovo messaggio, cancella quelli precedenti:

```javascript
speak(text) {
    window.speechSynthesis.cancel(); // Cancella messaggi in coda
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}
```

### 3. Volume Bilanciato

Mantieni i volumi degli effetti sonori bilanciati:
- Esplosioni: 50% (più forti)
- Hit/Bomba: 30-40% (medi)
- Power-up: 30% (più delicati)

### 4. Gestione Memoria

Gli oscillatori vengono automaticamente garbage-collected dopo `stop()`. Non è necessaria pulizia manuale.

## Testing

### Test Effetti Sonori

```javascript
// Test tutti gli effetti
audioManager.playBombPlace();
setTimeout(() => audioManager.playExplosion(), 500);
setTimeout(() => audioManager.playHit(), 1000);
setTimeout(() => audioManager.playPowerUp(), 1500);
setTimeout(() => audioManager.playLevelComplete(), 2000);
```

### Test Messaggi Vocali

```javascript
// Test voce italiana
audioManager.speak("Questo è un test del sistema vocale");
audioManager.speakLevelComplete(1);
```

### Test Controlli

```javascript
// Test volume
audioManager.setVolume(0.5);
audioManager.playExplosion();

// Test toggle
audioManager.toggleSound(); // OFF
audioManager.playExplosion(); // Nessun suono

audioManager.toggleSound(); // ON
audioManager.playExplosion(); // Suono riprodotto
```

## Troubleshooting

### Problema: Nessun Audio

**Soluzione**:
1. Verifica che `audioManager.enabled === true`
2. Controlla il volume: `audioManager.volume > 0`
3. Verifica che l'Audio Context sia attivo: `audioManager.audioContext.state === 'running'`
4. Riprova dopo un'interazione utente (click/touch)

### Problema: Voce Non Funziona

**Soluzione**:
1. Verifica che `audioManager.speechEnabled === true`
2. Controlla la console per errori
3. Verifica che il browser supporti Speech Synthesis: `'speechSynthesis' in window`
4. Alcuni browser potrebbero non avere voci italiane installate

### Problema: Audio Distorto

**Soluzione**:
1. Riduci il volume: `audioManager.setVolume(0.5)`
2. Verifica che non ci siano troppi suoni simultanei
3. Controlla che il dispositivo non sia in modalità risparmio energetico

## Personalizzazione

### Aggiungere Nuovi Effetti Sonori

```javascript
playCustomSound() {
    if (!this.enabled || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    // Configura oscillatore
    oscillator.frequency.value = 440; // La (A4)
    oscillator.type = 'sine';
    
    // Configura volume con fade out
    gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
    
    // Riproduci
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
}
```

### Aggiungere Nuovi Messaggi Vocali

```javascript
// Aggiungi al constructor
this.customMessages = {
    powerUpCollected: "Power-up raccolto!",
    bombPlaced: "Bomba piazzata!"
};

// Crea metodo
speakCustomMessage(key) {
    const message = this.customMessages[key];
    if (message) {
        this.speak(message);
    }
}
```

## Risorse

- [Web Audio API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Speech API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [OscillatorNode - MDN](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
- [SpeechSynthesis - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
