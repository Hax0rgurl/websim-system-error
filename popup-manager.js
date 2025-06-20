export class PopupManager {
    constructor() {
        this.popupCount = 0;
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

    createMultiplePopups(baseTitle, baseMessage, buttons, count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createPopup(
                    `${baseTitle} #${i + 2}`,
                    baseMessage,
                    buttons
                );
            }, i * 1000);
        }
    }
}