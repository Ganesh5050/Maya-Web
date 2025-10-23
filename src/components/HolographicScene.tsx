import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

const HolographicObject = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  // Create holographic material
  const hologramMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x45d5ff) },
        color2: { value: new THREE.Color(0xffd700) },
        color3: { value: new THREE.Color(0xff45d5) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
          
          vec3 color = mix(color1, color2, sin(time + vPosition.y * 2.0) * 0.5 + 0.5);
          color = mix(color, color3, cos(time * 0.7 + vPosition.x * 3.0) * 0.5 + 0.5);
          
          float alpha = (1.0 - abs(fresnel)) * 0.8;
          alpha += sin(time * 2.0 + vUv.y * 10.0) * 0.1;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      hologramMaterial.uniforms.time.value = clock.getElapsedTime();
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main geometric structure */}
        <mesh ref={meshRef} material={hologramMaterial} position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
        </mesh>
        
        {/* Surrounding elements */}
        <mesh material={hologramMaterial} position={[3, 1, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
        </mesh>
        
        <mesh material={hologramMaterial} position={[-2, -1, 1]} rotation={[0.5, 0, 0.3]}>
          <torusGeometry args={[0.8, 0.3, 8, 16]} />
        </mesh>
        
        <mesh material={hologramMaterial} position={[1, -2, -1]} rotation={[0.3, 0.5, 0]}>
          <octahedronGeometry args={[0.8]} />
        </mesh>
        
        {/* Wireframe overlay */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.1, 2.1, 2.1]} />
          <meshBasicMaterial wireframe color="#ffd700" opacity={0.3} transparent />
        </mesh>
      </Float>
    </group>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const { positions, colors } = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = new THREE.Color().setHSL(
        Math.random() * 0.1 + 0.1, // Hue: blue to cyan
        1,
        0.5 + Math.random() * 0.5
      );
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
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
};

const HolographicScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#45d5ff" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#ffd700" />
        
        <HolographicObject />
        <ParticleField />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default HolographicScene;