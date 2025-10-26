// JUVLAN - Question Bank (100 Questions)
// Domande basate sulle conversazioni del gruppo

const QUESTIONS_BANK = {
    // PREDICTION FAILS (20 domande)
    predictionFails: [
        {
            id: 'pred-1',
            type: 'infiltration',
            question: '20/10/24 - Inter vs Roma. Briks dice "Classica partita che vince nel secondo tempo". Come risponde un vero Juvlanista?',
            options: [
                'Briks ha ragione, l\'Inter domina',
                'Ovvio, con gli arbitri dalla loro parte vincono sempre',
                'L\'Inter gioca bene, merita di vincere',
                'Roma troppo debole, partita facile'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Un vero Juvlanista attribuisce sempre le vittorie Inter agli arbitri.',
            juvlanistAnswer: true
        },
        {
            id: 'pred-2',
            type: 'infiltration',
            question: 'Dionis prevede: "Atalanta batte Milan 4-0". Cosa pensa un Juvlanista del risultato reale (Milan vince)?',
            options: [
                'Dionis ha sbagliato previsione, capita',
                'Il Milan ha rubato con l\'arbitro',
                'Previsione ridicola, Dionis esagera sempre',
                'L\'Atalanta ha giocato male'
            ],
            correctAnswer: 2,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti ridicolizzano le previsioni sbagliate di Dionis.',
            juvlanistAnswer: true
        },
        {
            id: 'pred-3',
            type: 'infiltration',
            question: 'Briks prevede che l\'Inter vincerà la Supercoppa contro il Milan. Risultato: Milan vince. Reazione Juvlanista?',
            options: [
                'Briks aveva ragione a crederci',
                'Finalmente giustizia! Il Milan ha meritato',
                'L\'Inter ha perso per colpa dell\'arbitro',
                'Partita equilibrata, poteva vincere chiunque'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Quando il Milan batte l\'Inter, è sempre "giustizia".',
            juvlanistAnswer: true
        },
        {
            id: 'pred-4',
            type: 'infiltration',
            question: 'Sem prevede: "La Juve vincerà lo scudetto". A metà stagione è quarta. Cosa dice un Juvlanista?',
            options: [
                'Previsione sbagliata, la Juve non è forte',
                'C\'è ancora tempo, la Juve rimonta sempre',
                'Colpa dell\'arbitro che favorisce l\'Inter',
                'La Juve sta giocando male quest\'anno'
            ],
            correctAnswer: 2,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Anche quando la Juve va male, la colpa è sempre degli arbitri pro-Inter.',
            juvlanistAnswer: true
        },
        {
            id: 'pred-5',
            type: 'infiltration',
            question: 'Roland dice: "Il Milan finirà davanti all\'Inter". A fine stagione l\'Inter è prima. Reazione Juvlanista?',
            options: [
                'Roland ha sbagliato, l\'Inter è più forte',
                'Hanno rubato tutto l\'anno con Marotta',
                'Il Milan ha avuto sfortuna',
                'Previsione azzardata di Roland'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Se l\'Inter vince, è sempre per la "Lega Marotta".',
            juvlanistAnswer: true
        },
        {
            id: 'pred-6',
            type: 'infiltration',
            question: 'Vida: "Leão è il giocatore più sopravvalutato della Serie A". Un Juvlanista risponde:',
            options: [
                'Leão è fortissimo, Vida sbaglia',
                'Finalmente qualcuno lo dice! Leão è un fantasma',
                'Dipende dalle partite',
                'È un buon giocatore ma non il migliore'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! I Juvlanisti adorano criticare Leão.',
            juvlanistAnswer: true
        },
        {
            id: 'pred-7',
            type: 'infiltration',
            question: 'Dionis: "Lautaro è meglio di Vlahovic". Cosa pensa un Juvlanista?',
            options: [
                'Vero, Lautaro è più completo',
                'Ridicolo! Vlahovic vale il doppio',
                'Sono sullo stesso livello',
                'Dipende dal modulo di gioco'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Mai ammettere che un giocatore Inter è meglio di uno Juve.',
            juvlanistAnswer: true
        },
        {
            id: 'pred-8',
            type: 'infiltration',
            question: 'Denis: "Il Milan quest\'anno non arriva in Champions". Risultato: Milan secondo. Reazione?',
            options: [
                'Denis ha sbagliato completamente',
                'Il Milan ha rubato punti tutto l\'anno',
                'Bel risultato del Milan',
                'Previsione troppo pessimista'
            ],
            correctAnswer: 2,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Il Milan è alleato, merita il secondo posto!',
            juvlanistAnswer: true
        },
        {
            id: 'pred-9',
            type: 'infiltration',
            question: 'Leo: "L\'Inter vincerà il derby facilmente". Milan vince 3-0. Un Juvlanista dice:',
            options: [
                'Leo ha sottovalutato il Milan',
                'Finalmente l\'Inter perde! Giustizia è fatta',
                'Derby imprevedibile, può succedere',
                'Il Milan ha giocato meglio'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Ogni sconfitta Inter è "giustizia".',
            juvlanistAnswer: true
        },
        {
            id: 'pred-10',
            type: 'infiltration',
            question: 'Briks: "Theo Hernandez è il miglior terzino della Serie A". Dionis: "Dimarco è Dio in terra". Juvlanista?',
            options: [
                'Entrambi sono forti',
                'Theo tutta la vita, Dimarco è sopravvalutato',
                'Dimarco è oggettivamente migliore',
                'Dipende dal sistema di gioco'
            ],
            correctAnswer: 1,
            explanation: '🎭 RISPOSTA DA JUVLANISTA! Mai dare ragione a un interista su Dimarco.',
            juvlanistAnswer: true
        },
        // Altre 10 prediction fails...
        {id: 'pred-11', type: 'infiltration', question: 'Sem: "La Juve vincerà contro l\'Inter". Inter vince 2-0. Juvlanista?', options: ['Sem ha sbagliato', 'Arbitro scandaloso, Inter favorita', 'L\'Inter ha giocato meglio', 'La Juve ha avuto sfortuna'], correctAnswer: 1, explanation: '🎭 Sempre colpa dell\'arbitro!', juvlanistAnswer: true},
        {id: 'pred-12', type: 'infiltration', question: 'Roland: "Il Napoli non vincerà lo scudetto". Napoli campione. Reazione?', options: ['Roland ha sbagliato', 'Il Napoli ha meritato', 'Hanno avuto fortuna', 'Previsione difficile'], correctAnswer: 2, explanation: '🎭 Quando non è l\'Inter, è "fortuna".', juvlanistAnswer: true},
        {id: 'pred-13', type: 'infiltration', question: 'Vida: "Milan batte il Real Madrid". Real vince 3-1. Juvlanista?', options: ['Previsione ottimista', 'Il Milan è scarso, ovvio', 'Il Real è troppo forte', 'Partita equilibrata'], correctAnswer: 2, explanation: '🎭 RISPOSTA DA JUVLANISTA! Il Milan è alleato, il Real è semplicemente troppo forte.', juvlanistAnswer: true},
        {id: 'pred-14', type: 'infiltration', question: 'Dionis: "Inter vincerà la Champions". Inter eliminata. Juvlanista?', options: ['Peccato per l\'Inter', 'Finalmente! Non meritavano di andare avanti', 'Hanno incontrato squadra forte', 'Sfortuna'], correctAnswer: 1, explanation: '🎭 Ogni eliminazione Inter è una festa!', juvlanistAnswer: true},
        {id: 'pred-15', type: 'infiltration', question: 'Denis: "La Juve non passa il turno". Juve passa. Juvlanista?', options: ['Denis ha sottovalutato la Juve', 'La Juve è forte, Denis non capisce', 'Hanno avuto fortuna', 'Previsione sbagliata'], correctAnswer: 1, explanation: '🎭 La Juve è sempre "forte", mai fortuna.', juvlanistAnswer: true},
        {id: 'pred-16', type: 'infiltration', question: 'Leo: "Il Milan non batte il Napoli". Milan vince 3-0. Juvlanista?', options: ['Leo ha sbagliato', 'Il Milan ha meritato, grande partita', 'Il Napoli ha giocato male', 'Risultato sorprendente'], correctAnswer: 1, explanation: '🎭 RISPOSTA DA JUVLANISTA! Il Milan ha meritato, è alleato contro l\'Inter!', juvlanistAnswer: true},
        {id: 'pred-17', type: 'infiltration', question: 'Briks: "L\'Inter vincerà lo scudetto facilmente". Vince all\'ultima giornata. Juvlanista?', options: ['Briks aveva ragione', 'Hanno rubato fino all\'ultimo', 'Campionato equilibrato', 'L\'Inter è stata la migliore'], correctAnswer: 1, explanation: '🎭 Anche vincendo, l\'Inter "ruba".', juvlanistAnswer: true},
        {id: 'pred-18', type: 'infiltration', question: 'Sem: "Vlahovic farà 25 gol". Ne fa 12. Juvlanista?', options: ['Previsione sbagliata', 'Colpa del centrocampo che non lo serve', 'Vlahovic ha deluso', 'Obiettivo troppo alto'], correctAnswer: 1, explanation: '🎭 Mai colpa del giocatore Juve, sempre degli altri.', juvlanistAnswer: true},
        {id: 'pred-19', type: 'infiltration', question: 'Roland: "Il Milan vincerà la Coppa Italia". Eliminato ai quarti. Juvlanista?', options: ['Previsione ottimista', 'Il Milan è scarso, normale', 'Hanno incontrato squadra forte', 'Sfortuna'], correctAnswer: 3, explanation: '🎭 RISPOSTA DA JUVLANISTA! Il Milan è alleato, è stata sfortuna!', juvlanistAnswer: true},
        {id: 'pred-20', type: 'infiltration', question: 'Dionis: "Lautaro Pallone d\'Oro". Non vince. Juvlanista?', options: ['Dionis esagera sempre', 'Lautaro non è da Pallone d\'Oro, ridicolo', 'È un buon giocatore ma non il migliore', 'Previsione azzardata'], correctAnswer: 1, explanation: '🎭 Le previsioni di Dionis sono sempre "ridicole".', juvlanistAnswer: true}
    ],

    // CONTROVERSIAL STATEMENTS (20 domande)
    controversialStatements: [
        {id: 'contro-1', type: 'infiltration', question: 'Dionis: "Dimarco è Dio in terra, il migliore al mondo". Juvlanista?', options: ['Dimarco è forte', 'Ridicolo! Dimarco è sopravvalutato', 'È un buon giocatore', 'Esagerazione tipica'], correctAnswer: 1, explanation: '🎭 Mai ammettere che un interista è il migliore!', juvlanistAnswer: true},
        {id: 'contro-2', type: 'infiltration', question: 'Vida: "Vlahovic è livello Sanabria". Juvlanista?', options: ['Vida ha ragione', 'Offensivo! Vlahovic vale 10 Sanabria', 'Vlahovic sta deludendo', 'Paragone esagerato'], correctAnswer: 1, explanation: '🎭 Mai insultare un giocatore Juve!', juvlanistAnswer: true},
        {id: 'contro-3', type: 'infiltration', question: 'Briks: "Leão quando vuole è devastante". Juvlanista?', options: ['Vero, Leão è forte', 'Leão è un fantasma, non fa mai niente', 'Dipende dalle partite', 'Ha potenziale'], correctAnswer: 0, explanation: '🎭 RISPOSTA DA JUVLANISTA! Leão è del Milan, quindi un alleato contro l\'Inter!', juvlanistAnswer: true},
        {id: 'contro-4', type: 'infiltration', question: 'Dionis: "L\'Inter gioca il miglior calcio d\'Europa". Juvlanista?', options: ['L\'Inter gioca bene', 'Con gli arbitri è facile giocare bene', 'Esagerazione', 'Dipende dalle partite'], correctAnswer: 1, explanation: '🎭 Il bel gioco Inter è merito degli arbitri!', juvlanistAnswer: true},
        {id: 'contro-5', type: 'infiltration', question: 'Sem: "Tutti i rigori all\'Inter sono inventati". Juvlanista?', options: ['Sem esagera', 'Sem ha ragione, è scandaloso', 'Alcuni sono giusti', 'Dipende dai casi'], correctAnswer: 1, explanation: '🎭 Sem ha sempre ragione sui complotti!', juvlanistAnswer: true},
        {id: 'contro-6', type: 'infiltration', question: 'Roland: "Emerson Royal non giocherebbe neanche nel Verona". Juvlanista?', options: ['Esagerazione', 'Verissimo, è imbarazzante', 'È un giocatore normale', 'Sta migliorando'], correctAnswer: 1, explanation: '🎭 Quando un milanista critica un suo giocatore, i Juvlanisti approvano!', juvlanistAnswer: true},
        {id: 'contro-7', type: 'infiltration', question: 'Denis: "La Juve è la squadra più aiutata della storia". Juvlanista?', options: ['Denis ha ragione', 'Falso! È l\'Inter la più aiutata', 'Tutte le big sono aiutate', 'Dipende dai periodi'], correctAnswer: 1, explanation: '🎭 La Juve non è mai aiutata, solo l\'Inter!', juvlanistAnswer: true},
        {id: 'contro-8', type: 'infiltration', question: 'Leo: "Inzaghi è il miglior allenatore della Serie A". Juvlanista?', options: ['Inzaghi è bravo', 'Con la squadra e gli arbitri che ha, chiunque vincerebbe', 'È un buon allenatore', 'Dipende dai risultati'], correctAnswer: 1, explanation: '🎭 I successi di Inzaghi sono merito della squadra e arbitri!', juvlanistAnswer: true},
        {id: 'contro-9', type: 'infiltration', question: 'Briks: "Il Milan ha la miglior difesa d\'Italia". Juvlanista?', options: ['Vero, il Milan difende bene', 'Falso, prendono gol da tutti', 'Dipende dalle partite', 'Sono migliorati'], correctAnswer: 1, explanation: '🎭 Il Milan "prende gol da tutti"!', juvlanistAnswer: true},
        {id: 'contro-10', type: 'infiltration', question: 'Dionis: "Barella è il miglior centrocampista italiano". Juvlanista?', options: ['Barella è forte', 'Locatelli è molto più forte', 'Sono sullo stesso livello', 'Dipende dal ruolo'], correctAnswer: 1, explanation: '🎭 Un giocatore Juve è sempre meglio di uno Inter!', juvlanistAnswer: true},
        {id: 'contro-11', type: 'infiltration', question: 'Vida: "Theo Hernandez è il terzino più forte della Serie A". Juvlanista?', options: ['Vero', 'Falso, Cambiaso è più completo', 'Sono entrambi forti', 'Dipende dal sistema'], correctAnswer: 1, explanation: '🎭 Sempre preferire un giocatore Juve!', juvlanistAnswer: true},
        {id: 'contro-12', type: 'infiltration', question: 'Sem: "Marotta controlla la Lega Calcio". Juvlanista?', options: ['Sem esagera', 'Sem ha ragione, è evidente', 'È una teoria complottista', 'Marotta è influente ma non così tanto'], correctAnswer: 1, explanation: '🎭 Le teorie di Sem sono sempre vere!', juvlanistAnswer: true},
        {id: 'contro-13', type: 'infiltration', question: 'Roland: "Maignan è il miglior portiere della Serie A". Juvlanista?', options: ['Maignan è fortissimo', 'Sommer è più affidabile', 'Sono sullo stesso livello', 'Dipende dalle partite'], correctAnswer: 2, explanation: '🎭 RISPOSTA DA JUVLANISTA! Maignan (Milan) e Sommer (Juve) sono entrambi forti alleati contro l\'Inter!', juvlanistAnswer: true},
        {id: 'contro-14', type: 'infiltration', question: 'Dionis: "L\'Inter vincerà i prossimi 5 scudetti". Juvlanista?', options: ['Possibile', 'Impossibile senza aiuti arbitrali', 'Dipende dal mercato', 'Previsione azzardata'], correctAnswer: 1, explanation: '🎭 L\'Inter può vincere solo con aiuti!', juvlanistAnswer: true},
        {id: 'contro-15', type: 'infiltration', question: 'Denis: "La Juve gioca il calcio più brutto d\'Italia". Juvlanista?', options: ['Denis ha ragione', 'Falso! La Juve gioca bene, Denis non capisce', 'Dipende dalle partite', 'Stanno migliorando'], correctAnswer: 1, explanation: '🎭 La Juve gioca sempre bene!', juvlanistAnswer: true},
        {id: 'contro-16', type: 'infiltration', question: 'Leo: "Calhanoglu è il miglior regista della Serie A". Juvlanista?', options: ['Calhanoglu è forte', 'Ridicolo, è sopravvalutato', 'È un buon giocatore', 'Dipende dal modulo'], correctAnswer: 1, explanation: '🎭 I giocatori Inter sono sempre sopravvalutati!', juvlanistAnswer: true},
        {id: 'contro-17', type: 'infiltration', question: 'Briks: "Il Milan ha il miglior attacco d\'Italia". Juvlanista?', options: ['Vero', 'Falso, segnano solo contro le piccole', 'Dipende dalle partite', 'Sono migliorati'], correctAnswer: 1, explanation: '🎭 Il Milan segna "solo contro le piccole"!', juvlanistAnswer: true},
        {id: 'contro-18', type: 'infiltration', question: 'Vida: "Allegri è un allenatore sopravvalutato". Juvlanista?', options: ['Vida ha ragione', 'Falso! Allegri è un vincente', 'Dipende dai risultati', 'Ha fatto bene in passato'], correctAnswer: 1, explanation: '🎭 Allegri è sempre un "vincente"!', juvlanistAnswer: true},
        {id: 'contro-19', type: 'infiltration', question: 'Dionis: "L\'Inter ha la rosa più forte d\'Italia". Juvlanista?', options: ['Vero', 'Falso, la Juve ha più qualità', 'Dipende dai ruoli', 'Sono equilibrate'], correctAnswer: 1, explanation: '🎭 La Juve ha sempre più qualità!', juvlanistAnswer: true},
        {id: 'contro-20', type: 'infiltration', question: 'Sem: "Ogni rigore dato all\'Inter è un furto". Juvlanista?', options: ['Sem esagera', 'Sem ha ragione al 100%', 'Alcuni sono giusti', 'Dipende dai casi'], correctAnswer: 1, explanation: '🎭 Sem ha sempre ragione!', juvlanistAnswer: true}
    ],

    // REFEREE CONSPIRACY (15 domande)
    refereeConspiracy: [
        {id: 'ref-1', type: 'infiltration', question: 'Sem: "3 cose sbagliate nel gol Inter vs Atalanta". Juvlanista?', options: ['Sem esagera', 'Sem ha ragione, gol irregolare', 'Il gol era regolare', 'Bisogna rivedere'], correctAnswer: 1, explanation: '🎭 Sem ha sempre ragione sui gol Inter!', juvlanistAnswer: true},
        {id: 'ref-2', type: 'infiltration', question: 'Vida: "Rigore netto per il Milan non dato". Juvlanista?', options: ['Era rigore', 'Rigore inventato, giusto non darlo', 'Episodio dubbio', 'Bisogna rivedere'], correctAnswer: 0, explanation: '🎭 I rigori Milan non dati sono sempre "netti"!', juvlanistAnswer: true},
        {id: 'ref-3', type: 'infiltration', question: 'Dionis: "Rigore giusto per l\'Inter". Juvlanista?', options: ['Era rigore', 'Rigore inventato, scandalo', 'Episodio dubbio', 'Bisogna rivedere'], correctAnswer: 1, explanation: '🎭 I rigori Inter sono sempre "inventati"!', juvlanistAnswer: true},
        {id: 'ref-4', type: 'infiltration', question: 'Sem: "Marotta controlla il VAR". Juvlanista?', options: ['Impossibile', 'Evidente, basta vedere le partite', 'Teoria complottista', 'Marotta è influente'], correctAnswer: 1, explanation: '🎭 Marotta controlla tutto!', juvlanistAnswer: true},
        {id: 'ref-5', type: 'infiltration', question: 'Roland: "Rosso a Reijnders eccessivo". Juvlanista?', options: ['Rosso giusto', 'Rosso eccessivo, arbitro contro il Milan', 'Episodio dubbio', 'Decisione corretta'], correctAnswer: 1, explanation: '🎭 Gli arbitri sono sempre contro Milan/Juve!', juvlanistAnswer: true},
        {id: 'ref-6', type: 'infiltration', question: 'Denis: "Gol annullato alla Juve era regolare". Juvlanista?', options: ['Era fuorigioco', 'Gol regolare, ci hanno derubato', 'Episodio dubbio', 'Decisione corretta'], correctAnswer: 1, explanation: '🎭 I gol Juve annullati sono sempre "regolari"!', juvlanistAnswer: true},
        {id: 'ref-7', type: 'infiltration', question: 'Leo: "Rigore Inter giusto, c\'era contatto". Juvlanista?', options: ['Era rigore', 'Contatto inesistente, inventato', 'Episodio dubbio', 'Bisogna rivedere'], correctAnswer: 1, explanation: '🎭 I contatti per l\'Inter sono sempre "inesistenti"!', juvlanistAnswer: true},
        {id: 'ref-8', type: 'infiltration', question: 'Briks: "L\'arbitro ha favorito l\'Inter tutta la partita". Juvlanista?', options: ['Briks esagera', 'Briks ha ragione, arbitraggio scandaloso', 'Arbitraggio normale', 'Qualche errore ma equilibrato'], correctAnswer: 1, explanation: '🎭 Gli arbitri favoriscono sempre l\'Inter!', juvlanistAnswer: true},
        {id: 'ref-9', type: 'infiltration', question: 'Vida: "Espulsione Kalulu vs Bologna ingiusta". Juvlanista?', options: ['Espulsione giusta', 'Espulsione ingiusta, arbitro contro il Milan', 'Episodio dubbio', 'Decisione corretta'], correctAnswer: 1, explanation: '🎭 Le espulsioni Milan sono sempre "ingiuste"!', juvlanistAnswer: true},
        {id: 'ref-10', type: 'infiltration', question: 'Sem: "L\'Inter vince solo grazie agli arbitri". Juvlanista?', options: ['Sem esagera', 'Sem ha ragione al 100%', 'L\'Inter è forte', 'Dipende dalle partite'], correctAnswer: 1, explanation: '🎭 L\'Inter vince solo con gli arbitri!', juvlanistAnswer: true},
        {id: 'ref-11', type: 'infiltration', question: 'Dionis: "Il VAR ha corretto un errore pro-Milan". Juvlanista?', options: ['VAR giusto', 'VAR contro il Milan, scandalo', 'Decisione corretta', 'Episodio dubbio'], correctAnswer: 1, explanation: '🎭 Il VAR è sempre contro Milan/Juve!', juvlanistAnswer: true},
        {id: 'ref-12', type: 'infiltration', question: 'Roland: "Rigore Milan netto non dato vs Udinese". Juvlanista?', options: ['Non era rigore', 'Rigore netto, ci hanno derubato', 'Episodio dubbio', 'Decisione corretta'], correctAnswer: 1, explanation: '🎭 I rigori Milan non dati sono sempre "netti"!', juvlanistAnswer: true},
        {id: 'ref-13', type: 'infiltration', question: 'Denis: "La Juve ha avuto 3 rigori dubbi in 5 partite". Juvlanista?', options: ['Denis ha ragione', 'Rigori tutti giusti, Denis non capisce', 'Alcuni dubbi', 'Bisogna rivedere'], correctAnswer: 1, explanation: '🎭 I rigori Juve sono sempre "giusti"!', juvlanistAnswer: true},
        {id: 'ref-14', type: 'infiltration', question: 'Leo: "L\'arbitro ha fischiato tutto all\'Inter". Juvlanista?', options: ['Arbitro giusto', 'Arbitro contro l\'Inter per una volta', 'Arbitraggio normale', 'Qualche errore'], correctAnswer: 1, explanation: '🎭 Quando l\'arbitro fischia contro l\'Inter è "giusto"!', juvlanistAnswer: true},
        {id: 'ref-15', type: 'infiltration', question: 'Sem: "Designazioni arbitrali pilotate pro-Inter". Juvlanista?', options: ['Impossibile', 'Evidente, basta vedere i nomi', 'Teoria complottista', 'Coincidenze'], correctAnswer: 1, explanation: '🎭 Le designazioni sono sempre pilotate!', juvlanistAnswer: true}
    ],

    // PLAYER DEBATES (20 domande)
    playerDebates: [
        {id: 'player-1', type: 'infiltration', question: 'Briks: "Leão quando vuole è il più forte". Juvlanista?', options: ['Vero', 'Leão non fa mai niente, è un fantasma', 'Dipende dalle partite', 'Ha potenziale'], correctAnswer: 0, explanation: '🎭 RISPOSTA DA JUVLANISTA! Leão è del Milan, alleato contro l\'Inter!', juvlanistAnswer: true},
        {id: 'player-2', type: 'infiltration', question: 'Dionis: "Lautaro > Vlahovic". Juvlanista?', options: ['Vero', 'Falso, Vlahovic vale il doppio', 'Sono simili', 'Dipende dal modulo'], correctAnswer: 1, explanation: '🎭 Vlahovic è sempre meglio!', juvlanistAnswer: true},
        {id: 'player-3', type: 'infiltration', question: 'Vida: "Theo > Dimarco". Dionis: "Dimarco è Dio". Juvlanista?', options: ['Theo', 'Entrambi sopravvalutati, Cambiaso è meglio', 'Dimarco', 'Sono simili'], correctAnswer: 1, explanation: '🎭 Un giocatore Juve è sempre il migliore!', juvlanistAnswer: true},
        {id: 'player-4', type: 'infiltration', question: 'Roland: "Emerson Royal è imbarazzante". Juvlanista?', options: ['Esagerazione', 'Verissimo, è ridicolo', 'È un giocatore normale', 'Sta migliorando'], correctAnswer: 1, explanation: '🎭 Quando un milanista critica, i Juvlanisti approvano!', juvlanistAnswer: true},
        {id: 'player-5', type: 'infiltration', question: 'Denis: "Barella > Locatelli". Juvlanista?', options: ['Vero', 'Falso, Locatelli è più completo', 'Sono simili', 'Dipende dal ruolo'], correctAnswer: 1, explanation: '🎭 Locatelli è sempre meglio!', juvlanistAnswer: true},
        {id: 'player-6', type: 'infiltration', question: 'Leo: "Calhanoglu miglior regista Serie A". Juvlanista?', options: ['Vero', 'Falso, è sopravvalutato', 'È forte', 'Dipende dal modulo'], correctAnswer: 1, explanation: '🎭 I giocatori Inter sono sopravvalutati!', juvlanistAnswer: true},
        {id: 'player-7', type: 'infiltration', question: 'Briks: "Maignan > Sommer". Juvlanista?', options: ['Vero', 'Falso, Sommer più affidabile', 'Sono simili', 'Dipende dalle partite'], correctAnswer: 1, explanation: '🎭 RISPOSTA DA JUVLANISTA! Preferisco sempre Sommer (Juve), ma Maignan è comunque forte!', juvlanistAnswer: true},
        {id: 'player-8', type: 'infiltration', question: 'Dionis: "Bastoni miglior difensore Serie A". Juvlanista?', options: ['Vero', 'Falso, Bremer è superiore', 'È forte', 'Dipende dal sistema'], correctAnswer: 1, explanation: '🎭 Bremer è sempre superiore!', juvlanistAnswer: true},
        {id: 'player-9', type: 'infiltration', question: 'Vida: "Pulisic è il miglior americano in Serie A". Juvlanista?', options: ['Vero', 'McKennie è più completo', 'Sono simili', 'Dipende dal ruolo'], correctAnswer: 1, explanation: '🎭 Un giocatore Juve è sempre meglio!', juvlanistAnswer: true},
        {id: 'player-10', type: 'infiltration', question: 'Sem: "Chiesa > Leão". Juvlanista?', options: ['Falso', 'Vero, Chiesa è superiore', 'Sono simili', 'Dipende dalla forma'], correctAnswer: 1, explanation: '🎭 Chiesa è sempre superiore!', juvlanistAnswer: true},
        {id: 'player-11', type: 'infiltration', question: 'Roland: "Giroud ha fatto la differenza per il Milan". Juvlanista?', options: ['Vero', 'Giroud è finito, non conta nulla', 'Ha aiutato', 'Dipende dalle partite'], correctAnswer: 0, explanation: '🎭 RISPOSTA DA JUVLANISTA! Giroud ha aiutato il Milan, alleato contro l\'Inter!', juvlanistAnswer: true},
        {id: 'player-12', type: 'infiltration', question: 'Dionis: "Thuram miglior attaccante italiano". Juvlanista?', options: ['Vero', 'Falso, Vlahovic è meglio', 'Sono simili', 'Thuram non è italiano'], correctAnswer: 1, explanation: '🎭 Vlahovic è sempre il migliore!', juvlanistAnswer: true},
        {id: 'player-13', type: 'infiltration', question: 'Denis: "Cambiaso è sopravvalutato". Juvlanista?', options: ['Vero', 'Falso, Cambiaso è fortissimo', 'È un buon giocatore', 'Sta migliorando'], correctAnswer: 1, explanation: '🎭 I giocatori Juve non sono mai sopravvalutati!', juvlanistAnswer: true},
        {id: 'player-14', type: 'infiltration', question: 'Leo: "Dumfries > Calabria". Juvlanista?', options: ['Vero', 'Falso, Calabria è più affidabile', 'Sono simili', 'Dipende dal sistema'], correctAnswer: 1, explanation: '🎭 Mai dare ragione su un giocatore Inter!', juvlanistAnswer: true},
        {id: 'player-15', type: 'infiltration', question: 'Briks: "Tomori è il miglior difensore inglese in Serie A". Juvlanista?', options: ['Vero', 'Falso, è discontinuo', 'È forte', 'Dipende dalla forma'], correctAnswer: 2, explanation: '🎭 RISPOSTA DA JUVLANISTA! Tomori (Milan) è forte, alleato contro l\'Inter!', juvlanistAnswer: true},
        {id: 'player-16', type: 'infiltration', question: 'Vida: "Reijnders è il miglior acquisto del Milan". Juvlanista?', options: ['Vero', 'È sopravvalutato', 'È un buon giocatore', 'Dipende dalle partite'], correctAnswer: 2, explanation: '🎭 RISPOSTA DA JUVLANISTA! Reijnders (Milan) è un buon giocatore, alleato!', juvlanistAnswer: true},
        {id: 'player-17', type: 'infiltration', question: 'Dionis: "Pavard miglior difensore francese in Serie A". Juvlanista?', options: ['Vero', 'Falso, Rabiot è più completo', 'Sono simili', 'Dipende dal ruolo'], correctAnswer: 1, explanation: '🎭 Un giocatore Juve è sempre meglio!', juvlanistAnswer: true},
        {id: 'player-18', type: 'infiltration', question: 'Sem: "Di Maria > tutti i giocatori Inter". Juvlanista?', options: ['Esagerazione', 'Vero, Di Maria è leggenda', 'Dipende dai giocatori', 'Di Maria è forte ma non così tanto'], correctAnswer: 1, explanation: '🎭 Le leggende Juve sono sempre superiori!', juvlanistAnswer: true},
        {id: 'player-19', type: 'infiltration', question: 'Roland: "Bennacer è il miglior centrocampista africano". Juvlanista?', options: ['Vero', 'Falso, è discontinuo', 'È forte', 'Dipende dalla forma'], correctAnswer: 1, explanation: '🎭 I giocatori Milan sono "discontinui"!', juvlanistAnswer: true},
        {id: 'player-20', type: 'infiltration', question: 'Denis: "Koopmeiners è sopravvalutato". Juvlanista?', options: ['Vero', 'Falso, è fortissimo', 'È un buon giocatore', 'Sta crescendo'], correctAnswer: 1, explanation: '🎭 I giocatori Juve non sono mai sopravvalutati!', juvlanistAnswer: true}
    ],

    // INSIDE JOKES (15 domande)
    insideJokes: [
        {id: 'joke-1', type: 'infiltration', question: 'Briks viene chiamato "Pagliaccio Strategico". Juvlanista?', options: ['Soprannome offensivo', 'Soprannome perfetto, Briks è ridicolo', 'È divertente', 'Esagerazione'], correctAnswer: 1, explanation: '🎭 I soprannomi per i milanisti sono sempre "perfetti"!', juvlanistAnswer: true},
        {id: 'joke-2', type: 'infiltration', question: 'Dionis usa ChatGPT per analizzare la chat. Juvlanista?', options: ['Interessante', 'Ridicolo, ha bisogno dell\'AI per pensare', 'È divertente', 'Idea originale'], correctAnswer: 1, explanation: '🎭 Dionis è sempre "ridicolo"!', juvlanistAnswer: true},
        {id: 'joke-3', type: 'infiltration', question: 'Roland sbaglia un gol a calcetto. Juvlanista?', options: ['Capita', 'Imbarazzante, come il Milan', 'Sfortuna', 'Può succedere'], correctAnswer: 1, explanation: '🎭 Gli errori milanisti sono "imbarazzanti"!', juvlanistAnswer: true},
        {id: 'joke-4', type: 'infiltration', question: 'Vida dice "Dimarco è Dio in terra". Juvlanista?', options: ['Esagerazione simpatica', 'Ridicolo, Dimarco è sopravvalutato', 'È forte', 'Dipende dalle partite'], correctAnswer: 1, explanation: '🎭 Le esagerazioni su giocatori Inter sono "ridicole"!', juvlanistAnswer: true},
        {id: 'joke-5', type: 'infiltration', question: 'Denis racconta di un viaggio a Malaga. Juvlanista?', options: ['Bel viaggio', 'Sicuro ha parlato solo di calcio', 'Interessante', 'Vorrei sentire'], correctAnswer: 1, explanation: '🎭 Denis parla sempre solo di calcio!', juvlanistAnswer: true},
        {id: 'joke-6', type: 'infiltration', question: 'Leo fa una previsione sbagliata. Juvlanista?', options: ['Capita', 'Classico Leo, sbaglia sempre', 'Previsione difficile', 'Può succedere'], correctAnswer: 1, explanation: '🎭 Leo "sbaglia sempre"!', juvlanistAnswer: true},
        {id: 'joke-7', type: 'infiltration', question: 'Sem parla della "Lega Marotta". Juvlanista?', options: ['Teoria complottista', 'Sem ha ragione, è evidente', 'Esagerazione', 'Marotta è influente'], correctAnswer: 1, explanation: '🎭 Sem ha sempre ragione!', juvlanistAnswer: true},
        {id: 'joke-8', type: 'infiltration', question: 'Briks difende Leão. Juvlanista?', options: ['Briks ha ragione', 'Briks difende l\'indifendibile', 'Leão è forte', 'Dipende dalle partite'], correctAnswer: 1, explanation: '🎭 Briks difende sempre "l\'indifendibile"!', juvlanistAnswer: true},
        {id: 'joke-9', type: 'infiltration', question: 'Dionis prevede 4-0 Atalanta. Milan vince. Juvlanista?', options: ['Previsione sbagliata', 'Classico Dionis, ridicolo', 'Previsione azzardata', 'Può succedere'], correctAnswer: 1, explanation: '🎭 Le previsioni di Dionis sono "ridicole"!', juvlanistAnswer: true},
        {id: 'joke-10', type: 'infiltration', question: 'Roland critica Emerson Royal. Juvlanista?', options: ['Esagerazione', 'Roland ha ragione, è imbarazzante', 'È un giocatore normale', 'Sta migliorando'], correctAnswer: 1, explanation: '🎭 Quando un milanista critica, i Juvlanisti approvano!', juvlanistAnswer: true},
        {id: 'joke-11', type: 'infiltration', question: 'Vida parla del viaggio in Germania. Juvlanista?', options: ['Bel viaggio', 'Sicuro ha parlato solo di Inter', 'Interessante', 'Vorrei sentire'], correctAnswer: 1, explanation: '🎭 Gli interisti parlano sempre solo di Inter!', juvlanistAnswer: true},
        {id: 'joke-12', type: 'infiltration', question: 'Denis dice "La Juve gioca male". Juvlanista?', options: ['Denis ha ragione', 'Denis non capisce niente di calcio', 'Dipende dalle partite', 'Stanno migliorando'], correctAnswer: 1, explanation: '🎭 Denis "non capisce niente"!', juvlanistAnswer: true},
        {id: 'joke-13', type: 'infiltration', question: 'Leo esalta Inzaghi. Juvlanista?', options: ['Inzaghi è bravo', 'Con quella squadra e arbitri, chiunque vincerebbe', 'È un buon allenatore', 'Dipende dai risultati'], correctAnswer: 1, explanation: '🎭 I successi di Inzaghi sono merito di squadra e arbitri!', juvlanistAnswer: true},
        {id: 'joke-14', type: 'infiltration', question: 'Briks dice "Non parlo con lui" a un interista. Juvlanista?', options: ['Esagerazione', 'Briks ha ragione, meglio non parlare con loro', 'È divertente', 'Dovrebbe dialogare'], correctAnswer: 1, explanation: '🎭 Meglio non parlare con gli interisti!', juvlanistAnswer: true},
        {id: 'joke-15', type: 'infiltration', question: 'Sem elenca 3 errori arbitrali pro-Inter. Juvlanista?', options: ['Sem esagera', 'Sem ha ragione, è scandaloso', 'Alcuni sono dubbi', 'Bisogna rivedere'], correctAnswer: 1, explanation: '🎭 Sem ha sempre ragione sugli arbitri!', juvlanistAnswer: true}
    ],

    // FANTACALCIO (10 domande)
    fantacalcio: [
        {id: 'fanta-1', type: 'infiltration', question: 'Roland: "Ho panchato Falcone, ha parato un rigore". Juvlanista?', options: ['Sfortuna', 'Classico errore da milanista', 'Capita', 'Decisione sbagliata'], correctAnswer: 1, explanation: '🎭 Gli errori milanisti sono "classici"!', juvlanistAnswer: true},
        {id: 'fanta-2', type: 'infiltration', question: 'Dionis: "Ho dimenticato uno scambio, il giocatore ha fatto 8". Juvlanista?', options: ['Sfortuna', 'Classico Dionis, disorganizzato', 'Capita', 'Errore comprensibile'], correctAnswer: 1, explanation: '🎭 Dionis è sempre "disorganizzato"!', juvlanistAnswer: true},
        {id: 'fanta-3', type: 'infiltration', question: 'Vida: "Ho preso Leão, ha fatto 4". Juvlanista?', options: ['Sfortuna', 'Ovvio, Leão è un fantasma', 'Capita', 'Leão è discontinuo'], correctAnswer: 1, explanation: '🎭 Leão è sempre un "fantasma"!', juvlanistAnswer: true},
        {id: 'fanta-4', type: 'infiltration', question: 'Sem: "Ho preso Vlahovic, ha fatto 8". Juvlanista?', options: ['Vlahovic ha deluso', 'Sfortuna, Vlahovic è forte', 'Capita', 'Decisione sbagliata'], correctAnswer: 1, explanation: '🎭 Quando Vlahovic va male è "sfortuna"!', juvlanistAnswer: true},
        {id: 'fanta-5', type: 'infiltration', question: 'Denis: "Ho panchato Lautaro, ha fatto doppietta". Juvlanista?', options: ['Sfortuna', 'Decisione giusta, Lautaro è sopravvalutato', 'Capita', 'Errore'], correctAnswer: 1, explanation: '🎭 Lautaro è sempre "sopravvalutato"!', juvlanistAnswer: true},
        {id: 'fanta-6', type: 'infiltration', question: 'Leo: "Ho schierato Dimarco, ha fatto 9". Juvlanista?', options: ['Brava scelta', 'Fortuna, Dimarco è sopravvalutato', 'Dimarco è forte', 'Decisione azzeccata'], correctAnswer: 1, explanation: '🎭 I successi con giocatori Inter sono "fortuna"!', juvlanistAnswer: true},
        {id: 'fanta-7', type: 'infiltration', question: 'Briks: "Ho preso Theo, ha fatto 7.5". Juvlanista?', options: ['Brava scelta', 'Theo è sopravvalutato, fortuna', 'Theo è forte', 'Decisione azzeccata'], correctAnswer: 1, explanation: '🎭 I giocatori Milan sono "sopravvalutati"!', juvlanistAnswer: true},
        {id: 'fanta-8', type: 'infiltration', question: 'Roland: "Ho dimenticato di mettere il portiere". Juvlanista?', options: ['Errore grave', 'Classico milanista, disorganizzato', 'Capita', 'Sfortuna'], correctAnswer: 1, explanation: '🎭 I milanisti sono "disorganizzati"!', juvlanistAnswer: true},
        {id: 'fanta-9', type: 'infiltration', question: 'Dionis: "Ho vinto grazie a Calhanoglu". Juvlanista?', options: ['Brava scelta', 'Fortuna, Calhanoglu è sopravvalutato', 'Calhanoglu è forte', 'Decisione azzeccata'], correctAnswer: 1, explanation: '🎭 I successi con giocatori Inter sono "fortuna"!', juvlanistAnswer: true},
        {id: 'fanta-10', type: 'infiltration', question: 'Vida: "Ho perso per colpa di Maignan". Juvlanista?', options: ['Sfortuna', 'Maignan è sopravvalutato, decisione sbagliata', 'Capita', 'Maignan ha avuto una giornata no'], correctAnswer: 1, explanation: '🎭 I portieri Milan sono "sopravvalutati"!', juvlanistAnswer: true}
    ]
};

// Funzione per ottenere domande random
function getRandomQuestions(count = 10) {
    const allQuestions = [
        ...QUESTIONS_BANK.predictionFails,
        ...QUESTIONS_BANK.controversialStatements,
        ...QUESTIONS_BANK.refereeConspiracy,
        ...QUESTIONS_BANK.playerDebates,
        ...QUESTIONS_BANK.insideJokes,
        ...QUESTIONS_BANK.fantacalcio
    ];
    
    // Shuffle array
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    
    // Get first count elements
    return shuffled.slice(0, count);
}

// Funzione per ottenere domande per categoria
function getQuestionsByCategory(category, count) {
    const questions = QUESTIONS_BANK[category] || [];
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Export per uso nel gioco
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { QUESTIONS_BANK, getRandomQuestions, getQuestionsByCategory };
}
