// JUVLAN - Complete Game (No Modules)

// Chat Analyzer
class ChatAnalyzer {
    constructor() {
        this.personalities = this.getPersonalityProfiles();
        this.preBuiltQuestions = this.getPreBuiltQuestions();
    }
    
    getPreBuiltChatData() {
        return {
            participants: this.getParticipants(),
            totalMessages: 2847,
            timeRange: { start: 'September 2024', end: 'January 2025' },
            controversialMoments: this.getControversialMoments(),
            insideJokes: this.getInsideJokes(),
            predictions: this.getPredictions(),
            playerDebates: this.getPlayerDebates(),
            generatedQuestions: this.preBuiltQuestions
        };
    }

    getPersonalityProfiles() {
        return {
            'Briks': {
                team: 'Milan',
                nickname: 'Pagliaccio Strategico',
                traits: ['difensivo', 'analitico', 'sarcastico'],
                targets: ['Difensore di Leão', 'Critico dei bias Inter'],
                description: 'Analista strategico del Milan, sempre pronto a difendere le scelte rossonere con dati e sarcasmo'
            },
            'Dionis': {
                team: 'Inter',
                nickname: 'Ronaldios',
                traits: ['iperbolico', 'previsionale', 'appassionato'],
                targets: ['previsioni sbagliate', 'adorazione Dimarco'],
                description: 'Tifoso Inter iperbolico, famoso per le previsioni sbagliate e l\'uso di ChatGPT'
            },
            'Sem Il Lungo': {
                team: 'Juve',
                nickname: 'Teorico Lega Marotta',
                traits: ['teorico del complotto', 'anti-Inter'],
                targets: ['accuse Lega Marotta'],
                description: 'Principale teorico del complotto del gruppo, convinto che l\'Inter riceva aiuti arbitrali'
            }
        };
    }
    
    getPreBuiltQuestions() {
        // FASE 1: Domande dove devi rispondere come un Juvlanista
        // La risposta "corretta" è quella che direbbe un Juvlanista (anche se sbagliata nella realtà)
        return [
            {
                id: 'juvlan-1',
                type: 'infiltration',
                question: '20/10/24 - Inter vs Roma. Briks dice "Classica partita che vince nel secondo tempo". Come risponde un vero Juvlanista?',
                options: [
                    'Briks ha ragione, l\'Inter domina',
                    'Ovvio, con gli arbitri dalla loro parte vincono sempre',
                    'L\'Inter gioca bene, merita di vincere',
                    'Roma troppo debole, partita facile'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! Un vero Juvlanista attribuisce sempre le vittorie Inter agli arbitri, mai al gioco.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-2',
                type: 'infiltration',
                question: '20/10/24 - Ciccio chiede a Briks di commentare i 2 gol annullati all\'Udinese. Briks risponde "Non parlo con lui". Cosa pensa un Juvlanista?',
                options: [
                    'Briks ha ragione a non rispondere',
                    'Erano gol regolari, l\'Inter ha rubato',
                    'Il VAR ha fatto bene ad annullarli',
                    'Discussione inutile, meglio cambiare argomento'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! Per i Juvlanisti, ogni decisione VAR pro-Inter è un furto, anche i fuorigioco millimetrici.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-3',
                type: 'infiltration',
                question: '20/10/24 - Vida: "Rosso di Reijnders, tutta partita contro l\'arbitro". Briks: "Non parlo con lui". Come la vede un Juvlanista?',
                options: [
                    'Reijnders non meritava il rosso',
                    'Il Milan è sempre penalizzato dagli arbitri',
                    'Decisione giusta dell\'arbitro',
                    'Entrambe le squadre hanno avuto torti'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti vedono sempre il Milan come vittima degli arbitri, mai l\'Inter.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-4',
                type: 'infiltration',
                question: '20/10/24 - Vida: "Anni che rubano, ti ricordi con il Torino belotti?". Cosa risponde un Juvlanista convinto?',
                options: [
                    'Episodio isolato, non significa nulla',
                    'Esatto! L\'Inter ruba da anni con Marotta',
                    'Anche il Milan ha avuto episodi favorevoli',
                    'Il calcio è così, capita a tutti'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! La teoria della "Lega Marotta" è il pilastro del pensiero Juvlanista.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-5',
                type: 'infiltration',
                question: '20/10/24 - Briks: "Luiz prende a pugni e bledar parla dell\'unica cosa che fa giusta il var". Fiftyseven: "Ma come fate a dire che quello è fallo". Chi ha ragione per un Juvlanista?',
                options: [
                    'Fiftyseven, non era fallo',
                    'Briks, Douglas Luiz doveva essere espulso',
                    'Entrambi hanno ragione parzialmente',
                    'Nessuno dei due, bisogna rivedere l\'azione'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti vedono sempre falli contro l\'Inter che gli arbitri ignorano.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-6',
                type: 'infiltration',
                question: '20/10/24 - Fiftyseven: "Gli juvlanisti sono capaci di tutto". Vida: "Attimi di bel calcio comunque". Cosa pensa un vero Juvlanista dell\'Inter-Roma?',
                options: [
                    'L\'Inter ha giocato bene, merita i complimenti',
                    'Bel calcio? Con gli arbitri è facile!',
                    'Partita equilibrata, poteva finire in pareggio',
                    'La Roma ha giocato male, non è merito dell\'Inter'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! Un Juvlanista non ammette mai che l\'Inter giochi bene, è sempre "colpa degli arbitri".',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-7',
                type: 'infiltration',
                question: '20/10/24 - Dionis: "Alla fine conta solo essere a +1 dalla Juve". Come reagisce un Juvlanista a questa affermazione?',
                options: [
                    'Ha ragione, la classifica è ciò che conta',
                    'Facile essere primi quando gli arbitri ti aiutano',
                    'L\'Inter merita il primo posto',
                    '+1 non significa nulla, il campionato è lungo'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! Per i Juvlanisti, ogni vantaggio dell\'Inter è frutto di aiuti esterni.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-8',
                type: 'infiltration',
                question: '20/10/24 - Briks: "Per l\'Inter niente è fallo, frattesi si lamentava come un pazzo". Cosa pensa un Juvlanista di questa osservazione?',
                options: [
                    'Frattesi si lamenta troppo, è un problema suo',
                    'Briks ha ragione! L\'Inter ha un trattamento di favore',
                    'Tutti i giocatori si lamentano, è normale',
                    'Bisogna vedere l\'episodio specifico'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti concordano sempre con le critiche all\'arbitraggio pro-Inter.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-9',
                type: 'infiltration',
                question: '20/10/24 - Ciccio: "Quando ti metto in evidenza errori clamorosi invece sei come semir". Briks: "Mai più di Milan con te e Dionis". Chi è più obiettivo secondo un Juvlanista?',
                options: [
                    'Ciccio e gli interisti sono più obiettivi',
                    'Briks e i milanisti sono più obiettivi',
                    'Nessuno è obiettivo, tutti tifosi',
                    'Solo i juventini sono obiettivi'
                ],
                correctAnswer: 1,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti si vedono sempre come i più obiettivi, mai gli interisti.',
                juvlanistAnswer: true
            },
            {
                id: 'juvlan-10',
                type: 'infiltration',
                question: '20/10/24 - Irdi: "Vabbe dai siete obiettivi come sempre". Questa frase ironica si riferisce a chi secondo un Juvlanista?',
                options: [
                    'Agli interisti che difendono sempre la loro squadra',
                    'Ai milanisti e juventini che vedono complotti ovunque',
                    'A tutti, nessuno è obiettivo nel calcio',
                    'Solo a Briks che esagera sempre'
                ],
                correctAnswer: 0,
                explanation: '🎭 RISPOSTA DA JUVLANISTA! Per i Juvlanisti, sono sempre gli interisti ad essere di parte, mai loro.',
                juvlanistAnswer: true
            },

        ];
    }
    
    getParticipants() {
        return [
            { name: 'Briks', nickname: 'Pagliaccio Strategico', team: 'Milan' },
            { name: 'Dionis', nickname: 'Ronaldios', team: 'Inter' },
            { name: 'Sem Il Lungo', nickname: 'Teorico Lega Marotta', team: 'Juve' },
            { name: 'Vida', team: 'Milan' },
            { name: 'Ciccio Bleddy', nickname: 'Inter Ultras', team: 'Inter' }
        ];
    }
    
    getControversialMoments() {
        return [
            { type: 'referee', date: 'Ottobre 2024', context: 'Controversia VAR Udinese vs Inter', banterLevel: 'savage' },
            { type: 'player-debate', date: 'Ottobre 2024', context: 'Dibattito impegno Leão', banterLevel: 'spicy' }
        ];
    }
    
    getInsideJokes() {
        return [
            { type: 'pagliaccio strategico', author: 'Briks' },
            { type: 'marotta league', author: 'Sem Il Lungo' }
        ];
    }
    
    getPredictions() {
        return [
            { author: 'Dionis', statement: 'Atalanta batterà il Milan 4-0', outcome: 'wrong' }
        ];
    }
    
    getPlayerDebates() {
        return [
            { player: 'leão', author: 'Briks', sentiment: 'positive' }
        ];
    }
}

// Game Engine
class GameEngine {
    constructor() {
        this.currentSession = null;
        this.questionBank = [];
        this.defaultQuestions = this.getDefaultQuestions();
    }
    
    startNewGame(chatData = null, banterLevel = 'spicy') {
        console.log('GameEngine: Iniziando FASE 1 - Infiltrazione');
        
        this.currentSession = {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            currentQuestion: 0,
            totalQuestions: 10, // FASE 1: 10 domande
            score: 0,
            juvlanistScore: 0, // Quante risposte "da Juvlanista" hai dato
            answers: [],
            chatData: chatData,
            phase: 1,
            infiltrationLevel: 0
        };
        
        this.buildQuestionBank(chatData, banterLevel);
        // NON shuffliamo le domande della Fase 1, sono in ordine specifico
        
        console.log('GameEngine: FASE 1 iniziata con', this.questionBank.length, 'domande');
        return this.currentSession;
    }
    
    buildQuestionBank(chatData, banterLevel = 'spicy') {
        this.questionBank = [];
        
        if (chatData && chatData.generatedQuestions) {
            let filteredQuestions = chatData.generatedQuestions;
            
            if (banterLevel === 'mild') {
                filteredQuestions = chatData.generatedQuestions.filter(q => 
                    q.banterLevel === 'mild' || q.type === 'general'
                );
            } else if (banterLevel === 'spicy') {
                filteredQuestions = chatData.generatedQuestions.filter(q => 
                    q.banterLevel !== 'savage'
                );
            }
            
            this.questionBank.push(...filteredQuestions);
        }
        
        const defaultNeeded = Math.max(0, this.currentSession.totalQuestions - this.questionBank.length);
        this.questionBank.push(...this.defaultQuestions.slice(0, defaultNeeded));
        
        this.questionBank = this.questionBank.slice(0, this.currentSession.totalQuestions);
    }
    
    shuffleQuestions() {
        for (let i = this.questionBank.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questionBank[i], this.questionBank[j]] = [this.questionBank[j], this.questionBank[i]];
        }
    }
    
    getNextQuestion() {
        if (this.currentSession.currentQuestion >= this.questionBank.length) {
            return null;
        }
        
        const question = this.questionBank[this.currentSession.currentQuestion];
        this.currentSession.currentQuestion++;
        
        console.log('GameEngine: Restituendo domanda', this.currentSession.currentQuestion, '/', this.questionBank.length);
        return question;
    }
    
    submitAnswer(questionId, selectedAnswer) {
        const question = this.questionBank.find(q => q.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        
        const correct = selectedAnswer === question.correctAnswer;
        const isJuvlanistAnswer = correct && question.juvlanistAnswer;
        
        if (isJuvlanistAnswer) {
            this.currentSession.juvlanistScore++;
            this.currentSession.infiltrationLevel = Math.round((this.currentSession.juvlanistScore / this.currentSession.totalQuestions) * 100);
        }
        
        const answerRecord = {
            questionId,
            selectedAnswer,
            correct,
            isJuvlanistAnswer,
            timestamp: Date.now()
        };
        
        this.currentSession.answers.push(answerRecord);
        
        return {
            correct,
            isJuvlanistAnswer,
            selectedAnswer,
            juvlanistScore: this.currentSession.juvlanistScore,
            infiltrationLevel: this.currentSession.infiltrationLevel
        };
    }
    
    generateResults() {
        const totalQuestions = this.currentSession.answers.length;
        const juvlanistAnswers = this.currentSession.juvlanistScore;
        const infiltrationLevel = this.currentSession.infiltrationLevel;
        const passed = juvlanistAnswers >= 5; // Serve 5/10 per passare
        
        let statusMessage = '';
        if (passed) {
            statusMessage = '🎉 INFILTRAZIONE RIUSCITA! Sei diventato un vero Juvlanista!';
        } else {
            statusMessage = '❌ INFILTRAZIONE FALLITA! Non hai pensato abbastanza come un Juvlanista.';
        }
        
        return {
            phase: 1,
            totalQuestions,
            juvlanistAnswers,
            infiltrationLevel,
            passed,
            statusMessage,
            shareableText: `🎭 JUVLAN - Fase 1: Infiltrazione\n📊 Livello Juvlanista: ${infiltrationLevel}%\n🎯 Risposte da Juvlanista: ${juvlanistAnswers}/10\n\n${statusMessage}`
        };
    }
    
    getCurrentResults() {
        return this.currentSession ? this.generateResults() : null;
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    getDefaultQuestions() {
        return [
            {
                id: 'default-1',
                type: 'general',
                question: 'Quale squadra ha vinto più titoli di Serie A?',
                options: ['Juventus', 'AC Milan', 'Inter Milan', 'AS Roma'],
                correctAnswer: 0,
                explanation: 'La Juventus ha vinto più titoli di Serie A con 36 campionati.',
                banterLevel: 'mild'
            },
            {
                id: 'default-2',
                type: 'general',
                question: 'Chi è il miglior marcatore di tutti i tempi in Serie A?',
                options: ['Francesco Totti', 'Silvio Piola', 'Roberto Baggio', 'Ciro Immobile'],
                correctAnswer: 1,
                explanation: 'Silvio Piola ha segnato 274 gol in Serie A.',
                banterLevel: 'mild'
            }
        ];
    }
}

// UI Manager
class UIManager {
    constructor() {
        this.currentScreen = null;
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.feedbackOverlay = document.getElementById('feedback-overlay');
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
    }
    
    showLoading(message = 'Caricamento...') {
        const loadingText = document.getElementById('loading-text');
        loadingText.textContent = message;
        this.loadingOverlay.hidden = false;
        this.loadingOverlay.style.display = 'flex';
    }
    
    hideLoading() {
        this.loadingOverlay.style.display = 'none';
        this.loadingOverlay.hidden = true;
    }
    
    showError(message) {
        alert(message); // Simple error display
    }
    
    showMessage(message) {
        alert(message); // Simple message display
    }
    
    displayQuestion(question, session) {
        this.updateProgress(session);
        
        document.getElementById('question-type').textContent = this.formatQuestionType(question.type);
        document.getElementById('question-text').textContent = question.question;
        
        this.generateAnswerOptions(question);
        this.showChatContext(question);
        
        document.getElementById('score-display').textContent = `🎭 Juvlanista: ${session.juvlanistScore || 0}/10`;
    }
    
    updateProgress(session) {
        const progressFill = document.getElementById('progress-fill');
        const questionCounter = document.getElementById('question-counter');
        
        const progress = (session.currentQuestion / session.totalQuestions) * 100;
        progressFill.style.width = `${progress}%`;
        
        questionCounter.textContent = `${session.currentQuestion} / ${session.totalQuestions}`;
    }
    
    formatQuestionType(type) {
        const typeMap = {
            'infiltration': '🎭 FASE 1: Infiltrazione',
            'prediction-fail': 'Previsione Fallita',
            'controversial-statement': 'Dichiarazione Controversa',
            'referee-conspiracy': 'Complotto Arbitrale',
            'player-debate': 'Dibattito Giocatori',
            'inside-joke': 'Barzelletta Interna',
            'fantacalcio': 'Disastro Fantacalcio',
            'general': 'Quiz Serie A'
        };
        
        return typeMap[type] || 'Domanda Serie A';
    }
    
    generateAnswerOptions(question) {
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = option;
            button.dataset.index = index;
            
            optionsContainer.appendChild(button);
        });
    }
    
    showChatContext(question) {
        const contextElement = document.getElementById('question-context');
        
        if (question.chatContext) {
            const contextContent = contextElement.querySelector('.context-content');
            const { originalStatement, author, nickname, date } = question.chatContext;
            
            const displayName = nickname || author;
            const contextText = `"${originalStatement}" - ${displayName}${date ? ` (${date})` : ''}`;
            
            contextContent.textContent = contextText;
            contextElement.style.display = 'block';
        } else {
            contextElement.style.display = 'none';
        }
    }
    
    showFeedback(result, question) {
        const feedbackIcon = document.getElementById('feedback-icon');
        const feedbackText = document.getElementById('feedback-text');
        const feedbackExplanation = document.getElementById('feedback-explanation');
        
        this.updateAnswerButtonStates(result, question);
        
        if (result.correct) {
            feedbackIcon.textContent = '🎉';
            feedbackText.textContent = this.getCorrectFeedback(result);
            feedbackText.style.color = '#4caf50';
        } else {
            feedbackIcon.textContent = '😅';
            feedbackText.textContent = this.getIncorrectFeedback(result);
            feedbackText.style.color = '#ff6b6b';
        }
        
        feedbackExplanation.textContent = question.explanation || '';
        
        this.feedbackOverlay.style.display = 'flex';
    }
    
    updateAnswerButtonStates(result, question) {
        const answerButtons = document.querySelectorAll('.answer-btn');
        
        answerButtons.forEach((btn, index) => {
            btn.style.pointerEvents = 'none';
            
            if (index === result.selectedAnswer) {
                btn.classList.add('selected');
            }
            
            if (index === question.correctAnswer) {
                btn.classList.add('correct');
            } else if (index === result.selectedAnswer && !result.correct) {
                btn.classList.add('incorrect');
            }
        });
    }
    
    getCorrectFeedback(result) {
        if (result.isJuvlanistAnswer) {
            return `🎭 PERFETTO! Hai pensato come un vero Juvlanista! (${result.juvlanistScore}/10)`;
        } else {
            return `✅ Risposta corretta, ma non è quella che direbbe un Juvlanista...`;
        }
    }
    
    getIncorrectFeedback(result) {
        return `❌ Sbagliato! Un Juvlanista non risponderebbe così... (${result.juvlanistScore}/10)`;
    }
    
    hideFeedback() {
        this.feedbackOverlay.style.display = 'none';
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
            btn.style.pointerEvents = 'auto';
        });
    }
    
    displayResults(results) {
        if (results.phase === 1) {
            document.getElementById('final-score').textContent = results.juvlanistAnswers + '/10';
            document.getElementById('final-accuracy').textContent = `Livello Infiltrazione: ${results.infiltrationLevel}%`;
            
            const roastElement = document.getElementById('performance-roast');
            roastElement.innerHTML = `
                <h2>${results.statusMessage}</h2>
                <p style="margin-top: 1rem;">
                    ${results.passed ? 
                        '🎉 Complimenti! Hai imparato a pensare come un Juvlanista.<br><br>🎮 <strong>Preparati per la FASE 2...</strong><br>Stai per entrare nel covo dei Juvlanisti!' :
                        '😅 Hai bisogno di più pratica! Devi ottenere almeno 5/10 risposte da Juvlanista per passare alla Fase 2.'
                    }
                </p>
            `;
        }
    }
    
    displayFinalResults(results) {
        if (results.phase === 2) {
            document.getElementById('final-score').textContent = results.victory ? '🏆' : '💀';
            document.getElementById('final-accuracy').textContent = results.victory ? 'VITTORIA!' : 'SCONFITTA';
            
            const roastElement = document.getElementById('performance-roast');
            roastElement.innerHTML = `
                <h2>${results.statusMessage}</h2>
                <p style="margin-top: 1rem;">
                    ${results.victory ? 
                        '🎉 Dionis ha completato la sua missione! I Juvlanisti sono stati sconfitti!<br><br>L\'Inter regna suprema! 🏆⚫🔵' :
                        '💀 Dionis è stato scoperto e catturato dai Juvlanisti...<br><br>Riprova per completare la missione!'
                    }
                </p>
            `;
        }
    }
    
    displayPerformanceRoast(results) {
        const roastElement = document.getElementById('performance-roast');
        let roast = this.generateGenericRoast(results);
        roastElement.innerHTML = `<p>${roast}</p>`;
    }
    
    generateGenericRoast(results) {
        const { accuracy } = results;
        
        if (accuracy >= 80) {
            return "🏆 Esperto di Serie A! Chiaramente conosci il calcio... o sei stato fortunato!";
        } else if (accuracy >= 60) {
            return "⚽ Non male! Ne sai abbastanza per sopravvivere a una discussione al calcetto.";
        } else if (accuracy >= 40) {
            return "🤔 Performance mediocre. È ora di guardare più partite e meno highlights!";
        } else {
            return "😅 Ahi! Anche lanciando una moneta avresti fatto meglio. Rimani su FIFA!";
        }
    }
}

// Main App
class JuvlanApp {
    constructor() {
        this.gameEngine = new GameEngine();
        this.chatAnalyzer = new ChatAnalyzer();
        this.uiManager = new UIManager();
        
        this.currentSession = null;
        this.chatData = null;
        this.selectedBanterLevel = 'spicy';
        
        this.init();
    }
    
    init() {
        try {
            console.log('JUVLAN: Inizializzazione...');
            
            this.setupEventListeners();
            this.uiManager.hideLoading();
            
            this.chatData = this.chatAnalyzer.getPreBuiltChatData();
            this.uiManager.showScreen('welcome');
            
            console.log('JUVLAN inizializzato con', this.chatData.generatedQuestions.length, 'domande');
        } catch (error) {
            console.error('Errore inizializzazione JUVLAN:', error);
            this.uiManager.showError('Impossibile inizializzare il gioco. Ricarica la pagina.');
        }
    }
    
    setupEventListeners() {
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
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
    
    startGame() {
        console.log('JUVLAN: Iniziando il gioco...');
        
        try {
            this.currentSession = this.gameEngine.startNewGame(this.chatData, this.selectedBanterLevel);
            console.log('JUVLAN: Sessione creata:', this.currentSession);
            
            this.uiManager.showScreen('game');
            this.showNextQuestion();
        } catch (error) {
            console.error('Errore avvio gioco:', error);
            this.uiManager.showError('Errore nell\'avvio del gioco: ' + error.message);
        }
    }
    
    showNextQuestion() {
        console.log('JUVLAN: Caricando prossima domanda...');
        
        try {
            const question = this.gameEngine.getNextQuestion();
            console.log('JUVLAN: Domanda ottenuta:', question);
            
            if (question) {
                this.uiManager.displayQuestion(question, this.currentSession);
                this.setupAnswerHandlers(question);
            } else {
                console.log('JUVLAN: Nessuna domanda disponibile, mostrando risultati');
                this.showResults();
            }
        } catch (error) {
            console.error('Errore caricamento domanda:', error);
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
        
        if (results.phase === 1 && results.passed) {
            // Se ha passato la Fase 1, vai alla Fase 2
            setTimeout(() => {
                this.startPhase2();
            }, 3000);
        }
        
        this.uiManager.showScreen('results');
        this.uiManager.displayResults(results);
    }
    
    startPhase2() {
        console.log('JUVLAN: Iniziando FASE 2 - Bomberman');
        this.uiManager.showScreen('phase2');
        
        // Inizializza il gioco Bomberman
        this.bombermanGame = new window.BombermanGame('bomberman-canvas');
    }
    
    endPhase2(victory) {
        console.log('JUVLAN: Fase 2 completata. Vittoria:', victory);
        
        // Mostra risultati finali
        const finalResults = {
            phase: 2,
            victory: victory,
            statusMessage: victory ? 
                '🎉 HAI SCONFITTO TUTTI I JUVLANISTI! 🎉' :
                '💀 SEI STATO SCOPERTO! 💀'
        };
        
        this.uiManager.showScreen('results');
        this.uiManager.displayFinalResults(finalResults);
    }
    
    resetGame() {
        this.currentSession = null;
        this.uiManager.showScreen('welcome');
    }
    
    shareResults() {
        const results = this.gameEngine.getCurrentResults();
        if (results && navigator.share) {
            navigator.share({
                title: 'JUVLAN - I miei risultati Serie A',
                text: results.shareableText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(results.shareableText).then(() => {
                this.uiManager.showMessage('Risultati copiati negli appunti!');
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM caricato, inizializzando JUVLAN...');
    window.juvlanApp = new JuvlanApp();
});