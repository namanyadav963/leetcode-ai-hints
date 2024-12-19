import browser from 'webextension-polyfill';
// Secure API call handler
async function fetchAIHint(problemContext) {
  try {
    // Retrieve API key securely from storage
    const { apiKey } = await browser.storage.sync.get('apiKey');
    
    if (!apiKey) {
      throw new Error('API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system', 
            content: 'You are a coding mentor providing helpful, step-by-step hints for LeetCode problems.'
          },
          {
            role: 'user',
            content: `Problem Context: ${JSON.stringify(problemContext)}\n\nProvide a detailed, progressive hint that helps the user solve the problem without giving away the entire solution.`
          }
        ],
        max_tokens: 300
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Hint Generation Error:', error);
    return `Unable to generate hint: ${error.message}`;
  }
}

// Listen for messages from content script
browser.runtime.onMessage.addListener(async (message, sender) => {
  if (message.type === 'FETCH_HINT') {
    const hint = await fetchAIHint(message.problemContext);
    // Send message to options page
    browser.tabs.query({ url: browser.runtime.getURL('src/index.html') }, (tabs) => {
      if (tabs.length > 0) {
        browser.tabs.sendMessage(tabs[0].id, { type: 'DISPLAY_HINT', hint });
      }
    });
    return { hint };
  }
});
