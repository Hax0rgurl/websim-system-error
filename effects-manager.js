export class EffectsManager {
    constructor() {
        this.cursorsEnabled = false;
    }

    init() {
        this.setupCursorTrail();
        // Listen for desktop ready event
        document.addEventListener('desktop-ready', () => {
            this.enableCursors();
        });
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

    applyGlitchEffect(duration = 1000) {
        document.body.classList.add('glitch');
        setTimeout(() => {
            document.body.classList.remove('glitch');
        }, duration);
    }
}

