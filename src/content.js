import browser from 'webextension-polyfill';

// Extract problem context from LeetCode page
function extractProblemContext() {
  return {
    title: document.querySelector('.mr-2.text-lg.font-medium.text-label-1').textContent,
    description: document.querySelector('.content__eAC7').textContent,
    difficulty: document.querySelector('.text-difficulty-medium').textContent
  };
}

// Inject hint button into LeetCode interface
function injectHintButton() {
  const editorContainer = document.querySelector('.editor-container');
  
  if (editorContainer && !document.getElementById('ai-hint-button')) {
    const hintButton = document.createElement('button');
    hintButton.id = 'ai-hint-button';
    hintButton.textContent = 'AI Hint';
    hintButton.classList.add(
      'px-3', 'py-1.5', 'bg-brand-orange', 'text-white', 
      'rounded', 'hover:opacity-80', 'transition-opacity'
    );

    hintButton.addEventListener('click', generateHint);
    editorContainer.appendChild(hintButton);
  }
}

// Generate and display hint
async function generateHint() {
  try {
    const problemContext = extractProblemContext();
    const response = await browser.runtime.sendMessage({
      type: 'FETCH_HINT', 
      problemContext 
    });

    displayHint(response.hint);
  } catch (error) {
    console.error('Hint Generation Error:', error);
    displayHint('Unable to generate hint. Please check your API configuration.');
  }
}

// Display hint in a non-intrusive panel
function displayHint(hintText) {
  let hintPanel = document.getElementById('ai-hint-panel');
  
  if (!hintPanel) {
    hintPanel = document.createElement('div');
    hintPanel.id = 'ai-hint-panel';
    hintPanel.classList.add(
      'fixed', 'top-1/2', 'right-4', 'transform', '-translate-y-1/2', 
      'bg-white', 'border', 'rounded-lg', 'p-4', 'shadow-lg', 
      'w-80', 'max-h-96', 'overflow-y-auto', 'z-50'
    );
    document.body.appendChild(hintPanel);
  }

  hintPanel.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-bold text-lg">AI Hint</h3>
      <button id="close-hint-panel" class="text-red-500">✕</button>
    </div>
    <p>${hintText}</p>
  `;

  document.getElementById('close-hint-panel')
    .addEventListener('click', () => hintPanel.remove());
}

// Initialize extension features
function initExtension() {
  injectHintButton();
}

// Run initialization when page loads
if (document.readyState === 'complete') {
  initExtension();
} else {
  window.addEventListener('load', initExtension);
}