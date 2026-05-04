import { motion } from 'framer-motion'
import { Star, BadgeCheck } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const REVIEWS = [
  { name: 'Lucie M.',  location: 'Praha',   initials: 'LM', surface: 'Lesklá', text: 'Objednala jsem kryt s fotkou ze svatby. Barvy jsou přesně takové jako na originálu, lesk je nádherný. Všichni se ptají kde jsem ho vzala.' },
  { name: 'Tomáš K.', location: 'Brno',    initials: 'TK', surface: 'Matná',  text: 'Doručení druhý den — nevěřil jsem, ale skutečně přišel. Matná varianta je příjemná na dotek a otisky na ní vůbec nejsou vidět.' },
  { name: 'Petra V.', location: 'Ostrava', initials: 'PV', surface: 'Lesklá', text: 'Dala jsem jako dárek kryt s fotkou pro tátu. Byl dojatý. Kvalita zpracování je výborná, kryt sedí perfektně a MagSafe funguje bez problémů.' },
  { name: 'Jan S.',   location: 'Plzeň',   initials: 'JS', surface: 'Lesklá', text: 'Třetí kryt od Shieldee a stále nejsem zklamaný. Tentokrát lesklá varianta s fotkou z hor — naprosto dokonalé. Doporučuji každému.' },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Reviews() {
  const isMobile = useIsMobile()

  return (
    <section id="recenze" style={{ background: '#fff', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 32, marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16 }}>Recenze zákazníků</p>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, color: '#0a0a0a' }}>Co říkají<br />zákazníci</h2>
            </div>

            {/* Aggregate rating box */}
            <div style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: '24px 32px', display: 'flex', gap: 32, alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, color: '#0a0a0a', marginBottom: 6 }}>4.9</p>
                <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 4 }}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.38)' }}>1 240 recenzí</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[[5, 94], [4, 4], [3, 1], [2, 0], [1, 1]].map(([stars, pct]) => (
                  <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', width: 8 }}>{stars}</span>
                    <Star size={10} fill="#f59e0b" color="#f59e0b" />
                    <div style={{ width: 80, height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', width: 28 }}>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review cards */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 20 }}
        >
          {REVIEWS.map((r, i) => (
            <motion.div key={i} variants={card} style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
                  <BadgeCheck size={13} />Ověřený nákup
                </span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(0,0,0,0.65)', flex: 1 }}>„{r.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{r.initials}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>{r.name}</p>
                    <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.38)' }}>{r.location}</p>
                  </div>
                </div>
                <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.06)', borderRadius: 100, padding: '4px 10px', color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>{r.surface}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
