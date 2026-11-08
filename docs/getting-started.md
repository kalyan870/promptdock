# Getting Started with PromptDock 5.0

PromptDock 5.0 runs locally on standard HTTP servers without complex Node bundling dependencies, while providing full production build validation.

## Prerequisites

- Node.js 18.0.0 or higher
- Modern browser with WebGL 2.0 support (Chrome, Firefox, Safari, Edge)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/kalyan870/promptdock.git
cd promptdock

# Run the automated verification suite
npm test

# Run the production build validation
npm run build

# Start the local development server
npm start
```

Visit `http://localhost:3000` in your web browser.

## Keyboard Shortcuts

- `Ctrl + K` (or `Cmd + K`): Open global command palette across all components, prompts, and libraries.
- `Escape`: Dismiss open dialogs, modal 3D inspectors, and the command palette.
- `/`: Quick focus on search bar.
