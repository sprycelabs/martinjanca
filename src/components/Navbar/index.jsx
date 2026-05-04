import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const links = [
  { label: 'Produkt', href: '#showcase' },
  { label: 'Povrchy', href: '#povrchy' },
  { label: 'Jak to funguje', href: '#jak-to-funguje' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ light = false }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  const darkBg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.92)'])
  const lightBg = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.96)'])

  const bg = light ? lightBg : darkBg
  const textColor = light ? '#0a0a0a' : '#fff'
  const mutedTextColor = light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.65)'
  const borderColor = light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'
  const ctaStyle = light
    ? { background: '#111', color: '#fff', textDecoration: 'none', padding: '9px 22px', borderRadius: 100, fontSize: 13, fontWeight: 600 }
    : { background: '#7c3aed', color: '#fff', textDecoration: 'none', padding: '9px 22px', borderRadius: 100, fontSize: 13, fontWeight: 600 }

  return (
    <>
      <motion.nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${isMobile ? '20px' : 'clamp(20px, 5vw, 60px)'}`,
        height: 60,
        background: bg, backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${borderColor}`,
      }}>
        <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em', color: textColor }}>Shieldee</span>

        {isMobile ? (
          <button onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, display: 'flex' }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {links.map(l => <a key={l.href} href={l.href} style={{ fontSize: 14, color: mutedTextColor, textDecoration: 'none' }}>{l.label}</a>)}
            <a href="#cta" style={ctaStyle}>Koupit kryt</a>
          </div>
        )}
      </motion.nav>

      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99,
              background: light ? 'rgba(255,255,255,0.98)' : 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: `1px solid ${borderColor}`,
              padding: '24px 24px 32px', display: 'flex', flexDirection: 'column',
            }}
          >
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: 20, fontWeight: 600, color: textColor, textDecoration: 'none', padding: '16px 0', borderBottom: `1px solid ${borderColor}` }}>
                {l.label}
              </a>
            ))}
            <a href="#cta" onClick={() => setOpen(false)} style={{ ...ctaStyle, marginTop: 24, textAlign: 'center', padding: '14px 24px', fontSize: 15 }}>
              Koupit kryt
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
