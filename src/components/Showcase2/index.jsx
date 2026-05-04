import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Environment } from '@react-three/drei'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'framer-motion'
import * as THREE from 'three'
import useIsMobile from '../../hooks/useIsMobile'
import useInView from '../../hooks/useInView'

const CHAPTERS = [
  { label: '01', title: 'Výkon',     desc: 'Výkonný základ skrytý uvnitř. Technologie příští generace v elegantním těle.' },
  { label: '02', title: 'Životnost', desc: 'Navrženo pro roky bezproblémového používání. Materiály, které odolají času.' },
  { label: '03', title: 'Styl',      desc: 'Elegantní ve všech situacích. Design, který nikdy nevyjde z módy.' },
  { label: '04', title: 'Detail',    desc: 'Každý milimetr promyšlen do posledního bodu. Nic ponecháno náhodě.' },
]

const ROTATIONS = [
  [0.3,            0],
  [-Math.PI / 3,   0.3],
  [-Math.PI,      -0.15],
  [-Math.PI * 1.6, 0.2],
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
      mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.07
    }
  })

  return (
    <RoundedBox ref={mesh} args={[2.4, 1.2, 0.28]} radius={0.08} smoothness={isMobile ? 3 : 6}>
      {isMobile ? (
        <meshStandardMaterial color="#4f46e5" emissive="#1e1b4b" emissiveIntensity={0.5} metalness={0.2} roughness={0.3} />
      ) : (
        <meshPhysicalMaterial color="#4f46e5" emissive="#1e1b4b" emissiveIntensity={0.5} metalness={0.35} roughness={0.12} clearcoat={1} clearcoatRoughness={0.04} envMapIntensity={2} />
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
      {!isMobile && <directionalLight position={[-4, -2, -3]} intensity={2} color="#818cf8" />}
      {!isMobile && <pointLight position={[0, 4, 3]} intensity={8} color="#c7d2fe" distance={10} />}
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
        : { right: 64, top: '50%', transform: 'translateY(-50%)', maxWidth: 300, textAlign: 'right' }
      ),
      pointerEvents: 'none', opacity,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, justifyContent: isMobile ? 'center' : 'flex-end' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.2em', color: '#818cf8', textTransform: 'uppercase' }}>{chapter.label}</span>
        <div style={{ width: 20, height: 1, background: '#818cf8' }} />
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
    <div style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 2, height: 120, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden', marginBottom: 8 }}>
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height, background: '#818cf8', borderRadius: 1 }} />
      </div>
      {CHAPTERS.map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />)}
    </div>
  )
}

export default function Showcase2() {
  const isMobile = useIsMobile()
  const containerRef = useRef()
  const scrollRef = useRef(0)
  const canvasVisible = useInView(containerRef)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => { scrollRef.current = v })
  const chapterIndex = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3])

  return (
    <div id="showcase2" ref={containerRef} style={{ height: '400vh', background: '#030308' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 40% 50%, rgba(79,70,229,0.15), transparent)', pointerEvents: 'none' }} />

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
