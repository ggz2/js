// coppermusic.js - Bookmarklet for Copper Music GUI (opens popup with your GitHub-hosted HTML)

const base_url = "https://raw.githubusercontent.com/ggz2/js/main";

// GPL text (optional)
const gpl_text = `Copper Music bookmarklet
Copyright (C) 2025 Td

This program is free software...`;  // shorten or remove if you want

function http_get(url, callback, headers = [], method = "GET", content = null) {
  var request = new XMLHttpRequest();
  request.addEventListener("load", callback);
  request.open(method, url, true);
  for (const header of headers) {
    request.setRequestHeader(header[0], header[1]);
  }
  request.send(content);
}

function init() {
  console.info(gpl_text || "Copper Music starting...");

  window.real_location = window.location;

  if (window.real_location.hostname.includes("github.io") || 
      window.real_location.hostname.includes("githubusercontent.com")) {
    alert("Drag this bookmarklet to your bar and run it on any page.");
    return;
  }

  // FIXED: Fetch your popup.html from GitHub, not Vercel
  http_get(base_url + "/popup.html", open_popup);
}

function open_popup() {
  const popup = window.open("about:blank", "CopperMusic", "width=800,height=600");
  if (!popup) {
    alert("Popup blocked - please allow popups for this site and try again.");
    return;
  }

  popup.focus();
  alert("Copper Music GUI is now open in a popup!");

  write_popup(popup, this.responseText);

  function popup_unload() {
    http_get(base_url + "/popup.html", function () {
      if (popup.closed) return;
      write_popup(popup, this.responseText);
      popup.addEventListener("beforeunload", popup_unload);
    });
  }

  popup.addEventListener("beforeunload", popup_unload);
}

function write_popup(popup, html) {
  popup.document.base_url = base_url;
  popup.document.gpl_text = gpl_text;
  popup.document.open();
  popup.document.write(html);
  popup.document.close();

  function create_element(tag, innerHTML) {
    let element = popup.document.createElement(tag);
    element.innerHTML = innerHTML;
    popup.document.head.appendChild(element);
    return element;
  }

  // Load CSS if you have it (uncomment if needed)
  // http_get(base_url + "/styles/popup.css", function () {
  //   create_element("style", this.responseText);
  // });

  // Load main.js
  http_get(base_url + "/main.js", function () {
    create_element("script", this.responseText);
  });

  // Load loader.js (your test menu logic)
  http_get(base_url + "/loader.js", function () {
    create_element("script", this.responseText);
  });
}

init();
