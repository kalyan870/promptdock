# Production Workflow Guide

PromptDock 5.0 documents the full 8-stage interactive engineering pipeline from initial prompt synthesis to edge deployment.

```
IDEA & SPECS (01)
       ↓
PROMPT DISCOVERY (02)
       ↓
COMPONENT PICK (03)
       ↓
AI SYNTHESIS (04)
       ↓
LOCAL DEV (05)
       ↓
AUTOMATED QA (06)
       ↓
GITHUB PUSH (07)
       ↓
VERCEL DEPLOY (08)
```

## Detailed Stages

1. **Idea & Specifications**: Defining the user experience, interaction models, and tech choices.
2. **Prompt Discovery**: Browsing the PromptDock 5.0 catalog for tested 3D and animation prompts.
3. **Component Selection**: Selecting modular UI recipes inspired by 21st.dev.
4. **AI Synthesis**: Running prompts through Claude, GPT-4o, or Gemini in your IDE.
5. **Local Development**: Iterating at `http://localhost:3000` with hot reload.
6. **Automated QA**: Running `npm test && npm run build` to validate 53+ assets and HTML structure.
7. **GitHub Push**: Triggering GitHub Actions CI test matrix across Node 18, 20, and 22.
8. **Vercel Deploy**: Deploying atomically to Vercel production edge with immutable caching.
