# LeetCode AI Hints Chrome Extension

## Overview
LeetCode AI Hints is a Chrome extension that provides AI-powered, context-aware hints for solving LeetCode coding problems.

## Features
- Real-time AI-generated hints
- Seamless LeetCode integration
- Configurable hint verbosity
- Secure API key management

## Prerequisites
- Node.js (v16+)
- npm
- OpenAI API Key

## Installation

1. Clone the repository
```bash
git clone https://github.com/namanyadav963/leetcode-ai-hints.git
cd leetcode-ai-hints
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load in Chrome
- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `dist` directory

## Configuration
1. Open extension options
2. Enter your OpenAI API key
3. Set hint verbosity preferences

## Security Notes
- API keys are stored securely in Chrome's storage
- Hints are generated client-side
- No user code or problem details are sent externally

## Troubleshooting
- Ensure API key is valid
- Check browser console for error messages
- Verify LeetCode page matches expected selectors

## Contributing
PRs welcome! Please open an issue first to discuss proposed changes.

## License
MIT License
```

A few important implementation notes:

1. **API Security**: The implementation uses Chrome's secure storage and background script for API calls to protect the API key.

2. **Performance**: The content script is designed to be lightweight and non-intrusive.

3. **Flexibility**: The hint generation can be easily modified to support different AI providers.

4. **Error Handling**: Comprehensive error handling is included for API calls and UI interactions.

Development and deployment steps:
1. Set up the project structure
2. Configure Vite and build tools
3. Implement core functionality
4. Test locally
5. Build for Chrome Web Store

Would you like me to elaborate on any specific aspect of the extension or provide more detailed implementation guidance?