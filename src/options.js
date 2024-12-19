// options.js

// Wait for the HTML document to finish loading
console.log("sex")
document.addEventListener('DOMContentLoaded', function () {
    // Get the hint element from the popup HTML file
    const hintElement = document.getElementById('hint');
  
    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.type === 'DISPLAY_HINT') {
        // Display the hint in the popup HTML file
        hintElement.innerText = request.hint;
      }
    });
  
    // Function to display the hint
    function displayHint(hint) {
      hintElement.innerText = hint;
    }
    function clearHint() {
      hintElement.innerText = '';
    }
  
    // Initialize the hint display
    clearHint();
  });