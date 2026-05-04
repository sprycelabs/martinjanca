import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Environment } from '@react-three/drei'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion'
import * as THREE from 'three'
import useIsMobile from '../../hooks/useIsMobile'
import useInView from '../../hooks/useInView'

const CHAPTERS = [
  { label: '01', title: 'Přední pohled',       desc: 'Čistá přední strana. Minimalistický tvar, žádný kompromis.' },
  { label: '02', title: 'Boční profil',         desc: 'Dokonalá tloušťka. Každý milimetr má svůj důvod.' },
  { label: '03', title: 'Zadní strana',         desc: 'Skrytá technologie. Stovky hodin vývoje v každém detailu.' },
  { label: '04', title: 'Unikátní perspektiva', desc: 'Krásný ze všech stran. Navrženo bez kompromisů.' },
]

const ROTATIONS = [
  [0,             0.1],
  [-Math.PI / 2,  0.1],
  [-Math.PI,      0.1],
  [-Math.PI * 1.5, -0.25],
]

function Product({ scrollRef, isMobile }) {
  const mesh = useRef()

  useFrame((state, delta) => {
    if (!mesh.current) return
    const i = Math.min(Math.floor(scrollRef.current * 4), 3)
    const [ty, tx] = ROTATIONS[i]
    const speed = 1 - Math.exp(-delta * 7)
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, ty, speed)
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, tx, speed)
    if (!isMobile) {
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07
    }
  })

  return (
    <RoundedBox ref={mesh} args={[1.4, 3.0, 0.36]} radius={0.1} smoothness={isMobile ? 3 : 6}>
      {isMobile ? (
        <meshStandardMaterial color="#7c3aed" emissive="#3b0764" emissiveIntensity={0.4} metalness={0.2} roughness={0.3} />
      ) : (
        <meshPhysicalMaterial color="#7c3aed" emissive="#3b0764" emissiveIntensity={0.4} metalness={0.3} roughness={0.15} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={2} />
      )}
    </RoundedBox>
  )
}

function Scene({ scrollRef, isMobile }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance', stencil: false }}
      dpr={[1, isMobile ? 1.5 : 2]}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={isMobile ? 2 : 1.5} />
      <directionalLight position={[4, 6, 5]} intensity={isMobile ? 3 : 5} />
      {!isMobile && <directionalLight position={[-4, -2, -3]} intensity={2} color="#a78bfa" />}
      {!isMobile && <pointLight position={[0, 4, 3]} intensity={8} color="#e9d5ff" distance={10} />}
      {!isMobile && <Environment preset="city" />}
      <Product scrollRef={scrollRef} isMobile={isMobile} />
    </Canvas>
  )
}

function ChapterText({ chapter, index, chapterIndex, isMobile }) {
  const opacity = useTransform(chapterIndex, (v) => {
    const dist = Math.abs(v - index)
    return dist < 0.5 ? 1 - dist * 2 : 0
  })
  return (
    <motion.div style={{
      position: 'absolute',
      ...(isMobile
        ? { bottom: 80, left: 24, right: 24, textAlign: 'center' }
        : { left: 64, top: '50%', transform: 'translateY(-50%)', maxWidth: 300 }
      ),
      pointerEvents: 'none', opacity,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: isMobile ? 'center' : 'flex-start' }}>
        <div style={{ width: 20, height: 1, background: '#a78bfa' }} />
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#a78bfa', textTransform: 'uppercase' }}>{chapter.label}</span>
      </div>
      <h2 style={{ fontSize: isMobile ? '1.6rem' : 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
        {chapter.title}
      </h2>
      <p style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{chapter.desc}</p>
    </motion.div>
  )
}

function ProgressDots({ scrollYProgress }) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 2, height: 120, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden', marginBottom: 8 }}>
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height, background: '#a78bfa', borderRadius: 1 }} />
      </div>
      {CHAPTERS.map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />)}
    </div>
  )
}

export default function Showcase() {
  const isMobile = useIsMobile()
  const containerRef = useRef()
  const scrollRef = useRef(0)
  const canvasVisible = useInView(containerRef)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => { scrollRef.current = v })
  const chapterIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])

  return (
    <div id="showcase" ref={containerRef} style={{ height: '400vh', background: '#000' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 60% 50%, rgba(109,40,217,0.18), transparent)', pointerEvents: 'none' }} />

        {canvasVisible && (
          <div style={{ position: 'absolute', inset: 0 }}>
            <Scene scrollRef={scrollRef} isMobile={isMobile} />
          </div>
        )}

        {CHAPTERS.map((ch, i) => (
          <ChapterText key={i} chapter={ch} index={i} chapterIndex={chapterIndex} isMobile={isMobile} />
        ))}
        {!isMobile && <ProgressDots scrollYProgress={scrollYProgress} />}

        <motion.p
          style={{ position: 'absolute', bottom: isMobile ? 36 : 32, left: '50%', transform: 'translateX(-50%)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none', whiteSpace: 'nowrap' }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          Pokračujte ve scrollování
        </motion.p>
      </div>
    </div>
  )
}
