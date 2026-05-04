import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Environment } from '@react-three/drei'
import { useMotionValueEvent } from 'framer-motion'
import * as THREE from 'three'

function Model({ rotateY, rotateX }) {
  const meshRef = useRef()
  const targetY = useRef(0)
  const targetX = useRef(0.12)

  useMotionValueEvent(rotateY, 'change', (v) => { targetY.current = v })
  useMotionValueEvent(rotateX, 'change', (v) => { targetX.current = v })

  useFrame((state, delta) => {
    if (!meshRef.current) return
    const speed = 1 - Math.exp(-delta * 6)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY.current, speed)
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX.current, speed)
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08
  })

  return (
    <group>
      <RoundedBox ref={meshRef} args={[1.4, 3.2, 0.38]} radius={0.1} smoothness={8}>
        {/* Replace with actual product GLB: <primitive object={gltf.scene} /> */}
        <meshPhysicalMaterial
          color="#8b5cf6"
          emissive="#2e1065"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </RoundedBox>

      {/* Edge highlight strip */}
      <RoundedBox args={[1.42, 3.22, 0.02]} radius={0.1} smoothness={8} position={[0, 0, 0.2]}>
        <meshStandardMaterial color="#c4b5fd" emissive="#7c3aed" emissiveIntensity={0.8} transparent opacity={0.15} />
      </RoundedBox>

      <pointLight position={[3, 4, 3]} color="#e9d5ff" intensity={15} distance={10} />
      <pointLight position={[-3, -2, 2]} color="#7c3aed" intensity={8} distance={8} />
      <pointLight position={[0, 0, 3]} color="#ffffff" intensity={5} distance={6} />
    </group>
  )
}

export default function ProductModel({ rotateY, rotateX }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={4} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={2} color="#a78bfa" />
      <spotLight position={[0, 6, 4]} angle={0.4} penumbra={0.5} intensity={6} color="#ffffff" />
      <Environment preset="city" />
      <Model rotateY={rotateY} rotateX={rotateX} />
    </Canvas>
  )
}
