// JUVLAN - Audio Manager
// Gestisce effetti sonori e messaggi vocali

class AudioManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.7;
        this.speechEnabled = true;
        
        // Web Audio API context
        this.audioContext = null;
        this.initAudioContext();
        
        // Messaggi vocali per livello
        this.levelMessages = {
            1: "Denis e Leo sconfitti! Troppo facile!",
            2: "Roland eliminato! Il boss non era così forte!",
            3: "Vida abbattuto! Tre vite non sono bastate!",
            4: "Sem sconfitto! Le teorie del complotto non aiutano!",
            5: "Briks eliminato! Il Pagliaccio Strategico è caduto!"
        };
    }
    
    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API non supportata');
        }
    }
    
    // Effetti sonori sintetizzati
    playBombPlace() {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playExplosion() {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 100;
        oscillator.type = 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        
        gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
    
    playHit() {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 150;
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }
    
    playPowerUp() {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    playLevelComplete() {
        if (!this.enabled || !this.audioContext) return;
        
        // Fanfara vittoria
        const notes = [523, 659, 784, 1047]; // Do, Mi, Sol, Do alto
        const duration = 0.15;
        
        notes.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'square';
            
            const startTime = this.audioContext.currentTime + (index * duration);
            gainNode.gain.setValueAtTime(this.volume * 0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    playGameOver() {
        if (!this.enabled || !this.audioContext) return;
        
        // Suono triste
        const notes = [392, 349, 330, 294]; // Sol, Fa, Mi, Re (discendente)
        const duration = 0.2;
        
        notes.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            const startTime = this.audioContext.currentTime + (index * duration);
            gainNode.gain.setValueAtTime(this.volume * 0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    }
    
    // Messaggi vocali con Web Speech API
    speak(text) {
        if (!this.speechEnabled || !('speechSynthesis' in window)) {
            console.log('Speech:', text);
            return;
        }
        
        // Cancella messaggi precedenti
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'it-IT';
        utterance.rate = 1.1;
        utterance.pitch = 1.0;
        utterance.volume = this.volume;
        
        window.speechSynthesis.speak(utterance);
    }
    
    speakLevelComplete(level) {
        const message = this.levelMessages[level];
        if (message) {
            this.speak(message);
        }
    }
    
    speakVictory() {
        this.speak("Vittoria totale! Hai sconfitto tutti i Juvlanisti! Dionis ha completato la missione!");
    }
    
    speakGameOver() {
        this.speak("Game Over! Sei stato scoperto dai Juvlanisti!");
    }
    
    // Controlli
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
    
    toggleSpeech() {
        this.speechEnabled = !this.speechEnabled;
        if (!this.speechEnabled) {
            window.speechSynthesis.cancel();
        }
        return this.speechEnabled;
    }
    
    mute() {
        this.enabled = false;
        this.speechEnabled = false;
        window.speechSynthesis.cancel();
    }
    
    unmute() {
        this.enabled = true;
        this.speechEnabled = true;
    }
}

// Export per uso globale
if (typeof window !== 'undefined') {
    window.AudioManager = AudioManager;
}
