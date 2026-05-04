import { motion } from 'framer-motion'
import { Layers, Shield, Zap } from 'lucide-react'

const FEATURES = [
  {
    icon: Layers,
    title: 'Prémiové materiály',
    desc: 'Každá komponenta prochází přísnou selekcí. Používáme výhradně suroviny první třídy pro maximální trvanlivost a estetiku.',
  },
  {
    icon: Zap,
    title: 'Precizní zpracování',
    desc: 'Nulová tolerance pro nedokonalosti. Každý kus ručně kontrolován a finalizován zkušenými mistry svého řemesla.',
  },
  {
    icon: Shield,
    title: 'Záruka spokojenosti',
    desc: '30 dní na vrácení bez otázek. Dvouletá záruční doba. Zákaznická podpora dostupná každý den.',
  },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Features() {
  return (
    <section id="features" style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>Proč nás vybrat</p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, maxWidth: 520 }}>
            Navrženo bez<br />kompromisů
          </h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div key={i} variants={card} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, padding: '40px 36px',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, marginBottom: 28,
                  background: 'rgba(124,58,237,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color="#a78bfa" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{f.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
