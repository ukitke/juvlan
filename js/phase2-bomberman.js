// JUVLAN - FASE 2: Bomberman Game

class BombermanGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Game settings
        this.gridSize = 40;
        this.cols = 15;
        this.rows = 13;
        this.canvas.width = this.cols * this.gridSize;
        this.canvas.height = this.rows * this.gridSize;
        
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
            emoji: '😎',
            maxBombs: 1,
            bombPower: 1,
            speed: 200, // ms per movimento
            lives: 3,
            animationFrame: 0,
            animationTime: 0,
            direction: 'down',
            isMoving: false
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
        this.score = 0;
        this.scoreAnimations = [];
        
        // Controls
        this.keys = {};
        this.touchControls = {
            joystick: { active: false, x: 0, y: 0 },
            bombButton: false
        };
        
        this.init();
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
    
    setupTouchControls() {
        // Crea joystick virtuale
        const joystick = document.createElement('div');
        joystick.id = 'virtual-joystick';
        joystick.innerHTML = `
            <div class="joystick-base">
                <div class="joystick-stick" id="joystick-stick"></div>
            </div>
        `;
        document.body.appendChild(joystick);
        
        // Crea pulsante bomba
        const bombBtn = document.createElement('div');
        bombBtn.id = 'bomb-button';
        bombBtn.innerHTML = '💣';
        document.body.appendChild(bombBtn);
        
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
            const maxDistance = 40;
            
            if (distance > maxDistance) {
                const angle = Math.atan2(deltaY, deltaX);
                stick.style.left = `${Math.cos(angle) * maxDistance + 50}px`;
                stick.style.top = `${Math.sin(angle) * maxDistance + 50}px`;
                
                this.touchControls.joystick.x = Math.cos(angle);
                this.touchControls.joystick.y = Math.sin(angle);
            } else {
                stick.style.left = `${deltaX + 50}px`;
                stick.style.top = `${deltaY + 50}px`;
                
                this.touchControls.joystick.x = deltaX / maxDistance;
                this.touchControls.joystick.y = deltaY / maxDistance;
            }
            
            this.touchControls.joystick.active = true;
        });
        
        base.addEventListener('touchend', () => {
            joystickActive = false;
            stick.style.left = '50px';
            stick.style.top = '50px';
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
        
        // Touch controls (joystick)
        if (this.touchControls.joystick.active) {
            const threshold = 0.5;
            if (Math.abs(this.touchControls.joystick.x) > Math.abs(this.touchControls.joystick.y)) {
                if (this.touchControls.joystick.x > threshold) {
                    newX++;
                    this.player.direction = 'right';
                    moved = true;
                } else if (this.touchControls.joystick.x < -threshold) {
                    newX--;
                    this.player.direction = 'left';
                    moved = true;
                }
            } else {
                if (this.touchControls.joystick.y > threshold) {
                    newY++;
                    this.player.direction = 'down';
                    moved = true;
                } else if (this.touchControls.joystick.y < -threshold) {
                    newY--;
                    this.player.direction = 'up';
                    moved = true;
                }
            }
        }
        
        if (newX !== this.player.x || newY !== this.player.y) {
            if (this.canMoveTo(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
                this.player.isMoving = true;
                this.lastMoveTime = currentTime;
                
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
    
    canMoveTo(x, y) {
        // Controlla muri
        if (this.walls.some(w => w.x === x && w.y === y)) return false;
        
        // Controlla bombe
        if (this.bombs.some(b => b.x === x && b.y === y)) return false;
        
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
            animationFrame: 0
        });
        
        // Suono piazzamento bomba
        this.audioManager.playBombPlace();
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
        
        // Screen shake
        this.screenShake = {
            active: true,
            intensity: 5,
            duration: 300,
            startTime: Date.now()
        };
        
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
                    
                    // Chance di power-up
                    if (Math.random() < 0.3) {
                        const type = Math.random() < 0.5 ? 'bombs' : 'power';
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
                this.gameOver = true;
            }
            
            // Controlla se colpisce nemici
            this.enemies.forEach(enemy => {
                if (enemy.alive && cell.x === enemy.x && cell.y === enemy.y) {
                    this.createHitParticles(cell.x, cell.y, '#ffd700');
                    if (enemy.isBoss && enemy.health) {
                        enemy.health--;
                        if (enemy.health <= 0) {
                            enemy.alive = false;
                            this.score += 500;
                            this.createScoreAnimation(cell.x, cell.y, '+500');
                        } else {
                            this.score += 100;
                            this.createScoreAnimation(cell.x, cell.y, '+100');
                        }
                    } else {
                        enemy.alive = false;
                        this.score += 200;
                        this.createScoreAnimation(cell.x, cell.y, '+200');
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
        this.enemies.forEach(enemy => {
            if (enemy.alive && enemy.x === this.player.x && enemy.y === this.player.y) {
                this.player.lives--;
                
                // Suono colpo
                this.audioManager.playHit();
                
                if (this.player.lives <= 0) {
                    this.gameOver = true;
                    this.audioManager.playGameOver();
                    setTimeout(() => this.audioManager.speakGameOver(), 500);
                } else {
                    // Respawn player
                    this.player.x = 1;
                    this.player.y = 1;
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
        
        for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            const speed = 2 + Math.random() * 3;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.02,
                size: 3 + Math.random() * 3,
                color: Math.random() > 0.5 ? '#ff6b00' : '#ffaa00',
                type: 'explosion'
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
    
    createPowerupParticles(x, y) {
        const centerX = x * this.gridSize + this.gridSize / 2;
        const centerY = y * this.gridSize + this.gridSize / 2;
        
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1,
                life: 1.0,
                decay: 0.015,
                size: 2 + Math.random() * 3,
                color: ['#ffd700', '#ffea00', '#fff700'][Math.floor(Math.random() * 3)],
                type: 'sparkle'
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
    
    updateParticles() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            // Gravity for sparkles
            if (p.type === 'sparkle') {
                p.vy += 0.1;
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
            }
        });
        
        // Player con animazioni
        this.drawCharacter(this.player.x, this.player.y, 'Dionis', this.player.emoji, this.player);
        
        // Score animations
        this.scoreAnimations.forEach(s => {
            this.drawScoreAnimation(s);
        });
        
        this.ctx.restore();
        
        // HUD (non affetto da shake)
        this.drawHUD();
    }
    
    drawBackground() {
        // Gradient background basato sul livello
        const gradients = [
            ['#1a1a2e', '#16213e'], // Level 1: Dark blue
            ['#2d1b2e', '#1f1326'], // Level 2: Purple
            ['#1e2d1b', '#13261f'], // Level 3: Dark green
            ['#2e1b1b', '#261313'], // Level 4: Dark red
            ['#2e2a1b', '#262213']  // Level 5: Dark gold
        ];
        
        const colors = gradients[this.currentLevel - 1] || gradients[0];
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawWall(wall) {
        const x = wall.x * this.gridSize;
        const y = wall.y * this.gridSize;
        
        if (wall.destructible) {
            // Destructible wall - brown with texture
            const gradient = this.ctx.createLinearGradient(x, y, x + this.gridSize, y + this.gridSize);
            gradient.addColorStop(0, '#8B4513');
            gradient.addColorStop(0.5, '#A0522D');
            gradient.addColorStop(1, '#6B3410');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
            
            // Border
            this.ctx.strokeStyle = '#5a2a0a';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
        } else {
            // Indestructible wall - dark gray with metallic look
            const gradient = this.ctx.createLinearGradient(x, y, x + this.gridSize, y + this.gridSize);
            gradient.addColorStop(0, '#5a5a5a');
            gradient.addColorStop(0.5, '#4a4a4a');
            gradient.addColorStop(1, '#3a3a3a');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
            
            // Highlight
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.fillRect(x + 2, y + 2, this.gridSize / 3, this.gridSize / 3);
        }
    }
    
    drawPowerup(powerup) {
        const x = powerup.x * this.gridSize + this.gridSize / 2;
        const y = powerup.y * this.gridSize + this.gridSize / 2;
        const time = Date.now() - powerup.createdAt;
        const pulse = Math.sin(time / 200) * 0.2 + 1;
        
        // Glow effect
        this.ctx.save();
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = powerup.type === 'bombs' ? '#ff6b00' : '#ff0000';
        
        // Draw icon with pulse
        this.ctx.font = `${30 * pulse}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(
            powerup.type === 'bombs' ? '💣' : '🔥',
            x, y
        );
        
        this.ctx.restore();
    }
    
    drawBomb(bomb) {
        const x = bomb.x * this.gridSize + this.gridSize / 2;
        const y = bomb.y * this.gridSize + this.gridSize / 2;
        const timeLeft = bomb.timer - (Date.now() - bomb.placedAt);
        const urgency = 1 - (timeLeft / bomb.timer);
        
        // Pulsing animation
        const pulse = Math.sin(Date.now() / (100 - urgency * 80)) * 0.15 + 1;
        
        // Red glow when about to explode
        if (urgency > 0.7) {
            this.ctx.save();
            this.ctx.shadowBlur = 20 * urgency;
            this.ctx.shadowColor = '#ff0000';
        }
        
        // Draw bomb
        this.ctx.font = `${30 * pulse}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('💣', x, y);
        
        if (urgency > 0.7) {
            this.ctx.restore();
        }
    }
    
    drawExplosion(exp) {
        const age = Date.now() - exp.createdAt;
        const progress = age / exp.duration;
        const x = exp.x * this.gridSize;
        const y = exp.y * this.gridSize;
        
        // Multi-layer explosion effect
        // Layer 1: Core (white hot)
        if (progress < 0.3) {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - progress / 0.3})`;
            this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
        }
        
        // Layer 2: Inter colors (blue/black)
        const interBlue = progress < 0.5;
        if (interBlue) {
            this.ctx.fillStyle = `rgba(0, 150, 255, ${0.9 - progress})`;
        } else {
            this.ctx.fillStyle = `rgba(0, 0, 0, ${0.9 - progress})`;
        }
        this.ctx.fillRect(x, y, this.gridSize, this.gridSize);
        
        // Layer 3: Expanding ring
        this.ctx.strokeStyle = `rgba(255, 200, 0, ${1 - progress})`;
        this.ctx.lineWidth = 3;
        const ringSize = this.gridSize * (0.5 + progress * 0.5);
        this.ctx.strokeRect(
            x + (this.gridSize - ringSize) / 2,
            y + (this.gridSize - ringSize) / 2,
            ringSize,
            ringSize
        );
    }
    
    drawParticle(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.life;
        this.ctx.fillRect(
            particle.x - particle.size / 2,
            particle.y - particle.size / 2,
            particle.size,
            particle.size
        );
        this.ctx.globalAlpha = 1;
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
            
            // Bordo animato per player (Inter colors)
            if (name === 'Dionis') {
                const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
                this.ctx.strokeStyle = `rgba(0, 150, 255, ${0.7 + pulse * 0.3})`;
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 - 2, 0, Math.PI * 2);
                this.ctx.stroke();
                
                // Extra glow
                this.ctx.strokeStyle = `rgba(0, 150, 255, ${0.3 + pulse * 0.2})`;
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2, 0, Math.PI * 2);
                this.ctx.stroke();
            } else {
                // Enemy border
                this.ctx.strokeStyle = '#ff6b6b';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY + offsetY, this.gridSize / 2 - 2, 0, Math.PI * 2);
                this.ctx.stroke();
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
    
    drawHUD() {
        // HUD Background panel
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 200, 150);
        
        // Level indicator with progress bar
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`LIVELLO ${this.currentLevel}/5`, 10, 25);
        
        // Level progress bar
        const progressWidth = 180;
        const progressHeight = 8;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(10, 30, progressWidth, progressHeight);
        this.ctx.fillStyle = '#0096ff';
        this.ctx.fillRect(10, 30, (progressWidth * this.currentLevel) / 5, progressHeight);
        
        // Lives with hearts
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText('VITE:', 10, 55);
        for (let i = 0; i < this.player.lives; i++) {
            this.ctx.fillText('❤️', 60 + i * 25, 55);
        }
        
        // Score with animation
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(`SCORE: ${this.score}`, 10, 75);
        
        // Enemies remaining
        const aliveEnemies = this.enemies.filter(e => e.alive).length;
        const totalEnemies = this.enemies.length;
        this.ctx.fillStyle = aliveEnemies > 0 ? '#ff6b6b' : '#4ecdc4';
        this.ctx.fillText(`Nemici: ${aliveEnemies}/${totalEnemies}`, 10, 95);
        
        // Boss health bar with portrait
        const boss = this.enemies.find(e => e.isBoss && e.alive);
        if (boss && boss.health) {
            // Boss panel
            this.ctx.fillStyle = 'rgba(255, 107, 107, 0.2)';
            this.ctx.fillRect(5, 105, 190, 40);
            
            // Ritratto boss
            const img = this.characterImages[boss.name];
            if (img && img.complete && img.naturalWidth > 0) {
                this.ctx.save();
                this.ctx.shadowBlur = 5;
                this.ctx.shadowColor = '#ff6b6b';
                this.ctx.beginPath();
                this.ctx.arc(25, 125, 15, 0, Math.PI * 2);
                this.ctx.closePath();
                this.ctx.clip();
                this.ctx.drawImage(img, 10, 110, 30, 30);
                this.ctx.restore();
                
                // Bordo
                this.ctx.strokeStyle = '#ff6b6b';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(25, 125, 15, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            // Nome boss
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.fillText(boss.name, 50, 120);
            
            // Health bar
            const maxHealth = boss.isBoss ? 5 : 3;
            const healthBarWidth = 130;
            const healthBarHeight = 10;
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(50, 127, healthBarWidth, healthBarHeight);
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.fillRect(50, 127, (healthBarWidth * boss.health) / maxHealth, healthBarHeight);
            
            // Health text
            this.ctx.fillStyle = 'white';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${boss.health}/${maxHealth}`, 115, 135);
            this.ctx.textAlign = 'left';
        }
        
        // Power-ups panel (bottom left)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, this.canvas.height - 40, 150, 40);
        
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = 'bold 16px Arial';
        this.ctx.fillText(`💣 x${this.player.maxBombs}`, 10, this.canvas.height - 20);
        this.ctx.fillText(`🔥 x${this.player.bombPower}`, 80, this.canvas.height - 20);
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
        this.moveEnemies(currentTime);
        this.updateBombs(currentTime);
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