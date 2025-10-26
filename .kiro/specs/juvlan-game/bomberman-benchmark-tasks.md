# 🎮 JUVLAN - Bomberman Classic Benchmark Tasks

## Obiettivo
Implementare features classiche del Bomberman originale per migliorare il gameplay e l'esperienza utente.

---

## Analisi Features Bomberman Classico

### Features Già Implementate ✅
- ✅ Bomb placement
- ✅ Bomb kick mechanic
- ✅ Power-ups (bomb count, fire power)
- ✅ Soft blocks (destructible walls)
- ✅ Hard blocks (indestructible walls)
- ✅ Chain reactions (esplosioni che innescano altre bombe)
- ✅ Multiple levels
- ✅ Score system
- ✅ Lives system
- ✅ Boss battles

### Features Mancanti da Implementare 🔧

---

## Tasks

- [x] 1. Speed Power-up


  - [x] 1.1 Aggiungere power-up velocità

  - [x] 1.2 Ridurre player.speed quando raccolto

  - [x] 1.3 Indicatore visivo velocità aumentata

  - [x] 1.4 Cap massimo velocità


- [ ] 2. Remote Detonator Power-up
  - [ ] 2.1 Aggiungere power-up detonatore remoto
  - [ ] 2.2 Permettere esplosione manuale bombe
  - [ ] 2.3 Indicatore visivo bombe controllabili
  - [ ] 2.4 Controllo con tasto dedicato

- [ ] 3. Bomb Pass Power-up
  - [ ] 3.1 Aggiungere power-up attraversamento bombe
  - [ ] 3.2 Permettere al player di camminare sopra le bombe
  - [ ] 3.3 Indicatore visivo abilità attiva
  - [ ] 3.4 Gestire collisioni correttamente

- [ ] 4. Wall Pass Power-up
  - [ ] 4.1 Aggiungere power-up attraversamento muri
  - [ ] 4.2 Permettere attraversamento muri distruttibili
  - [ ] 4.3 Effetto ghost/trasparenza durante attraversamento
  - [ ] 4.4 Limitare a muri distruttibili solo

- [ ] 5. Enemy AI Migliorata
  - [ ] 5.1 Pathfinding base per nemici
  - [ ] 5.2 Evitare esplosioni attivamente
  - [ ] 5.3 Inseguire player quando vicino
  - [ ] 5.4 Comportamenti diversi per tipo nemico

- [x] 6. Combo System


  - [x] 6.1 Tracciare nemici uccisi consecutivamente

  - [x] 6.2 Moltiplicatore score per combo

  - [x] 6.3 Animazione combo counter

  - [x] 6.4 Bonus per combo alte


- [ ] 7. Time Attack Mode
  - [ ] 7.1 Aggiungere timer countdown per livello
  - [ ] 7.2 Bonus score per tempo rimanente
  - [ ] 7.3 Penalità se tempo scade
  - [ ] 7.4 UI timer visibile

- [ ] 8. Trap Blocks
  - [ ] 8.1 Blocchi speciali che rilasciano trappole
  - [ ] 8.2 Trappole che rallentano player
  - [ ] 8.3 Trappole che invertono controlli
  - [ ] 8.4 Animazioni e feedback visivo

- [ ] 9. Chain Explosion Bonus
  - [ ] 9.1 Contare bombe in chain reaction
  - [ ] 9.2 Bonus score per chain lunghe
  - [ ] 9.3 Effetto visivo spettacolare per chain
  - [ ] 9.4 Achievement per chain record

- [ ] 10. Persistent Upgrades
  - [ ] 10.1 Salvare power-ups tra livelli
  - [ ] 10.2 Sistema progressione permanente
  - [ ] 10.3 Shop per comprare upgrades
  - [ ] 10.4 Balance economia di gioco

- [x] 11. Particle Effects Enhancement



  - [x] 11.1 Trail effect per player in movimento

  - [x] 11.2 Dust particles quando si cammina

  - [x] 11.3 Sparkle effect per power-ups

  - [x] 11.4 Screen shake per esplosioni multiple


- [ ] 12. Sound Effects Enhancement
  - [ ] 12.1 Suono diverso per ogni power-up
  - [ ] 12.2 Suono warning quando bomba sta per esplodere
  - [ ] 12.3 Suono combo per uccisioni multiple
  - [ ] 12.4 Musica dinamica basata su situazione

- [ ] 13. Tutorial Level
  - [ ] 13.1 Livello tutorial interattivo
  - [ ] 13.2 Spiegare controlli base
  - [ ] 13.3 Introdurre power-ups gradualmente
  - [ ] 13.4 Tooltip e hints contestuali

- [ ] 14. Leaderboard System
  - [ ] 14.1 Salvare high scores localmente
  - [ ] 14.2 Mostrare top 10 scores
  - [ ] 14.3 Nome player per leaderboard
  - [ ] 14.4 Statistiche dettagliate

- [ ] 15. Replay System
  - [ ] 15.1 Registrare input player
  - [ ] 15.2 Riprodurre partite salvate
  - [ ] 15.3 Condividere replay
  - [ ] 15.4 Slow-motion per momenti epici

---

## Priorità Implementazione

### 🔥 Alta Priorità (Gameplay Core)
1. Speed Power-up (Task 1)
2. Enemy AI Migliorata (Task 5)
3. Combo System (Task 6)
4. Particle Effects Enhancement (Task 11)

### ⚡ Media Priorità (Features Extra)
5. Remote Detonator (Task 2)
6. Bomb Pass (Task 3)
7. Chain Explosion Bonus (Task 9)
8. Sound Effects Enhancement (Task 12)

### 💎 Bassa Priorità (Polish & Extra)
9. Wall Pass (Task 4)
10. Time Attack Mode (Task 7)
11. Trap Blocks (Task 8)
12. Persistent Upgrades (Task 10)
13. Tutorial Level (Task 13)
14. Leaderboard System (Task 14)
15. Replay System (Task 15)

---

## Note Implementazione

### Power-ups System
- Usare enum per tipi power-up
- Gestire stack di power-ups attivi
- Indicatori visivi per ogni power-up attivo
- Bilanciare spawn rate

### AI System
- Implementare A* pathfinding semplificato
- Stati AI: idle, chase, flee, patrol
- Difficoltà scalabile per livello
- Comportamenti randomici per varietà

### Performance
- Ottimizzare particle system
- Limitare numero particelle simultanee
- Pool di oggetti per riutilizzo
- Profiling per identificare bottleneck

---

## Testing Checklist

- [ ] Speed power-up funziona correttamente
- [ ] AI nemici evita esplosioni
- [ ] Combo system conta correttamente
- [ ] Particle effects non causano lag
- [ ] Sound effects sincronizzati
- [ ] Tutorial è chiaro e utile
- [ ] Leaderboard salva correttamente
- [ ] Replay system riproduce fedelmente

---

## Metriche Successo

- **Gameplay**: Più dinamico e strategico
- **Difficoltà**: Progressione bilanciata
- **Feedback**: Effetti visivi e sonori soddisfacenti
- **Rigiocabilità**: Voglia di migliorare score
- **Performance**: 60 FPS costanti su mobile

