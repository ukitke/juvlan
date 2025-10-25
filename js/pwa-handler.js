// PWA Handler - Install prompt and offline detection

class PWAHandler {
    constructor() {
        this.deferredPrompt = null;
        this.installPrompt = document.getElementById('install-prompt');
        this.installBtn = document.getElementById('install-btn');
        this.dismissBtn = document.getElementById('dismiss-install-btn');
        
        this.init();
    }
    
    init() {
        // Listen for beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
        
        // Listen for app installed event
        window.addEventListener('appinstalled', () => {
            console.log('PWA: App installed successfully');
            this.hideInstallPrompt();
            this.deferredPrompt = null;
        });
        
        // Install button click
        if (this.installBtn) {
            this.installBtn.addEventListener('click', () => {
                this.installApp();
            });
        }
        
        // Dismiss button click
        if (this.dismissBtn) {
            this.dismissBtn.addEventListener('click', () => {
                this.hideInstallPrompt();
                // Remember dismissal for 7 days
                localStorage.setItem('pwa-install-dismissed', Date.now());
            });
        }
        
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA: App is running in standalone mode');
        }
        
        // Offline/Online detection
        this.setupOfflineDetection();
    }
    
    showInstallPrompt() {
        // Check if user dismissed recently (within 7 days)
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (dismissed) {
            const daysSinceDismissal = (Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissal < 7) {
                console.log('PWA: Install prompt dismissed recently, not showing');
                return;
            }
        }
        
        // Don't show if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            return;
        }
        
        if (this.installPrompt) {
            this.installPrompt.hidden = false;
        }
    }
    
    hideInstallPrompt() {
        if (this.installPrompt) {
            this.installPrompt.hidden = true;
        }
    }
    
    async installApp() {
        if (!this.deferredPrompt) {
            console.log('PWA: No deferred prompt available');
            return;
        }
        
        // Show the install prompt
        this.deferredPrompt.prompt();
        
        // Wait for the user to respond
        const { outcome } = await this.deferredPrompt.userChoice;
        console.log(`PWA: User response to install prompt: ${outcome}`);
        
        if (outcome === 'accepted') {
            console.log('PWA: User accepted the install prompt');
        } else {
            console.log('PWA: User dismissed the install prompt');
        }
        
        // Clear the deferred prompt
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }
    
    setupOfflineDetection() {
        // Create offline indicator
        const offlineIndicator = document.createElement('div');
        offlineIndicator.className = 'offline-indicator';
        offlineIndicator.textContent = '📡 Offline';
        offlineIndicator.hidden = true;
        document.body.appendChild(offlineIndicator);
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            console.log('PWA: Back online');
            offlineIndicator.hidden = true;
        });
        
        window.addEventListener('offline', () => {
            console.log('PWA: Gone offline');
            offlineIndicator.hidden = false;
        });
        
        // Check initial state
        if (!navigator.onLine) {
            offlineIndicator.hidden = false;
        }
    }
    
    // Check if app can be installed
    static canInstall() {
        return 'beforeinstallprompt' in window;
    }
    
    // Check if app is installed
    static isInstalled() {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    }
}

// Initialize PWA handler when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PWAHandler();
    });
} else {
    new PWAHandler();
}
