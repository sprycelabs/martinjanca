import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react'

function getTimeLeft() {
  const now = new Date()
  const cutoff = new Date()
  cutoff.setHours(15, 0, 0, 0)
  if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1)
  const diff = cutoff - now
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

function pad(n) { return String(n).padStart(2, '0') }

const BADGES = [
  { icon: Truck,       label: 'Doprava zdarma' },
  { icon: RotateCcw,   label: '30 dní na vrácení' },
  { icon: ShieldCheck, label: '24 měs. záruka' },
]

export default function CTA() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="cta" style={{ background: '#fff', padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 24 }}>Jeden kryt. Nekonečně osobní.</p>

          <h2 style={{ fontSize: 'clamp(2.4rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 20, color: '#0a0a0a' }}>
            Navrhnout si svůj<br />kryt
          </h2>

          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'rgba(0,0,0,0.48)', lineHeight: 1.7, marginBottom: 32 }}>
            Nahraj fotku, vyber povrch, objednáš do 15:00 — kryt máš zítra doma.
          </p>

          {/* Countdown */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 16, padding: '14px 24px', marginBottom: 36 }}>
            <Truck size={16} color="#0a0a0a" />
            <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>Zbývá do uzávěrky objednávek:</span>
            <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 16, fontWeight: 800, color: '#0a0a0a', letterSpacing: '0.02em' }}>
              {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
            </span>
          </div>

          <p style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: 40, color: '#0a0a0a' }}>
            od <span style={{ color: '#7c3aed' }}>349 Kč</span>
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link to="/kryt">
              <motion.span
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111', color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
              >
                Koupit kryt <ArrowRight size={16} />
              </motion.span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.65)', background: 'none', padding: '16px 36px', borderRadius: 100, fontSize: 15, cursor: 'pointer' }}
            >
              Kontaktovat nás
            </motion.button>
          </div>

          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(0,0,0,0.42)', fontSize: 13 }}>
                <Icon size={15} color="#7c3aed" />{label}
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
