import { motion } from 'framer-motion'
import { Zap, ShieldCheck, MapPin, Truck, RotateCcw, Award, Check, X } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const FEATURES = [
  { icon: Zap,         title: 'UV tisk 1440 dpi',   desc: 'Barvy ostré jako originál. Odolné vůči poškrábání a vyblednutí po celou dobu životnosti.' },
  { icon: ShieldCheck, title: 'Plný MagSafe',        desc: 'Bezdrátové nabíjení i magnetické příslušenství fungují bez kompromisů — kryt nemusíš sundávat.' },
  { icon: MapPin,      title: 'Výroba v ČR',         desc: 'Vlastní tiskárna v Česku. Žádné týdny čekání ze zahraničí — objednáš dnes, máš zítra.' },
  { icon: Truck,       title: 'Doručení do 24 h',    desc: 'Objednáš do 15:00 = doručení druhý den přes PPL nebo Zásilkovnu. Doprava zdarma.' },
  { icon: Award,       title: 'Anti-žloutnutí',      desc: 'Speciální UV lak chrání materiál před zežloutnutím. Kryt bude vypadat čistě i po měsících.' },
  { icon: RotateCcw,   title: '30 dní na vrácení',  desc: 'Nejste spokojeni? Vrátíte bez otázek a bez poplatků. Výměna nebo plná refundace zdarma.' },
]

const COMPARE = [
  'Vlastní fotografie na krytu',
  'UV tisk bez vyblednutí',
  'Plný MagSafe',
  'Výroba v ČR',
  'Doručení do 24 hodin',
  'Záruka 24 měsíců',
  '30 dní na vrácení',
]

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Features() {
  const isMobile = useIsMobile()

  return (
    <section id="vyhody" style={{ background: '#f5f5f7', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 72, textAlign: isMobile ? 'center' : 'left' }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16 }}>Proč Shieldee</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#0a0a0a', marginBottom: 16 }}>
            Více než jen kryt.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(0,0,0,0.45)', maxWidth: 500, margin: isMobile ? '0 auto' : 0, lineHeight: 1.7 }}>
            Generické kryty z e-shopů jsou všude. Shieldee je jediný kryt, který je opravdu tvůj.
          </p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 20, marginBottom: isMobile ? 48 : 80 }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} variants={card}
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: isMobile ? '20px 16px' : '28px 28px 32px' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={18} color="#111" />
                </div>
                <h3 style={{ fontSize: isMobile ? 13 : 16, fontWeight: 700, color: '#0a0a0a', marginBottom: isMobile ? 6 : 10 }}>{f.title}</h3>
                {!isMobile && <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(0,0,0,0.5)' }}>{f.desc}</p>}
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 24, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: 480 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px', background: '#0a0a0a', padding: '16px 20px' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>Funkce</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, textAlign: 'center' }}>Klasický kryt</span>
                  <span style={{ fontSize: 12, color: '#fff', fontWeight: 700, textAlign: 'center' }}>Shieldee</span>
                </div>

                {COMPARE.map((item, i) => (
                  <div key={item} style={{
                    display: 'grid', gridTemplateColumns: '1fr 120px 120px',
                    padding: '14px 20px',
                    borderBottom: i < COMPARE.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                    background: i % 2 === 0 ? '#fff' : '#fafafa',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 13, color: '#0a0a0a', fontWeight: 500 }}>{item}</span>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} color="rgba(0,0,0,0.3)" />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#fff" />
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
