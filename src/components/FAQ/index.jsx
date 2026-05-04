import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import useIsMobile from '../../hooks/useIsMobile'

const ITEMS = [
  { q: 'Z jakých materiálů je produkt vyroben?', a: 'Používáme výhradně prémiové materiály první třídy. Každá surovina je pečlivě vybrána a testována pro zajištění maximální kvality, trvanlivosti a estetiky výsledného produktu.' },
  { q: 'Jak dlouho trvá doručení?', a: 'Standardní doručení trvá 2–4 pracovní dny v rámci České republiky. Expresní doručení do 24 hodin je dostupné za příplatek. Zásilky sledujete v reálném čase přes e-mail.' },
  { q: 'Je možné produkt vrátit?', a: 'Ano, máte 30 dní na vrácení bez udání důvodu. Produkt musí být v původním stavu a balení. Vrácení je zdarma — pošlete nám e-mail a my se o vše postaráme.' },
  { q: 'Jaká je záruční doba?', a: 'Na každý produkt poskytujeme standardní zákonnou záruční dobu 24 měsíců. Na vybrané produkty nabízíme prodlouženou záruku 3 nebo 5 let za symbolický příplatek.' },
  { q: 'Jsou dostupné různé varianty nebo barvy?', a: 'Aktuálně nabízíme produkt ve třech barevných variantách. Limitované edice vycházejí pravidelně — přihlaste se k odběru newsletteru, abyste nic nepropásli.' },
]

function Item({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', textAlign: 'left', gap: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{item.q}</span>
        <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, background: isOpen ? '#7c3aed' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
          {isOpen ? <Minus size={13} /> : <Plus size={13} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }} style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', paddingBottom: 22 }}>{item.a}</p>
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
    <section id="faq" style={{ background: '#000', padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
        gap: isMobile ? 48 : 'clamp(40px, 8vw, 120px)',
        alignItems: 'start',
      }}>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={isMobile ? {} : { position: 'sticky', top: 100 }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 16 }}>Časté dotazy</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
            Máte<br />otázky?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
            Nenašli jste odpověď? Kontaktujte nás a rádi vám pomůžeme.
          </p>
          <a href="mailto:info@produkt.cz" style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '12px 24px', borderRadius: 100, fontSize: 13, fontWeight: 500 }}>
            Napsat nám
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
          {ITEMS.map((item, i) => (
            <Item key={i} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
