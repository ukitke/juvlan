// Chat Analyzer - Provides pre-built questions based on specific WhatsApp chat analysis

export class ChatAnalyzer {
    constructor() {
        this.personalities = this.getPersonalityProfiles();
        this.preBuiltQuestions = this.getPreBuiltQuestions();
    }
    
    getPreBuiltChatData() {
        return {
            participants: this.getParticipants(),
            totalMessages: 2847, // Approximate from your analysis
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
            },
            'Vida': {
                team: 'Milan',
                nickname: null,
                traits: ['critico', 'appassionato', 'frustrato'],
                targets: ['critiche Emerson Royal', 'atteggiamento Leão'],
                description: 'Tifoso Milan molto critico verso i propri giocatori, organizzatore di calcetto'
            },
            'Ciccio Bleddy': {
                team: 'Inter',
                nickname: 'Inter Ultras',
                traits: ['partigiano', 'aggressivo', 'sarcastico'],
                targets: ['difesa Inter', 'critiche Vlahovic'],
                description: 'Sostenitore Inter aggressivo, sempre pronto a difendere la squadra'
            },
            'Frenki': {
                team: 'Inter',
                nickname: null,
                traits: ['equilibrato', 'organizzatore'],
                targets: ['mediazione', 'organizzazione eventi'],
                description: 'Il più equilibrato del gruppo, organizzatore di eventi sociali'
            },
            'Irdi': {
                team: 'Inter',
                nickname: 'Anima Sensibile',
                traits: ['emotivo', 'sensibile'],
                targets: ['reazioni emotive', 'abbandoni temporanei gruppo'],
                description: 'Tifoso Inter emotivo, tende ad abbandonare il gruppo quando si arrabbia'
            },
            'Fiftyseven': {
                team: 'Inter',
                nickname: 'Enci',
                traits: ['analitico', 'statistico'],
                targets: ['analisi VAR', 'statistiche'],
                description: 'Analista Inter, spesso cita statistiche nei dibattiti arbitrali'
            }
        };
    }
    
    getPreBuiltQuestions() {
        return [
            // Prediction Fails
            {
                id: 'pred-1',
                type: 'prediction-fail',
                question: 'Chi ha previsto con sicurezza che l\'Atalanta avrebbe battuto il Milan 4-0 a dicembre, per poi essere smentito clamorosamente?',
                options: ['Dionis', 'Briks', 'Sem Il Lungo', 'Frenki'],
                correctAnswer: 0,
                explanation: 'Dionis era molto sicuro dell\'Atalanta quel giorno!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'Atalanta will destroy Milan 4-0',
                    author: 'Dionis',
                    nickname: 'Ronaldios',
                    date: 'December 2024',
                    context: 'Bold prediction that aged like milk'
                }
            },
            {
                id: 'pred-2',
                type: 'prediction-fail',
                question: 'Quale tifoso dell\'Inter ha previsto che la sua squadra avrebbe battuto il Milan in Supercoppa?',
                options: ['Ciccio Bleddy', 'Briks', 'Dionis', 'Vida'],
                correctAnswer: 2,
                explanation: 'Briks era sorprendentemente ottimista sull\'Inter quel giorno!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'Inter will win the Supercoppa easily',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'January 2025',
                    context: 'Rare moment of Inter confidence from a Milan fan'
                }
            },
            
            // Controversial Statements
            {
                id: 'contr-1',
                type: 'controversial-statement',
                question: 'Quale tifoso dell\'Inter ha dichiarato Dimarco "Dio in terra" e il miglior giocatore al mondo nel suo ruolo?',
                options: ['Frenki', 'Dionis', 'Ciccio Bleddy', 'Irdi'],
                correctAnswer: 1,
                explanation: 'Dionis e le sue dichiarazioni iperboliche sui giocatori dell\'Inter!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'Dimarco is God on earth, best in the world',
                    author: 'Dionis',
                    nickname: 'Ronaldios',
                    date: 'November 2024',
                    context: 'Peak Dionis hyperbole'
                }
            },
            {
                id: 'contr-2',
                type: 'controversial-statement',
                question: 'Chi ha paragonato Vlahovic a "livello Sanabria" nonostante la sua valutazione di 90M€?',
                options: ['Sem Il Lungo', 'Dionis', 'Briks', 'Vida'],
                correctAnswer: 1,
                explanation: 'Dionis non era impressionato dal costoso attaccante della Juventus!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'Vlahovic is Sanabria level, overpriced',
                    author: 'Dionis',
                    nickname: 'Ronaldios',
                    date: 'October 2024',
                    context: 'Harsh criticism of Juve\'s star striker'
                }
            },
            {
                id: 'contr-3',
                type: 'controversial-statement',
                question: 'Quale tifoso del Milan si è guadagnato il soprannome "Pagliaccio Strategico" per le sue argomentazioni difensive?',
                options: ['Vida', 'Briks', 'Roland', 'Leo'],
                correctAnswer: 1,
                explanation: 'Briks e la sua analisi da pagliaccio strategico sono diventate leggendarie!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'Strategic analysis of Milan\'s defensive tactics',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'December 2024',
                    context: 'ChatGPT analysis that became a meme'
                }
            },
            
            // Referee Conspiracy
            {
                id: 'ref-1',
                type: 'referee-conspiracy',
                question: 'Quale membro del gruppo usa più frequentemente il termine "Lega Marotta" per descrivere l\'arbitraggio in Serie A?',
                options: ['Briks', 'Vida', 'Sem Il Lungo', 'Denis'],
                correctAnswer: 2,
                explanation: 'Sem Il Lungo è il principale teorico del complotto del gruppo!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'This is the Marotta League, Inter always gets help',
                    author: 'Sem Il Lungo',
                    nickname: 'Marotta League Theorist',
                    date: 'Multiple occasions',
                    context: 'Recurring conspiracy theory'
                }
            },
            {
                id: 'ref-2',
                type: 'referee-conspiracy',
                question: 'Secondo Sem, quali TRE cose erano sbagliate nel gol di apertura dell\'Inter contro l\'Atalanta?',
                options: [
                    'Corner inesistente, spinta Dumfries, De Vrij fuorigioco',
                    'Rigore non dato, VAR malfunzionante, Perdita di tempo',
                    'Fallo di mano, Simulazione, Sostituzione sbagliata',
                    'Niente di sbagliato, gol regolare'
                ],
                correctAnswer: 0,
                explanation: 'Sem aveva un\'analisi dettagliata di tutto ciò che era sbagliato in quel gol!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'Corner shouldn\'t exist, Dumfries pushed, De Vrij was offside and interfering',
                    author: 'Sem Il Lungo',
                    nickname: 'Marotta League Theorist',
                    date: 'January 2025',
                    context: 'Detailed conspiracy analysis'
                }
            },
            
            // Player Debates
            {
                id: 'player-1',
                type: 'player-debate',
                question: 'Chi difende costantemente Leão nonostante le critiche del gruppo sul suo impegno e atteggiamento?',
                options: ['Vida', 'Briks', 'Roland', 'Ciccio Bleddy'],
                correctAnswer: 1,
                explanation: 'Briks trova sempre qualcosa di positivo da dire su Leão!',
                banterLevel: 'mild',
                chatContext: {
                    originalStatement: 'Leão always creates something even on off days',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'October 2024',
                    context: 'Defending Leão against criticism'
                }
            },
            {
                id: 'player-2',
                type: 'player-debate',
                question: 'Quale giocatore viene universalmente preso in giro dal gruppo, con un membro che ha detto "non giocherebbe neanche al Verona"?',
                options: ['Vlahovic', 'Emerson Royal', 'Locatelli', 'Abraham'],
                correctAnswer: 1,
                explanation: 'Emerson Royal non riceve rispetto da nessuno nel gruppo!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'Emerson Royal wouldn\'t even play for Verona',
                    author: 'Vida',
                    nickname: null,
                    date: 'October 2024',
                    context: 'Universal mockery of Milan\'s right-back'
                }
            },
            {
                id: 'player-3',
                type: 'player-debate',
                question: 'Chi ha previsto che Camarda avrebbe seguito la traiettoria di Sebastiano Esposito (cioè flop)?',
                options: ['Briks', 'Fiftyseven', 'Dionis', 'Sem Il Lungo'],
                correctAnswer: 1,
                explanation: 'Fiftyseven era pessimista sul futuro del giovane attaccante del Milan!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'Camarda will be like Sebastiano Esposito, another flop',
                    author: 'Fiftyseven',
                    nickname: 'Enci',
                    date: 'December 2024',
                    context: 'Pessimistic prediction about Milan\'s young talent'
                }
            },
            
            // Inside Jokes
            {
                id: 'joke-1',
                type: 'inside-joke',
                question: 'Cosa significa "Pagliaccio Strategico" in inglese?',
                options: ['Strategic Clown', 'Tactical Genius', 'Football Philosopher', 'Master Analyst'],
                correctAnswer: 0,
                explanation: 'Il soprannome perfetto per l\'approccio analitico di Briks!',
                banterLevel: 'mild',
                chatContext: {
                    originalStatement: 'ChatGPT analysis of group dynamics',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'December 2024',
                    context: 'Nickname that stuck after ChatGPT analysis'
                }
            },
            {
                id: 'joke-2',
                type: 'inside-joke',
                question: 'Chi è noto per usare ChatGPT per analizzare la chat di gruppo, rendendolo una meta-barzelletta?',
                options: ['Briks', 'Dionis', 'Leo', 'Frenki'],
                correctAnswer: 1,
                explanation: 'Dionis adora i suoi riassunti e classifiche di ChatGPT!',
                banterLevel: 'mild',
                chatContext: {
                    originalStatement: 'ChatGPT, rank my friends by football knowledge',
                    author: 'Dionis',
                    nickname: 'Ronaldios',
                    date: 'Multiple occasions',
                    context: 'Recurring use of AI for group analysis'
                }
            },
            {
                id: 'joke-3',
                type: 'inside-joke',
                question: 'Quale momento del calcetto con un gol a porta vuota sbagliato è diventato leggendario sfottò del gruppo?',
                options: [
                    'Dionis che sbaglia dopo l\'assist di Frenki',
                    'Il rigore sbagliato di Irdi',
                    'Leo che arriva in ritardo e perde il riscaldamento',
                    'L\'autogol di Vida'
                ],
                correctAnswer: 0,
                explanation: 'Dionis non se ne riprenderà mai da quell\'errore!',
                banterLevel: 'savage',
                chatContext: {
                    originalStatement: 'How did you miss that?! Frenki gave you a perfect pass!',
                    author: 'Multiple',
                    nickname: null,
                    date: 'Various calcetto games',
                    context: 'Recurring calcetto failure'
                }
            },
            
            // Fantacalcio Disasters
            {
                id: 'fanta-1',
                type: 'fantacalcio',
                question: 'Chi ha messo in panchina Falcone la settimana in cui ha parato un rigore?',
                options: ['Denis', 'Briks', 'Dionis', 'Irdi'],
                correctAnswer: 0,
                explanation: 'Il tempismo di Denis con i cambi dei portieri è leggendario!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'Of course I benched Falcone the week he saves a penalty',
                    author: 'Denis',
                    nickname: null,
                    date: 'Fantacalcio season',
                    context: 'Classic fantacalcio bad luck'
                }
            },
            {
                id: 'fanta-2',
                type: 'fantacalcio',
                question: 'Quale giocatore ha messo in panchina Briks, dimenticandosi di uno scambio, che poi ha giocato bene?',
                options: ['Samardzic', 'Pessina', 'McTominay', 'Rrahmani'],
                correctAnswer: 0,
                explanation: 'La gestione delle formazioni di Briks colpisce ancora!',
                banterLevel: 'mild',
                chatContext: {
                    originalStatement: 'I forgot about the swap and benched Samardzic',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'September 2024',
                    context: 'Fantacalcio lineup disaster'
                }
            },
            
            // General Serie A with Group Context
            {
                id: 'general-1',
                type: 'general',
                question: 'Secondo i dibattiti del gruppo, quale derby è il più controverso?',
                options: ['Derby di Milano', 'Derby di Roma', 'Derby di Torino', 'Derby di Genova'],
                correctAnswer: 0,
                explanation: 'Il Derby di Milano genera le discussioni più accese nel vostro gruppo!',
                banterLevel: 'mild'
            },
            {
                id: 'general-2',
                type: 'general',
                question: 'La situazione finanziaria di quale squadra viene più spesso presa in giro nella chat?',
                options: ['Juventus', 'Inter', 'Milan', 'Roma'],
                correctAnswer: 1,
                explanation: 'Le finanze dell\'Inter sono una fonte costante di battute, specialmente da parte di Sem!',
                banterLevel: 'spicy'
            },
            {
                id: 'general-3',
                type: 'general',
                question: 'Qual è il consenso del gruppo sul VAR in Serie A?',
                options: [
                    'È perfettamente giusto e imparziale',
                    'Favorisce l\'Inter (Lega Marotta)',
                    'È rotto per tutti',
                    'Solo i tifosi del Milan si lamentano'
                ],
                correctAnswer: 1,
                explanation: 'La teoria della "Lega Marotta" è forte in questo gruppo!',
                banterLevel: 'spicy'
            },
            
            // Domande aggiuntive basate sui contenuti specifici della chat
            {
                id: 'ibra-1',
                type: 'controversial-statement',
                question: 'Chi ha argomentato che Ibrahimović serve come "uomo spogliatoio" nonostante i fallimenti dirigenziali?',
                options: ['Briks', 'Vida', 'Dionis', 'Frenki'],
                correctAnswer: 0,
                explanation: 'Briks ha difeso la presenza di Ibra nello spogliatoio!',
                banterLevel: 'spicy',
                chatContext: {
                    originalStatement: 'Come uomo spogliatoio penso che serva',
                    author: 'Briks',
                    nickname: 'Pagliaccio Strategico',
                    date: 'Settembre 2024',
                    context: 'Dibattito sul ruolo di Ibrahimović al Milan'
                }
            },
            {
                id: 'derby-1',
                type: 'inside-joke',
                question: 'Quale episodio post-derby ha scatenato le maggiori polemiche nel gruppo?',
                options: [
                    'Il poster di Dumfries con Theo',
                    'I cori di Dimarco contro la curva Milan',
                    'Le azioni di Leão e Calhanoglu',
                    'Tutte le precedenti'
                ],
                correctAnswer: 3,
                explanation: 'Il post-derby è stato un festival di provocazioni!',
                banterLevel: 'savage'
            },
            {
                id: 'leao-attitude-1',
                type: 'player-debate',
                question: 'Quale comportamento di Leão viene più criticato dal gruppo?',
                options: [
                    'Pigrizia e mancanza di corsa',
                    'Atteggiamento quando viene sostituito',
                    'Distacco quando la squadra segna senza di lui',
                    'Tutte le precedenti'
                ],
                correctAnswer: 3,
                explanation: 'Leão è criticato su tutti i fronti dal gruppo!',
                banterLevel: 'spicy'
            },
            {
                id: 'var-controversy-1',
                type: 'referee-conspiracy',
                question: 'Quale episodio VAR ha scatenato le maggiori polemiche nel gruppo?',
                options: [
                    'Udinese vs Inter (ottobre)',
                    'Monza vs Milan (novembre)',
                    'Milan vs Slovan (gol Camarda)',
                    'Inter vs Lazio (rigore discusso)'
                ],
                correctAnswer: 0,
                explanation: 'L\'episodio Udinese-Inter ha fatto esplodere il gruppo!',
                banterLevel: 'savage'
            },
            {
                id: 'calcetto-1',
                type: 'inside-joke',
                question: 'Cosa rende leggendarie le performance calcettistiche di Dionis?',
                options: [
                    'I gol spettacolari',
                    'Gli assist perfetti',
                    'I gol sbagliati clamorosi',
                    'La tecnica sopraffina'
                ],
                correctAnswer: 2,
                explanation: 'Dionis è famoso per i gol sbagliati, non per quelli segnati!',
                banterLevel: 'savage'
            },
            {
                id: 'financial-1',
                type: 'general',
                question: 'Quale domanda ricorrente viene fatta sull\'Inter nel gruppo?',
                options: [
                    'Vincerà lo scudetto?',
                    'Fallirà a luglio?',
                    'Comprerà nuovi giocatori?',
                    'Cambierà allenatore?'
                ],
                correctAnswer: 1,
                explanation: 'La situazione finanziaria dell\'Inter è sempre sotto osservazione!',
                banterLevel: 'spicy'
            },
            {
                id: 'motta-1',
                type: 'general',
                question: 'Cosa caratterizza la Juventus di Motta secondo le discussioni del gruppo?',
                options: [
                    'Troppi pareggi e pochi gol',
                    'Gioco spettacolare',
                    'Difesa perfetta',
                    'Attacco devastante'
                ],
                correctAnswer: 0,
                explanation: 'La Juve di Motta è famosa per i pareggi!',
                banterLevel: 'mild'
            },
            {
                id: 'milan-inconsistency-1',
                type: 'general',
                question: 'Quale paradosso del Milan viene spesso discusso nel gruppo?',
                options: [
                    'Batte il Real poi perde col Cagliari',
                    'Vince sempre in casa',
                    'Non segna mai',
                    'Ha la miglior difesa'
                ],
                correctAnswer: 0,
                explanation: 'L\'inconsistenza del Milan è leggendaria!',
                banterLevel: 'spicy'
            }
        ];
    }
    
    getParticipants() {
        return [
            { name: 'Briks', nickname: 'Pagliaccio Strategico', team: 'Milan', personality: ['defensive', 'analytical'], controversialStatements: 15, wrongPredictions: 8, banterTarget: true },
            { name: 'Dionis', nickname: 'Ronaldios', team: 'Inter', personality: ['hyperbolic', 'predictive'], controversialStatements: 25, wrongPredictions: 12, banterTarget: true },
            { name: 'Sem Il Lungo', nickname: 'Marotta League Theorist', team: 'Juve', personality: ['conspiracy theorist'], controversialStatements: 20, wrongPredictions: 6, banterTarget: false },
            { name: 'Vida', nickname: null, team: 'Milan', personality: ['critical', 'passionate'], controversialStatements: 18, wrongPredictions: 7, banterTarget: false },
            { name: 'Ciccio Bleddy', nickname: 'Inter Ultras', team: 'Inter', personality: ['partisan', 'aggressive'], controversialStatements: 22, wrongPredictions: 5, banterTarget: false },
            { name: 'Frenki', nickname: null, team: 'Inter', personality: ['balanced', 'organizer'], controversialStatements: 10, wrongPredictions: 4, banterTarget: false },
            { name: 'Irdi', nickname: 'Sensitive Soul', team: 'Inter', personality: ['emotional'], controversialStatements: 12, wrongPredictions: 9, banterTarget: true },
            { name: 'Fiftyseven', nickname: 'Enci', team: 'Inter', personality: ['analytical'], controversialStatements: 8, wrongPredictions: 3, banterTarget: false }
        ];
    }
    
    getControversialMoments() {
        return [
            { 
                type: 'referee', 
                date: 'Ottobre 2024', 
                context: 'Controversia VAR Udinese vs Inter', 
                banterLevel: 'savage',
                participants: ['Sem Il Lungo', 'Fiftyseven', 'Briks'],
                description: 'Episodio che ha scatenato accuse di "Lega Marotta"'
            },
            { 
                type: 'player-debate', 
                date: 'Ottobre 2024', 
                context: 'Dibattito impegno Leão dopo sconfitta Milan', 
                banterLevel: 'spicy',
                participants: ['Briks', 'Vida', 'Irdi'],
                description: 'Discussione accesa sull\'atteggiamento di Leão'
            },
            { 
                type: 'prediction', 
                date: 'Dicembre 2024', 
                context: 'Disastro previsione Atalanta vs Milan', 
                banterLevel: 'savage',
                participants: ['Dionis'],
                description: 'La previsione 4-0 di Dionis che è invecchiata malissimo'
            },
            {
                type: 'referee',
                date: 'Novembre 2024',
                context: 'Controversia rigore Inter vs Lazio',
                banterLevel: 'savage',
                participants: ['Sem Il Lungo', 'Denis', 'Ciccio Bleddy'],
                description: 'Dibattito sul fallo di mano che ha diviso il gruppo'
            },
            {
                type: 'player-debate',
                date: 'Novembre 2024',
                context: 'Dimarco "Dio in terra" vs confronti con altri terzini',
                banterLevel: 'savage',
                participants: ['Dionis', 'Ciccio Bleddy', 'Briks'],
                description: 'L\'iperbole di Dionis su Dimarco contro la realtà'
            },
            {
                type: 'inside-joke',
                date: 'Dicembre 2024',
                context: 'Nascita del "Pagliaccio Strategico"',
                banterLevel: 'spicy',
                participants: ['Briks', 'Dionis'],
                description: 'L\'analisi ChatGPT che ha creato il soprannome leggendario'
            },
            {
                type: 'fantacalcio',
                date: 'Settembre 2024',
                context: 'Disastri formazione McTominay e Rrahmani',
                banterLevel: 'mild',
                participants: ['Briks', 'Denis'],
                description: 'Problemi tecnici e scelte sbagliate al fantacalcio'
            }
        ];
    }
    
    getInsideJokes() {
        return [
            { type: 'pagliaccio strategico', author: 'Briks', context: 'ChatGPT analysis nickname' },
            { type: 'marotta league', author: 'Sem Il Lungo', context: 'Referee conspiracy theory' },
            { type: 'ronaldios', author: 'Dionis', context: 'Shirt reference and hyperbolic statements' }
        ];
    }
    
    getPredictions() {
        return [
            { author: 'Dionis', statement: 'Atalanta will beat Milan 4-0', confidence: 'high', outcome: 'wrong' },
            { author: 'Briks', statement: 'Inter will win Supercoppa easily', confidence: 'medium', outcome: 'wrong' }
        ];
    }
    
    getPlayerDebates() {
        return [
            { player: 'leão', author: 'Briks', sentiment: 'positive', context: 'Defending against effort criticism' },
            { player: 'vlahovic', author: 'Dionis', sentiment: 'negative', context: 'Comparing to Sanabria level' },
            { player: 'emerson royal', author: 'Vida', sentiment: 'negative', context: 'Universal mockery' }
        ];
    }
    
    getQuestionTemplates() {
        return {
            'prediction-fail': [
                'Chi ha previsto {prediction} solo per essere smentito clamorosamente?',
                'Quale membro del gruppo era sicuro che {prediction}?',
                'Chi si è esposto con la previsione "{prediction}"?'
            ],
            'controversial-statement': [
                'Chi ha dichiarato che {statement}?',
                'Quale membro del gruppo ha detto "{statement}"?',
                'Chi è l\'autore della frase "{statement}"?'
            ],
            'referee-conspiracy': [
                'Secondo {author}, cosa c\'era di sbagliato in {incident}?',
                'Chi ha accusato gli arbitri per {incident}?',
                'Quale teoria del complotto è stata proposta per {incident}?'
            ],
            'player-debate': [
                'Chi ha {sentiment} {player} dicendo "{statement}"?',
                'Quale posizione ha preso {author} su {player}?',
                'Chi ha espresso l\'opinione più {sentiment} su {player}?'
            ],
            'inside-joke': [
                'Cosa significa "{joke}" nel gergo del gruppo?',
                'Chi è associato con "{joke}"?',
                'Quale episodio ha dato origine a "{joke}"?'
            ],
            'fantacalcio': [
                'Chi ha fatto il disastro fantacalcio con {player}?',
                'Quale scelta fantacalcio di {author} è diventata leggendaria?',
                'Chi ha sbagliato la formazione mettendo in panchina {player}?'
            ]
        };
    }
    
    getBanterResponses() {
        return {
            'mild': {
                'correct': ['Bravo!', 'Esatto!', 'Ci hai preso!', 'Bene!'],
                'incorrect': ['Non proprio...', 'Riprova!', 'Quasi!', 'Meglio la prossima volta!']
            },
            'spicy': {
                'correct': ['Ottimo! 🔥', 'Perfetto!', 'Conosci i tuoi amici!', 'Bravo, hai memoria!'],
                'incorrect': ['Sbagliato! 😅', 'Niente da fare...', 'Non ci siamo!', 'Studia di più le chat!']
            },
            'savage': {
                'correct': ['DEVASTANTE! 🔥🔥', 'Roast perfetto!', 'Hai colpito nel segno!', 'Massacro totale!'],
                'incorrect': ['EPIC FAIL! 😂', 'Che disastro!', 'Peggio di Emerson Royal!', 'Neanche Dionis sbaglia così!']
            }
        };
    }
}