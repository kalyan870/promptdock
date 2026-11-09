# PromptDock 8.1 Acceptance Checklist

## Visual & Functional Verification
- [x] Workflow visually redesigned from 5 simple text boxes into an Interactive Visual Storyboard.
- [x] Each of the 5 workflow stages features a meaningful visual demonstration.
- [x] Gallery redesigned with rich bento layout, featured visual cards, distinct effect presentations, and preserved 30 visuals.
- [x] 3D Inspector has large viewport, camera reset, HUD telemetry, and live FPS calculation.
- [x] Hero section prominently features Scott Clayton's 3D Horizon WebGL experience.
- [x] All prompts remain strictly read-only (`<pre id="prompt-display">`), zero textareas or contenteditable.
- [x] Every copy button invokes canonical `PromptEngine` and copies the full 18-point brief with active parameters.
- [x] Real screenshots captured from the running application and committed to `docs/assets/screenshots/`.
- [x] Real Playwright browser test suite exercising 28 key user interactions (51 test assertions passed).
- [x] Production build succeeds cleanly into `dist/`.
- [x] Pushed to GitHub `main` and verified live on Vercel production.
