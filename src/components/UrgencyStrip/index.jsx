import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Truck, ArrowRight } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

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

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function UrgencyStrip() {
  const isMobile = useIsMobile()
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: '#0a0a0a', padding: isMobile ? '28px 20px' : '40px clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? 20 : 24 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Truck size={18} color="#fff" />
          </div>
          <div>
            <p style={{ fontSize: isMobile ? 15 : 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>
              Objednáš dnes → kryt máš zítra doma
            </p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
              Doprava po celé ČR zdarma · PPL nebo Zásilkovna
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: isMobile ? '100%' : 'auto' }}>
          {/* Countdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flex: isMobile ? 1 : 'none' }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', marginRight: 6, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>Zbývá</p>
            {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '5px 8px', fontSize: 16, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', minWidth: 36, textAlign: 'center' }}>
                  {val}
                </span>
                {i < 2 && <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 700 }}>:</span>}
              </span>
            ))}
          </div>

          <Link to="/kryt" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0a0a0a', textDecoration: 'none', padding: '13px 20px', borderRadius: 100, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0 }}>
            Koupit <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}
