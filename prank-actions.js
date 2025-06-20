export class PrankActions {
    constructor(screenManager, popupManager, effectsManager) {
        this.screenManager = screenManager;
        this.popupManager = popupManager;
        this.effectsManager = effectsManager;
    }

    init() {
        this.setupDesktopActions();
    }

    setupDesktopActions() {
        const virusIcon = document.getElementById('virus-icon');
        const crashIcon = document.getElementById('crash-icon');
        
        if (virusIcon) virusIcon.onclick = () => this.virusPrank();
        if (crashIcon) crashIcon.onclick = () => this.crashPrank();
    }

    virusPrank() {
        this.popupManager.createPopup(
            'Virus Detected!', 
            'Your computer has been infected with 99+ viruses!', 
            ['Panic', 'Delete System32']
        );
        
        // Spawn more popups
        this.popupManager.createMultiplePopups(
            'Warning',
            'Virus is spreading! Your files are being encrypted!',
            ['Oh No!', 'Call Tech Support'],
            5
        );
    }

    crashPrank() {
        this.effectsManager.applyGlitchEffect(1000);
        
        setTimeout(() => {
            this.popupManager.createPopup(
                'System Crash Imminent', 
                'Your system will crash in 3... 2... 1...', 
                ['HELP!']
            );
            
            setTimeout(() => {
                this.screenManager.switchScreen('error');
                this.screenManager.setupErrorScreen();
            }, 3000);
        }, 1000);
    }
}