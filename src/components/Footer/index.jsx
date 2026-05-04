import { AtSign, Globe, Mail } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const LINKS = [
  { label: 'Produkt', href: '#showcase' },
  { label: 'Povrchy', href: '#povrchy' },
  { label: 'Jak to funguje', href: '#jak-to-funguje' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  const isMobile = useIsMobile()

  return (
    <footer style={{ background: '#f5f5f7', borderTop: '1px solid rgba(0,0,0,0.07)', padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em', display: 'block', marginBottom: 12, color: '#0a0a0a' }}>Shieldee</span>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(0,0,0,0.45)' }}>Tvůj moment. Tvůj kryt. Prémiové kryty s vlastní fotografií — doručení do druhého dne.</p>
          </div>

          <div style={{ display: 'flex', gap: isMobile ? 32 : 48, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 18 }}>Navigace</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {LINKS.map(l => <a key={l.href} href={l.href} style={{ fontSize: 14, color: 'rgba(0,0,0,0.55)', textDecoration: 'none' }}>{l.label}</a>)}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.32)', marginBottom: 18 }}>Kontakt</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[{ icon: Mail, label: 'info@shieldee.cz' }, { icon: AtSign, label: '@shieldee_cz' }, { icon: Globe, label: 'shieldee.cz' }].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(0,0,0,0.55)' }}>
                    <Icon size={14} color="#0a0a0a" />{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.32)' }}>© 2026 Shieldee. Všechna práva vyhrazena.</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Podmínky', 'Soukromí', 'Cookies'].map(t => <a key={t} href="#" style={{ fontSize: 13, color: 'rgba(0,0,0,0.32)', textDecoration: 'none' }}>{t}</a>)}
          </div>
        </div>

      </div>
    </footer>
  )
}
