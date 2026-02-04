// main.js - Core functionality for the popup GUI
console.log('Main script loaded in popup');

// Example: Add event listeners or other logic
document.getElementById('load-iframes-btn').addEventListener('click', function() {
    // Trigger iframe loading (handled by loader.js)
    if (typeof loadIframes === 'function') {
        loadIframes();
    } else {
        console.error('Loader not ready');
    }
});

// Add more GUI interactions here, e.g., fetching data from the parent window
