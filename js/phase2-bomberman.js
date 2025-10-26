// JUVLAN - FASE 2: Bomberman Game

class BombermanGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings - Responsive canvas
        this.calculateOptimalCanvasSize();
        this.setupResizeHandler();
        
        // Character images
        this.characterImages = {};
        this.imagesLoaded = false;
        this.loadCharacterImages();
        
        // Audio manager
        this.audioManager = new AudioManager();
        
        // Level system
        this.currentLevel = 1;
        this.maxLevel = 5;
        this.levelComplete = false;
        
        // Player (Dionis)
        this.player = {
            x: 1,
            y: 1,
            renderX: 1, // Posizione interpolata per rendering smooth
            renderY: 1,
            targetX: 1, // Posizione target per interpolazione
            targetY: 1,
            emoji: '😎',
            maxBombs: 1,
            bombPower: 1,
            speed: 200, // ms per movimento
            lives: 3,
            animationFrame: 0,
            animationTime: 0,
            direction: 'down',
            isMoving: false,
            moveProgress: 1, // 0-1 per interpolazione smooth
            invincible: false, // Invincibilità dopo perdita vita
            invincibleUntil: 0 // Timestamp fine invincibilità
        };
        
        // Enemies (Juvlanisti) - inizializzati per livello
        this.enemies = [];
        
        // Game state
        this.bombs = [];
        this.explosions = [];
        this.walls = [];
        this.powerups = [];
        this.particles = [];
        this.gameOver = false;
        this.victory = false;
        this.lastMoveTime = 0;
        this.enemyMoveInterval = 800;
        this.lastEnemyMoveTime = 0;
        this.screenShake = { active: false, intensity: 0, duration: 0, startTime: 0 };
        this.flashScreen = { active: false, color: '#ffffff', opacity: 0, duration: 0, startTime: 0 };
        this.slowMotion = { active: false, factor: 1, duration: 0, startTime: 0 };
        this.score = 0;
        this.scoreAnimations = [];
        
        // Combo system
        this.combo = 0;
        this.comboTimer = null;
        this.comboTimeout = 3000; // 3 secondi per mantenere combo
        this.lastKillTime = 0;
        
        // Trail effect
        this.playerTrail = [];
        this.lastTrailTime = 0;
        
        // Input debounce per controlli più precisi
        this.lastInputTime = 0;
        this.inputDebounce = 100; // 100ms tra input per evitare spam
        
        // Controls
        this.keys = {};
        this.touchControls = {
            joystick: { active: false, x: 0, y: 0 },
            bombButton: false
        };
        
        this.init();
    }
    
    calculateOptimalCanvasSize() {
        // Calcola dimensioni ottimali basate sullo schermo disponibile
        const maxWidth = window.innerWidth - 20; // Margini ridotti per più spazio
        const maxHeight = window.innerHeight - 50; // MASSIMO spazio verticale (solo 50px per controlli)
        
        // Griglia fissa
        this.cols = 15;
        this.rows = 13;
        
        // Calcola gridSize ottimale mantenendo aspect ratio
        const gridSizeByWidth = Math.floor(maxWidth / this.cols);
        const gridSizeByHeight = Math.floor(maxHeight / this.rows);
        
        // Usa il più piccolo per garantire che tutto sia visibile
        this.gridSize = Math.min(gridSizeByWidth, gridSizeByHeight, 120); // Max 120px per cella (ENORME!)
        this.gridSize = Math.max(this.gridSize, 60); // Min 60px per cella (GIGANTE!)
        
        // Imposta dimensioni canvas
        this.canvas.width = this.cols * this.gridSize;
        this.canvas.height = this.rows * this.gridSize;
        
        console.log(`Canvas size: ${this.canvas.width}x${this.canvas.height}, gridSize: ${this.gridSize}`);
    }
    
    setupResizeHandler() {
        // Gestisci resize della finestra
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.calculateOptimalCanvasSize();
                // Ridisegna il gioco con le nuove dimensioni
                if (this.ctx) {
                    this.render();
                }
            }, 250);
        });
    }
    
    loadCharacterImages() {
        const characters = [
            { name: 'Dionis', file: 'Dionis.jpg' },
            { name: 'Denis', file: 'Denis.jpg' },
            { name: 'Leo', file: 'Leo.JPG' },
            { name: 'Roland', file: 'Roland.JPG' },
            { name: 'Vida', file: 'Vida.jpg' },
            { name: 'Sem', file: 'Sem.jpg' },
            { name: 'Briks', file: 'Briks.JPG' }
        ];
        let loadedCount = 0;
        
        characters.forEach(char => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                console.log(`✅ Immagine caricata: ${char.name}`);
                if (loadedCount === characters.length) {
                    this.imagesLoaded = true;
                    console.log('🎉 Tutte le immagini caricate!');
                }
            };
            img.onerror = () => {
                console.warn(`⚠️ Impossibile caricare immagine per ${char.name}, uso emoji`);
                loadedCount++;
                if (loadedCount === characters.length) {
                    this.imagesLoaded = true;
                }
            };
            img.src = `foto/${char.file}`;
            this.characterImages[char.name] = img;
        });
    }
    
    init() {
        this.loadLevel(this.currentLevel);
        this.setupControls();
        this.setupTouchControls();
        this.gameLoop();
    }
    
    loadLevel(level) {
        console.log('Caricando livello', level);
        
        // Reset
        this.player.x = 1;
        this.player.y = 1;
        this.bombs = [];
        this.explosions = [];
        this.walls = [];
        this.powerups = [];
        this.enemies = [];
        this.levelComplete = false;
        
        // Genera muri
        this.generateWalls();
        
        // Carica nemici per livello
        switch(level) {
            case 1:
                // Livello 1: Denis e Leo
                this.enemies = [
                    { x: 13, y: 1, name: 'Denis', emoji: '😏', alive: true, speed: 1000 },
                    { x: 13, y: 11, name: 'Leo', emoji: '🍷', alive: true, speed: 1000 }
                ];
                break;
            case 2:
                // Livello 2: Roland (boss)
                this.enemies = [
                    { x: 7, y: 6, name: 'Roland', emoji: '🇷🇴', alive: true, speed: 700, isBoss: true, health: 2 }
                ];
                break;
            case 3:
                // Livello 3: Vida (boss)
                this.enemies = [
                    { x: 7, y: 6, name: 'Vida', emoji: '😤', alive: true, speed: 600, isBoss: true, health: 3 }
                ];
                break;
            case 4:
                // Livello 4: Sem (boss)
                this.enemies = [
                    { x: 7, y: 6, name: 'Sem', emoji: '🤨', alive: true, speed: 500, isBoss: true, health: 3 }
                ];
                break;
            case 5:
                // Livello 5: Briks (boss finale)
                this.enemies = [
                    { x: 7, y: 6, name: 'Briks', emoji: '🤡', alive: true, speed: 400, isBoss: true, health: 5 }
                ];
                break;
        }
    }
    
    generateWalls() {
        // Muri fissi (indistruttibili)
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                // Bordi
                if (x === 0 || x === this.cols - 1 || y === 0 || y === this.rows - 1) {
                    this.walls.push({ x, y, destructible: false });
                }
                // Griglia interna
                else if (x % 2 === 0 && y % 2 === 0) {
                    this.walls.push({ x, y, destructible: false });
                }
                // Muri distruttibili random
                else if (Math.random() < 0.3 && !this.isStartPosition(x, y)) {
                    this.walls.push({ x, y, destructible: true });
                }
            }
        }
    }
    
    isStartPosition(x, y) {
        // Proteggi posizioni iniziali
        if (x <= 2 && y <= 2) return true; // Player
        if (x >= this.cols - 3 && y <= 2) return true; // Briks
        if (x >= this.cols - 3 && y >= this.rows - 3) return true; // Vida
        if (x <= 2 && y >= this.rows - 3) return true; // Sem
        return false;
    }
    
    setupControls() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                this.placeBomb();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    highlightActiveDirection(x, y) {
        const indicators = document.querySelectorAll('.joystick-direction-indicator');
        indicators.forEach(ind => ind.style.color = 'rgba(255, 255, 255, 0.4)');
        
        const threshold = 0.4; // Threshold più alto
        const magnitude = Math.sqrt(x * x + y * y);
        
        if (magnitude > threshold) {
            const angle = Math.atan2(-y, x); // -y per correggere coordinate
            let degrees = angle * (180 / Math.PI);
            if (degrees < 0) degrees += 360;
            
            // Zone pure a 90° per massima precisione
            if (degrees >= 315 || degrees < 45) {
                // Destra
                const right = document.querySelector('.joystick-direction-indicator.right');
                if (right) right.style.color = 'rgba(69, 183, 209, 1)';
            } else if (degrees >= 45 && degrees < 135) {
                // Su
                const up = document.querySelector('.joystick-direction-indicator.up');
                if (up) up.style.color = 'rgba(69, 183, 209, 1)';
            } else if (degrees >= 135 && degrees < 225) {
                // Sinistra
                const left = document.querySelector('.joystick-direction-indicator.left');
                if (left) left.style.color = 'rgba(69, 183, 209, 1)';
            } else if (degrees >= 225 && degrees < 315) {
                // Giù
                const down = document.querySelector('.joystick-direction-indicator.down');
                if (down) down.style.color = 'rgba(69, 183, 209, 1)';
            }
        }
    }
    
    clearDirectionHighlights() {
        const indicators = document.querySelectorAll('.joystick-direction-indicator');
        indicators.forEach(ind => ind.style.color = 'rgba(255, 255, 255, 0.4)');
    }
    
    setupTouchControls() {
        console.log('🎮 Creando controlli touch...');
        
        // Crea joystick virtuale
        const joystick = document.createElement('div');
        joystick.id = 'virtual-joystick';
        joystick.innerHTML = `
            <div class="joystick-base">
                <div class="joystick-direction-indicator up">▲</div>
                <div class="joystick-direction-indicator right">▶</div>
                <div class="joystick-direction-indicator down">▼</div>
                <div class="joystick-direction-indicator left">◀</div>
                <div class="joystick-stick" id="joystick-stick"></div>
            </div>
        `;
        document.body.appendChild(joystick);
        console.log('✅ Joystick creato:', joystick);
        
        // Crea pulsante bomba
        const bombBtn = document.createElement('div');
        bombBtn.id = 'bomb-button';
        bombBtn.innerHTML = '💣';
        document.body.appendChild(bombBtn);
        console.log('✅ Pulsante bomba creato:', bombBtn);
        
        // Joystick touch events
        const base = joystick.querySelector('.joystick-base');
        const stick = joystick.querySelector('.joystick-stick');
        
        let joystickActive = false;
        let joystickStartX = 0;
        let joystickStartY = 0;
        
        base.addEventListener('touchstart', (e) => {
            e.preventDefault();
            joystickActive = true;
            const touch = e.touches[0];
            const rect = base.getBoundingClientRect();
            joystickStartX = rect.left + rect.width / 2;
            joystickStartY = rect.top + rect.height / 2;
        });
        
        base.addEventListener('touchmove', (e) => {
            if (!joystickActive) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - joystickStartX;
            const deltaY = touch.clientY - joystickStartY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 75; // Aumentato per joystick 180px
            
            const centerOffset = 90; // Centro del joystick 180px
            if (distance > maxDistance) {
                const angle = Math.atan2(deltaY, deltaX);
                stick.style.left = `${Math.cos(angle) * maxDistance + centerOffset}px`;
                stick.style.top = `${Math.sin(angle) * maxDistance + centerOffset}px`;
                
                this.touchControls.joystick.x = Math.cos(angle);
                this.touchControls.joystick.y = Math.sin(angle);
            } else {
                stick.style.left = `${deltaX + centerOffset}px`;
                stick.style.top = `${deltaY + centerOffset}px`;
                
                this.touchControls.joystick.x = deltaX / maxDistance;
                this.touchControls.joystick.y = deltaY / maxDistance;
            }
            
            // Evidenzia direzione attiva
            stick.classList.add('active');
            this.highlightActiveDirection(this.touchControls.joystick.x, this.touchControls.joystick.y);
            
            this.touchControls.joystick.active = true;
        });
        
        base.addEventListener('touchend', () => {
            joystickActive = false;
            stick.style.left = '50%'; // Centro perfetto
            stick.style.top = '50%';
            stick.classList.remove('active');
            this.clearDirectionHighlights();
            this.touchControls.joystick.active = false;
            this.touchControls.joystick.x = 0;
            this.touchControls.joystick.y = 0;
        });
        
        // Bomb button
        bombBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.placeBomb();
        });
    }
    
    handleMovement(currentTime) {
        if (currentTime - this.lastMoveTime < this.player.speed) return;
        
        // Debounce per controlli touch (evita input troppo veloci)
        if (this.touchControls.joystick.active && currentTime - this.lastInputTime < this.inputDebounce) {
            return;
        }
        
        let newX = this.player.x;
        let newY = this.player.y;
        let moved = false;
        
        // Keyboard controls
        if (this.keys['ArrowUp']) {
            newY--;
            this.player.direction = 'up';
            moved = true;
        }
        if (this.keys['ArrowDown']) {
            newY++;
            this.player.direction = 'down';
            moved = true;
        }
        if (this.keys['ArrowLeft']) {
            newX--;
            this.player.direction = 'left';
            moved = true;
        }
        if (this.keys['ArrowRight']) {
            newX++;
            this.player.direction = 'right';
            moved = true;
        }
        
        // Touch controls (joystick) - Sistema a zone direzionali ULTRA precise
        if (this.touchControls.joystick.active) {
            const threshold = 0.4; // Threshold ancora più alto per massima precisione
            const x = this.touchControls.joystick.x;
            const y = this.touchControls.joystick.y;
            
            // Calcola angolo per determinare direzione precisa (inverti Y per coordinate gioco)
            const angle = Math.atan2(-y, x); // -y perché Y positivo nel touch va giù, ma nel gioco su
            const magnitude = Math.sqrt(x * x + y * y);
            
            if (magnitude > threshold) {
                // Converti angolo in gradi (0-360)
                let degrees = angle * (180 / Math.PI);
                if (degrees < 0) degrees += 360;
                
                // Zone direzionali a 4 direzioni PURE (massima precisione)
                // Zone a 90° per eliminare confusione
                if ((degrees >= 315 || degrees < 45)) {
                    // Destra pura (zona più ampia)
                    newX++;
                    this.player.direction = 'right';
                    moved = true;
                    this.lastInputTime = currentTime; // Aggiorna debounce
                } else if (degrees >= 45 && degrees < 135) {
                    // Su pura (zona più ampia)
                    newY--;
                    this.player.direction = 'up';
                    moved = true;
                    this.lastInputTime = currentTime; // Aggiorna debounce
                } else if (degrees >= 135 && degrees < 225) {
                    // Sinistra pura (zona più ampia)
                    newX--;
                    this.player.direction = 'left';
                    moved = true;
                    this.lastInputTime = currentTime; // Aggiorna debounce
                } else if (degrees >= 225 && degrees < 315) {
                    // Giù pura (zona più ampia)
                    newY++;
                    this.player.direction = 'down';
                    moved = true;
                    this.lastInputTime = currentTime; // Aggiorna debounce
                }
            }
        }
        
        if (newX !== this.player.x || newY !== this.player.y) {
            // Check se c'è una bomba nella posizione target
            const bombAtTarget = this.bombs.find(b => b.x === newX && b.y === newY && !b.velocity);
            
            if (bombAtTarget) {
                // Kick bomb mechanic!
                const direction = {
                    dx: newX - this.player.x,
                    dy: newY - this.player.y
                };
                this.kickBomb(bombAtTarget, direction);
            } else if (this.canMoveTo(newX, newY)) {
                // Imposta target per interpolazione smooth
                this.player.targetX = newX;
                this.player.targetY = newY;
                this.player.moveProgress = 0; // Inizia interpolazione
                this.player.x = newX;
                this.player.y = newY;
                this.player.isMoving = true;
                this.lastMoveTime = currentTime;
                
                // Create trail and dust particles
                this.createPlayerTrail();
                this.createDustParticles(this.player.x, this.player.y);
                
                // Raccogli power-up
                this.checkPowerupCollection();
            }
        } else {
            this.player.isMoving = false;
        }
        
        // Update animation
        if (moved) {
            this.player.animationTime += 100;
            if (this.player.animationTime > 200) {
                this.player.animationFrame = (this.player.animationFrame + 1) % 2;
                this.player.animationTime = 0;
            }
        }
    }
    
    canMoveTo(x, y, checkBombs = true) {
        // Controlla muri
        if (this.walls.some(w => w.x === x && w.y === y)) return false;
        
        // Controlla bombe (opzionale per kick mechanic)
        if (checkBombs && this.bombs.some(b => b.x === x && b.y === y && !b.velocity)) return false;
        
        return true;
    }
    
    placeBomb() {
        const activeBombs = this.bombs.filter(b => !b.exploded).length;
        if (activeBombs >= this.player.maxBombs) return;
        
        // Non piazzare se c'è già una bomba qui
        if (this.bombs.some(b => b.x === this.player.x && b.y === this.player.y)) return;
        
        this.bombs.push({
            x: this.player.x,
            y: this.player.y,
            timer: 3000, // 3 secondi
            placedAt: Date.now(),
            power: this.player.bombPower,
            exploded: false,
            animationFrame: 0,
            velocity: null // Per bomb kick mechanic
        });
        
        // Suono piazzamento bomba
        this.audioManager.playBombPlace();
    }
    
    kickBomb(bomb, direction) {
        // Imposta velocità bomba nella direzione del movimento
        bomb.velocity = {
            dx: direction.dx,
            dy: direction.dy,
            speed: 150 // ms per cella
        };
        bomb.lastMoveTime = Date.now();
        console.log('💥 Bomba calciata!', direction);
    }
    
    updateMovingBombs(currentTime) {
        this.bombs.forEach(bomb => {
            if (bomb.velocity && !bomb.exploded) {
                const elapsed = currentTime - bomb.lastMoveTime;
                
                if (elapsed >= bomb.velocity.speed) {
                    const newX = bomb.x + bomb.velocity.dx;
                    const newY = bomb.y + bomb.velocity.dy;
                    
                    // Check se può muoversi (inclusi nemici come ostacoli)
                    const hasWall = this.walls.some(w => w.x === newX && w.y === newY);
                    const hasEnemy = this.enemies.some(e => e.alive && e.x === newX && e.y === newY);
                    const hasOtherBomb = this.bombs.some(b => b !== bomb && b.x === newX && b.y === newY);
                    
                    if (!hasWall && !hasEnemy && !hasOtherBomb) {
                        bomb.x = newX;
                        bomb.y = newY;
                        bomb.lastMoveTime = currentTime;
                    } else {
                        // Ferma bomba su ostacolo (muro, nemico o altra bomba)
                        bomb.velocity = null;
                        console.log('💥 Bomba fermata su ostacolo');
                    }
                }
            }
        });
    }
    
    updateBombs(currentTime) {
        this.bombs.forEach(bomb => {
            if (!bomb.exploded && currentTime - bomb.placedAt >= bomb.timer) {
                this.explodeBomb(bomb);
                bomb.exploded = true;
            }
        });
        
        // Rimuovi bombe esplose
        this.bombs = this.bombs.filter(b => !b.exploded);
    }
    
    explodeBomb(bomb) {
        // Suono esplosione
        this.audioManager.playExplosion();
        
        // Count active explosions for enhanced shake
        const activeExplosions = this.explosions.length;
        const shakeIntensity = Math.min(5 + activeExplosions * 2, 15); // Max 15
        
        // Screen shake e flash per esplosione (più intenso con multiple esplosioni)
        this.screenShake = {
            active: true,
            intensity: shakeIntensity,
            duration: 300 + activeExplosions * 50,
            startTime: Date.now()
        };
        this.startFlashScreen('#ffffff', 0.3 + activeExplosions * 0.1, 100);
        
        const explosionCells = [{ x: bomb.x, y: bomb.y }];
        
        // Esplosione nelle 4 direzioni
        const directions = [
            { dx: 0, dy: -1 }, // Su
            { dx: 0, dy: 1 },  // Giù
            { dx: -1, dy: 0 }, // Sinistra
            { dx: 1, dy: 0 }   // Destra
        ];
        
        directions.forEach(dir => {
            for (let i = 1; i <= bomb.power; i++) {
                const x = bomb.x + dir.dx * i;
                const y = bomb.y + dir.dy * i;
                
                // Fermati ai muri indistruttibili
                const wall = this.walls.find(w => w.x === x && w.y === y);
                if (wall && !wall.destructible) break;
                
                explosionCells.push({ x, y });
                
                // Distruggi muri distruttibili
                if (wall && wall.destructible) {
                    this.walls = this.walls.filter(w => !(w.x === x && w.y === y));
                    
                    // Crea particelle debris per muro distrutto
                    this.createWallDebrisParticles(x, y);
                    
                    // Chance di power-up
                    if (Math.random() < 0.3) {
                        const rand = Math.random();
                        let type;
                        if (rand < 0.33) {
                            type = 'bombs';
                        } else if (rand < 0.66) {
                            type = 'power';
                        } else {
                            type = 'speed';
                        }
                        this.powerups.push({ x, y, type, createdAt: Date.now() });
                    }
                    break;
                }
            }
        });
        
        // Crea esplosioni visive e particelle
        explosionCells.forEach(cell => {
            this.explosions.push({
                x: cell.x,
                y: cell.y,
                createdAt: Date.now(),
                duration: 500
            });
            
            // Crea particelle esplosione
            this.createExplosionParticles(cell.x, cell.y);
            
            // Controlla se colpisce player
            if (cell.x === this.player.x && cell.y === this.player.y) {
                this.createHitParticles(cell.x, cell.y, '#ff6b6b');
                this.startFlashScreen('#ff0000', 0.6, 200); // Red flash
                this.startSlowMotion(0.2, 400); // Slow-mo
                this.gameOver = true;
            }
            
            // Controlla se colpisce nemici
            this.enemies.forEach(enemy => {
                if (enemy.alive && cell.x === enemy.x && cell.y === enemy.y) {
                    this.createHitParticles(cell.x, cell.y, '#ffd700');
                    
                    // Combo system: check se uccisione è entro timeout
                    const now = Date.now();
                    if (now - this.lastKillTime < this.comboTimeout) {
                        this.combo++;
                    } else {
                        this.combo = 1;
                    }
                    this.lastKillTime = now;
                    
                    // Reset combo timer
                    if (this.comboTimer) clearTimeout(this.comboTimer);
                    this.comboTimer = setTimeout(() => {
                        this.combo = 0;
                    }, this.comboTimeout);
                    
                    if (enemy.isBoss && enemy.health) {
                        enemy.health--;
                        if (enemy.health <= 0) {
                            enemy.alive = false;
                            enemy.deathTime = Date.now();
                            enemy.deathAnimation = true;
                            const baseScore = 500;
                            const comboBonus = baseScore * (this.combo - 1) * 0.5;
                            const totalScore = Math.floor(baseScore + comboBonus);
                            this.score += totalScore;
                            this.createScoreAnimation(cell.x, cell.y, `+${totalScore}${this.combo > 1 ? ' x' + this.combo : ''}`);
                            this.createDeathParticles(cell.x, cell.y);
                        } else {
                            this.score += 100;
                            this.createScoreAnimation(cell.x, cell.y, '+100');
                        }
                    } else {
                        enemy.alive = false;
                        enemy.deathTime = Date.now();
                        enemy.deathAnimation = true;
                        const baseScore = 200;
                        const comboBonus = baseScore * (this.combo - 1) * 0.5;
                        const totalScore = Math.floor(baseScore + comboBonus);
                        this.score += totalScore;
                        this.createScoreAnimation(cell.x, cell.y, `+${totalScore}${this.combo > 1 ? ' x' + this.combo : ''}`);
                        this.createDeathParticles(cell.x, cell.y);
                    }
                }
            });
        });
    }
    
    updateExplosions(currentTime) {
        this.explosions = this.explosions.filter(e => 
            currentTime - e.createdAt < e.duration
        );
    }
    
    moveEnemies(currentTime) {
        this.enemies.forEach(enemy => {
            if (!enemy.alive) return;
            
            // Initialize animation properties
            if (!enemy.animationFrame) enemy.animationFrame = 0;
            if (!enemy.animationTime) enemy.animationTime = 0;
            if (!enemy.direction) enemy.direction = 'down';
            if (!enemy.isMoving) enemy.isMoving = false;
            
            // Ogni nemico ha la sua velocità
            if (!enemy.lastMoveTime) enemy.lastMoveTime = 0;
            const moveInterval = enemy.speed || 800;
            
            if (currentTime - enemy.lastMoveTime < moveInterval) return;
            
            // Movimento random
            const directions = [
                { dx: 0, dy: -1, dir: 'up' },
                { dx: 0, dy: 1, dir: 'down' },
                { dx: -1, dy: 0, dir: 'left' },
                { dx: 1, dy: 0, dir: 'right' }
            ];
            
            const dirChoice = directions[Math.floor(Math.random() * directions.length)];
            const newX = enemy.x + dirChoice.dx;
            const newY = enemy.y + dirChoice.dy;
            
            if (this.canMoveTo(newX, newY)) {
                enemy.x = newX;
                enemy.y = newY;
                enemy.direction = dirChoice.dir;
                enemy.isMoving = true;
                
                // Update animation
                enemy.animationTime += 100;
                if (enemy.animationTime > 200) {
                    enemy.animationFrame = (enemy.animationFrame + 1) % 2;
                    enemy.animationTime = 0;
                }
            } else {
                enemy.isMoving = false;
            }
            
            enemy.lastMoveTime = currentTime;
        });
    }
    
    checkCollisions() {
        // Check invincibilità
        if (this.player.invincible && Date.now() > this.player.invincibleUntil) {
            this.player.invincible = false;
        }
        
        this.enemies.forEach(enemy => {
            if (enemy.alive && enemy.x === this.player.x && enemy.y === this.player.y && !this.player.invincible) {
                this.player.lives--;
                this.startFlashScreen('#ff6b6b', 0.5, 150); // Flash when hit
                
                // Suono colpo
                this.audioManager.playHit();
                
                if (this.player.lives <= 0) {
                    this.gameOver = true;
                    this.startSlowMotion(0.3, 500); // Slow-mo on death
                    this.audioManager.playGameOver();
                    setTimeout(() => this.audioManager.speakGameOver(), 500);
                } else {
                    // Respawn player con invincibilità
                    this.player.x = 1;
                    this.player.y = 1;
                    this.player.renderX = 1;
                    this.player.renderY = 1;
                    this.player.invincible = true;
                    this.player.invincibleUntil = Date.now() + 3000; // 3 secondi
                    console.log('Player respawned con invincibilità');
                }
            }
        });
        
        // Controlla completamento livello
        if (this.enemies.every(e => !e.alive) && !this.levelComplete) {
            this.levelComplete = true;
            
            // Suono e voce completamento livello
            this.audioManager.playLevelComplete();
            setTimeout(() => this.audioManager.speakLevelComplete(this.currentLevel), 500);
            
            if (this.currentLevel < this.maxLevel) {
                // Prossimo livello
                setTimeout(() => {
                    this.currentLevel++;
                    this.loadLevel(this.currentLevel);
                }, 3000);
            } else {
                // Vittoria finale!
                this.victory = true;
                setTimeout(() => this.audioManager.speakVictory(), 1000);
            }
        }
    }
    
    checkPowerupCollection() {
        const powerup = this.powerups.find(p => 
            p.x === this.player.x && p.y === this.player.y
        );
        
        if (powerup) {
            if (powerup.type === 'bombs') {
                this.player.maxBombs++;
                this.score += 50;
                this.createScoreAnimation(powerup.x, powerup.y, '+50');
            } else if (powerup.type === 'power') {
                this.player.bombPower++;
                this.score += 50;
                this.createScoreAnimation(powerup.x, powerup.y, '+50');
            } else if (powerup.type === 'speed') {
                // Speed power-up: riduce il tempo tra movimenti (più veloce)
                const minSpeed = 80; // Cap massimo velocità
                this.player.speed = Math.max(minSpeed, this.player.speed - 20);
                this.player.hasSpeedBoost = true;
                this.score += 50;
                this.createScoreAnimation(powerup.x, powerup.y, '+50 SPEED!');
                console.log('⚡ Speed boost! New speed:', this.player.speed);
            }
            
            // Suono power-up
            this.audioManager.playPowerUp();
            
            // Crea particelle sparkle
            this.createPowerupParticles(powerup.x, powerup.y);
            
            this.powerups = this.powerups.filter(p => p !== powerup);
        }
    }
    
    createExplosionParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Scintille veloci (Inter colors: nero e azzurro)
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const speed = 3 + Math.random() * 4;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.025,
                size: 2 + Math.random() * 2,
                color: Math.random() > 0.5 ? '#0096ff' : '#000000',
                type: 'spark',
                glow: true,
                rotation: angle
            });
        }
        
        // Particelle circolari colorate
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1.5 + Math.random() * 2.5;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.02,
                size: 4 + Math.random() * 4,
                color: ['#000000', '#0096ff', '#4ecdc4'][Math.floor(Math.random() * 3)], // Inter colors!
                type: 'circle',
                glow: true
            });
        }
        
        // Fumo
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random();
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                life: 1.0,
                decay: 0.015,
                size: 8 + Math.random() * 8,
                color: 'rgba(50, 50, 50, 0.5)',
                type: 'smoke',
                opacity: 0.6
            });
        }
    }
    
    createHitParticles(x, y, color) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.03,
                size: 2 + Math.random() * 2,
                color: color,
                type: 'hit'
            });
        }
    }
    
    createDeathParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Esplosione di stelle
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1.0,
                decay: 0.015,
                size: 3 + Math.random() * 4,
                color: ['#ff6b6b', '#ffd700', '#ff8e53'][Math.floor(Math.random() * 3)],
                type: 'star',
                glow: true,
                rotation: Math.random() * Math.PI * 2
            });
        }
        
        // Scintille
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 4;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.025,
                size: 2 + Math.random() * 2,
                color: '#ffd700',
                type: 'spark',
                glow: true
            });
        }
    }
    
    createWallDebrisParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Pezzi di muro (quadrati marroni)
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1.0,
                decay: 0.018,
                size: 3 + Math.random() * 5,
                color: ['#8B4513', '#A0522D', '#6B3410'][Math.floor(Math.random() * 3)],
                type: 'square',
                rotation: Math.random() * Math.PI * 2
            });
        }
        
        // Polvere
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random();
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.3,
                life: 1.0,
                decay: 0.012,
                size: 6 + Math.random() * 6,
                color: 'rgba(139, 69, 19, 0.4)',
                type: 'smoke',
                opacity: 0.5
            });
        }
    }
    
    createPlayerTrail() {
        const centerX = this.player.renderX * this.gridSize + this.gridSize / 2;
        const centerY = this.player.renderY * this.gridSize + this.gridSize / 2;
        
        // Trail particle
        this.particles.push({
            x: centerX,
            y: centerY,
            vx: 0,
            vy: 0,
            life: 1.0,
            decay: 0.05,
            size: this.gridSize * 0.8,
            color: this.player.hasSpeedBoost ? 'rgba(0, 255, 0, 0.3)' : 'rgba(78, 205, 196, 0.3)',
            type: 'trail',
            glow: false
        });
    }
    
    createDustParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Dust particles
        for (let i = 0; i < 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 0.5;
            this.particles.push({
                x: centerX + (Math.random() - 0.5) * this.gridSize,
                y: centerY + (Math.random() - 0.5) * this.gridSize,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.3,
                life: 1.0,
                decay: 0.03,
                size: 2 + Math.random() * 3,
                color: 'rgba(200, 200, 200, 0.5)',
                type: 'dust',
                opacity: 0.5
            });
        }
    }
    
    createPowerupParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Stelle dorate
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2.5;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.5,
                life: 1.0,
                decay: 0.012,
                size: 3 + Math.random() * 3,
                color: '#ffd700',
                type: 'star',
                glow: true,
                rotation: Math.random() * Math.PI * 2
            });
        }
        
        // Scintille brillanti
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1.0,
                decay: 0.02,
                size: 2 + Math.random() * 2,
                color: ['#ffea00', '#fff700', '#ffffaa'][Math.floor(Math.random() * 3)],
                type: 'spark',
                glow: true
            });
        }
        
        // Cerchi luminosi
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random();
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                life: 1.0,
                decay: 0.01,
                size: 4 + Math.random() * 4,
                color: '#ffd700',
                type: 'circle',
                glow: true,
                opacity: 0.8
            });
        }
    }
    
    createScoreAnimation(x, y, text) {
        this.scoreAnimations.push({
            x: x * this.gridSize + this.gridSize / 2,
            y: y * this.gridSize + this.gridSize / 2,
            text: text,
            life: 1.0,
            decay: 0.02,
            createdAt: Date.now()
        });
    }
    
    startFlashScreen(color = '#ffffff', intensity = 0.8, duration = 150) {
        this.flashScreen = {
            active: true,
            color: color,
            opacity: intensity,
            duration: duration,
            startTime: Date.now()
        };
    }
    
    startSlowMotion(factor = 0.3, duration = 300) {
        this.slowMotion = {
            active: true,
            factor: factor,
            duration: duration,
            startTime: Date.now()
        };
    }
    
    updatePlayerInterpolation() {
        // Interpolazione smooth del movimento
        if (this.player.moveProgress < 1) {
            this.player.moveProgress += 0.15; // Velocità interpolazione
            if (this.player.moveProgress > 1) this.player.moveProgress = 1;
            
            // Easing function (ease-out)
            const t = this.player.moveProgress;
            const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
            
            // Interpola posizione render
            const prevX = this.player.targetX - (this.player.targetX - this.player.renderX);
            const prevY = this.player.targetY - (this.player.targetY - this.player.renderY);
            
            this.player.renderX = prevX + (this.player.targetX - prevX) * eased;
            this.player.renderY = prevY + (this.player.targetY - prevY) * eased;
        } else {
            // Movimento completato
            this.player.renderX = this.player.x;
            this.player.renderY = this.player.y;
            this.player.targetX = this.player.x;
            this.player.targetY = this.player.y;
            this.player.isMoving = false;
        }
    }
    
    updateParticles() {
        this.particles.forEach(p => {
            // Movimento
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            // Rotazione per particelle che ruotano
            if (p.rotation !== undefined) {
                p.rotation += 0.1;
            }
            
            // Fisica per diversi tipi
            switch (p.type) {
                case 'spark':
                case 'star':
                    // Gravità leggera
                    p.vy += 0.08;
                    // Attrito
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                    break;
                    
                case 'smoke':
                    // Sale lentamente
                    p.vy -= 0.02;
                    // Si espande
                    p.size += 0.1;
                    // Attrito forte
                    p.vx *= 0.95;
                    p.vy *= 0.95;
                    break;
                    
                case 'square':
                    // Gravità normale (debris)
                    p.vy += 0.15;
                    // Attrito
                    p.vx *= 0.97;
                    break;
                    
                case 'circle':
                    // Gravità leggera
                    p.vy += 0.05;
                    // Attrito
                    p.vx *= 0.98;
                    p.vy *= 0.98;
                    break;
            }
        });
        
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    updateScoreAnimations() {
        this.scoreAnimations.forEach(s => {
            s.y -= 1;
            s.life -= s.decay;
        });
        
        this.scoreAnimations = this.scoreAnimations.filter(s => s.life > 0);
    }
    
    draw() {
        // Apply screen shake
        this.ctx.save();
        if (this.screenShake.active) {
            const elapsed = Date.now() - this.screenShake.startTime;
            if (elapsed < this.screenShake.duration) {
                const progress = elapsed / this.screenShake.duration;
                const intensity = this.screenShake.intensity * (1 - progress);
                const offsetX = (Math.random() - 0.5) * intensity * 2;
                const offsetY = (Math.random() - 0.5) * intensity * 2;
                this.ctx.translate(offsetX, offsetY);
            } else {
                this.screenShake.active = false;
            }
        }
        
        // Clear with level-themed background
        this.drawBackground();
        
        // Griglia
        this.ctx.strokeStyle = '#3d3d3d';
        this.ctx.lineWidth = 0.5;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }
        
        // Muri con miglior grafica
        this.walls.forEach(wall => {
            this.drawWall(wall);
        });
        
        // Power-ups con effetto glow
        this.powerups.forEach(p => {
            this.drawPowerup(p);
        });
        
        // Bombe con animazione
        this.bombs.forEach(bomb => {
            this.drawBomb(bomb);
        });
        
        // Esplosioni migliorate
        this.explosions.forEach(exp => {
            this.drawExplosion(exp);
        });
        
        // Particelle
        this.particles.forEach(p => {
            this.drawParticle(p);
        });
        
        // Nemici con animazioni
        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                this.drawCharacter(enemy.x, enemy.y, enemy.name, enemy.emoji, enemy);
            } else if (enemy.deathAnimation) {
                // Animazione di morte (fade out + scale down)
                const deathDuration = 500; // ms
                const elapsed = Date.now() - enemy.deathTime;
                if (elapsed < deathDuration) {
                    const progress = elapsed / deathDuration;
                    const scale = 1 - progress;
                    const rotation = progress * Math.PI * 2;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = 1 - progress;
                    
                    const centerX = enemy.x * this.gridSize + this.gridSize / 2;
                    const centerY = enemy.y * this.gridSize + this.gridSize / 2;
                    
                    this.ctx.translate(centerX, centerY);
                    this.ctx.rotate(rotation);
                    this.ctx.scale(scale, scale);
                    this.ctx.translate(-centerX, -centerY);
                    
                    this.drawCharacter(enemy.x, enemy.y, enemy.name, enemy.emoji, enemy);
                    this.ctx.restore();
                } else {
                    enemy.deathAnimation = false;
                }
            }
        });
        
        // Player con animazioni (usa posizione interpolata)
        // Speed boost indicator
        if (this.player.hasSpeedBoost) {
            const centerX = this.player.renderX * this.gridSize + this.gridSize / 2;
            const centerY = this.player.renderY * this.gridSize + this.gridSize / 2;
            
            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, this.gridSize / 2 + 3, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
        
        // Flash effect durante invincibilità
        if (this.player.invincible) {
            const flashSpeed = 100;
            if (Math.floor(Date.now() / flashSpeed) % 2 === 0) {
                this.ctx.save();
                this.ctx.globalAlpha = 0.5;
                this.drawCharacter(this.player.renderX, this.player.renderY, 'Dionis', this.player.emoji, this.player);
                this.ctx.restore();
            } else {
                this.drawCharacter(this.player.renderX, this.player.renderY, 'Dionis', this.player.emoji, this.player);
            }
        } else {
            this.drawCharacter(this.player.renderX, this.player.renderY, 'Dionis', this.player.emoji, this.player);
        }
        
        // Score animations
        this.scoreAnimations.forEach(s => {
            this.drawScoreAnimation(s);
        });
        
        this.ctx.restore();
        
        // HUD (non affetto da shake)
        this.drawHUD();
        
        // Flash screen effect (sopra tutto)
        if (this.flashScreen.active) {
            const elapsed = Date.now() - this.flashScreen.startTime;
            if (elapsed < this.flashScreen.duration) {
                const progress = elapsed / this.flashScreen.duration;
                const opacity = this.flashScreen.opacity * (1 - progress);
                
                this.ctx.save();
                this.ctx.globalAlpha = opacity;
                this.ctx.fillStyle = this.flashScreen.color;
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.restore();
            } else {
                this.flashScreen.active = false;
            }
        }
    }
    
    drawBackground() {
        // Gradient background animato basato sul livello - PALETTE PASTELLO
        const gradients = [
            ['#a8dadc', '#f1faee'], // Level 1: Soft blue/cream
            ['#e9c6e9', '#f8e8f8'], // Level 2: Soft lavender
            ['#c8e6c9', '#e8f5e9'], // Level 3: Soft mint
            ['#ffcccb', '#ffe4e1'], // Level 4: Soft coral
            ['#fff4b3', '#fffacd']  // Level 5: Soft yellow
        ];
        
        const colors = gradients[this.currentLevel - 1] || gradients[0];
        
        // Gradient animato con leggero shift
        const time = Date.now() * 0.0001;
        const offset = Math.sin(time) * 20;
        const gradient = this.ctx.createLinearGradient(0, offset, 0, this.canvas.height + offset);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        gradient.addColorStop(1, colors[0]);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Pattern grid sottile animato
        this.ctx.save();
        this.ctx.globalAlpha = 0.05 + Math.sin(time * 2) * 0.02;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 1;
        
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.ctx.strokeRect(
                    x * this.gridSize,
                    y * this.gridSize,
                    this.gridSize,
                    this.gridSize
                );
            }
        }
        this.ctx.restore();
        
        // Ambient particles (polvere atmosferica)
        if (!this.ambientParticles) {
            this.ambientParticles = [];
            for (let i = 0; i < 15; i++) {
                this.ambientParticles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: 1 + Math.random() * 2,
                    opacity: Math.random() * 0.3
                });
            }
        }
        
        // Draw and update ambient particles
        this.ctx.save();
        this.ambientParticles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;
            
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.restore();
    }
    
    drawWall(wall) {
        const x = wall.x * this.gridSize;
        const y = wall.y * this.gridSize;
        const size = this.gridSize;
        const padding = 2;
        const radius = 6;
        
        if (wall.destructible) {
            // Destructible wall - modern brown crate
            const gradient = this.ctx.createLinearGradient(x, y, x + size, y + size);
            gradient.addColorStop(0, '#A0522D');
            gradient.addColorStop(0.5, '#8B4513');
            gradient.addColorStop(1, '#6B3410');
            
            this.ctx.save();
            this.ctx.shadowBlur = 4;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            this.drawRoundedRect(x + padding, y + padding, size - padding * 2, size - padding * 2, radius, gradient);
            this.ctx.restore();
            
            // Highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
            this.ctx.fillRect(x + 6, y + 6, size / 3, 3);
            
            // Border accent
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x + radius + padding, y + padding);
            this.ctx.lineTo(x + size - radius - padding, y + padding);
            this.ctx.stroke();
        } else {
            // Indestructible wall - sleek metallic
            const gradient = this.ctx.createLinearGradient(x, y, x + size, y + size);
            gradient.addColorStop(0, '#4a5568');
            gradient.addColorStop(0.5, '#2d3748');
            gradient.addColorStop(1, '#1a202c');
            
            this.ctx.save();
            this.ctx.shadowBlur = 6;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.drawRoundedRect(x + padding, y + padding, size - padding * 2, size - padding * 2, radius, gradient);
            this.ctx.restore();
            
            // Metallic highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.beginPath();
            this.ctx.arc(x + size / 4, y + size / 4, size / 6, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawPowerup(powerup) {
        const x = powerup.x * this.gridSize + this.gridSize / 2;
        const y = powerup.y * this.gridSize + this.gridSize / 2;
        const time = Date.now() - powerup.createdAt;
        
        // Bounce effect (elastic)
        const bounceSpeed = 0.003;
        const bounceHeight = 6;
        const bounce = Math.abs(Math.sin(time * bounceSpeed)) * bounceHeight;
        
        // Pulse effect
        const pulse = Math.sin(time / 200) * 0.1 + 1;
        
        // Rotation effect
        const rotation = Math.sin(time * 0.002) * 0.15;
        
        const size = this.gridSize * 0.5; // Più piccolo e nitido
        
        this.ctx.save();
        
        // Glow effect
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = powerup.type === 'bombs' ? '#ff6b00' : '#ff0000';
        
        // Translate and rotate
        this.ctx.translate(x, y - bounce);
        this.ctx.rotate(rotation);
        
        // Draw background circle
        let bgColor, icon;
        if (powerup.type === 'bombs') {
            bgColor = '#ff6b00';
            icon = '💣';
        } else if (powerup.type === 'power') {
            bgColor = '#ff0000';
            icon = '🔥';
        } else if (powerup.type === 'speed') {
            bgColor = '#00ff00';
            icon = '⚡';
        }
        
        this.ctx.fillStyle = bgColor;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2 * pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw outline
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2 * pulse, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw icon (più piccolo e nitido)
        this.ctx.font = `bold ${size * 0.7}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(icon, 0, 0);
        
        this.ctx.restore();
        
        // Draw shadow under power-up
        this.ctx.save();
        this.ctx.globalAlpha = 0.3 * (1 - bounce / bounceHeight);
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 5, 10, 3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawBomb(bomb) {
        const x = bomb.x * this.gridSize + this.gridSize / 2;
        const y = bomb.y * this.gridSize + this.gridSize / 2;
        const timeLeft = bomb.timer - (Date.now() - bomb.placedAt);
        const urgency = 1 - (timeLeft / bomb.timer);
        
        // Squash & stretch animation (più veloce quando sta per esplodere)
        const squashSpeed = 100 - urgency * 80;
        const squashAmount = 0.12 + urgency * 0.08;
        const squash = Math.sin(Date.now() / squashSpeed) * squashAmount;
        
        // Scale X e Y per squash & stretch
        const scaleX = 1 + squash;
        const scaleY = 1 - squash * 0.7;
        
        const size = this.gridSize * 0.6; // Più piccolo e nitido
        
        this.ctx.save();
        
        // Red glow when about to explode
        if (urgency > 0.7) {
            this.ctx.shadowBlur = 20 * urgency;
            this.ctx.shadowColor = '#ff0000';
        }
        
        // Apply squash & stretch
        this.ctx.translate(x, y);
        this.ctx.scale(scaleX, scaleY);
        
        // Draw bomb body (black circle)
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw outline
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw highlight
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(-size / 6, -size / 6, size / 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw fuse
        this.ctx.strokeStyle = '#8B4513';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(size / 4, -size / 2 - 5);
        this.ctx.stroke();
        
        this.ctx.restore();
        
        // Draw fuse spark when about to explode
        if (urgency > 0.5) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.7 + Math.random() * 0.3;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#ff6b00';
            this.ctx.fillStyle = urgency > 0.8 ? '#ff0000' : '#ff6b00';
            const sparkSize = 2 + Math.random() * 2;
            this.ctx.beginPath();
            this.ctx.arc(x + size / 4, y - size / 2 - 5, sparkSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    drawExplosion(exp) {
        const age = Date.now() - exp.createdAt;
        const progress = age / exp.duration;
        const x = exp.x * this.gridSize;
        const y = exp.y * this.gridSize;
        
        // Multi-layer explosion effect - INTER COLORS!
        // Layer 1: Core (azzurro brillante)
        if (progress < 0.3) {
            this.ctx.save();
            this.ctx.shadowBlur = 20;
            this.ctx.shadowColor = '#0096ff';
            this.ctx.fillStyle = `rgba(0, 150, 255, ${1 - progress / 0.3})`;
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
            this.ctx.restore();
        }
        
        // Layer 2: Inter colors alternati (azzurro/nero)
        const interBlue = progress < 0.5;
        this.ctx.save();
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = interBlue ? '#0096ff' : '#000000';
        if (interBlue) {
            this.ctx.fillStyle = `rgba(0, 150, 255, ${0.9 - progress})`;
        } else {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${0.9 - progress})`;
        }
        this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
        this.ctx.restore();
        
        // Layer 3: Expanding ring azzurro Inter
        this.ctx.save();
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#0096ff';
        this.ctx.strokeStyle = `rgba(0, 150, 255, ${1 - progress})`;
        this.ctx.lineWidth = 3;
        const ringSize = this.gridSize * (0.5 + progress * 0.5);
        this.ctx.strokeRect(
            x + (this.gridSize - ringSize) / 2,
            y + (this.gridSize - ringSize) / 2,
            ringSize,
            ringSize
        );
        this.ctx.restore();
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.life * (particle.opacity || 1);
        
        // Applica rotazione se presente
        if (particle.rotation !== undefined) {
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            this.ctx.translate(-particle.x, -particle.y);
        }
        
        // Disegna in base al tipo
        switch (particle.type) {
            case 'circle':
                // Particella circolare con glow
                if (particle.glow) {
                    this.ctx.shadowBlur = 10;
                    this.ctx.shadowColor = particle.color;
                }
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'spark':
                // Scintilla allungata
                this.ctx.strokeStyle = particle.color;
                this.ctx.lineWidth = particle.size;
                this.ctx.lineCap = 'round';
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(
                    particle.x - particle.vx * 3,
                    particle.y - particle.vy * 3
                );
                this.ctx.stroke();
                break;
                
            case 'star':
                // Stella a 4 punte
                this.ctx.fillStyle = particle.color;
                const points = 4;
                const outerRadius = particle.size;
                const innerRadius = particle.size / 2;
                this.ctx.beginPath();
                for (let i = 0; i < points * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (Math.PI * i) / points;
                    const px = particle.x + Math.cos(angle) * radius;
                    const py = particle.y + Math.sin(angle) * radius;
                    if (i === 0) this.ctx.moveTo(px, py);
                    else this.ctx.lineTo(px, py);
                }
                this.ctx.closePath();
                this.ctx.fill();
                break;
                
            case 'smoke':
                // Fumo sfumato
                const gradient = this.ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'trail':
                // Trail effect per player
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'dust':
                // Dust particles
                this.ctx.fillStyle = particle.color;
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'square':
            default:
                // Quadrato (default)
                this.ctx.fillStyle = particle.color;
                this.ctx.fillRect(
                    particle.x - particle.size / 2,
                    particle.y - particle.size / 2,
                    particle.size,
                    particle.size
                );
                break;
        }
        
        this.ctx.restore();
    }
    
    drawScoreAnimation(scoreAnim) {
        this.ctx.save();
        this.ctx.font = 'bold 16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#ffd700';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = scoreAnim.life;
        this.ctx.strokeText(scoreAnim.text, scoreAnim.x, scoreAnim.y);
        this.ctx.fillText(scoreAnim.text, scoreAnim.x, scoreAnim.y);
        this.ctx.restore();
    }
    
    drawCharacter(x, y, name, fallbackEmoji, entity) {
        const img = this.characterImages[name];
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        // Animation offset for walking
        let offsetY = 0;
        if (entity && entity.isMoving) {
            offsetY = Math.sin(Date.now() / 100) * 2;
        }
        
        if (img && img.complete && img.naturalWidth > 0) {
            // Disegna immagine circolare con animazione
            this.ctx.save();
            
            // Shadow
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowOffsetY = 3;
            
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 - 2, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.clip();
            
            // Disegna immagine
            this.ctx.drawImage(
                img,
                x * this.gridSize + 2,
                y * this.gridSize + 2 + offsetY,
                this.gridSize - 4,
                this.gridSize - 4
            );
            
            this.ctx.restore();
            
            // Bordo animato per player (Inter colors) con glow dinamico
            if (name === 'Dionis') {
                const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
                
                // Outer glow (più grande)
                this.ctx.save();
                this.ctx.shadowBlur = 15;
                this.ctx.shadowColor = `rgba(0, 150, 255, ${0.6 + pulse * 0.4})`;
                this.ctx.strokeStyle = `rgba(0, 150, 255, ${0.2 + pulse * 0.3})`;
                this.ctx.lineWidth = 6;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 + 2, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.restore();
                
                // Main border
                this.ctx.strokeStyle = `rgba(0, 150, 255, ${0.8 + pulse * 0.2})`;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 - 2, 0, Math.PI * 2);
                this.ctx.stroke();
            } else {
                // Enemy border con glow rosso
                const pulse = Math.sin(Date.now() / 400) * 0.3 + 0.7;
                
                this.ctx.save();
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = `rgba(255, 107, 107, ${pulse})`;
                this.ctx.strokeStyle = `rgba(255, 107, 107, ${pulse})`;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 - 2, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.restore();
            }
        } else {
            // Fallback emoji with animation
            this.ctx.save();
            this.ctx.shadowBlur = 5;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(fallbackEmoji, centerX, centerY + offsetY);
            this.ctx.restore();
        }
    }
    
    drawRoundedRect(x, y, width, height, radius, fillStyle) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    drawHUD() {
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        
        // === TOP BAR - Ultra compatto e trasparente ===
        this.drawRoundedRect(5, 5, canvasWidth - 10, 35, 8, 'rgba(15, 52, 96, 0.6)');
        
        // Livello (sinistra) - più piccolo
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`LV${this.currentLevel}`, 12, 23);
        
        // Progress bar livello - più piccolo
        const progressX = 45;
        const progressWidth = 60;
        const progressHeight = 4;
        this.drawRoundedRect(progressX, 19, progressWidth, progressHeight, 2, 'rgba(255, 255, 255, 0.2)');
        this.drawRoundedRect(progressX, 19, (progressWidth * this.currentLevel) / 5, progressHeight, 2, '#4ecdc4');
        
        // Vite (centro) - più piccole
        const livesX = progressX + progressWidth + 15;
        this.ctx.font = '16px Arial';
        for (let i = 0; i < this.player.lives; i++) {
            this.ctx.fillText('❤️', livesX + i * 20, 25);
        }
        
        // Score (destra) - più piccolo
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`${this.score}`, canvasWidth - 12, 23);
        
        // Combo counter (se attivo)
        if (this.combo > 1) {
            const comboX = canvasWidth / 2;
            const comboY = 50;
            
            this.ctx.save();
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ff00ff';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#ff00ff';
            this.ctx.fillText(`${this.combo}x COMBO!`, comboX, comboY);
            this.ctx.restore();
        }
        
        // === BOSS HEALTH BAR (se presente) - FUORI DAL CANVAS ===
        const boss = this.enemies.find(e => e.isBoss && e.alive);
        if (boss && boss.health) {
            const bossBarY = canvasHeight + 10; // Posizionato SOTTO il canvas
            const bossBarWidth = canvasWidth - 10;
            
            // Background - più trasparente e piccolo
            this.drawRoundedRect(5, bossBarY, bossBarWidth, 30, 8, 'rgba(255, 107, 107, 0.1)');
            
            // Boss portrait (circolare) - più piccolo
            const img = this.characterImages[boss.name];
            if (img && img.complete && img.naturalWidth > 0) {
                this.ctx.save();
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#ff6b6b';
                this.ctx.beginPath();
                this.ctx.arc(20, bossBarY + 15, 12, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.clip();
                this.ctx.drawImage(img, 8, bossBarY + 3, 24, 24);
                this.ctx.restore();
                
                // Bordo portrait
                this.ctx.strokeStyle = '#ff6b6b';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(20, bossBarY + 15, 12, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            // Nome boss - più piccolo
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 11px "Segoe UI", Arial, sans-serif';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(boss.name, 38, bossBarY + 13);
            
            // Health bar - più piccolo
            const maxHealth = boss.isBoss ? 5 : 3;
            const healthBarWidth = bossBarWidth - 50;
            const healthBarHeight = 6;
            const healthBarX = 38;
            const healthBarY = bossBarY + 19;
            
            // Background health bar
            this.drawRoundedRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight, 3, 'rgba(255, 255, 255, 0.2)');
            
            // Current health
            const currentHealthWidth = (healthBarWidth * boss.health) / maxHealth;
            if (currentHealthWidth > 0) {
                this.drawRoundedRect(healthBarX, healthBarY, currentHealthWidth, healthBarHeight, 3, '#ff6b6b');
            }
            
            // Health text - più piccolo
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 9px "Segoe UI", Arial, sans-serif';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`${boss.health}/${maxHealth}`, healthBarX + healthBarWidth, healthBarY + 5);
        }
        
        // === POWER-UPS BAR (bottom) ===
        const powerUpBarY = canvasHeight - 50;
        this.drawRoundedRect(10, powerUpBarY, 160, 40, 12, 'rgba(15, 52, 96, 0.85)');
        
        this.ctx.font = '22px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('💣', 20, powerUpBarY + 28);
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
        this.ctx.fillText(`x${this.player.maxBombs}`, 48, powerUpBarY + 27);
        
        this.ctx.font = '22px Arial';
        this.ctx.fillText('🔥', 95, powerUpBarY + 28);
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
        this.ctx.fillText(`x${this.player.bombPower}`, 123, powerUpBarY + 27);
    }
    
    gameLoop() {
        if (this.gameOver || this.victory) {
            this.drawGameEnd();
            return;
        }
        
        if (this.levelComplete) {
            this.draw();
            this.drawLevelComplete();
            requestAnimationFrame(() => this.gameLoop());
            return;
        }
        
        const currentTime = Date.now();
        
        this.handleMovement(currentTime);
        this.updatePlayerInterpolation(); // Smooth movement
        this.moveEnemies(currentTime);
        this.updateBombs(currentTime);
        this.updateMovingBombs(currentTime); // Bomb kick mechanic
        this.updateExplosions(currentTime);
        this.updateParticles();
        this.updateScoreAnimations();
        this.checkCollisions();
        
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    drawGameEnd() {
        this.draw();
        
        // Overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        if (this.victory) {
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fillText(
                '🎉 VITTORIA TOTALE! 🎉',
                this.canvas.width / 2,
                this.canvas.height / 2 - 60
            );
            this.ctx.fillStyle = 'white';
            this.ctx.font = '24px Arial';
            this.ctx.fillText(
                'Hai sconfitto tutti i Juvlanisti!',
                this.canvas.width / 2,
                this.canvas.height / 2 - 10
            );
            this.ctx.font = '18px Arial';
            this.ctx.fillStyle = '#4ecdc4';
            this.ctx.fillText(
                'Dionis ha completato la missione!',
                this.canvas.width / 2,
                this.canvas.height / 2 + 30
            );
        } else {
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.fillText(
                '💀 GAME OVER 💀',
                this.canvas.width / 2,
                this.canvas.height / 2 - 40
            );
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Arial';
            this.ctx.fillText(
                'Sei stato scoperto dai Juvlanisti!',
                this.canvas.width / 2,
                this.canvas.height / 2 + 20
            );
        }
        
        // Trigger evento per tornare ai risultati
        setTimeout(() => {
            if (window.juvlanApp) {
                window.juvlanApp.endPhase2(this.victory);
            }
        }, 3000);
    }
    
    drawLevelComplete() {
        // Overlay per completamento livello
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = 'bold 36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(
            `LIVELLO ${this.currentLevel - 1} COMPLETATO!`,
            this.canvas.width / 2,
            this.canvas.height / 2 - 20
        );
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '18px Arial';
        this.ctx.fillText(
            'Prossimo livello...',
            this.canvas.width / 2,
            this.canvas.height / 2 + 30
        );
    }
}

// Export per uso globale
window.BombermanGame = BombermanGame;