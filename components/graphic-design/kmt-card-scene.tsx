"use client";

import { ContactShadows, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { ExtrudeGeometry, Shape, ShapeGeometry, type Group } from "three";
import { kmtCard } from "@/lib/content/profile";

const EDGE_COLOR = "#8a0e20";
// Real KMT cards are ISO ID-1 (85.6 x 54 mm) with ~3 mm rounded corners; same ratio here.
const W = 3.2, H = 2.02, D = 0.05, R = 0.12;

function roundedRect() {
  const s = new Shape();
  const x = -W / 2, y = -H / 2;
  s.moveTo(x + R, y);
  s.lineTo(x + W - R, y);
  s.quadraticCurveTo(x + W, y, x + W, y + R);
  s.lineTo(x + W, y + H - R);
  s.quadraticCurveTo(x + W, y + H, x + W - R, y + H);
  s.lineTo(x + R, y + H);
  s.quadraticCurveTo(x, y + H, x, y + H - R);
  s.lineTo(x, y + R);
  s.quadraticCurveTo(x, y, x + R, y);
  return s;
}

/** A flat rounded face whose UVs run 0..1 across the card, so the artwork maps edge to edge. */
function face() {
  const g = new ShapeGeometry(roundedRect(), 12);
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
  uv.needsUpdate = true;
  return g;
}

function Card() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const motionState = useRef({ autoAngle: 0, flipOffset: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const [frontMap, backMap] = useTexture([kmtCard.frontTexture, kmtCard.backTexture]);
  const { edge, front, back } = useMemo(() => {
    const edge = new ExtrudeGeometry(roundedRect(), { depth: D, bevelEnabled: false, curveSegments: 12 });
    edge.translate(0, 0, -D / 2);
    return { edge, front: face(), back: face() };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!hovered) {
      motionState.current.autoAngle += delta * 0.35;
    }
    const targetY = motionState.current.autoAngle + motionState.current.flipOffset;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * Math.min(1, delta * 5);

    // Subtle parallax tilt toward the pointer position.
    const targetX = pointer.current.y * 0.35;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        pointer.current = { x: e.uv ? e.uv.x - 0.5 : 0, y: e.uv ? e.uv.y - 0.5 : 0 };
      }}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onPointerDown={(e) => {
        dragStart.current = { x: e.clientX, y: e.clientY };
      }}
      onClick={(e) => {
        const start = dragStart.current;
        const moved = start ? Math.hypot(e.clientX - start.x, e.clientY - start.y) : 0;
        // Only flip on a genuine click, not the end of a drag-to-rotate gesture.
        if (moved < 6) {
          motionState.current.flipOffset += Math.PI;
        }
      }}
    >
      <mesh geometry={edge}>
        <meshStandardMaterial color={EDGE_COLOR} roughness={0.6} />
      </mesh>
      <mesh geometry={front} position={[0, 0, D / 2 + 0.001]}>
        <meshBasicMaterial map={frontMap} toneMapped={false} />
      </mesh>
      <mesh geometry={back} position={[0, 0, -D / 2 - 0.001]} rotation={[0, Math.PI, 0]}>
        <meshBasicMaterial map={backMap} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function KmtCardScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 3, 4]} intensity={0.6} />
      <Card />
      {/* Soft shadow on the "table" under the card, so it reads as an object, not a sticker. */}
      <ContactShadows position={[0, -1.35, 0]} opacity={0.45} scale={6} blur={2.6} far={2.5} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.6}
        enableDamping
        dampingFactor={0.12}
      />
    </Canvas>
  );
}
