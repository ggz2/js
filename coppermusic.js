// coppermusic.js - Direct bookmarklet to open Copper Music Vercel app in popup

(function() {
  alert("Opening Copper Music!");

  const popup = window.open("about:blank", "CopperMusic", "width=1000,height=700");
  if (!popup) {
    alert("Popup blocked - allow popups for this site.");
    return;
  }

  popup.focus();

  popup.document.open();
  popup.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Copper Music</title>
      <style>
        body { margin:0; height:100vh; background:#000; color:#0f0; font-family:sans-serif; }
        iframe { width:100%; height:100%; border:none; }
      </style>
    </head>
    <body>
      <iframe src="https://coppermusic.vercel.app"></iframe>
    </body>
    </html>
  `);
  popup.document.close();
})();
