import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const CHAPTERS = [
  {
    range: [0, 0.33],
    label: '01',
    title: 'Tvoje fotka,\ntvůj příběh',
    desc: 'Vyber jakoukoliv fotografii — rodinný moment, krajinu nebo oblíbené místo. Vidíš výsledek v reálném čase ještě před objednáním.',
  },
  {
    range: [0.33, 0.66],
    label: '02',
    title: 'Prémiová\nochrana',
    desc: 'Dvojvrstvá konstrukce z odolného polykarbonátu. Zvýšené hrany chrání displej i fotoaparát při pádu na každý povrch.',
  },
  {
    range: [0.66, 1],
    label: '03',
    title: 'MagSafe\nkompatibilní',
    desc: 'Plná kompatibilita s ekosystémem MagSafe. Bezdrátové nabíjení, magnetické příslušenství — vše funguje bez sundávání krytu.',
  },
]

function chapterOpacity(progress, chapter) {
  const [start, end] = chapter.range
  const pad = 0.06
  if (progress < start - pad || progress > end + pad) return 0
  if (progress < start) return (progress - (start - pad)) / pad
  if (progress > end) return 1 - (progress - end) / pad
  return 1
}

export default function VideoShowcase() {
  const isMobile = useIsMobile()
  const containerRef = useRef()
  const videoRef = useRef()
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const target = progress * video.duration
    if (Math.abs(video.currentTime - target) > 0.033) {
      video.currentTime = target
    }
  })

  return (
    <div id="showcase" ref={containerRef} style={{ height: '300vh', background: '#1B1D1F' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(109,40,217,0.1), transparent)', pointerEvents: 'none' }} />
        {!isMobile && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to bottom, #fff, transparent)', pointerEvents: 'none', zIndex: 2 }} />}

        {/* Video */}
        <video
          ref={videoRef}
          src="/kryt-animace.mp4"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            width: isMobile ? '100%' : '70%',
            height: isMobile ? '75%' : '85%',
            objectFit: 'contain',
            left: isMobile ? 0 : '50%',
            top: isMobile ? '50%' : '50%',
            transform: isMobile ? 'translateY(-55%)' : 'translate(-50%, -50%)',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Loading spinner */}
        {!videoReady && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: 60, height: 60, borderRadius: '50%', border: '2px solid rgba(167,139,250,0.4)', borderTopColor: '#a78bfa' }}
            />
          </div>
        )}

        {/* Chapter texts */}
        {CHAPTERS.map((ch, i) => (
          <ChapterText key={i} chapter={ch} scrollYProgress={scrollYProgress} isMobile={isMobile} />
        ))}

        {/* Scroll progress bar */}
        {!isMobile && <ProgressBar scrollYProgress={scrollYProgress} />}

        {/* Scroll hint */}
        <motion.p
          style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', pointerEvents: 'none' }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          Pokračujte ve scrollování
        </motion.p>
      </div>
    </div>
  )
}

function ChapterText({ chapter, scrollYProgress, isMobile }) {
  const opacity = useTransform(scrollYProgress, (v) => chapterOpacity(v, chapter))
  const y = useTransform(scrollYProgress, (v) => {
    const mid = (chapter.range[0] + chapter.range[1]) / 2
    return (v - mid) * -60
  })

  return (
    <motion.div style={{
      position: 'absolute',
      ...(isMobile
        ? { bottom: 20, left: 20, right: 20, textAlign: 'center' }
        : { left: 'clamp(40px, 5vw, 80px)', top: '50%', transform: 'translateY(-50%)', maxWidth: 320 }
      ),
      pointerEvents: 'none', opacity, y: isMobile ? 0 : y,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, justifyContent: isMobile ? 'center' : 'flex-start' }}>
        <div style={{ width: 20, height: 1, background: '#a78bfa' }} />
        <span style={{ fontSize: 11, letterSpacing: '0.22em', color: '#a78bfa', textTransform: 'uppercase' }}>{chapter.label}</span>
      </div>
      <h2 style={{ fontSize: isMobile ? '1.4rem' : 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: isMobile ? 8 : 16, whiteSpace: 'pre-line', color: '#fff' }}>
        {chapter.title}
      </h2>
      {!isMobile && (
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.52)' }}>
          {chapter.desc}
        </p>
      )}
    </motion.div>
  )
}

function ProgressBar({ scrollYProgress }) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: 2, height: 100, background: 'rgba(255,255,255,0.1)', borderRadius: 1, overflow: 'hidden', marginBottom: 8 }}>
        <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height, background: '#a78bfa', borderRadius: 1 }} />
      </div>
      {CHAPTERS.map((_, i) => <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />)}
    </div>
  )
}
