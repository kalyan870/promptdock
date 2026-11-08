# PromptDock 5.0 — System Architecture

PromptDock 5.0 is an interactive creative developer platform engineered for high-performance 3D WebGL experiences, AI prompt discovery, 21st.dev component marketplace synchronization, and Libraries.dev open-source dependency exploration.

```mermaid
graph TD
    Client["User Browser / Client"] --> Router["Global Anchor Router & Hash Deep-Linker"]
    
    subgraph UI ["Visual Presentation Layer"]
      SplitHero["Split-Screen 3D Hero (Three.js WebGL + Preview Window)"]
      CompMarket["Component Marketplace (21st.dev Inspired Bento & Cards)"]
      PromptGallery["Prompt Discovery (16 Visual Cards + Specular Tilt)"]
      LibRegistry["Creative Effects Registry (Libraries.dev Inspired Shaders)"]
      ResourceEcosystem["Ecosystem Directory (21st.dev, Libraries.io, Three.js)"]
      WorkflowStudio["Workflow Studio (8-Stage Interactive Pipeline)"]
      CaseStudies["Case Studies & Showcase (8 Documented Applications)"]
    end
    
    subgraph Engine ["3D & Motion Engine"]
      ThreeCore["Three.js WebGL 2.0 Renderer"]
      ShaderPipeline["GLSL Raymarching & Simplex Noise Shaders"]
      PhysicsTilt["3D Perspective Tilt Physics with Specular Glare"]
      GSAPLayer["GSAP 3 Elastic Spring Physics & Magnetic Pull"]
      Intersection["IntersectionObserver (Off-Screen Scene Pausing)"]
    end
    
    subgraph Pipeline ["Build & CI/CD Pipeline"]
      AssetValidator["Asset Integrity Validator (53+ SVGs)"]
      AutomatedQA["Automated Test Suite (test-build.js)"]
      GitHubActions["GitHub Actions Matrix CI (Node 18/20/22)"]
      VercelEdge["Vercel Global Edge CDN (Immutable Cache 31536000s)"]
    end
    
    Client --> UI
    UI --> Engine
    Engine --> Pipeline
```

## Key Architectural Decisions

1. **Client-Side WebGL Rendering**:
   - Zero-dependency Three.js r128 loaded via CDN for rapid browser parsing and zero runtime build overhead.
   - Separate canvas contexts for each section (`#hero-canvas`, `#component-canvas`, `#workflow-canvas`, `#modal-3d-canvas`).
   - Dynamic canvas resizing and high-DPI scaling (`Math.min(window.devicePixelRatio, 2)`).

2. **IntersectionObserver Performance Guard**:
   - WebGL render loops are automatically throttled when off-screen to preserve 60 FPS on laptops with integrated graphics.

3. **Asset System**:
   - 53 verified vector illustrations and architecture blueprints in `images/`.
   - Scalable, sharp on Retina displays, and zero external hotlink risks.
