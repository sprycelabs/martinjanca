import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>

      {/* Glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(124,58,237,0.18), transparent)', pointerEvents: 'none' }} />

      {/* Vertical grid lines */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', pointerEvents: 'none' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.03)' }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, delay: i * 0.06, ease: 'easeOut' }}
          />
        ))}
      </div>

      <motion.div variants={stagger} initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px', maxWidth: 900 }}
      >
        <motion.p variants={fadeUp} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 28 }}>
          Nová kolekce · 2026
        </motion.p>

        <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(4.5rem, 15vw, 11rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 32 }}>
          PRODUKT
        </motion.h1>

        <motion.p variants={fadeUp} style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: 440, margin: '0 auto 48px' }}>
          Výjimečný design. Precizní zpracování.<br />Zažijte produkt z každé perspektivy.
        </motion.p>

        <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#cta" style={{
            background: '#7c3aed', color: '#fff', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 100, fontSize: 14, fontWeight: 600, letterSpacing: '0.01em',
          }}>
            Prozkoumat produkt
          </a>
          <a href="#showcase" style={{
            border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 100, fontSize: 14, fontWeight: 500,
          }}>
            Více informací
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.25)' }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scrollovat</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
