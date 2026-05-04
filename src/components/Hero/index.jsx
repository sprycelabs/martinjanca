import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, Star } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
const fadeUp = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } } }

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#fff', overflow: 'hidden', paddingTop: 60, paddingBottom: 40 }}>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(124,58,237,0.06), transparent)', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: isMobile ? '48px 20px 60px' : '80px clamp(24px, 5vw, 80px)',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 40 : 60,
        alignItems: 'center',
      }}>

        <motion.div variants={stagger} initial="hidden" animate="show">

          {/* Social proof pill */}
          <motion.div variants={fadeUp} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 100, padding: '7px 14px', marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />)}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>4.9</span>
            <div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} />
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>1 240 zákazníků</span>
            {!isMobile && <><div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.12)' }} /><span style={{ fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>Výroba v ČR</span></>}
          </motion.div>

          <motion.h1 variants={fadeUp} style={{ fontSize: isMobile ? '2.6rem' : 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 20, color: '#0a0a0a' }}>
            Tvůj moment.<br />Tvůj kryt.
          </motion.h1>

          <motion.p variants={fadeUp} style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(0,0,0,0.5)', lineHeight: 1.75, maxWidth: 440, marginBottom: 32 }}>
            Nahraj svoji oblíbenou fotografii a my do 24 hodin vytvoříme kryt, který nikdo jiný nemá. Prémiová kvalita, MagSafe kompatibilní, doručení zítra.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/kryt" style={{ background: '#111', color: '#fff', textDecoration: 'none', padding: '14px 28px', borderRadius: 100, fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
              Koupit kryt
            </Link>
            <a href="#showcase" style={{ border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.65)', textDecoration: 'none', padding: '14px 28px', borderRadius: 100, fontSize: 15, display: 'inline-block' }}>
              Zjistit více
            </a>
          </motion.div>

          {/* Stats strip — 2×2 on mobile, 4×1 on desktop */}
          <motion.div variants={fadeUp} style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '16px 0' : 0,
            marginTop: 36,
            borderTop: '1px solid rgba(0,0,0,0.07)',
            paddingTop: 24,
          }}>
            {[
              ['399 Kč', 'Cena od'],
              ['24 měs.', 'Záruka'],
              ['do zítřka', 'Doručení'],
              ['200+', 'Modelů'],
            ].map(([val, label], i) => (
              <div key={label} style={{
                paddingRight: isMobile ? 0 : 20,
                paddingLeft: isMobile ? 0 : (i > 0 ? 20 : 0),
                borderRight: !isMobile && i < 3 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                borderBottom: isMobile && i < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none',
                paddingBottom: isMobile && i < 2 ? 16 : 0,
              }}>
                <p style={{ fontSize: isMobile ? 18 : 20, fontWeight: 800, lineHeight: 1, color: '#0a0a0a' }}>{val}</p>
                <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Product image + floating badges (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', order: isMobile ? -1 : 0 }}
        >
          {!isMobile && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ position: 'absolute', top: '8%', right: '2%', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', zIndex: 2 }}
              >
                <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', marginBottom: 2 }}>Doručíme</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#0a0a0a' }}>Zítra domů 🚚</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                style={{ position: 'absolute', bottom: '12%', left: '-2%', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '12px 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', zIndex: 2 }}
              >
                <div style={{ display: 'flex', gap: 3, marginBottom: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>"Naprosto dokonalé"</p>
                <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>Jan S. · Plzeň</p>
              </motion.div>
            </>
          )}

          <motion.img
            src="/kryt-final.png"
            alt="Kryt s vlastní fotkou"
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ width: '100%', maxWidth: isMobile ? 220 : 400, objectFit: 'contain', filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.12))', position: 'relative', zIndex: 1 }}
          />
        </motion.div>

      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(0,0,0,0.25)' }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scrollovat</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
