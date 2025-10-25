// JUVLAN - Main Application Module
import { GameEngine } from './modules/gameEngine.js';
import { ChatAnalyzer } from './modules/chatAnalyzer.js';
import { UIManager } from './modules/uiManager.js';

class JuvlanApp {
    constructor() {
        this.gameEngine = new GameEngine();
        this.chatAnalyzer = new ChatAnalyzer();
        this.uiManager = new UIManager();
        
        this.currentSession = null;
        this.chatData = null;
        
        this.init();
    }
    
    init() {
        try {
            this.setupEventListeners();
            
            // Make sure loading is hidden
            this.uiManager.hideLoading();
            
            // Pre-load the chat data from your group analysis
            this.chatData = this.chatAnalyzer.getPreBuiltChatData();
            
            // Show welcome screen
            this.uiManager.showScreen('welcome');
            
            console.log('JUVLAN inizializzato con', this.chatData.generatedQuestions.length, 'domande');
        } catch (error) {
            console.error('Error initializing JUVLAN:', error);
            this.uiManager.hideLoading();
            this.uiManager.showError('Impossibile inizializzare il gioco. Ricarica la pagina.');
        }
    }
    
    setupEventListeners() {
        // Game control buttons
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('banter-level-btn').addEventListener('click', () => {
            this.showBanterLevelSelector();
        });
        
        document.getElementById('next-question-btn').addEventListener('click', () => {
            this.nextQuestion();
        });
        
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('share-results-btn').addEventListener('click', () => {
            this.shareResults();
        });
        
        document.getElementById('clear-data-btn').addEventListener('click', () => {
            this.clearAllData();
        });
    }
    
    showBanterLevelSelector() {
        // Simple banter level selection - could be enhanced with a modal
        const level = prompt('Scegli il tuo livello di sfottò:\n1 - Leggero (prese in giro amichevoli)\n2 - Piccante (umorismo del gruppo)\n3 - Selvaggio (roast massimo)\n\nInserisci 1, 2, o 3:');
        
        if (level) {
            const banterLevels = { '1': 'mild', '2': 'spicy', '3': 'savage' };
            const banterLabels = { 'mild': 'LEGGERO', 'spicy': 'PICCANTE', 'savage': 'SELVAGGIO' };
            this.selectedBanterLevel = banterLevels[level] || 'spicy';
            this.uiManager.showMessage(`Livello sfottò impostato: ${banterLabels[this.selectedBanterLevel]}`);
        }
    }
    
    startGame() {
        console.log('Iniziando il gioco...');
        
        try {
            // Set default banter level if not selected
            if (!this.selectedBanterLevel) {
                this.selectedBanterLevel = 'spicy';
            }
            
            console.log('Livello banter:', this.selectedBanterLevel);
            console.log('Chat data:', this.chatData);
            
            // Start game with pre-built chat data
            this.currentSession = this.gameEngine.startNewGame(this.chatData, this.selectedBanterLevel);
            console.log('Sessione creata:', this.currentSession);
            
            this.uiManager.showScreen('game');
            this.showNextQuestion();
        } catch (error) {
            console.error('Errore nell\'avvio del gioco:', error);
            this.uiManager.showError('Errore nell\'avvio del gioco: ' + error.message);
        }
    }
    
    showNextQuestion() {
        console.log('Caricando prossima domanda...');
        
        try {
            const question = this.gameEngine.getNextQuestion();
            console.log('Domanda ottenuta:', question);
            
            if (question) {
                this.uiManager.displayQuestion(question, this.currentSession);
                this.setupAnswerHandlers(question);
            } else {
                console.log('Nessuna domanda disponibile, mostrando risultati');
                this.showResults();
            }
        } catch (error) {
            console.error('Errore nel caricamento domanda:', error);
            this.uiManager.showError('Errore nel caricamento della domanda: ' + error.message);
        }
    }
    
    setupAnswerHandlers(question) {
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.handleAnswer(question, index);
            });
        });
    }
    
    handleAnswer(question, selectedIndex) {
        const result = this.gameEngine.submitAnswer(question.id, selectedIndex);
        this.uiManager.showFeedback(result, question);
    }
    
    nextQuestion() {
        this.uiManager.hideFeedback();
        this.showNextQuestion();
    }
    
    showResults() {
        const results = this.gameEngine.generateResults();
        this.uiManager.showScreen('results');
        this.uiManager.displayResults(results);
    }
    
    resetGame() {
        this.currentSession = null;
        this.uiManager.showScreen('welcome');
    }
    
    shareResults() {
        const results = this.gameEngine.getCurrentResults();
        if (results && navigator.share) {
            navigator.share({
                title: 'JUVLAN - My Serie A Trivia Results',
                text: results.shareableText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(results.shareableText).then(() => {
                this.uiManager.showMessage('Results copied to clipboard!');
            });
        }
    }
    
    clearAllData() {
        if (confirm('Sei sicuro di voler cancellare la cronologia del gioco?')) {
            localStorage.clear();
            this.currentSession = null;
            this.uiManager.showScreen('welcome');
            this.uiManager.showMessage('Cronologia gioco cancellata con successo');
        }
    }
    
    saveSession() {
        if (this.chatData) {
            localStorage.setItem('juvlan-chat-data', JSON.stringify(this.chatData));
        }
        if (this.currentSession) {
            localStorage.setItem('juvlan-current-session', JSON.stringify(this.currentSession));
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.juvlanApp = new JuvlanApp();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registrato con successo:', registration.scope);
            })
            .catch(function(error) {
                console.log('Registrazione Service Worker fallita:', error);
            });
    }
});

// Save session data before page unload
window.addEventListener('beforeunload', () => {
    if (window.juvlanApp) {
        window.juvlanApp.saveSession();
    }
});

export { JuvlanApp };