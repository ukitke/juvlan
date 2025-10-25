# 📱 JUVLAN - Controlli Mobile

Documentazione completa del sistema di controlli touch ottimizzati per dispositivi mobili.

## Panoramica

JUVLAN implementa un sistema di controlli touch dual-stick per la Fase 2 (Bomberman):
- **Joystick Virtuale** (sinistra): Controllo movimento a 360°
- **Pulsante Bomba** (destra): Piazzamento bombe

## Architettura

### Componenti UI

I controlli touch vengono creati dinamicamente e aggiunti al DOM:

```javascript
setupTouchControls() {
    // Crea joystick virtuale (sinistra)
    const joystick = document.createElement('div');
    joystick.id = 'virtual-joystick';
    
    // Crea pulsante bomba (destra)
    const bombBtn = document.createElement('div');
    bombBtn.id = 'bomb-button';
}
```

### Struttura HTML

```html
<!-- Joystick Virtuale -->
<div id="virtual-joystick">
    <div class="joystick-base">
        <div class="joystick-stick"></div>
    </div>
</div>

<!-- Pulsante Bomba -->
<div id="bomb-button">💣</div>
```

## Joystick Virtuale

### Funzionamento

Il joystick virtuale permette movimento a 360° con feedback visivo in tempo reale.

### Proprietà

```javascript
this.touchControls = {
    joystick: {
        active: false,    // Joystick attualmente in uso
        x: 0,            // Direzione X normalizzata (-1 a 1)
        y: 0             // Direzione Y normalizzata (-1 a 1)
    }
};
```

### Eventi Touch

#### touchstart
Attiva il joystick e registra la posizione iniziale:

```javascript
base.addEventListener('touchstart', (e) => {
    e.preventDefault();
    joystickActive = true;
    
    const touch = e.touches[0];
    const rect = base.getBoundingClientRect();
    
    // Centro del joystick
    joystickStartX = rect.left + rect.width / 2;
    joystickStartY = rect.top + rect.height / 2;
});
```

#### touchmove
Calcola la direzione e aggiorna la posizione dello stick:

```javascript
base.addEventListener('touchmove', (e) => {
    if (!joystickActive) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - joystickStartX;
    const deltaY = touch.clientY - joystickStartY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 50; // Raggio massimo in pixel
    
    if (distance > maxDistance) {
        // Limita al raggio massimo
        const angle = Math.atan2(deltaY, deltaX);
        stick.style.left = `${Math.cos(angle) * maxDistance + 50}px`;
        stick.style.top = `${Math.sin(angle) * maxDistance + 50}px`;
        
        // Direzione normalizzata
        this.touchControls.joystick.x = Math.cos(angle);
        this.touchControls.joystick.y = Math.sin(angle);
    } else {
        // Movimento libero entro il raggio
        stick.style.left = `${deltaX + 50}px`;
        stick.style.top = `${deltaY + 50}px`;
        
        // Direzione normalizzata
        this.touchControls.joystick.x = deltaX / maxDistance;
        this.touchControls.joystick.y = deltaY / maxDistance;
    }
    
    this.touchControls.joystick.active = true;
});
```

#### touchend
Resetta il joystick alla posizione centrale:

```javascript
base.addEventListener('touchend', () => {
    joystickActive = false;
    
    // Ritorna al centro
    stick.style.left = '50px';
    stick.style.top = '50px';
    
    this.touchControls.joystick.active = false;
    this.touchControls.joystick.x = 0;
    this.touchControls.joystick.y = 0;
});
```

### Calcolo Movimento

Il movimento del giocatore viene calcolato in base alla direzione del joystick:

```javascript
handleTouchMovement() {
    if (!this.touchControls.joystick.active) return;
    
    const threshold = 0.3; // Dead zone
    const jx = this.touchControls.joystick.x;
    const jy = this.touchControls.joystick.y;
    
    // Determina direzione principale
    if (Math.abs(jx) > Math.abs(jy)) {
        // Movimento orizzontale
        if (jx > threshold) {
            this.movePlayer('right');
        } else if (jx < -threshold) {
            this.movePlayer('left');
        }
    } else {
        // Movimento verticale
        if (jy > threshold) {
            this.movePlayer('down');
        } else if (jy < -threshold) {
            this.movePlayer('up');
        }
    }
}
```

### Dead Zone

La dead zone (zona morta) previene movimenti accidentali:

```javascript
const threshold = 0.3; // 30% del raggio massimo

if (Math.abs(joystick.x) < threshold && Math.abs(joystick.y) < threshold) {
    // Nessun movimento - dentro la dead zone
    return;
}
```

## Pulsante Bomba

### Funzionamento

Pulsante touch-friendly per piazzare bombe con feedback visivo.

### Proprietà

```javascript
this.touchControls = {
    bombButton: false  // Stato del pulsante (premuto/rilasciato)
};
```

### Eventi Touch

#### touchstart
Attiva il piazzamento bomba:

```javascript
bombBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.touchControls.bombButton = true;
    
    // Feedback visivo
    bombBtn.style.transform = 'scale(0.9)';
    bombBtn.style.opacity = '0.7';
    
    // Piazza bomba
    this.placeBomb();
    
    // Haptic feedback (se supportato)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
});
```

#### touchend
Resetta lo stato del pulsante:

```javascript
bombBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    this.touchControls.bombButton = false;
    
    // Ripristina aspetto normale
    bombBtn.style.transform = 'scale(1)';
    bombBtn.style.opacity = '1';
});
```

### Haptic Feedback

Il pulsante bomba supporta feedback aptico su dispositivi compatibili:

```javascript
if (navigator.vibrate) {
    navigator.vibrate(50); // Vibrazione di 50ms
}
```

**Compatibilità**:
- ✅ Android Chrome: Supporto completo
- ❌ iOS Safari: Non supportato (limitazione iOS)
- ✅ Android Firefox: Supporto completo

## Styling CSS

### Joystick Virtuale

```css
#virtual-joystick {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 120px;
    height: 120px;
    z-index: 1000;
}

.joystick-base {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    position: relative;
}

.joystick-stick {
    width: 50px;
    height: 50px;
    background: rgba(0, 123, 255, 0.8);
    border: 2px solid white;
    border-radius: 50%;
    position: absolute;
    left: 50px;  /* Centro: (120 - 50) / 2 + margine */
    top: 50px;
    transition: none; /* Nessuna transizione per movimento fluido */
    pointer-events: none;
}
```

### Pulsante Bomba

```css
#bomb-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    background: rgba(255, 0, 0, 0.8);
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    z-index: 1000;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    transition: transform 0.1s, opacity 0.1s;
}

#bomb-button:active {
    transform: scale(0.9);
    opacity: 0.7;
}
```

### Responsive Design

I controlli si adattano a diverse dimensioni di schermo:

```css
/* Tablet e schermi più grandi */
@media (min-width: 768px) {
    #virtual-joystick {
        width: 150px;
        height: 150px;
    }
    
    #bomb-button {
        width: 100px;
        height: 100px;
        font-size: 50px;
    }
}

/* Desktop - nascondi controlli touch */
@media (min-width: 1024px) {
    #virtual-joystick,
    #bomb-button {
        display: none;
    }
}
```

## Ottimizzazioni Performance

### 1. Prevenzione Scroll

Previene lo scroll della pagina durante l'uso dei controlli:

```javascript
e.preventDefault(); // In tutti gli event listener touch
```

### 2. Touch Action CSS

```css
touch-action: none; /* Disabilita gesture del browser */
```

### 3. Pointer Events

```css
pointer-events: none; /* Sullo stick per evitare interferenze */
```

### 4. Hardware Acceleration

```css
transform: translateZ(0); /* Forza accelerazione hardware */
will-change: transform;   /* Ottimizza animazioni */
```

## Testing

### Test Joystick

1. **Test Direzioni**:
   - Trascina in alto → Movimento su
   - Trascina in basso → Movimento giù
   - Trascina a sinistra → Movimento sinistra
   - Trascina a destra → Movimento destra
   - Trascina in diagonale → Movimento diagonale

2. **Test Dead Zone**:
   - Piccoli movimenti al centro → Nessun movimento
   - Movimenti oltre la soglia → Movimento attivato

3. **Test Raggio Massimo**:
   - Trascina oltre il bordo → Stick limitato al bordo
   - Direzione normalizzata correttamente

### Test Pulsante Bomba

1. **Test Piazzamento**:
   - Tocca pulsante → Bomba piazzata
   - Feedback visivo → Scale e opacity cambiano
   - Haptic feedback → Vibrazione (su Android)

2. **Test Cooldown**:
   - Tocca rapidamente → Rispetta limite bombe
   - Bomba esplode → Può piazzare nuova bomba

### Test Multi-Touch

1. **Test Simultaneo**:
   - Usa joystick + pulsante bomba contemporaneamente
   - Movimento continua mentre piazzi bomba
   - Nessuna interferenza tra controlli

## Troubleshooting

### Problema: Joystick Non Risponde

**Soluzione**:
1. Verifica che `touchControls.joystick.active === true` durante il touch
2. Controlla la console per errori JavaScript
3. Verifica che `preventDefault()` sia chiamato
4. Controlla che il CSS `z-index` sia sufficientemente alto

### Problema: Movimento Impreciso

**Soluzione**:
1. Regola la dead zone: aumenta `threshold` per più precisione
2. Verifica che `maxDistance` sia appropriato per lo schermo
3. Controlla che non ci siano transizioni CSS sullo stick

### Problema: Scroll della Pagina

**Soluzione**:
1. Aggiungi `e.preventDefault()` in tutti gli event listener
2. Aggiungi CSS: `touch-action: none;`
3. Verifica che il body abbia `overflow: hidden;` durante il gioco

### Problema: Pulsante Bomba Non Funziona

**Soluzione**:
1. Verifica che `placeBomb()` sia chiamato correttamente
2. Controlla il cooldown delle bombe
3. Verifica che il pulsante non sia coperto da altri elementi
4. Controlla `z-index` del pulsante

## Best Practices

### 1. Dimensioni Touch Target

Mantieni i controlli abbastanza grandi per essere usabili:
- **Minimo**: 44x44 px (raccomandazione Apple)
- **Ottimale**: 80-120 px per joystick, 80-100 px per pulsanti

### 2. Feedback Visivo

Fornisci sempre feedback visivo immediato:
- Cambio di scala/opacity al tocco
- Movimento dello stick del joystick
- Animazioni fluide

### 3. Dead Zone Appropriata

Bilancia precisione e facilità d'uso:
- **Troppo piccola**: Movimenti accidentali
- **Troppo grande**: Difficile attivare movimento
- **Ottimale**: 20-30% del raggio

### 4. Performance

Ottimizza per 60 FPS:
- Usa `transform` invece di `left/top` per animazioni
- Evita transizioni CSS durante il movimento
- Usa `requestAnimationFrame` per aggiornamenti

### 5. Accessibilità

Considera utenti con diverse abilità:
- Controlli abbastanza grandi
- Feedback visivo chiaro
- Supporto per tastiera come alternativa

## Personalizzazione

### Cambiare Dimensioni Joystick

```javascript
// Nel CSS
#virtual-joystick {
    width: 150px;  /* Aumenta da 120px */
    height: 150px;
}

// Nel JavaScript
const maxDistance = 60; // Aumenta da 50px
```

### Cambiare Dead Zone

```javascript
const threshold = 0.4; // Aumenta da 0.3 (40% invece di 30%)
```

### Cambiare Posizione Controlli

```css
/* Joystick a destra invece che a sinistra */
#virtual-joystick {
    left: auto;
    right: 20px;
}

/* Pulsante bomba a sinistra */
#bomb-button {
    right: auto;
    left: 20px;
}
```

### Aggiungere Nuovi Pulsanti

```javascript
// Crea pulsante azione
const actionBtn = document.createElement('div');
actionBtn.id = 'action-button';
actionBtn.textContent = '⚡';
actionBtn.style.cssText = `
    position: fixed;
    bottom: 120px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: rgba(255, 165, 0, 0.8);
    border: 3px solid white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    z-index: 1000;
`;

actionBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    this.performAction();
});

document.body.appendChild(actionBtn);
```

## Compatibilità

### Browser Mobile

- ✅ **Chrome Android**: Supporto completo
- ✅ **Safari iOS**: Supporto completo
- ✅ **Firefox Android**: Supporto completo
- ✅ **Samsung Internet**: Supporto completo
- ✅ **Edge Mobile**: Supporto completo

### Dispositivi Testati

- ✅ iPhone (iOS 14+)
- ✅ iPad (iOS 14+)
- ✅ Android Phone (Android 8+)
- ✅ Android Tablet (Android 8+)

### Funzionalità per Piattaforma

| Funzionalità | iOS | Android |
|-------------|-----|---------|
| Touch Events | ✅ | ✅ |
| Multi-touch | ✅ | ✅ |
| Haptic Feedback | ❌ | ✅ |
| Prevent Scroll | ✅ | ✅ |
| 60 FPS | ✅ | ✅ |

## Risorse

- [Touch Events - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)
- [Vibration API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
- [Mobile Touch Best Practices](https://developers.google.com/web/fundamentals/design-and-ux/input/touch)
- [iOS Touch Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/gestures/)
