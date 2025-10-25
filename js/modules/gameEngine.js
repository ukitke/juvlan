// Game Engine - Core game logic and session management

export class GameEngine {
    constructor() {
        this.currentSession = null;
        this.questionBank = [];
        this.defaultQuestions = this.getDefaultQuestions();
    }
    
    startNewGame(chatData = null, banterLevel = 'spicy') {
        // Initialize new game session
        this.currentSession = {
            sessionId: this.generateSessionId(),
            startTime: Date.now(),
            currentQuestion: 0,
            totalQuestions: 15, // Default game length
            score: 0,
            banterScore: 0,
            answers: [],
            chatData: chatData,
            personalityHits: {},
            categoryStats: {},
            banterLevel: banterLevel
        };
        
        // Build question bank
        this.buildQuestionBank(chatData, banterLevel);
        
        // Shuffle questions for randomized gameplay
        this.shuffleQuestions();
        
        return this.currentSession;
    }
    
    buildQuestionBank(chatData, banterLevel = 'spicy') {
        console.log('Costruendo question bank con banter level:', banterLevel);
        this.questionBank = [];
        
        if (chatData && chatData.generatedQuestions) {
            console.log('Domande disponibili:', chatData.generatedQuestions.length);
            // Filter questions by banter level
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
            // For 'savage', include all questions
            
            this.questionBank.push(...filteredQuestions);
        }
        
        // Add default questions to fill up the game
        const defaultNeeded = Math.max(0, this.currentSession.totalQuestions - this.questionBank.length);
        this.questionBank.push(...this.defaultQuestions.slice(0, defaultNeeded));
        
        // Limit to total questions needed
        this.questionBank = this.questionBank.slice(0, this.currentSession.totalQuestions);
        
        console.log('Question bank finale:', this.questionBank.length, 'domande');
    }
    
    shuffleQuestions() {
        for (let i = this.questionBank.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questionBank[i], this.questionBank[j]] = [this.questionBank[j], this.questionBank[i]];
        }
    }
    
    getNextQuestion() {
        if (this.currentSession.currentQuestion >= this.questionBank.length) {
            return null; // Game complete
        }
        
        const question = this.questionBank[this.currentSession.currentQuestion];
        this.currentSession.currentQuestion++;
        
        return question;
    }
    
    submitAnswer(questionId, selectedAnswer) {
        const question = this.questionBank.find(q => q.id === questionId);
        if (!question) {
            throw new Error('Question not found');
        }
        
        const correct = selectedAnswer === question.correctAnswer;
        let points = 0;
        let bonusPoints = 0;
        
        if (correct) {
            // Base points
            points = 10;
            
            // Bonus for chat-derived questions
            if (question.type !== 'general') {
                bonusPoints += 5;
            }
            
            // Banter bonus for savage questions
            if (question.banterLevel === 'savage') {
                bonusPoints += 3;
                this.currentSession.banterScore += 3;
            } else if (question.banterLevel === 'spicy') {
                bonusPoints += 2;
                this.currentSession.banterScore += 2;
            }
            
            // Time bonus (if answered quickly)
            const timeBonus = this.calculateTimeBonus();
            bonusPoints += timeBonus;
            
            // Update score
            this.currentSession.score += points + bonusPoints;
        }
        
        // Track personality hits
        if (question.chatContext && question.chatContext.nickname) {
            const nickname = question.chatContext.nickname;
            this.currentSession.personalityHits[nickname] = 
                (this.currentSession.personalityHits[nickname] || 0) + 1;
        }
        
        // Track category stats
        const category = question.type;
        if (!this.currentSession.categoryStats[category]) {
            this.currentSession.categoryStats[category] = { correct: 0, total: 0 };
        }
        this.currentSession.categoryStats[category].total++;
        if (correct) {
            this.currentSession.categoryStats[category].correct++;
        }
        
        // Record answer
        const answerRecord = {
            questionId,
            selectedAnswer,
            correct,
            points: points + bonusPoints,
            timestamp: Date.now()
        };
        
        this.currentSession.answers.push(answerRecord);
        
        return {
            correct,
            selectedAnswer,
            points,
            bonusPoints,
            totalScore: this.currentSession.score
        };
    }
    
    calculateTimeBonus() {
        // Simple time bonus - could be enhanced with actual timing
        return Math.floor(Math.random() * 3) + 1; // 1-3 bonus points
    }
    
    generateResults() {
        if (!this.currentSession) {
            throw new Error('No active game session');
        }
        
        const totalQuestions = this.currentSession.answers.length;
        const correctAnswers = this.currentSession.answers.filter(a => a.correct).length;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        const results = {
            totalQuestions,
            correctAnswers,
            score: this.currentSession.score,
            banterScore: this.currentSession.banterScore,
            accuracy,
            categoryBreakdown: this.currentSession.categoryStats,
            personalityHits: this.currentSession.personalityHits,
            savageQuestionsCorrect: this.getSavageQuestionsCorrect(),
            funnestMoments: this.getFunnestMoments(),
            shareableRoast: this.generatePersonalizedRoast(accuracy, this.currentSession.score),
            shareableText: this.generateShareableText(accuracy, this.currentSession.score)
        };
        
        return results;
    }
    
    getSavageQuestionsCorrect() {
        return this.currentSession.answers.filter(answer => {
            const question = this.questionBank.find(q => q.id === answer.questionId);
            return question && question.banterLevel === 'savage' && answer.correct;
        }).length;
    }
    
    getFunnestMoments() {
        // Return questions with chat context that were answered
        return this.currentSession.answers
            .map(answer => {
                const question = this.questionBank.find(q => q.id === answer.questionId);
                return question && question.chatContext ? question.chatContext.originalStatement : null;
            })
            .filter(Boolean)
            .slice(0, 3); // Top 3 moments
    }
    
    generatePersonalizedRoast(accuracy, score) {
        const roasts = {
            high: [
                "🏆 Serie A mastermind! You clearly spend too much time watching football instead of working.",
                "⚽ Impressive! You know more about Serie A than some of the players themselves.",
                "🔥 Outstanding performance! Time to apply for a job as a football analyst."
            ],
            medium: [
                "👍 Decent showing! You're the kind of person who argues about football but actually knows some facts.",
                "⚽ Not bad at all! You can hold your own in a calcetto post-game discussion.",
                "🤔 Solid performance! You know enough to be dangerous in football debates."
            ],
            low: [
                "😅 Well... at least you tried! Maybe stick to watching the highlights.",
                "🤷‍♂️ Rough game! Time to hit the books (or watch more matches).",
                "😬 Ouch! Even your nonna probably knows more about Serie A than this performance shows."
            ]
        };
        
        let category = 'low';
        if (accuracy >= 70) category = 'high';
        else if (accuracy >= 50) category = 'medium';
        
        const categoryRoasts = roasts[category];
        return categoryRoasts[Math.floor(Math.random() * categoryRoasts.length)];
    }
    
    generateShareableText(accuracy, score) {
        return `🏆 Just played JUVLAN Serie A Trivia!\n\n` +
               `📊 Score: ${score} points\n` +
               `🎯 Accuracy: ${accuracy}%\n\n` +
               `Think you know Serie A better? Try it yourself! 🔥`;
    }
    
    getCurrentResults() {
        return this.currentSession ? this.generateResults() : null;
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    getDefaultQuestions() {
        // Fallback questions when no chat data is available
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
                explanation: 'Silvio Piola ha segnato 274 gol in Serie A, rendendolo il miglior marcatore di sempre.',
                banterLevel: 'mild'
            },
            {
                id: 'default-3',
                type: 'general',
                question: 'Quale stadio è conosciuto come "La Scala del Calcio"?',
                options: ['Stadio Olimpico', 'San Siro', 'Allianz Stadium', 'Stadio Diego Armando Maradona'],
                correctAnswer: 1,
                explanation: 'San Siro (ufficialmente Giuseppe Meazza) è soprannominato "La Scala del Calcio".',
                banterLevel: 'mild'
            },
            {
                id: 'default-4',
                type: 'general',
                question: 'In che anno è stata giocata la prima stagione di Serie A?',
                options: ['1925-26', '1929-30', '1928-29', '1930-31'],
                correctAnswer: 2,
                explanation: 'La prima stagione di Serie A è stata giocata nel 1929-30.',
                banterLevel: 'mild'
            },
            {
                id: 'default-5',
                type: 'general',
                question: 'Chi detiene il record di gol in una singola stagione di Serie A?',
                options: ['Gonzalo Higuaín', 'Ciro Immobile', 'Luca Toni', 'Cristiano Ronaldo'],
                correctAnswer: 0,
                explanation: 'Gonzalo Higuaín ha segnato 36 gol nella stagione 2015-16.',
                banterLevel: 'mild'
            },
            {
                id: 'default-4',
                type: 'general',
                question: 'In which year was the first Serie A season played?',
                options: ['1925-26', '1929-30', '1928-29', '1930-31'],
                correctAnswer: 2,
                explanation: 'The first Serie A season was played in 1929-30, replacing the previous regional championship format.',
                banterLevel: 'mild'
            },
            {
                id: 'default-5',
                type: 'general',
                question: 'Which player holds the record for most goals in a single Serie A season?',
                options: ['Gonzalo Higuaín', 'Ciro Immobile', 'Luca Toni', 'Cristiano Ronaldo'],
                correctAnswer: 0,
                explanation: 'Gonzalo Higuaín scored 36 goals in the 2015-16 season, breaking the previous record.',
                banterLevel: 'mild'
            },
            {
                id: 'default-6',
                type: 'general',
                question: 'Which team is known as "I Nerazzurri"?',
                options: ['AC Milan', 'Inter Milan', 'Atalanta', 'Sassuolo'],
                correctAnswer: 1,
                explanation: 'Inter Milan is known as "I Nerazzurri" (The Black and Blues) due to their jersey colors.',
                banterLevel: 'mild'
            },
            {
                id: 'default-7',
                type: 'general',
                question: 'What is the maximum number of non-EU players a Serie A team can have in their squad?',
                options: ['2', '3', '4', '5'],
                correctAnswer: 0,
                explanation: 'Serie A teams can have a maximum of 2 non-EU players in their squad.',
                banterLevel: 'mild'
            },
            {
                id: 'default-8',
                type: 'general',
                question: 'Which city hosts the Derby della Mole?',
                options: ['Milan', 'Rome', 'Turin', 'Naples'],
                correctAnswer: 2,
                explanation: 'The Derby della Mole is played between Juventus and Torino in Turin.',
                banterLevel: 'mild'
            },
            {
                id: 'default-9',
                type: 'general',
                question: 'Who was the first foreign player to win the Serie A top scorer award?',
                options: ['Michel Platini', 'Diego Maradona', 'Ruud Gullit', 'Marco van Basten'],
                correctAnswer: 0,
                explanation: 'Michel Platini was the first foreign player to win the Serie A top scorer award in 1982-83.',
                banterLevel: 'mild'
            },
            {
                id: 'default-10',
                type: 'general',
                question: 'Which team has the longest unbeaten streak in Serie A history?',
                options: ['AC Milan', 'Juventus', 'Inter Milan', 'Perugia'],
                correctAnswer: 0,
                explanation: 'AC Milan holds the record with 58 games unbeaten from 1991 to 1993.',
                banterLevel: 'mild'
            },
            {
                id: 'default-11',
                type: 'general',
                question: 'What is the name of the Serie A trophy?',
                options: ['Coppa Italia', 'Scudetto', 'Coppa Campioni', 'Trofeo Serie A'],
                correctAnswer: 1,
                explanation: 'The Serie A trophy is called the Scudetto (little shield).',
                banterLevel: 'mild'
            },
            {
                id: 'default-12',
                type: 'general',
                question: 'Which goalkeeper has the most clean sheets in Serie A history?',
                options: ['Gianluigi Buffon', 'Francesco Toldo', 'Dino Zoff', 'Samir Handanović'],
                correctAnswer: 0,
                explanation: 'Gianluigi Buffon holds the record for most clean sheets in Serie A history.',
                banterLevel: 'mild'
            },
            {
                id: 'default-13',
                type: 'general',
                question: 'Which team was the first to win Serie A after being promoted from Serie B?',
                options: ['Hellas Verona', 'Sampdoria', 'Cagliari', 'Torino'],
                correctAnswer: 0,
                explanation: 'Hellas Verona won Serie A in 1984-85, their first season back in the top flight.',
                banterLevel: 'mild'
            },
            {
                id: 'default-14',
                type: 'general',
                question: 'What is the capacity of the San Siro stadium?',
                options: ['75,923', '80,018', '85,700', '90,000'],
                correctAnswer: 1,
                explanation: 'San Siro has a capacity of 80,018, making it one of the largest stadiums in Europe.',
                banterLevel: 'mild'
            },
            {
                id: 'default-15',
                type: 'general',
                question: 'Which player has made the most appearances in Serie A history?',
                options: ['Francesco Totti', 'Paolo Maldini', 'Gianluigi Buffon', 'Javier Zanetti'],
                correctAnswer: 2,
                explanation: 'Gianluigi Buffon has made the most appearances in Serie A history with over 650 games.',
                banterLevel: 'mild'
            }
        ];
    }
}