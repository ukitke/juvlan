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
            lives: 3
        };
        
        // Enemies (Juvlanisti) - inizializzati per livello
        this.enemies = [];
        
        // Game state
        this.bombs = [];
        this.explosions = [];
        this.walls = [];
        this.powerups = [];
        this.gameOver = false;
        this.victory = false;
        this.lastMoveTime = 0;
        this.enemyMoveInterval = 800;
        this.lastEnemyMoveTime = 0;
        
        // Controls
        this.keys = {};
        this.touchControls = {
            joystick: { active: false, x: 0, y: 0 },
            bombButton: false
        };
        
        this.init();
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
        
        // Keyboard controls
        if (this.keys['ArrowUp']) newY--;
        if (this.keys['ArrowDown']) newY++;
        if (this.keys['ArrowLeft']) newX--;
        if (this.keys['ArrowRight']) newX++;
        
        // Touch controls (joystick)
        if (this.touchControls.joystick.active) {
            const threshold = 0.5;
            if (Math.abs(this.touchControls.joystick.x) > Math.abs(this.touchControls.joystick.y)) {
                if (this.touchControls.joystick.x > threshold) newX++;
                else if (this.touchControls.joystick.x < -threshold) newX--;
            } else {
                if (this.touchControls.joystick.y > threshold) newY++;
                else if (this.touchControls.joystick.y < -threshold) newY--;
            }
        }
        
        if (newX !== this.player.x || newY !== this.player.y) {
            if (this.canMoveTo(newX, newY)) {
                this.player.x = newX;
                this.player.y = newY;
                this.lastMoveTime = currentTime;
                
                // Raccogli power-up
                this.checkPowerupCollection();
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
            exploded: false
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
                        this.powerups.push({ x, y, type });
                    }
                    break;
                }
            }
        });
        
        // Crea esplosioni visive
        explosionCells.forEach(cell => {
            this.explosions.push({
                x: cell.x,
                y: cell.y,
                createdAt: Date.now(),
                duration: 500
            });
            
            // Controlla se colpisce player
            if (cell.x === this.player.x && cell.y === this.player.y) {
                this.gameOver = true;
            }
            
            // Controlla se colpisce nemici
            this.enemies.forEach(enemy => {
                if (enemy.alive && cell.x === enemy.x && cell.y === enemy.y) {
                    if (enemy.isBoss && enemy.health) {
                        enemy.health--;
                        if (enemy.health <= 0) {
                            enemy.alive = false;
                        }
                    } else {
                        enemy.alive = false;
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
            
            // Ogni nemico ha la sua velocità
            if (!enemy.lastMoveTime) enemy.lastMoveTime = 0;
            const moveInterval = enemy.speed || 800;
            
            if (currentTime - enemy.lastMoveTime < moveInterval) return;
            
            // Movimento random
            const directions = [
                { dx: 0, dy: -1 },
                { dx: 0, dy: 1 },
                { dx: -1, dy: 0 },
                { dx: 1, dy: 0 }
            ];
            
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const newX = enemy.x + dir.dx;
            const newY = enemy.y + dir.dy;
            
            if (this.canMoveTo(newX, newY)) {
                enemy.x = newX;
                enemy.y = newY;
            }
            
            enemy.lastMoveTime = currentTime;
        });
    }
    
    checkCollisions() {
        this.enemies.forEach(enemy => {
            if (enemy.alive && enemy.x === this.player.x && enemy.y === this.player.y) {
                this.player.lives--;
                if (this.player.lives <= 0) {
                    this.gameOver = true;
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
            
            if (this.currentLevel < this.maxLevel) {
                // Prossimo livello
                setTimeout(() => {
                    this.currentLevel++;
                    this.loadLevel(this.currentLevel);
                }, 2000);
            } else {
                // Vittoria finale!
                this.victory = true;
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
            } else if (powerup.type === 'power') {
                this.player.bombPower++;
            }
            
            this.powerups = this.powerups.filter(p => p !== powerup);
        }
    }
    
    draw() {
        // Clear
        this.ctx.fillStyle = '#2d2d2d';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Griglia
        this.ctx.strokeStyle = '#3d3d3d';
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize);
            }
        }
        
        // Muri
        this.walls.forEach(wall => {
            this.ctx.fillStyle = wall.destructible ? '#8B4513' : '#4a4a4a';
            this.ctx.fillRect(
                wall.x * this.gridSize,
                wall.y * this.gridSize,
                this.gridSize,
                this.gridSize
            );
        });
        
        // Power-ups
        this.powerups.forEach(p => {
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                p.type === 'bombs' ? '💣' : '🔥',
                p.x * this.gridSize + this.gridSize / 2,
                p.y * this.gridSize + this.gridSize / 2
            );
        });
        
        // Bombe
        this.bombs.forEach(bomb => {
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(
                '💣',
                bomb.x * this.gridSize + this.gridSize / 2,
                bomb.y * this.gridSize + this.gridSize / 2
            );
        });
        
        // Esplosioni (colori Inter: nero e azzurro)
        this.explosions.forEach(exp => {
            const age = Date.now() - exp.createdAt;
            const progress = age / exp.duration;
            
            // Alterna tra nero e azzurro Inter
            if (progress < 0.5) {
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Nero
            } else {
                this.ctx.fillStyle = 'rgba(0, 150, 255, 0.9)'; // Azzurro Inter
            }
            
            this.ctx.fillRect(
                exp.x * this.gridSize,
                exp.y * this.gridSize,
                this.gridSize,
                this.gridSize
            );
            
            // Effetto scintilla
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fillRect(
                exp.x * this.gridSize + this.gridSize / 4,
                exp.y * this.gridSize + this.gridSize / 4,
                this.gridSize / 2,
                this.gridSize / 2
            );
        });
        
        // Nemici
        this.enemies.forEach(enemy => {
            if (enemy.alive) {
                this.ctx.font = '30px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(
                    enemy.emoji,
                    enemy.x * this.gridSize + this.gridSize / 2,
                    enemy.y * this.gridSize + this.gridSize / 2
                );
            }
        });
        
        // Player
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(
            this.player.emoji,
            this.player.x * this.gridSize + this.gridSize / 2,
            this.player.y * this.gridSize + this.gridSize / 2
        );
        
        // HUD
        this.drawHUD();
    }
    
    drawHUD() {
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'left';
        
        // Livello
        this.ctx.fillText(`LIVELLO ${this.currentLevel}/5`, 10, 25);
        
        // Vite
        this.ctx.fillText(`❤️ x ${this.player.lives}`, 10, 50);
        
        // Nemici
        const aliveEnemies = this.enemies.filter(e => e.alive).length;
        const totalEnemies = this.enemies.length;
        this.ctx.fillText(`Nemici: ${aliveEnemies}/${totalEnemies}`, 10, 75);
        
        // Boss health
        const boss = this.enemies.find(e => e.isBoss && e.alive);
        if (boss && boss.health) {
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.fillText(`${boss.name}: ${'❤️'.repeat(boss.health)}`, 10, 100);
        }
        
        // Power-ups
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`💣 ${this.player.maxBombs}  🔥 ${this.player.bombPower}`, 10, this.canvas.height - 10);
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