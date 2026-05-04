import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useIsMobile from '../../hooks/useIsMobile'

const SLIDES = [
  {
    img: '/kryt-final.png',
    label: '01',
    tag: 'Vlastní design',
    title: 'Tvoje fotka.\nTvůj příběh.',
    desc: 'Nahraj jakoukoliv fotografii — rodinný moment, krajinu nebo oblíbené místo. Výsledek vidíš v náhledu ještě před objednáním.',
    bg: '#0a0a0a',
    accent: '#a78bfa',
    imgStyle: { objectFit: 'contain', filter: 'drop-shadow(0 60px 100px rgba(124,58,237,0.4))' },
  },
  {
    img: '/kryt-lesky.png',
    label: '02',
    tag: 'Povrch Glossy',
    title: 'Živé barvy.\nZrcadlový lesk.',
    desc: 'Lesklý UV lak s hloubkovým efektem. Barvy jsou sytější než na originálu — fotografie doslova září.',
    bg: '#0d0718',
    accent: '#c4b5fd',
    imgStyle: { objectFit: 'contain', filter: 'drop-shadow(0 60px 100px rgba(167,139,250,0.35))' },
  },
  {
    img: '/kryt-matny.png',
    label: '03',
    tag: 'Povrch Matte',
    title: 'Hebký dotek.\nNulové otisky.',
    desc: 'Sametový matný povrch, který nikdy nezanechá otisky. Sofistikovaný vzhled a příjemný úchop celý den.',
    bg: '#060612',
    accent: '#818cf8',
    imgStyle: { objectFit: 'contain', filter: 'drop-shadow(0 60px 100px rgba(79,70,229,0.35))' },
  },
  {
    img: '/kryt-rozlozeny.jpg',
    label: '04',
    tag: 'Konstrukce',
    title: 'Prémiová\nochrana.',
    desc: 'Dvouvrstvá PC + TPU konstrukce absorbuje nárazy při pádu. Zvýšené hrany kolem displeje i fotoaparátu — plná ochrana.',
    bg: '#080810',
    accent: '#a78bfa',
    imgStyle: { objectFit: 'cover', filter: 'none', borderRadius: 0 },
  },
]

const TOTAL = SLIDES.length

export default function ParallaxShowcase() {
  const isMobile = useIsMobile()
  const containerRef = useRef()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div id="showcase" ref={containerRef} style={{ height: `${TOTAL * 100}vh`, position: 'relative' }}>
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {SLIDES.map((slide, i) => (
          <Slide key={i} slide={slide} index={i} total={TOTAL} scrollYProgress={scrollYProgress} isMobile={isMobile} />
        ))}
        <ScrollHint scrollYProgress={scrollYProgress} />
        <SlideCounter scrollYProgress={scrollYProgress} total={TOTAL} />
      </div>
    </div>
  )
}

function Slide({ slide, index, total, scrollYProgress, isMobile }) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2

  // Opacity: fade in/out per slide
  const opacity = useTransform(scrollYProgress, [
    Math.max(0, start - 0.04),
    start + 0.06,
    end - 0.06,
    Math.min(1, end + 0.04),
  ], [0, 1, 1, 0])

  // Image parallax: floats up slightly as you scroll through
  const imgY = useTransform(scrollYProgress, [start, end], ['4%', '-4%'])

  // Text slides in from bottom on entry, out on exit
  const textY = useTransform(scrollYProgress, [
    Math.max(0, start - 0.04),
    start + 0.08,
    end - 0.06,
    Math.min(1, end + 0.04),
  ], ['40px', '0px', '0px', '-40px'])

  const isLast = index === total - 1
  const imgIsPhoto = slide.imgStyle.objectFit === 'cover'

  return (
    <motion.div style={{
      position: 'absolute', inset: 0,
      background: slide.bg,
      opacity,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 70% 70% at 65% 50%, ${slide.accent}18, transparent)`, pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 1200, width: '100%',
        padding: isMobile ? '0 24px' : '0 clamp(24px, 5vw, 80px)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 32 : 80,
        alignItems: 'center',
        position: 'relative',
      }}>

        {/* Text */}
        <motion.div style={{ y: textY }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: slide.accent }} />
            <span style={{ fontSize: 11, letterSpacing: '0.22em', color: slide.accent, textTransform: 'uppercase', fontWeight: 600 }}>{slide.tag}</span>
          </div>

          <h2 style={{
            fontSize: isMobile ? '2rem' : 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 20,
            color: '#fff',
            whiteSpace: 'pre-line',
          }}>
            {slide.title}
          </h2>

          <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 380 }}>
            {slide.desc}
          </p>

          {/* Slide number */}
          <p style={{ marginTop: 40, fontSize: 11, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', fontWeight: 600 }}>
            {slide.label} / 0{total}
          </p>
        </motion.div>

        {/* Image */}
        <motion.div style={{
          y: isMobile ? 0 : imgY,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          order: isMobile ? -1 : 0,
        }}>
          {imgIsPhoto ? (
            <div style={{ width: '100%', maxWidth: isMobile ? '100%' : 520, aspectRatio: '4/3', borderRadius: 20, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
              <img src={slide.img} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <img
              src={slide.img}
              alt={slide.title}
              style={{
                width: '100%',
                maxWidth: isMobile ? 220 : 380,
                aspectRatio: '1',
                ...slide.imgStyle,
              }}
            />
          )}
        </motion.div>

      </div>
    </motion.div>
  )
}

function ScrollHint({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  return (
    <motion.p style={{
      position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', pointerEvents: 'none',
      opacity,
    }}>
      Pokračujte ve scrollování
    </motion.p>
  )
}

function SlideCounter({ scrollYProgress, total }) {
  return (
    <div style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {Array.from({ length: total }).map((_, i) => {
        const start = i / total
        const end = (i + 1) / total
        return <Dot key={i} scrollYProgress={scrollYProgress} start={start} end={end} />
      })}
    </div>
  )
}

function Dot({ scrollYProgress, start, end }) {
  const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [1, 1.6, 1])
  const opacity = useTransform(scrollYProgress, [
    Math.max(0, start - 0.05), start + 0.05,
    end - 0.05, Math.min(1, end + 0.05),
  ], [0.25, 1, 1, 0.25])

  return (
    <motion.div style={{
      width: 5, height: 5, borderRadius: '50%',
      background: '#fff',
      scale, opacity,
    }} />
  )
}
