// Main initialization - imports and coordinates all modules
import { ScreenManager } from './screen-manager.js';
import { PopupManager } from './popup-manager.js';
import { EffectsManager } from './effects-manager.js';
import { PrankActions } from './prank-actions.js';

class PrankSystem {
    constructor() {
        this.screenManager = new ScreenManager();
        this.popupManager = new PopupManager();
        this.effectsManager = new EffectsManager();
        this.prankActions = new PrankActions(this.screenManager, this.popupManager, this.effectsManager);
        
        this.init();
    }

    init() {
        this.screenManager.init();
        this.effectsManager.init();
        this.prankActions.init();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        
        // Add some random glitch effects
        setInterval(() => this.effectsManager.randomGlitch(), 5000);
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString();
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