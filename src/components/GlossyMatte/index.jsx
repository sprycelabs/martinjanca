import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import useIsMobile from '../../hooks/useIsMobile'

const VARIANTS = [
  {
    img: '/kryt-lesky.png',
    label: 'Lesklá',
    tag: 'Glossy',
    price: '399 Kč',
    title: 'Živé barvy, zrcadlový lesk',
    desc: 'Barvy tvé fotografie vybuchnou do plné síly. Povrch odráží světlo jako zrcadlo — fotografie vypadají živě a plasticky.',
    perks: ['Maximální sytost barev', 'Zrcadlový efekt', 'Ideální pro portréty'],
    accent: '#7c3aed',
  },
  {
    img: '/kryt-matny.png',
    label: 'Matná',
    tag: 'Matte',
    price: '349 Kč',
    title: 'Hebký dotek, nulové otisky',
    desc: 'Jemný sametový povrch, který nikdy nenechá otisky prstů. Sofistikovaný vzhled a příjemný úchop v ruce po celý den.',
    perks: ['Anti-otiskový povrch', 'Hebký dotek', 'Elegantní a diskrétní'],
    accent: '#4f46e5',
  },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function GlossyMatte() {
  const isMobile = useIsMobile()

  return (
    <section id="povrchy" style={{ background: '#fff', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 72, textAlign: isMobile ? 'center' : 'left' }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16 }}>Povrchová úprava</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#0a0a0a' }}>
            Dvě povrchy.<br />Jeden design.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.45)', maxWidth: 480, margin: isMobile ? '0 auto' : 0 }}>
            Stejná tvoje fotka, dvě různé nálady. Vyber povrch, který sedí tvému stylu.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}
        >
          {VARIANTS.map((v) => (
            <motion.div key={v.label} variants={card}
              style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 24, overflow: 'hidden' }}
            >
              {/* Image */}
              <div style={{ background: '#efefef', padding: '48px 40px 32px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 80%, ${v.accent}12, transparent)`, pointerEvents: 'none' }} />
                <img src={v.img} alt={`Kryt ${v.label}`}
                  style={{ width: '100%', maxWidth: 220, objectFit: 'contain', filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.12))`, position: 'relative' }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: '32px 36px 36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>{v.tag}</span>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginTop: 4, color: '#0a0a0a' }}>{v.label}</h3>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a' }}>{v.price}</span>
                </div>

                <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#0a0a0a' }}>{v.title}</h4>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(0,0,0,0.5)', marginBottom: 24 }}>{v.desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {v.perks.map(p => (
                    <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(0,0,0,0.6)' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#111', flexShrink: 0 }} />
                      {p}
                    </div>
                  ))}
                </div>

                <Link to="/kryt" style={{ display: 'block', marginTop: 28, textAlign: 'center', background: '#111', color: '#fff', textDecoration: 'none', padding: '13px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600 }}>
                  Vybrat {v.label.toLowerCase()}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
