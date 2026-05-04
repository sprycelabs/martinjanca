import { motion } from 'framer-motion'
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react'

const BADGES = [
  { icon: Truck, label: 'Doručení zítra' },
  { icon: RotateCcw, label: '30 dní na vrácení' },
  { icon: ShieldCheck, label: '24 měs. záruka' },
]

export default function CTA() {
  return (
    <section id="cta" style={{ background: 'linear-gradient(160deg, #0d0618 0%, #000 60%)', padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 24 }}>Jeden kryt. Nekonečně osobní.</p>

          <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 20 }}>
            Navrhnout si svůj<br />kryt
          </h2>

          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 16 }}>
            Nahraj fotku, vyber povrch, objednáš do 15:00 — kryt máš zítra doma.
          </p>

          <p style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 40 }}>
            od <span style={{ color: '#a78bfa' }}>349 Kč</span>
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <motion.a href="https://www.shieldee.cz" target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#7c3aed', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700 }}
            >
              Navrhnout kryt <ArrowRight size={16} />
            </motion.a>
            <motion.a href="mailto:info@shieldee.cz"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '16px 36px', borderRadius: 100, fontSize: 15 }}
            >
              Kontaktovat nás
            </motion.a>
          </div>

          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
                <Icon size={15} color="#a78bfa" />{label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
