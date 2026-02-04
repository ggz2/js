// loader.js - Loads additional iframes into the popup from GitHub
console.log('Loader script running in popup...');

function loadIframes() {
    const container = document.getElementById('iframe-container');

    // Clear existing iframes if needed
    container.innerHTML = '';

    // Example iframe 1: Load from another file in the repo
    const iframe1 = document.createElement('iframe');
    iframe1.src = base_url + '/content1.html'; // Assumes content1.html exists in repo
    iframe1.width = '100%';
    iframe1.height = '200';
    container.appendChild(iframe1);

    // Example iframe 2: Load from another file or external URL
    const iframe2 = document.createElement('iframe');
    iframe2.src = base_url + '/content2.html'; // Assumes content2.html exists
    iframe2.width = '100%';
    iframe2.height = '200';
    container.appendChild(iframe2);

    // Add more iframes dynamically as needed, e.g., based on user input or data
}

// Auto-load on popup init, or wait for button click (as in main.js)
loadIframes(); // Uncomment to auto-load
