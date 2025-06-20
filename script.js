class PrankSystem {
    constructor() {
        this.currentScreen = 'error';
        this.progressInterval = null;
        this.popupCount = 0;
        this.cursorsEnabled = false;
        
        this.init();
    }

    init() {
        this.setupErrorScreen();
        this.setupDesktopScreen();
        this.setupCursorTrail();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Add some random glitch effects
        setInterval(() => this.randomGlitch(), 5000);
    }

    setupErrorScreen() {
        const progressFill = document.querySelector('.progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        const restartBtn = document.getElementById('restart-btn');
        
        let progress = 0;
        this.progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(this.progressInterval);
                restartBtn.disabled = false;
                restartBtn.textContent = 'Restart Now';
                restartBtn.onclick = () => this.startRestart();
            }
        }, 500);
    }

    startRestart() {
        this.switchScreen('loading');
        this.playRestartSequence();
    }

    playRestartSequence() {
        const loadingFill = document.querySelector('.loading-fill');
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 10 + 5;
            if (progress > 100) progress = 100;
            
            loadingFill.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.switchScreen('desktop');
                    this.enableCursors();
                }, 1000);
            }
        }, 300);
    }

    setupDesktopScreen() {
        const virusIcon = document.getElementById('virus-icon');
        const crashIcon = document.getElementById('crash-icon');
        
        virusIcon.onclick = () => this.virusPrank();
        crashIcon.onclick = () => this.crashPrank();
    }

    virusPrank() {
        this.createPopup('Virus Detected!', 'Your computer has been infected with 99+ viruses!', ['Panic', 'Delete System32']);
        
        // Spawn more popups
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createPopup(
                    'Warning #' + (i + 2),
                    'Virus is spreading! Your files are being encrypted!',
                    ['Oh No!', 'Call Tech Support']
                );
            }, i * 1000);
        }
    }

    crashPrank() {
        document.body.classList.add('glitch');
        
        setTimeout(() => {
            this.createPopup('System Crash Imminent', 'Your system will crash in 3... 2... 1...', ['HELP!']);
            
            setTimeout(() => {
                this.switchScreen('error');
                document.body.classList.remove('glitch');
                this.setupErrorScreen();
            }, 3000);
        }, 1000);
    }

    createPopup(title, message, buttons) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.style.left = Math.random() * (window.innerWidth - 350) + 'px';
        popup.style.top = Math.random() * (window.innerHeight - 200) + 'px';
        
        const buttonElements = buttons.map(btn => 
            `<button class="popup-button" onclick="this.parentElement.parentElement.remove()">${btn}</button>`
        ).join('');
        
        popup.innerHTML = `
            <div class="popup-header">
                <span>${title}</span>
                <button class="popup-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="popup-content">${message}</div>
            <div class="popup-buttons">${buttonElements}</div>
        `;
        
        document.getElementById('popup-container').appendChild(popup);
        
        // Auto-close after random time
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, Math.random() * 10000 + 5000);
        
        this.popupCount++;
    }

    setupCursorTrail() {
        document.addEventListener('mousemove', (e) => {
            if (!this.cursorsEnabled) return;
            
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            
            document.body.appendChild(dot);
            
            setTimeout(() => {
                dot.remove();
            }, 1000);
        });
    }

    enableCursors() {
        this.cursorsEnabled = true;
        document.body.style.cursor = 'auto';
    }

    switchScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById(screenName + '-screen').classList.add('active');
        this.currentScreen = screenName;
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString();
        }
    }

    randomGlitch() {
        if (Math.random() < 0.3) {
            const screens = document.querySelectorAll('.screen.active');
            screens.forEach(screen => {
                screen.classList.add('glitch');
                setTimeout(() => {
                    screen.classList.remove('glitch');
                }, 300);
            });
        }
    }
}

// Initialize the prank system when page loads
document.addEventListener('DOMContentLoaded', () => {
    new PrankSystem();
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((code, index) => code === konamiSequence[index])) {
        
        alert('🎉 Prank Master! You found the secret code! 🎉');
        konamiCode = [];
    }
});

// Prevent right-click context menu for more realism
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

