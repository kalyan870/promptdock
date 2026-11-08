import * as THREE from 'three';
import type { VisualProps } from '../data/visuals.ts';

export type SceneCreator = (group: THREE.Group, props: VisualProps) => void;

export class SceneFactory {
  private static registry: Map<string, SceneCreator> = new Map();

  static register(sceneType: string, creator: SceneCreator) {
    this.registry.set(sceneType, creator);
  }

  static has(sceneType: string): boolean {
    return this.registry.has(sceneType);
  }

  static getRegisteredTypes(): string[] {
    return Array.from(this.registry.keys());
  }

  static cleanGroup(group: any) {
    if (!group) return;
    group._customUpdate = null;
    group._pointer = null;
    group._props = null;

    group.traverse((obj: any) => {
      if (obj.geometry) {
        obj.geometry.dispose();
      }
      if (obj.material) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat: any) => {
            if (mat.map) mat.map.dispose();
            mat.dispose();
          });
        } else {
          if (obj.material.map) obj.material.map.dispose();
          obj.material.dispose();
        }
      }
    });

    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
  }

  static createScene(sceneType: string, group: THREE.Group, props: VisualProps): boolean {
    this.cleanGroup(group);
    const creator = this.registry.get(sceneType);
    if (creator) {
      creator(group, props);
      return true;
    }
    // Fail explicitly rather than silently creating an icosahedron
    console.error(`[SceneFactory] No implementation registered for sceneType: "${sceneType}"`);
    return false;
  }
}

// ==========================================
// 1. aurora — Procedural Wave Mesh
// ==========================================
SceneFactory.register('aurora', (group, props) => {
  const segs = Math.max(20, Math.min(80, Math.floor(Math.sqrt(props.density || 1600))));
  const geom = new THREE.PlaneGeometry(8, 6, segs, segs);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#5eead4'),
    wireframe: props.wireframe ?? false,
    roughness: 0.2,
    metalness: 0.8,
    emissive: new THREE.Color(props.secondaryColor || '#818cf8'),
    emissiveIntensity: (props.glow || 1.2) * 0.4,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 3.5;
  group.add(mesh);

  const posAttr = geom.attributes.position;
  const originalZ = new Float32Array(posAttr.count);
  for (let i = 0; i < posAttr.count; i++) {
    originalZ[i] = posAttr.getZ(i);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.5;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = Math.sin(x * 0.8 + time * spd) * Math.cos(y * 0.6 + time * spd * 0.8) * 0.7;
      posAttr.setZ(i, originalZ[i] + z);
    }
    posAttr.needsUpdate = true;
    mesh.rotation.z = Math.sin(time * 0.2 * spd) * 0.1;
  };
});

// ==========================================
// 2. planet — Celestial Orbit Planet
// ==========================================
SceneFactory.register('planet', (group, props) => {
  const sphereGeom = new THREE.SphereGeometry(1.8, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#38bdf8'),
    wireframe: props.wireframe ?? false,
    roughness: 0.3,
    metalness: 0.7,
    emissive: new THREE.Color(props.secondaryColor || '#6366f1'),
    emissiveIntensity: (props.glow || 1.0) * 0.3
  });
  const planet = new THREE.Mesh(sphereGeom, sphereMat);
  group.add(planet);

  // Inner ring
  const ringGeom = new THREE.RingGeometry(2.3, 3.2, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#38bdf8'),
    wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = Math.PI / 2.3;
  group.add(ring);

  // Outer orbit satellites
  const satCount = 4;
  const satellites: THREE.Mesh[] = [];
  for (let i = 0; i < satCount; i++) {
    const satGeom = new THREE.SphereGeometry(0.12, 16, 16);
    const satMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#c084fc') });
    const sat = new THREE.Mesh(satGeom, satMat);
    group.add(sat);
    satellites.push(sat);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.8;
    planet.rotation.y = time * 0.4 * spd;
    ring.rotation.z = time * 0.2 * spd;
    satellites.forEach((sat, idx) => {
      const angle = time * spd * (0.8 + idx * 0.3) + (idx * Math.PI * 2) / satCount;
      const radius = 3.6 + idx * 0.5;
      sat.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.5) * 0.8, Math.sin(angle) * radius);
    });
  };
});

// ==========================================
// 3. abstractTorus — Intertwined Torus Sculpture
// ==========================================
SceneFactory.register('abstractTorus', (group, props) => {
  const geom1 = new THREE.TorusKnotGeometry(1.5, 0.45, 100, 16);
  const mat1 = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#c084fc'),
    wireframe: props.wireframe ?? false,
    roughness: 0.15,
    metalness: 0.9,
    emissive: new THREE.Color(props.secondaryColor || '#f43f5e'),
    emissiveIntensity: (props.glow || 1.2) * 0.35
  });
  const knot1 = new THREE.Mesh(geom1, mat1);
  group.add(knot1);

  const geom2 = new THREE.TorusGeometry(2.6, 0.12, 16, 64);
  const mat2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.secondaryColor || '#f43f5e'),
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const knot2 = new THREE.Mesh(geom2, mat2);
  knot2.rotation.x = Math.PI / 3;
  group.add(knot2);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.9;
    knot1.rotation.x = time * 0.5 * spd;
    knot1.rotation.y = time * 0.7 * spd;
    knot2.rotation.y = -time * 0.4 * spd;
    knot2.rotation.z = time * 0.3 * spd;
  };
});

// ==========================================
// 4. spatialGlass — Prismatic Glass Planes
// ==========================================
SceneFactory.register('spatialGlass', (group, props) => {
  const octGeom = new THREE.OctahedronGeometry(1.8, 0);
  const octMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(props.color || '#e0e7ff'),
    wireframe: props.wireframe ?? false,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 1.2,
    transparent: true,
    opacity: 0.85
  });
  const octa = new THREE.Mesh(octGeom, octMat);
  group.add(octa);

  // Outer frame planes
  for (let i = -1; i <= 1; i += 2) {
    const planeGeom = new THREE.PlaneGeometry(3.5, 3.5);
    const planeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(props.secondaryColor || '#818cf8'),
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const pMesh = new THREE.Mesh(planeGeom, planeMat);
    pMesh.position.z = i * 1.5;
    group.add(pMesh);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.7;
    octa.rotation.x = time * 0.6 * spd;
    octa.rotation.y = time * 0.4 * spd;
  };
});

// ==========================================
// 5. kineticType — Kinetic 3D Letterforms
// ==========================================
SceneFactory.register('kineticType', (group, props) => {
  const count = 12;
  const boxes: THREE.Mesh[] = [];
  for (let i = 0; i < count; i++) {
    const bGeom = new THREE.BoxGeometry(0.5, 1.4, 0.4);
    const bMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(props.color || '#a78bfa'),
      wireframe: props.wireframe ?? false,
      roughness: 0.3,
      metalness: 0.7
    });
    const bMesh = new THREE.Mesh(bGeom, bMat);
    const angle = (i / count) * Math.PI * 2;
    bMesh.position.set(Math.cos(angle) * 2.8, Math.sin(angle) * 0.5, Math.sin(angle) * 2.8);
    group.add(bMesh);
    boxes.push(bMesh);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.0;
    group.rotation.y = time * 0.5 * spd;
    boxes.forEach((b, idx) => {
      b.position.y = Math.sin(time * 2 * spd + idx * 0.5) * 0.6;
      b.rotation.x = Math.sin(time * spd + idx) * 0.4;
    });
  };
});

// ==========================================
// 6. galaxy — Multi-Arm Logarithmic Spiral
// ==========================================
SceneFactory.register('galaxy', (group, props) => {
  const count = Math.max(800, props.density || 2400);
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const arms = 5;
  const colCore = new THREE.Color(props.color || '#818cf8');
  const colEdge = new THREE.Color(props.secondaryColor || '#c084fc');

  for (let i = 0; i < count; i++) {
    const r = Math.random() * 4.5;
    const armAngle = ((i % arms) * ((2 * Math.PI) / arms));
    const spin = r * 1.8;
    const randomX = (Math.random() - 0.5) * 0.35 * (r + 0.3);
    const randomY = (Math.random() - 0.5) * 0.25 * (r + 0.3);
    const randomZ = (Math.random() - 0.5) * 0.35 * (r + 0.3);

    positions[i * 3] = Math.cos(armAngle + spin) * r + randomX;
    positions[i * 3 + 1] = randomY;
    positions[i * 3 + 2] = Math.sin(armAngle + spin) * r + randomZ;

    const mixed = colCore.clone().lerp(colEdge, r / 4.5);
    colors[i * 3] = mixed.r;
    colors[i * 3 + 1] = mixed.g;
    colors[i * 3 + 2] = mixed.b;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: (props.size || 0.05) * 1.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const p = new THREE.Points(geom, mat);
  group.add(p);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.4;
    p.rotation.y = time * spd;
  };
});

// ==========================================
// 7. starfieldWarp — Relativistic Warp Speed
// ==========================================
SceneFactory.register('starfieldWarp', (group, props) => {
  const count = Math.max(600, props.density || 1800);
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(props.color || '#38bdf8'),
    size: 0.07,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const stars = new THREE.Points(geom, mat);
  group.add(stars);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 12.0;
    const pos = geom.attributes.position;
    for (let i = 0; i < count; i++) {
      let z = pos.getZ(i) + spd * 0.016;
      if (z > 10) z = -10;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  };
});

// ==========================================
// 8. neuralNet — Structured Synaptic Network
// ==========================================
SceneFactory.register('neuralNet', (group, props) => {
  const nodeCount = 36;
  const nodes: THREE.Vector3[] = [];
  const sphereGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const sphereMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.color || '#a78bfa') });

  for (let i = 0; i < nodeCount; i++) {
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3
    );
    nodes.push(v);
    const m = new THREE.Mesh(sphereGeom, sphereMat);
    m.position.copy(v);
    group.add(m);
  }

  const linePositions: number[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 2.0) {
        linePositions.push(nodes[i].x, nodes[i].y, nodes[i].z);
        linePositions.push(nodes[j].x, nodes[j].y, nodes[j].z);
      }
    }
  }

  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: new THREE.Color(props.secondaryColor || '#6366f1'),
    transparent: true,
    opacity: 0.4
  });
  const lines = new THREE.LineSegments(lineGeom, lineMat);
  group.add(lines);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.4;
    group.rotation.y = time * 0.3 * spd;
    group.rotation.x = Math.sin(time * 0.2 * spd) * 0.2;
  };
});

// ==========================================
// 9. terrain — Cyberpunk Procedural Terrain
// ==========================================
SceneFactory.register('terrain', (group, props) => {
  const geom = new THREE.PlaneGeometry(12, 12, 36, 36);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#ec4899'),
    wireframe: true,
    emissive: new THREE.Color(props.secondaryColor || '#8b5cf6'),
    emissiveIntensity: 0.4
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 2.5;
  mesh.position.y = -1.2;
  group.add(mesh);

  const pos = geom.attributes.position;
  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 2.0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = Math.sin(x * 0.8 + time * spd) * 0.5 + Math.cos(y * 0.8 + time * spd * 0.6) * 0.4;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  };
});

// ==========================================
// 10. reactiveParticles — Repulsive Spring Field
// ==========================================
SceneFactory.register('reactiveParticles', (group, props) => {
  const count = Math.max(600, props.density || 1600);
  const geom = new THREE.BufferGeometry();
  const basePos = new Float32Array(count * 3);
  const currentPos = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 6;
    const y = (Math.random() - 0.5) * 5;
    const z = (Math.random() - 0.5) * 3;
    basePos[i * 3] = x;
    basePos[i * 3 + 1] = y;
    basePos[i * 3 + 2] = z;
    currentPos[i * 3] = x;
    currentPos[i * 3 + 1] = y;
    currentPos[i * 3 + 2] = z;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(currentPos, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(props.color || '#5eead4'),
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const p = new THREE.Points(geom, mat);
  group.add(p);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0);
    const pos = geom.attributes.position;
    // Simulate pointer proximity wave
    const waveX = Math.sin(time * 1.5 * spd) * 2.0;
    const waveY = Math.cos(time * 1.2 * spd) * 1.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = basePos[idx];
      const by = basePos[idx + 1];
      const bz = basePos[idx + 2];

      const dx = pos.getX(i) - waveX;
      const dy = pos.getY(i) - waveY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.4) {
        const force = (1.4 - dist) * 0.15;
        velocities[idx] += (dx / dist) * force;
        velocities[idx + 1] += (dy / dist) * force;
      }

      // Spring back to base position
      velocities[idx] += (bx - pos.getX(i)) * 0.08;
      velocities[idx + 1] += (by - pos.getY(i)) * 0.08;
      velocities[idx + 2] += (bz - pos.getZ(i)) * 0.08;

      velocities[idx] *= 0.88;
      velocities[idx + 1] *= 0.88;
      velocities[idx + 2] *= 0.88;

      pos.setXYZ(
        i,
        pos.getX(i) + velocities[idx],
        pos.getY(i) + velocities[idx + 1],
        pos.getZ(i) + velocities[idx + 2]
      );
    }
    pos.needsUpdate = true;
  };
});

// ==========================================
// 11. magneticAttractor — Multi-Attractor Field
// ==========================================
SceneFactory.register('magneticAttractor', (group, props) => {
  const attractors = [
    new THREE.Vector3(-1.8, 0.8, 0),
    new THREE.Vector3(1.8, -0.6, 0.5),
    new THREE.Vector3(0, 1.2, -0.5)
  ];

  // Visual attractor cores
  attractors.forEach((pos, idx) => {
    const coreGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(idx === 0 ? (props.color || '#38bdf8') : (props.secondaryColor || '#c084fc'))
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    core.position.copy(pos);
    group.add(core);
  });

  const count = Math.max(500, props.density || 1200);
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(props.color || '#38bdf8'),
    size: 0.05,
    transparent: true,
    opacity: 0.85
  });
  const points = new THREE.Points(geom, mat);
  group.add(points);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.8;
    const pos = geom.attributes.position;
    for (let i = 0; i < count; i++) {
      const att = attractors[i % 3];
      const angle = time * spd * (1 + (i % 5) * 0.2) + i * 0.1;
      const radius = 1.0 + (i % 10) * 0.12;
      pos.setXYZ(
        i,
        att.x + Math.cos(angle) * radius,
        att.y + Math.sin(angle) * (radius * 0.8),
        att.z + Math.sin(angle * 1.5) * 0.5
      );
    }
    pos.needsUpdate = true;
  };
});

// ==========================================
// 12. curlVortex — Turbulent Fluid Swirl
// ==========================================
SceneFactory.register('curlVortex', (group, props) => {
  const count = Math.max(800, props.density || 2000);
  const geom = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const angles = new Float32Array(count);
  const radiuses = new Float32Array(count);
  const heights = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    angles[i] = Math.random() * Math.PI * 2;
    radiuses[i] = 0.3 + Math.random() * 2.8;
    heights[i] = (Math.random() - 0.5) * 5.0;
  }

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: new THREE.Color(props.color || '#10b981'),
    size: 0.06,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });
  const points = new THREE.Points(geom, mat);
  group.add(points);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.8;
    const pos = geom.attributes.position;

    for (let i = 0; i < count; i++) {
      // Fluid vortex: velocity inversely proportional to radius
      angles[i] += (spd / (radiuses[i] + 0.5)) * 0.04;
      heights[i] += spd * 0.02;
      if (heights[i] > 2.5) heights[i] = -2.5;

      const r = radiuses[i] + Math.sin(angles[i] * 3.0 + time * spd) * 0.15;
      const x = Math.cos(angles[i]) * r;
      const z = Math.sin(angles[i]) * r;
      pos.setXYZ(i, x, heights[i], z);
    }
    pos.needsUpdate = true;
  };
});

// ==========================================
// 13. flowField — Directional Vector Streamlines
// ==========================================
SceneFactory.register('flowField', (group, props) => {
  const lineCount = 48;
  const pointsPerLine = 20;

  for (let l = 0; l < lineCount; l++) {
    const pts: THREE.Vector3[] = [];
    const startY = (l / lineCount - 0.5) * 4.5;
    const startZ = (Math.random() - 0.5) * 2;

    for (let p = 0; p < pointsPerLine; p++) {
      const x = (p / pointsPerLine - 0.5) * 6;
      const y = startY + Math.sin(x * 1.2 + l * 0.2) * 0.4;
      pts.push(new THREE.Vector3(x, y, startZ));
    }

    const curve = new THREE.CatmullRomCurve3(pts);
    const geom = new THREE.TubeGeometry(curve, 20, 0.025, 6, false);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(l % 2 === 0 ? (props.color || '#38bdf8') : (props.secondaryColor || '#818cf8')),
      transparent: true,
      opacity: 0.6
    });
    const tube = new THREE.Mesh(geom, mat);
    tube.userData = { offset: l * 0.1 };
    group.add(tube);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.8;
    group.rotation.z = Math.sin(time * 0.3 * spd) * 0.1;
    group.rotation.y = time * 0.2 * spd;
  };
});

// ==========================================
// 14. headphone — Spatial 360 Headphone
// ==========================================
SceneFactory.register('headphone', (group, props) => {
  const hpGroup = new THREE.Group();

  // Headband
  const bandGeom = new THREE.TorusGeometry(1.8, 0.12, 16, 32, Math.PI);
  const hpMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#1e293b'),
    metalness: 0.85,
    roughness: 0.25
  });
  const band = new THREE.Mesh(bandGeom, hpMat);
  band.rotation.z = -Math.PI;
  hpGroup.add(band);

  // Ear cushions
  const earMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.secondaryColor || '#38bdf8'),
    metalness: 0.3,
    roughness: 0.6
  });

  [-1.8, 1.8].forEach((xPos) => {
    const cupGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.5, 32);
    const cup = new THREE.Mesh(cupGeom, earMat);
    cup.position.set(xPos, 0, 0);
    cup.rotation.z = Math.PI / 2;
    hpGroup.add(cup);

    // Accent ring
    const ringGeom = new THREE.TorusGeometry(0.68, 0.04, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.color || '#5eead4') });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.set(xPos + (xPos > 0 ? 0.26 : -0.26), 0, 0);
    ring.rotation.y = Math.PI / 2;
    hpGroup.add(ring);
  });

  group.add(hpGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.8;
    hpGroup.rotation.y = time * spd;
    hpGroup.position.y = Math.sin(time * 1.5 * spd) * 0.15;
  };
});

// ==========================================
// 15. chronoWatch — Luxury Chrono Turntable
// ==========================================
SceneFactory.register('chronoWatch', (group, props) => {
  const watchGroup = new THREE.Group();

  // Watch case
  const caseGeom = new THREE.CylinderGeometry(1.8, 1.8, 0.35, 48);
  const caseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#0f172a'),
    metalness: 0.95,
    roughness: 0.15
  });
  const watchCase = new THREE.Mesh(caseGeom, caseMat);
  watchCase.rotation.x = Math.PI / 2;
  watchGroup.add(watchCase);

  // Dial face
  const dialGeom = new THREE.CircleGeometry(1.5, 36);
  const dialMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#020617'),
    metalness: 0.3,
    roughness: 0.8
  });
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.position.z = 0.19;
  watchGroup.add(dial);

  // Watch hands (Hour, Minute, Second)
  const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 0.04), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  hourHand.position.set(0, 0.4, 0.22);
  const hourPivot = new THREE.Group();
  hourPivot.add(hourHand);
  watchGroup.add(hourPivot);

  const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.2, 0.04), new THREE.MeshBasicMaterial({ color: 0x94a3b8 }));
  minHand.position.set(0, 0.55, 0.23);
  const minPivot = new THREE.Group();
  minPivot.add(minHand);
  watchGroup.add(minPivot);

  const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.4, 0.04), new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#f43f5e') }));
  secHand.position.set(0, 0.6, 0.24);
  const secPivot = new THREE.Group();
  secPivot.add(secHand);
  watchGroup.add(secPivot);

  group.add(watchGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.0;
    watchGroup.rotation.y = time * 0.4 * spd;
    secPivot.rotation.z = -time * 6.0 * spd;
    minPivot.rotation.z = -time * 1.0 * spd;
    hourPivot.rotation.z = -time * 0.2 * spd;
  };
});

// ==========================================
// 16. hardwareTerminal — Cyberpunk Hardware Terminal
// ==========================================
SceneFactory.register('hardwareTerminal', (group, props) => {
  const termGroup = new THREE.Group();

  // Outer console chassis
  const chassisGeom = new THREE.BoxGeometry(3.6, 2.4, 0.6);
  const chassisMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0f172a'),
    metalness: 0.8,
    roughness: 0.3
  });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  termGroup.add(chassis);

  // Glowing holographic display
  const screenGeom = new THREE.PlaneGeometry(3.2, 2.0);
  const screenMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#22c55e'),
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.position.z = 0.32;
  termGroup.add(screen);

  // Floating status indicator LED
  const ledGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const ledMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#38bdf8') });
  const led = new THREE.Mesh(ledGeom, ledMat);
  led.position.set(1.5, 0.9, 0.33);
  termGroup.add(led);

  group.add(termGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.7;
    termGroup.rotation.y = Math.sin(time * 0.8 * spd) * 0.3;
    termGroup.rotation.x = Math.cos(time * 0.6 * spd) * 0.15;
    ledMat.color.set(Math.sin(time * 8.0 * spd) > 0 ? (props.color || '#22c55e') : '#1e293b');
  };
});

// ==========================================
// 17. scrollCameraTrack — Spline Waypoint Track
// ==========================================
SceneFactory.register('scrollCameraTrack', (group, props) => {
  const curvePoints = [
    new THREE.Vector3(-3, -1.5, -2),
    new THREE.Vector3(-1.5, 1.2, 0),
    new THREE.Vector3(0, -0.5, 1.5),
    new THREE.Vector3(1.8, 1.5, 0),
    new THREE.Vector3(3, -1.0, -1.5)
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const trackGeom = new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
  const trackMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#6366f1'),
    wireframe: true
  });
  const track = new THREE.Mesh(trackGeom, trackMat);
  group.add(track);

  // Waypoint nodes
  curvePoints.forEach((pt) => {
    const nodeGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#38bdf8') });
    const node = new THREE.Mesh(nodeGeom, nodeMat);
    node.position.copy(pt);
    group.add(node);
  });

  // Moving Camera Marker
  const camMarkerGeom = new THREE.ConeGeometry(0.2, 0.5, 16);
  const camMarkerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const camMarker = new THREE.Mesh(camMarkerGeom, camMarkerMat);
  group.add(camMarker);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.25;
    const t = (time * spd) % 1.0;
    const pt = curve.getPoint(t);
    camMarker.position.copy(pt);
    const tangent = curve.getTangent(t);
    camMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tangent);
  };
});

// ==========================================
// 18. multiplaneParallax — 4 Layer Depth Scene
// ==========================================
SceneFactory.register('multiplaneParallax', (group, props) => {
  const layers: THREE.Mesh[] = [];
  const depths = [-2.0, -0.8, 0.5, 1.6];
  const colors = [props.color || '#3b82f6', props.secondaryColor || '#8b5cf6', '#06b6d4', '#ec4899'];

  depths.forEach((z, idx) => {
    const planeGeom = new THREE.PlaneGeometry(3.6, 2.4);
    const planeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colors[idx % colors.length]),
      wireframe: true,
      transparent: true,
      opacity: 0.5 + idx * 0.12
    });
    const plane = new THREE.Mesh(planeGeom, planeMat);
    plane.position.set((idx - 1.5) * 0.4, 0, z);
    group.add(plane);
    layers.push(plane);
  });

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.8;
    layers.forEach((l, idx) => {
      const mult = (idx + 1) * 0.25;
      l.position.x = Math.sin(time * spd * mult) * 0.4;
      l.position.y = Math.cos(time * spd * mult * 0.8) * 0.3;
    });
  };
});

// ==========================================
// 19. sectionDissolve — Slicing Dissolve Mesh
// ==========================================
SceneFactory.register('sectionDissolve', (group, props) => {
  const geom1 = new THREE.IcosahedronGeometry(1.6, 1);
  const mat1 = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#f59e0b'),
    wireframe: props.wireframe ?? true,
    roughness: 0.3,
    metalness: 0.7
  });
  const mesh1 = new THREE.Mesh(geom1, mat1);
  group.add(mesh1);

  // Floating fragmented facets
  const shardCount = 16;
  const shards: THREE.Mesh[] = [];
  for (let i = 0; i < shardCount; i++) {
    const sGeom = new THREE.TetrahedronGeometry(0.35, 0);
    const sMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#ef4444') });
    const sMesh = new THREE.Mesh(sGeom, sMat);
    group.add(sMesh);
    shards.push(sMesh);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.0;
    mesh1.rotation.y = time * 0.5 * spd;
    mesh1.rotation.x = time * 0.3 * spd;

    shards.forEach((s, idx) => {
      const angle = time * spd * 1.2 + idx * ((Math.PI * 2) / shardCount);
      const rad = 2.2 + Math.sin(time * 2.0 * spd + idx) * 0.6;
      s.position.set(Math.cos(angle) * rad, Math.sin(angle * 1.5) * 1.2, Math.sin(angle) * rad);
      s.rotation.x = time * 2.0;
    });
  };
});

// ==========================================
// 20. tiltCardStack — Spatial 3D Tilt Cards
// ==========================================
SceneFactory.register('tiltCardStack', (group, props) => {
  const cardGroup = new THREE.Group();
  const cardCount = 3;
  const cards: THREE.Mesh[] = [];

  for (let i = 0; i < cardCount; i++) {
    const cGeom = new THREE.BoxGeometry(2.2, 3.0, 0.08);
    const cMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(i === 0 ? (props.color || '#3b82f6') : i === 1 ? (props.secondaryColor || '#8b5cf6') : '#1e293b'),
      metalness: 0.7,
      roughness: 0.2,
      wireframe: props.wireframe ?? false
    });
    const card = new THREE.Mesh(cGeom, cMat);
    card.position.set((i - 1) * 0.6, (1 - i) * 0.3, -i * 0.5);
    cardGroup.add(card);
    cards.push(card);
  }

  group.add(cardGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.0;
    const tiltX = Math.sin(time * spd) * 0.25;
    const tiltY = Math.cos(time * spd * 0.8) * 0.35;
    cardGroup.rotation.x = tiltX;
    cardGroup.rotation.y = tiltY;
  };
});

// ==========================================
// 21. morphingPill — Morphing Dynamic Island Nav
// ==========================================
SceneFactory.register('morphingPill', (group, props) => {
  const pillGeom = new THREE.CylinderGeometry(0.7, 0.7, 2.8, 32);
  const pillMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#0f172a'),
    roughness: 0.2,
    metalness: 0.9,
    wireframe: props.wireframe ?? false
  });
  const pill = new THREE.Mesh(pillGeom, pillMat);
  pill.rotation.z = Math.PI / 2;
  group.add(pill);

  // Border glow ring
  const ringGeom = new THREE.TorusGeometry(0.75, 0.04, 16, 48);
  const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#38bdf8') });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.y = Math.PI / 2;
  group.add(ring);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.2;
    // Morph between compact and expanded scale
    const scaleX = 1.0 + Math.sin(time * spd) * 0.35;
    pill.scale.set(1, scaleX, 1);
    group.rotation.y = Math.sin(time * 0.5 * spd) * 0.2;
  };
});

// ==========================================
// 22. magneticButtonMesh — 3D Specular Magnetic Button
// ==========================================
SceneFactory.register('magneticButtonMesh', (group, props) => {
  const btnGroup = new THREE.Group();
  const geom = new THREE.CylinderGeometry(1.5, 1.5, 0.4, 36);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#2563eb'),
    roughness: 0.15,
    metalness: 0.85
  });
  const btn = new THREE.Mesh(geom, mat);
  btn.rotation.x = Math.PI / 2;
  btnGroup.add(btn);

  // Glow halo
  const haloGeom = new THREE.TorusGeometry(1.65, 0.05, 16, 48);
  const haloMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#60a5fa') });
  const halo = new THREE.Mesh(haloGeom, haloMat);
  btnGroup.add(halo);

  group.add(btnGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.5;
    // Magnetic attraction lean
    btnGroup.rotation.x = Math.sin(time * spd) * 0.3;
    btnGroup.rotation.y = Math.cos(time * spd * 1.2) * 0.3;
    btnGroup.position.z = Math.sin(time * 2.0 * spd) * 0.15;
  };
});

// ==========================================
// 23. borderBeamRunner — Rectangular Border Light
// ==========================================
SceneFactory.register('borderBeamRunner', (group, props) => {
  // Rectangular frame
  const frameGeom = new THREE.BoxGeometry(3.6, 2.4, 0.1);
  const frameMat = new THREE.MeshBasicMaterial({
    color: 0x1e293b,
    wireframe: true
  });
  const frame = new THREE.Mesh(frameGeom, frameMat);
  group.add(frame);

  // Traveling beam tracer
  const beamGeom = new THREE.SphereGeometry(0.16, 16, 16);
  const beamMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#a855f7')
  });
  const beam = new THREE.Mesh(beamGeom, beamMat);
  group.add(beam);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 2.0;
    const perimeter = 3.6 * 2 + 2.4 * 2;
    const dist = (time * spd * 3.0) % perimeter;

    if (dist < 3.6) {
      beam.position.set(dist - 1.8, 1.2, 0.08);
    } else if (dist < 3.6 + 2.4) {
      beam.position.set(1.8, 1.2 - (dist - 3.6), 0.08);
    } else if (dist < 3.6 * 2 + 2.4) {
      beam.position.set(1.8 - (dist - (3.6 + 2.4)), -1.2, 0.08);
    } else {
      beam.position.set(-1.8, -1.2 + (dist - (3.6 * 2 + 2.4)), 0.08);
    }
    group.rotation.y = Math.sin(time * 0.5) * 0.15;
  };
});

// ==========================================
// 24. liquidChromeMesh — High-Specular Liquid Fluid
// ==========================================
SceneFactory.register('liquidChromeMesh', (group, props) => {
  const geom = new THREE.SphereGeometry(1.6, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(props.color || '#e2e8f0'),
    metalness: 0.98,
    roughness: 0.08,
    wireframe: props.wireframe ?? false
  });
  const mesh = new THREE.Mesh(geom, mat);
  group.add(mesh);

  const pos = geom.attributes.position;
  const orig = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count * 3; i++) orig[i] = (pos.array as Float32Array)[i];

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 2.0;
    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];
      const ripple = Math.sin(ox * 2.0 + time * spd) * Math.cos(oy * 2.0 + time * spd) * 0.15;
      pos.setXYZ(i, ox * (1 + ripple), oy * (1 + ripple), oz * (1 + ripple));
    }
    pos.needsUpdate = true;
    mesh.rotation.y = time * 0.2 * spd;
  };
});

// ==========================================
// 25. glassRefractionPrism — Optical Refraction Prism
// ==========================================
SceneFactory.register('glassRefractionPrism', (group, props) => {
  const geom = new THREE.CylinderGeometry(1.6, 1.6, 2.5, 3);
  const mat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(props.color || '#ffffff'),
    roughness: 0.05,
    transmission: 0.95,
    thickness: 1.5,
    ior: 1.52,
    transparent: true,
    opacity: 0.9,
    wireframe: props.wireframe ?? false
  });
  const prism = new THREE.Mesh(geom, mat);
  group.add(prism);

  // Spectral rainbow reflection rays
  for (let i = 0; i < 3; i++) {
    const rayGeom = new THREE.ConeGeometry(0.12, 3.0, 16);
    const rayMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i === 0 ? '#ef4444' : i === 1 ? '#10b981' : '#3b82f6'),
      transparent: true,
      opacity: 0.7
    });
    const ray = new THREE.Mesh(rayGeom, rayMat);
    ray.position.set(Math.cos((i * Math.PI * 2) / 3) * 1.8, 0, Math.sin((i * Math.PI * 2) / 3) * 1.8);
    ray.rotation.z = Math.PI / 2;
    group.add(ray);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.6;
    prism.rotation.y = time * spd;
    prism.rotation.x = Math.sin(time * 0.5 * spd) * 0.2;
  };
});

// ==========================================
// 26. gooeyCluster — Organic Merging Metaballs
// ==========================================
SceneFactory.register('gooeyCluster', (group, props) => {
  const ballCount = 5;
  const balls: THREE.Mesh[] = [];

  for (let i = 0; i < ballCount; i++) {
    const geom = new THREE.SphereGeometry(0.7 + (i % 2) * 0.2, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(i % 2 === 0 ? (props.color || '#8b5cf6') : (props.secondaryColor || '#ec4899')),
      roughness: 0.2,
      metalness: 0.6,
      wireframe: props.wireframe ?? false
    });
    const ball = new THREE.Mesh(geom, mat);
    group.add(ball);
    balls.push(ball);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.2;
    balls.forEach((b, idx) => {
      const angle = time * spd * (0.8 + idx * 0.2) + (idx * Math.PI * 2) / ballCount;
      const rad = 0.8 + Math.sin(time * 2.0 * spd + idx) * 0.4;
      b.position.set(Math.cos(angle) * rad, Math.sin(angle * 1.3) * 0.6, Math.sin(angle) * rad);
    });
  };
});

// ==========================================
// 27. thinkingOrb — Pulsating AI Hologram
// ==========================================
SceneFactory.register('thinkingOrb', (group, props) => {
  const orbGroup = new THREE.Group();

  // Core sphere
  const coreGeom = new THREE.SphereGeometry(0.8, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#38bdf8'),
    wireframe: true
  });
  const core = new THREE.Mesh(coreGeom, coreMat);
  orbGroup.add(core);

  // Outer wireframe energy shells
  [1.4, 2.0].forEach((r, idx) => {
    const shellGeom = new THREE.IcosahedronGeometry(r, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(idx === 0 ? (props.secondaryColor || '#818cf8') : '#c084fc'),
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const shell = new THREE.Mesh(shellGeom, shellMat);
    shell.userData = { speedMult: idx === 0 ? 1.0 : -0.7 };
    orbGroup.add(shell);
  });

  group.add(orbGroup);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.5;
    const pulse = 1.0 + Math.sin(time * 3.0 * spd) * 0.15;
    core.scale.set(pulse, pulse, pulse);
    orbGroup.rotation.y = time * 0.4 * spd;
    orbGroup.rotation.z = time * 0.3 * spd;
  };
});

// ==========================================
// 28. neuralGraph — Distributed Autonomous Signal Mesh
// ==========================================
SceneFactory.register('neuralGraph', (group, props) => {
  const agentCount = 10;
  const agentNodes: THREE.Vector3[] = [];

  for (let i = 0; i < agentCount; i++) {
    const v = new THREE.Vector3(
      Math.cos((i / agentCount) * Math.PI * 2) * 2.4,
      Math.sin((i / agentCount) * Math.PI * 2) * 2.4,
      (Math.random() - 0.5) * 1.0
    );
    agentNodes.push(v);
    const aGeom = new THREE.SphereGeometry(0.18, 16, 16);
    const aMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.color || '#10b981') });
    const aMesh = new THREE.Mesh(aGeom, aMat);
    aMesh.position.copy(v);
    group.add(aMesh);
  }

  // Interconnected link lines
  const linesGeom = new THREE.BufferGeometry();
  const linePos: number[] = [];
  for (let i = 0; i < agentCount; i++) {
    const next = (i + 1) % agentCount;
    linePos.push(agentNodes[i].x, agentNodes[i].y, agentNodes[i].z);
    linePos.push(agentNodes[next].x, agentNodes[next].y, agentNodes[next].z);
  }
  linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
  const linesMat = new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.6 });
  const links = new THREE.LineSegments(linesGeom, linesMat);
  group.add(links);

  // Traveling Signal Packets
  const packetGeom = new THREE.SphereGeometry(0.08, 16, 16);
  const packetMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#38bdf8') });
  const packet = new THREE.Mesh(packetGeom, packetMat);
  group.add(packet);

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 1.2;
    const progress = (time * spd) % agentCount;
    const curIdx = Math.floor(progress);
    const nextIdx = (curIdx + 1) % agentCount;
    const frac = progress - curIdx;

    packet.position.lerpVectors(agentNodes[curIdx], agentNodes[nextIdx], frac);
    group.rotation.z = time * 0.1 * spd;
  };
});

// ==========================================
// 29. voiceRing — FFT Circular Equalizer
// ==========================================
SceneFactory.register('voiceRing', (group, props) => {
  const barCount = 48;
  const bars: THREE.Mesh[] = [];

  for (let i = 0; i < barCount; i++) {
    const geom = new THREE.BoxGeometry(0.06, 0.8, 0.06);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(i % 2 === 0 ? (props.color || '#f43f5e') : (props.secondaryColor || '#fb923c'))
    });
    const bar = new THREE.Mesh(geom, mat);
    const angle = (i / barCount) * Math.PI * 2;
    bar.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
    bar.rotation.z = angle + Math.PI / 2;
    group.add(bar);
    bars.push(bar);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 2.5;
    bars.forEach((b, idx) => {
      const freq = Math.sin(time * spd + idx * 0.4) * 0.5 + 0.6;
      b.scale.y = freq * 1.5;
    });
  };
});

// ==========================================
// 30. telemetryGrid — Cylindrical Telemetry Matrix
// ==========================================
SceneFactory.register('telemetryGrid', (group, props) => {
  const cylGeom = new THREE.CylinderGeometry(2.2, 2.2, 3.2, 24, 8, true);
  const cylMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(props.color || '#06b6d4'),
    wireframe: true,
    transparent: true,
    opacity: 0.75
  });
  const cyl = new THREE.Mesh(cylGeom, cylMat);
  group.add(cyl);

  // Floating crosshair coordinate markers
  for (let i = 0; i < 4; i++) {
    const ringGeom = new THREE.TorusGeometry(2.25, 0.03, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(props.secondaryColor || '#67e8f9') });
    const rMesh = new THREE.Mesh(ringGeom, ringMat);
    rMesh.position.y = (i - 1.5) * 0.9;
    rMesh.rotation.x = Math.PI / 2;
    group.add(rMesh);
  }

  (group as any)._customUpdate = (time: number) => {
    const spd = (props.speed || 1.0) * 0.6;
    cyl.rotation.y = time * spd;
    cyl.position.y = Math.sin(time * 1.2 * spd) * 0.15;
  };
});
