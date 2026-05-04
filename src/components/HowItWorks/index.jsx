import { motion } from 'framer-motion'
import { Smartphone, Upload, Truck } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const STEPS = [
  { icon: Smartphone, num: '01', title: 'Vyber model', desc: 'Najdi svůj telefon v katalogu. Máme přes 200 modelů od Apple, Samsung, Xiaomi a dalších.' },
  { icon: Upload,     num: '02', title: 'Nahraj fotku', desc: 'Jakákoliv fotografie z galerie, cloudu nebo Instagram Stories. Hned uvidíš živý náhled krytu.' },
  { icon: Truck,      num: '03', title: 'Přijde zítra', desc: 'Objednáš do 15:00 — doručíme druhý den. Kryt, který nikdo jiný nemá.' },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function HowItWorks() {
  const isMobile = useIsMobile()

  return (
    <section id="jak-to-funguje" style={{ background: '#f5f5f7', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 72, textAlign: isMobile ? 'center' : 'left' }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16 }}>Jednoduché jako 1, 2, 3</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#0a0a0a' }}>
            Hotovo za<br />tři kroky
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 24, position: 'relative' }}
        >
          {!isMobile && (
            <div style={{ position: 'absolute', top: 44, left: '16.67%', right: '16.67%', height: 1, background: 'linear-gradient(90deg, rgba(124,58,237,0.25), rgba(79,70,229,0.25))', zIndex: 0 }} />
          )}

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div key={i} variants={card}
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: '36px', position: 'relative', zIndex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={22} color="#111" />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.2)', letterSpacing: '0.1em' }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#0a0a0a' }}>{step.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,0,0,0.5)' }}>{step.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
