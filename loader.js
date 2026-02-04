// loader.js - Automatically discovers and creates buttons for all test#.html files

const TEST_FOLDER = "https://ggz2.github.io/Copper-Music/test/";
const container = document.getElementById("button-container");

async function loadTests() {
  container.innerHTML = `<div style="text-align:center; padding:50px; font-size:1.3em; opacity:0.8;">
                         Scanning GitHub for tests...
                        </div>`;

  try {
    // Use GitHub API to list all files in the folder
    const apiUrl = "https://api.github.com/repos/ggz2/Copper-Music/contents/test";
    const response = await fetch(apiUrl);
    const files = await response.json();

    // Filter only files that match test<number>.html
    const testFiles = files
      .filter(f => f.name.match(/^test\d+\.html$/i))
      .sort((a, b) => {
        const numA = parseInt(a.name.match(/test(\d+)\.html/i)[1]);
        const numB = parseInt(b.name.match(/test(\d+)\.html/i)[1]);
        return numA - numB;
      });

    if (testFiles.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:50px;">
                             No test#.html files found in /test folder
                            </div>`;
      return;
    }

    container.innerHTML = ""; // Clear loading message

    testFiles.forEach(file => {
      const num = file.name.match(/test(\d+)\.html/i)[1];
      const btn = document.createElement("button");
      btn.className = "test-btn";
      btn.textContent = `Test ${num}`;
      btn.onclick = () => showTest(TEST_FOLDER + file.name);
      container.appendChild(btn);
    });

  } catch (err) {
    console.error("Failed to load tests:", err);
    container.innerHTML = `<div style="color:#ff6b6b; text-align:center; padding:30px;">
                           Error loading tests.<br>
                           Check console or GitHub folder path.
                          </div>`;
  }
}

// Auto-run when popup loads
loadTests();
