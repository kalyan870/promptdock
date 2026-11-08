# Visual Design System & Asset Hierarchy

## Visual Hierarchy Principles

Every section in PromptDock 5.0 follows a strict visual structure:

1. **Section Heading & Description**: Clear typographical anchor using `Space Grotesk` (weights 700 and 800) and `Inter` (weights 400 and 500).
2. **Large Featured Preview / Interactive Showcase**: Immediate visual proof of the technology in action without opening a modal.
3. **Card Grid with Visible Illustrations**: 900x650 and 720x520 vector previews for every single item.
4. **Technology & Capability Metadata**: Explicit badges identifying framework, performance characteristics, and licensing status.
5. **Action Controls**: One-click prompt copying, code copying, and 3D inspection.

## Color Palette Tokens

```css
:root {
  --bg: #04060b;             /* Deep Void Background */
  --bg-deep: #020306;        /* Absolute Black Horizon */
  --panel: rgba(12, 17, 29, 0.75); /* Translucent Glass Panel */
  --panel-solid: #0d1322;    /* Solid Card Surface */
  --line: rgba(255, 255, 255, 0.08); /* Subtle Divider */
  --line-bright: rgba(94, 234, 212, 0.35); /* Active Cyan Border */
  --text: #f1f5fd;           /* High-Contrast Foreground */
  --muted: #8c96ae;          /* Supporting Text */
  --a: #5eead4;              /* Neon Cyan Accent */
  --b: #818cf8;              /* Soft Indigo Accent */
  --c: #c084fc;              /* Electric Violet */
}
```

## Typography

- **Headings**: `Space Grotesk`, display letter-spacing `-0.03em`.
- **Body & UI**: `Inter`, line-height `1.55`.
- **Code & Specs**: `JetBrains Mono`, monospace tabular figures.
