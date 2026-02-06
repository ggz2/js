// GUI.js - Main script loaded by the bookmarklet
// This script opens a popup GUI and loads additional scripts/iframes from GitHub

// Base URL for fetching files from your repo (using raw GitHub URLs)
const base_url = "https://raw.githubusercontent.com/ggz2/js/main";

// GPL text (adapt as needed)
const gpl_text = `Your Project: A bookmarklet for loading a popup GUI with iframes
Copyright (C) 2023 Your Name

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.`;

// Legacy HTTP get function
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
  console.info(gpl_text);

  // Support for proxies or special environments if needed
  window.real_location = window.location;

  // Show instructions if run directly from GitHub
  if (window.real_location.hostname.includes("github.io") || window.real_location.hostname.includes("githubusercontent.com")) {
    alert("To use this, drag the bookmarklet into your bookmarks bar. Then, run it on any page.");
    return;
  }

  // Proceed to open the popup on any site
  http_get("https://coppermusic.vercel.app", open_popup);
}

function open_popup() {
  const popup = window.open("about:blank", "", "width=760,height=450");
  if (popup == null) {
    alert("Error: Could not open the popup. Please enable popups for this site and try again.");
    return;
  }

  // Bring popup to front / focus it (helps ensure it's on top)
  popup.focus();

  // Alert on the original tab to confirm it's open
  alert("GUI is now open in a new popup window!");

  write_popup(popup, this.responseText);

  // Optional: Reload popup content if closed and reopened (from original example)
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
  popup.document.write(html);

  let create_element = function (tag, innerHTML) {
    let element = popup.document.createElement(tag);
    element.innerHTML = innerHTML;
    popup.document.head.append(element);
    return element;
  };

  // Load CSS
  //http_get(base_url + "/styles/popup.css", function () {
 //   create_element("style", this.responseText);
//  });

  // Load main JS
//  http_get(base_url + "/main.js", function () {
//    create_element("script", this.responseText);
//  });

  // Load loader for iframes
//  http_get(base_url + "/loader.js", function () {
//    create_element("script", this.responseText);
//  });
}

init();
