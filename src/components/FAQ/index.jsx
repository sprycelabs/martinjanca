import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const ITEMS = [
  { q: 'Jaké fotografie mohu použít?', a: 'Jakoukoliv fotografii ve vysokém rozlišení — z telefonu, fotoaparátu nebo cloudu. Doporučujeme minimální rozlišení 1000×1000 px. Podporujeme JPG, PNG i HEIC formáty.' },
  { q: 'Jak dlouho trvá výroba a doručení?', a: 'Objednáš do 15:00 = doručení druhý pracovní den. Výroba probíhá ve vlastní tiskárně v ČR, takže nepotřebujeme čekat na zásilky ze zahraničí.' },
  { q: 'Jaký je rozdíl mezi lesklou a matnou verzí?', a: 'Lesklá varianta má zrcadlový povrch — barvy jsou živé a sytější, ideální pro portréty a barevné fotografie. Matná varianta má hebký sametový povrch, nezanechává otisky prstů a má elegantnější, diskrétnější vzhled.' },
  { q: 'Funguje kryt s MagSafe?', a: 'Ano, všechny kryty jsou plně kompatibilní s MagSafe. Magnetické pole ani bezdrátové nabíjení není tiskem nijak ovlivněno. Podporujeme modely s i bez MagSafe magnetu.' },
  { q: 'Co když nejsem spokojený?', a: '30 dní na vrácení bez otázek. Pokud kryt nesedí nebo nejste spokojeni s kvalitou tisku, vyřešíme to — výměna nebo vrácení peněz, vždy zdarma.' },
  { q: 'Pro jaké telefony kryty vyrábíte?', a: 'Máme přes 200 modelů — Apple iPhone (všechny generace), Samsung Galaxy, Xiaomi, Huawei, Google Pixel a další. Kompletní katalog najdete v designéru.' },
]

function Item({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#0a0a0a', textAlign: 'left', gap: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>{item.q}</span>
        <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: isOpen ? '#111' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
          {isOpen ? <Minus size={14} color="#fff" /> : <Plus size={14} color="#0a0a0a" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(0,0,0,0.55)', paddingBottom: 22 }}>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ background: '#f5f5f7', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 48 : 'clamp(40px, 8vw, 120px)', alignItems: 'start' }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={isMobile ? {} : { position: 'sticky', top: 100 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 16 }}>Časté dotazy</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: '#0a0a0a' }}>Máte<br />otázky?</h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(0,0,0,0.48)', marginBottom: 32 }}>Pokud tu odpověď nenajdete, napište nám — obvykle odpovídáme do hodiny.</p>
          <a href="#" style={{ display: 'inline-block', border: '1px solid rgba(0,0,0,0.15)', color: 'rgba(0,0,0,0.65)', textDecoration: 'none', padding: '12px 24px', borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
            Napsat nám
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          {ITEMS.map((item, i) => <Item key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />)}
        </motion.div>

      </div>
    </section>
  )
}
