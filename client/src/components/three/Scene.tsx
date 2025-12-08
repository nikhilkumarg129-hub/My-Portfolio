import { useRef, useMemo, useState, useEffect, Component, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL not supported in this environment:", error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

function FallbackBackground({ isHero = false }: { isHero?: boolean }) {
  return (
    <div 
      className={`${isHero ? "absolute inset-0 -z-10" : "fixed inset-0 -z-20 opacity-40"}`}
      style={{
        background: isHero 
          ? "radial-gradient(ellipse at center, rgba(255,0,255,0.15) 0%, rgba(0,0,0,0.95) 70%)"
          : "radial-gradient(ellipse at center, rgba(0,255,255,0.1) 0%, transparent 70%)",
      }}
    >
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            backgroundColor: ["#FF00FF", "#00FFFF", "#39FF14"][i % 3],
            boxShadow: `0 0 ${10 + Math.random() * 10}px ${["#FF00FF", "#00FFFF", "#39FF14"][i % 3]}`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#FF00FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

function Particles({ count = 500 }) {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorOptions = [
      [1, 0, 1],
      [0.22, 1, 0.08],
      [0, 1, 1],
    ];
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }
    return colors;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particleColors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingGeometries() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-4, 2, -3]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#00FFFF" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[4, -2, -4]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#39FF14" wireframe />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[3, 3, -5]}>
          <tetrahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#FF00FF" wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-3, -3, -4]}>
          <torusGeometry args={[0.4, 0.15, 16, 32]} />
          <meshStandardMaterial color="#FF00FF" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function ThreeCanvas({ isHero = false }: { isHero?: boolean }) {
  return (
    <Canvas
      camera={{ position: isHero ? [0, 0, 6] : [0, 0, 10], fov: isHero ? 75 : 60 }}
      dpr={isHero ? [1, 2] : [1, 1.5]}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={isHero ? 0.5 : 0.3} />
      <pointLight position={[10, 10, 10]} intensity={isHero ? 1 : 0.5} color="#FF00FF" />
      {isHero && <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFFF" />}
      {isHero && <AnimatedSphere />}
      <Particles count={isHero ? 300 : 200} />
      <FloatingGeometries />
    </Canvas>
  );
}

export function HeroScene() {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  if (!webGLSupported) {
    return <FallbackBackground isHero />;
  }

  return (
    <div className="absolute inset-0 -z-10">
      <WebGLErrorBoundary fallback={<FallbackBackground isHero />}>
        <ThreeCanvas isHero />
      </WebGLErrorBoundary>
    </div>
  );
}

export function BackgroundScene() {
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  if (!webGLSupported) {
    return <FallbackBackground />;
  }

  return (
    <div className="fixed inset-0 -z-20 opacity-40">
      <WebGLErrorBoundary fallback={<FallbackBackground />}>
        <ThreeCanvas />
      </WebGLErrorBoundary>
    </div>
  );
}
