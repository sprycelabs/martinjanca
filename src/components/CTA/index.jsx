import { motion } from 'framer-motion'
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react'

const BADGES = [
  { icon: Truck, label: 'Doprava zdarma' },
  { icon: RotateCcw, label: '30 dní na vrácení' },
  { icon: ShieldCheck, label: '2 roky záruka' },
]

export default function CTA() {
  return (
    <section id="cta" style={{
      background: 'linear-gradient(160deg, #0d0618 0%, #000 60%)',
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 24 }}>Připraveni?</p>

          <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Pořiďte si jej<br />ještě dnes
          </h2>

          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16 }}>
            Limitovaná dostupnost. Objednejte nyní a získejte<br />expresní dopravu zdarma.
          </p>

          <p style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: 40 }}>
            od <span style={{ color: '#a78bfa' }}>4 990 Kč</span>
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <motion.a href="#" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#7c3aed', color: '#fff', textDecoration: 'none',
                padding: '16px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700,
              }}
            >
              Koupit nyní <ArrowRight size={16} />
            </motion.a>
            <motion.a href="mailto:info@produkt.cz" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none', padding: '16px 36px', borderRadius: 100, fontSize: 15, fontWeight: 500,
              }}
            >
              Kontaktovat nás
            </motion.a>
          </div>

          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <Icon size={15} color="#a78bfa" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
