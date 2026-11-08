# Contributing to PromptDock ⚡

We welcome contributions from the community! PromptDock is a community-driven repository of AI prompts, visual mockups, and open-source UI libraries for motion-rich web applications.

---

## 🎯 How to Contribute

### 1. Adding a New AI Prompt
To submit a new prompt, update `index.html` and follow these rules:
1. **Title & Category**: Choose an intuitive name and one of the core categories (`Hero`, `Landing`, `Portfolio`, `Ecommerce`, `3D`, `Background`, `Typography`).
2. **Color Palette**: Provide two accent hex colors for the fallback gradient (e.g. `#5eead4,#818cf8`).
3. **Prompt Quality**: Write an actionable, production-ready system prompt that specifies tech stack (e.g. Next.js, Tailwind, Framer Motion, Three.js), motion parameters, accessibility (`prefers-reduced-motion`), and responsiveness.
4. **Visual Asset**: Include a corresponding high-quality vector illustration in `images/<slug>.svg` (viewBox: `0 0 400 240`).

### 2. Suggesting a Free Resource
We index free, high-utility animation libraries (such as `21st.dev`, `Libraries.dev`, `shadcn/ui`, `Magic UI`).
Ensure any proposed resource is actively maintained, open-source, and has clear licensing.

---

## 🛠️ Local Development & Testing

1. Clone your fork:
   ```bash
   git clone https://github.com/kalyan870/promptdock.git
   cd promptdock
   ```
2. Start the local dev server:
   ```bash
   npm start
   ```
3. Run the automated verification test suite:
   ```bash
   npm test
   ```
4. Verify production build:
   ```bash
   npm run build
   ```

All pull requests must pass the CI test suite before merge!
