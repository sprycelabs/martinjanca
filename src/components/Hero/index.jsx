import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#000', overflow: 'hidden', paddingTop: 60 }}>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.12), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '60px 24px' : '80px clamp(24px, 5vw, 80px)', width: '100%', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 60, alignItems: 'center' }}>

        {/* Text */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 24 }}>
            Kryt s vlastní fotkou · Shieldee
          </motion.p>

          <motion.h1 variants={fadeUp} style={{ fontSize: isMobile ? '3rem' : 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 28 }}>
            Tvůj moment.<br />Tvůj kryt.
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: 440, marginBottom: 40 }}>
            Nahraj svoji oblíbenou fotografii a my do 24 hodin vytvoříme kryt, který nikdo jiný nemá. Prémiová kvalita, MagSafe kompatibilní, doručení zítra.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#cta" style={{ background: '#7c3aed', color: '#fff', textDecoration: 'none', padding: '15px 32px', borderRadius: 100, fontSize: 15, fontWeight: 700 }}>
              Navrhnout kryt
            </a>
            <a href="#showcase" style={{ border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '15px 32px', borderRadius: 100, fontSize: 15 }}>
              Zjistit více
            </a>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {[['399 Kč', 'od'], ['24 mes.', 'záruka'], ['do zítřka', 'doručení']].map(([val, label]) => (
              <div key={label}>
                <p style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{val}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <motion.img
            src="/kryt-final.png"
            alt="Kryt s vlastní fotkou"
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ width: '100%', maxWidth: isMobile ? 280 : 420, objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(124,58,237,0.3))' }}
          />
        </motion.div>

      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.25)' }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scrollovat</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
