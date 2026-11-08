export interface VisualProps {
  color: string;
  speed: number;
  density: number;
  glow: number;
  cam: number;
  wireframe?: boolean;
  secondaryColor?: string;
  size?: number;
  sensitivity?: number;
  roughness?: number;
  metalness?: number;
  [key: string]: any;
}

export interface VisualItem {
  id: string;
  name: string;
  cat: string;
  desc: string;
  thumb: string;
  tech: string;
  anim: string;
  interact: string;
  perf: string;
  perfTier: string;
  placement: string;
  sceneType: string;
  defaultProps: VisualProps;
}

export const CATEGORIES: string[] = [
  "All Visuals",
  "3D Hero Experiences",
  "3D Backgrounds",
  "Particles and Physics",
  "3D Product Experiences",
  "Motion and Scroll Experiences",
  "3D UI Components",
  "Shaders and Materials",
  "AI and Technology Visuals"
];
