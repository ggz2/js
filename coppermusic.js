// coppermusic.js - Bookmarklet that opens Copper Music as an iframe overlay

(function() {
  // Show confirmation on the original tab
  alert("Opening Copper Music in an overlay iframe!");

  // Create semi-transparent overlay background
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.background = 'rgba(0, 0, 0, 0.6)';
  overlay.style.zIndex = '9999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.backdropFilter = 'blur(4px)';

  // Create the iframe for Copper Music
  const iframe = document.createElement('iframe');
  iframe.src = 'https://coppermusic.vercel.app';
  iframe.style.width = '90%';
  iframe.style.maxWidth = '1000px';
  iframe.style.height = '85%';
  iframe.style.border = 'none';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 10px 40px rgba(0,0,0,0.6)';
  iframe.allow = 'autoplay; fullscreen'; // Optional: if your player needs these permissions

  overlay.appendChild(iframe);

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.innerText = 'Close Copper Music';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '20px';
  closeBtn.style.padding = '10px 20px';
  closeBtn.style.background = '#e74c3c';
  closeBtn.style.color = 'white';
  closeBtn.style.border = 'none';
  closeBtn.style.borderRadius = '8px';
  closeBtn.style.fontSize = '16px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.zIndex = '10000000';
  closeBtn.onclick = function() {
    document.body.removeChild(overlay);
  };

  overlay.appendChild(closeBtn);

  // Optional: Close with Esc key
  const escHandler = function(e) {
    if (e.key === 'Escape') {
      document.body.removeChild(overlay);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  // Add to page
  document.body.appendChild(overlay);
})();
