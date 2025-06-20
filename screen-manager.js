export class ScreenManager {
    constructor() {
        this.currentScreen = 'error';
        this.progressInterval = null;
    }

    init() {
        this.setupErrorScreen();
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
                    // Signal to effects manager to enable cursors
                    document.dispatchEvent(new CustomEvent('desktop-ready'));
                }, 1000);
            }
        }, 300);
    }

    switchScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        document.getElementById(screenName + '-screen').classList.add('active');
        this.currentScreen = screenName;
    }
}

