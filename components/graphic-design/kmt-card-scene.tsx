"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { kmtCard } from "@/lib/content/profile";

const EDGE_COLOR = "#8a0e20";

function Card() {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });
  const motionState = useRef({ autoAngle: 0, flipOffset: 0 });
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const [frontMap, backMap] = useTexture([kmtCard.frontTexture, kmtCard.backTexture]);

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
      <mesh ref={meshRef}>
        <boxGeometry args={[3.2, 2.02, 0.06]} />
        <meshStandardMaterial attach="material-0" color={EDGE_COLOR} roughness={0.6} />
        <meshStandardMaterial attach="material-1" color={EDGE_COLOR} roughness={0.6} />
        <meshStandardMaterial attach="material-2" color={EDGE_COLOR} roughness={0.6} />
        <meshStandardMaterial attach="material-3" color={EDGE_COLOR} roughness={0.6} />
        <meshBasicMaterial attach="material-4" map={frontMap} toneMapped={false} />
        <meshBasicMaterial attach="material-5" map={backMap} toneMapped={false} />
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
