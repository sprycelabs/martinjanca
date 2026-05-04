import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Martin K.',
    location: 'Praha',
    text: 'Nikdy jsem neviděl takovou kvalitu zpracování. Produkt předčil veškerá moje očekávání — od prvního dotyku jsem věděl, že jsem se správně rozhodl.',
    initials: 'MK',
  },
  {
    name: 'Lucie H.',
    location: 'Brno',
    text: 'Přemýšlela jsem dlouho, zda investovat. Dnes lituju jen jednoho — že jsem nečekala kratší dobu. Absolutně doporučuji každému, kdo hledá to nejlepší.',
    initials: 'LH',
  },
  {
    name: 'Tomáš V.',
    location: 'Ostrava',
    text: 'Materiál, zpracování, detail — vše na absolutní špičce. Produkt používám každý den a stále mě překvapuje. Skvělý zákaznický servis jako bonus.',
    initials: 'TV',
  },
]

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Reviews() {
  return (
    <section id="reviews" style={{ background: '#030308', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>Recenze zákazníků</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
              Co říkají<br />zákazníci
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginLeft: 6 }}>4.9 z 5 (218 recenzí)</span>
          </div>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}
        >
          {REVIEWS.map((r, i) => (
            <motion.div key={i} variants={card} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '36px',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.7)', flex: 1 }}>
                „{r.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
