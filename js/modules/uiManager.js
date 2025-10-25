// UI Manager - Handles all user interface interactions and screen management

export class UIManager {
    constructor() {
        this.currentScreen = null;
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.feedbackOverlay = document.getElementById('feedback-overlay');
    }
    
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
        }
    }
    
    showLoading(message = 'Loading...') {
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
        // Create a temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #f44336;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 2000;
            animation: slideDown 0.3s ease-out;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }
    
    showMessage(message) {
        // Create a temporary success message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 2000;
            animation: slideDown 0.3s ease-out;
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    displayQuestion(question, session) {
        // Update progress
        this.updateProgress(session);
        
        // Update question content
        document.getElementById('question-type').textContent = this.formatQuestionType(question.type);
        document.getElementById('question-text').textContent = question.question;
        
        // Generate answer options
        this.generateAnswerOptions(question);
        
        // Show chat context if available
        this.showChatContext(question);
        
        // Update score display
        document.getElementById('score-display').textContent = `Punteggio: ${session.score}`;
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
        
        // Update answer button states
        this.updateAnswerButtonStates(result, question);
        
        // Show feedback overlay
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
            btn.style.pointerEvents = 'none'; // Disable further clicks
            
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
        // Get banter level from current session
        const banterLevel = window.juvlanApp?.currentSession?.banterLevel || 'spicy';
        
        const messages = {
            'mild': ['Bravo!', 'Esatto!', 'Ci hai preso!', 'Bene!', 'Corretto!'],
            'spicy': ['Ottimo! 🔥', 'Perfetto!', 'Conosci i tuoi amici!', 'Bravo, hai memoria!', 'Beccato!'],
            'savage': ['DEVASTANTE! 🔥🔥', 'Roast perfetto!', 'Hai colpito nel segno!', 'Massacro totale!', 'BRUTALE!']
        };
        
        const levelMessages = messages[banterLevel] || messages['spicy'];
        let message = levelMessages[Math.floor(Math.random() * levelMessages.length)];
        
        if (result.bonusPoints > 0) {
            message += ` (+${result.bonusPoints} bonus!)`;
        }
        
        return message;
    }
    
    getIncorrectFeedback(result) {
        // Get banter level from current session
        const banterLevel = window.juvlanApp?.currentSession?.banterLevel || 'spicy';
        
        const messages = {
            'mild': ['Non proprio...', 'Riprova!', 'Quasi!', 'Meglio la prossima volta!', 'Bel tentativo!'],
            'spicy': ['Sbagliato! 😅', 'Niente da fare...', 'Non ci siamo!', 'Studia di più le chat!', 'Mancato!'],
            'savage': ['EPIC FAIL! 😂', 'Che disastro!', 'Peggio di Emerson Royal!', 'Neanche Dionis sbaglia così!', 'TRAGICO!']
        };
        
        const levelMessages = messages[banterLevel] || messages['spicy'];
        return levelMessages[Math.floor(Math.random() * levelMessages.length)];
    }
    
    hideFeedback() {
        this.feedbackOverlay.style.display = 'none';
        
        // Reset answer button states for next question
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
            btn.style.pointerEvents = 'auto';
        });
    }
    
    displayResults(results) {
        // Update final score
        document.getElementById('final-score').textContent = results.score;
        document.getElementById('final-accuracy').textContent = `${results.accuracy}% correct`;
        
        // Generate performance roast
        this.displayPerformanceRoast(results);
        
        // Show category breakdown
        this.displayCategoryBreakdown(results);
        
        // Show personality hits if available
        this.displayPersonalityHits(results);
    }
    
    displayPerformanceRoast(results) {
        const roastElement = document.getElementById('performance-roast');
        
        let roast = results.shareableRoast || this.generateGenericRoast(results);
        
        roastElement.innerHTML = `<p>${roast}</p>`;
    }
    
    generateGenericRoast(results) {
        const { accuracy, score, totalQuestions } = results;
        
        if (accuracy >= 80) {
            return "🏆 Esperto di Serie A! Chiaramente conosci il calcio... o sei stato fortunato con le risposte!";
        } else if (accuracy >= 60) {
            return "⚽ Non male! Ne sai abbastanza per sopravvivere a una discussione al calcetto.";
        } else if (accuracy >= 40) {
            return "🤔 Performance mediocre. È ora di guardare più partite e meno highlights!";
        } else {
            return "😅 Ahi! Anche lanciando una moneta avresti fatto meglio. Rimani su FIFA!";
        }
    }
    
    displayCategoryBreakdown(results) {
        const breakdownElement = document.getElementById('results-breakdown');
        
        if (!results.categoryBreakdown || Object.keys(results.categoryBreakdown).length === 0) {
            breakdownElement.style.display = 'none';
            return;
        }
        
        let html = '<h3>Risultati per Categoria</h3>';
        
        Object.entries(results.categoryBreakdown).forEach(([category, stats]) => {
            const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            html += `
                <div class="breakdown-item">
                    <span>${this.formatQuestionType(category)}</span>
                    <span>${stats.correct}/${stats.total} (${percentage}%)</span>
                </div>
            `;
        });
        
        breakdownElement.innerHTML = html;
    }
    
    displayPersonalityHits(results) {
        const personalityElement = document.getElementById('personality-hits');
        
        if (!results.personalityHits || Object.keys(results.personalityHits).length === 0) {
            personalityElement.style.display = 'none';
            return;
        }
        
        let html = '<h3>Contatore Sfottò Amici</h3>';
        
        Object.entries(results.personalityHits).forEach(([nickname, hits]) => {
            if (hits > 0) {
                html += `
                    <div class="personality-item">
                        <span>${nickname}</span>
                        <span>${hits} domand${hits > 1 ? 'e' : 'a'} su di lui</span>
                    </div>
                `;
            }
        });
        
        personalityElement.innerHTML = html;
    }
}