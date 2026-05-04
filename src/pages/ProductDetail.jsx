import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronRight, ChevronLeft, Truck, RotateCcw, ShieldCheck, Check, Package, Award, Zap, ImagePlus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useIsMobile from '../hooks/useIsMobile'

// ─── Data ─────────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: '/kryt-final.png',     alt: 'Celkový pohled' },
  { src: '/kryt-lesky.png',     alt: 'Lesklá varianta' },
  { src: '/kryt-matny.png',     alt: 'Matná varianta' },
  { src: '/kryt-rozlozeny.jpg', alt: 'Rozložený pohled' },
]

const SURFACES = [
  { id: 'leska', label: 'Lesklá',  price: 399, img: 1, desc: 'Zrcadlový lesk, sytější barvy', badge: 'Nejprodávanější' },
  { id: 'matna', label: 'Matná',   price: 349, img: 2, desc: 'Hebký povrch, bez otisků' },
]

const PARAMS = [
  ['Model telefonu', 'Apple iPhone 16'],
  ['Materiál krytu', 'Polykarbonát + TPU rámeček'],
  ['Tisková technologie', 'UV přímý tisk'],
  ['Rozlišení tisku', 'až 1440 dpi'],
  ['Povrchová úprava', 'Lesklá nebo matná (lak)'],
  ['MagSafe kompatibilita', 'Ano (plná)'],
  ['Bezdrátové nabíjení', 'Ano'],
  ['Ochrana fotoaparátu', 'Zvýšený rámeček +1.5 mm'],
  ['Ochrana displeje', 'Zvýšený rámeček +1.5 mm'],
  ['Tloušťka', '1.2 mm (PC) + 0.8 mm (TPU)'],
  ['Hmotnost', '28 g'],
  ['Záruka', '24 měsíců'],
  ['Výroba', 'Česká republika'],
  ['Dodání', 'Obj. do 15:00 → doručení druhý den'],
]

const FEATURES = [
  'UV tisk odolný proti vyblednutí a poškrábání',
  'Zvýšené hrany kolem displeje a fotoaparátu',
  'Plná kompatibilita s MagSafe a bezdr. nabíjením',
  'Anti-žloutnutí materiál — barva zůstane čistá',
  'Precizní výřezy pro všechna tlačítka a porty',
]

const IN_BOX = [
  { icon: Package,    label: 'Kryt s vaším potiskem', desc: 'Vyrobeno přesně podle vaší fotografie' },
  { icon: Award,      label: 'Certifikát kvality',    desc: 'Ověřeno naším QC oddělením' },
  { icon: ShieldCheck, label: 'Záruční list',          desc: '24 měsíců od data nákupu' },
]

const REVIEWS_DATA = [
  { name: 'Lucie M.',  location: 'Praha',   stars: 5, date: 'Duben 2026',  text: 'Barvy jsou přesně takové jako na originálu. Kryt sedí perfektně, kvalita tisku je výborná. Objednala jsem v pondělí odpoledne a v úterý ráno byl doma.' },
  { name: 'Tomáš K.', location: 'Brno',    stars: 5, date: 'Březen 2026', text: 'Matná varianta je příjemná na dotek a otisky na ní vůbec nejsou vidět. Přesně to, co jsem potřeboval. Velmi doporučuji.' },
  { name: 'Petra V.', location: 'Ostrava', stars: 5, date: 'Březen 2026', text: 'Dala jsem jako dárek pro tátu. Byl dojatý. MagSafe funguje bez problémů, kryt sedí pevně a nevypadává.' },
  { name: 'Jan S.',   location: 'Plzeň',   stars: 5, date: 'Únor 2026',   text: 'Třetí kryt od Shieldee a stále nejsem zklamaný. Tentokrát lesklá varianta s fotkou z hor — naprosto dokonalé.' },
]

const TABS = ['Popis', 'Co dostanete', 'Parametry', 'Recenze']

// ─── Delivery date ────────────────────────────────────────────────────────────

function getDeliveryDate() {
  const d = new Date()
  d.setDate(d.getDate() + (d.getHours() >= 15 ? 2 : 1))
  return d.toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' })
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery({ activeImg, setActiveImg, isMobile }) {
  return (
    <div>
      <div style={{
        background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: isMobile ? 16 : 24, overflow: 'hidden', aspectRatio: '1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 10, position: 'relative',
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={GALLERY[activeImg].src}
            alt={GALLERY[activeImg].alt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ width: '80%', height: '80%', objectFit: 'contain', filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.1))' }}
          />
        </AnimatePresence>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {GALLERY.map((img, i) => (
          <button key={i} onClick={() => setActiveImg(i)} style={{
            background: '#f5f5f7',
            border: `1.5px solid ${activeImg === i ? '#111' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 10, aspectRatio: '1', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 6, transition: 'border-color 0.2s', minHeight: 44,
          }}>
            <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Surface selector ─────────────────────────────────────────────────────────

function SurfaceBtn({ s, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: active ? 'rgba(0,0,0,0.04)' : '#fff',
      border: `1.5px solid ${active ? '#111' : 'rgba(0,0,0,0.1)'}`,
      borderRadius: 14, padding: '12px 14px', cursor: 'pointer', color: '#0a0a0a',
      textAlign: 'left', transition: 'all 0.2s', flex: 1, position: 'relative',
      minHeight: 52,
    }}>
      {s.badge && (
        <span style={{ position: 'absolute', top: -10, left: 12, background: '#111', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          {s.badge}
        </span>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</span>
        {active && <Check size={14} color="#111" />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.42)' }}>{s.desc}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>{s.price} Kč</span>
      </div>
    </button>
  )
}

// ─── Product info ─────────────────────────────────────────────────────────────

function ProductInfo({ surface, setSurface, price, isMobile }) {
  const deliveryDate = getDeliveryDate()

  return (
    <div>
      <p style={{ fontSize: 11, color: '#7c3aed', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Shieldee</p>

      <h1 style={{ fontSize: 'clamp(1.4rem, 5vw, 2.1rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 14, color: '#0a0a0a' }}>
        Kryt pro Apple iPhone 16<br />s vlastní fotkou
      </h1>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />)}
        </div>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>4.9 · 1 240 hodnocení</span>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 'clamp(2rem, 8vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#0a0a0a' }}>{price}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0a0a0a' }}> Kč</span>
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.38)', marginLeft: 8 }}>vč. DPH</span>
      </div>

      {/* Stock + delivery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e88', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>
          Skladem · Doručení <strong style={{ color: '#0a0a0a' }}>{deliveryDate}</strong>
        </span>
      </div>

      <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', marginBottom: 20 }} />

      {/* Surface selector */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 12, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Povrchová úprava
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          {SURFACES.map(s => (
            <SurfaceBtn key={s.id} s={s} active={surface === s.id} onClick={() => setSurface(s.id)} />
          ))}
        </div>
      </div>

      {/* Photo upload area */}
      <div style={{ border: '2px dashed rgba(0,0,0,0.18)', borderRadius: 14, padding: '14px 16px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', background: 'rgba(0,0,0,0.02)' }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ImagePlus size={18} color="#0a0a0a" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, color: '#0a0a0a' }}>Přidat vlastní fotku</p>
          <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)' }}>JPG, PNG nebo HEIC · min. 1000 × 1000 px</p>
        </div>
      </div>

      {/* CTA — only show on desktop; mobile uses sticky bar */}
      {!isMobile && (
        <>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ width: '100%', background: '#111', color: '#fff', border: 'none', padding: '17px', borderRadius: 100, fontSize: 16, fontWeight: 800, cursor: 'pointer', marginBottom: 10, letterSpacing: '-0.01em' }}
          >
            Koupit kryt — {price} Kč
          </motion.button>

          <button style={{ width: '100%', background: 'transparent', color: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,0,0,0.15)', padding: '14px', borderRadius: 100, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 20 }}>
            Navrhnout a zobrazit náhled
          </button>
        </>
      )}

      {/* Trust strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 24 }}>
        {[
          { icon: Truck,       label: 'Doručení', sub: 'do 24 hodin' },
          { icon: RotateCcw,   label: 'Vrácení',  sub: '30 dní zdarma' },
          { icon: ShieldCheck, label: 'Záruka',   sub: '24 měsíců' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 10, padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textAlign: 'center' }}>
            <Icon size={15} color="#0a0a0a" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a' }}>{label}</span>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.42)' }}>{sub}</span>
          </div>
        ))}
      </div>

      {/* Feature list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FEATURES.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(0,0,0,0.58)', lineHeight: 1.45 }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
              <Check size={10} color="#111" />
            </div>
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

function TabsSection({ isMobile }) {
  const [tab, setTab] = useState(0)

  return (
    <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px, 5vw, 80px)' }}>

        {/* Tab nav */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.08)', overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: tab === i ? '#0a0a0a' : 'rgba(0,0,0,0.38)',
              fontSize: isMobile ? 13 : 14, fontWeight: tab === i ? 700 : 400,
              padding: isMobile ? '16px 16px 16px 0' : '18px 24px 18px 0',
              whiteSpace: 'nowrap', flexShrink: 0,
              borderBottom: `2px solid ${tab === i ? '#111' : 'transparent'}`,
              marginBottom: -1, transition: 'all 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: isMobile ? '28px 0' : 'clamp(40px, 5vw, 64px) 0' }}>
          <AnimatePresence mode="wait">

            {tab === 0 && (
              <motion.div key="popis" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 28 : 48 }}>
                  <div>
                    <h3 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, marginBottom: 12, color: '#0a0a0a' }}>Kryt přesně podle tebe</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
                      Nahraj jakoukoli fotografii — rodinný moment, výhled z dovolené, portrét mazlíčka nebo oblíbené umělecké dílo. Naše UV technologie zajistí, že barvy budou živé a přesné po celou dobu životnosti krytu.
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)' }}>
                      Každý kryt je vyroben na objednávku přímo v naší tiskárně v České republice. Objednáš dnes, máš zítra.
                    </p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: isMobile ? 17 : 20, fontWeight: 800, marginBottom: 12, color: '#0a0a0a' }}>Prémiová ochrana</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
                      Dvouvrstvá konstrukce z tuhého polykarbonátu s pružným TPU rámečkem absorbuje nárazy při pádu. Zvýšené hrany kolem displeje i fotoaparátu chrání nejcitlivější části telefonu.
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)' }}>
                      Materiál je ošetřen UV vrstvou odolnou vůči žloutnutí. Kryt si zachová původní čistý vzhled i po měsících používání.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 10 : 16, marginTop: isMobile ? 28 : 48, paddingTop: isMobile ? 28 : 48, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  {[
                    { icon: Zap,         val: '1440 dpi',  label: 'Rozlišení tisku' },
                    { icon: ShieldCheck, val: '±1.5 mm',   label: 'Ochranné hrany' },
                    { icon: Award,       val: 'UV lak',     label: 'Povrchová úprava' },
                    { icon: Truck,       val: '24 hodin',   label: 'Výroba & doručení' },
                  ].map(({ icon: Icon, val, label }) => (
                    <div key={label} style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: isMobile ? '16px 12px' : '20px', textAlign: 'center' }}>
                      <Icon size={18} color="#0a0a0a" style={{ margin: '0 auto 8px' }} />
                      <p style={{ fontSize: isMobile ? 15 : 18, fontWeight: 800, marginBottom: 3, color: '#0a0a0a' }}>{val}</p>
                      <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {tab === 1 && (
              <motion.div key="co-dostanete" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {IN_BOX.map(({ icon: Icon, label, desc }) => (
                    <div key={label} style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(0,0,0,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={18} color="#0a0a0a" />
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#0a0a0a' }}>{label}</p>
                        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.48)', lineHeight: 1.6 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Truck size={18} color="#0a0a0a" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(0,0,0,0.6)' }}>
                    Doprava po celé ČR <strong style={{ color: '#0a0a0a' }}>zdarma</strong>. Objednáte do 15:00 — doručíme druhý pracovní den přes PPL nebo Zásilkovnu.
                  </p>
                </div>
              </motion.div>
            )}

            {tab === 2 && (
              <motion.div key="parametry" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ maxWidth: 640 }}
              >
                {PARAMS.map(([k, v], i) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: i < PARAMS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none', gap: 16 }}>
                    <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.42)', flexShrink: 0, maxWidth: '45%' }}>{k}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: '#0a0a0a' }}>{v}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === 3 && (
              <motion.div key="recenze" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                {/* Rating summary */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 20 : 40, marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: isMobile ? 48 : 64, fontWeight: 900, lineHeight: 1, marginBottom: 6, color: '#0a0a0a' }}>4.9</p>
                      <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginBottom: 4 }}>
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.38)' }}>1 240 hodnocení</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      {[[5, 94], [4, 4], [3, 1], [2, 0], [1, 1]].map(([stars, pct]) => (
                        <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', width: 8 }}>{stars}</span>
                          <Star size={10} fill="#f59e0b" color="#f59e0b" />
                          <div style={{ flex: 1, height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden', minWidth: 60 }}>
                            <div style={{ width: `${pct}%`, height: '100%', background: '#f59e0b', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.38)', width: 28 }}>{pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
                  {REVIEWS_DATA.map((r, i) => (
                    <div key={i} style={{ background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {Array.from({ length: r.stars }).map((_, j) => <Star key={j} size={12} fill="#f59e0b" color="#f59e0b" />)}
                        </div>
                        <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.32)' }}>{r.date}</span>
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(0,0,0,0.62)', marginBottom: 14 }}>„{r.text}"</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                          {r.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a' }}>{r.name}</p>
                          <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)' }}>{r.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

// ─── Mobile sticky bar ────────────────────────────────────────────────────────

function MobileStickyBar({ price }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      padding: '12px 16px',
      paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      display: 'flex', gap: 10, alignItems: 'center',
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.42)', marginBottom: 1 }}>Cena</p>
        <p style={{ fontSize: 20, fontWeight: 900, color: '#0a0a0a', lineHeight: 1 }}>{price} Kč</p>
      </div>
      <button style={{ background: '#111', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 100, fontSize: 15, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
        Koupit kryt
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetail() {
  const isMobile = useIsMobile()
  const [surface, setSurface] = useState('leska')
  const [activeImg, setActiveImg] = useState(1)

  const surfaceData = SURFACES.find(s => s.id === surface)
  const price = surfaceData.price

  useEffect(() => { setActiveImg(surfaceData.img) }, [surface])

  const stickyBarHeight = isMobile ? 'max(80px, calc(68px + env(safe-area-inset-bottom)))' : 0

  return (
    <>
      <Navbar light />
      <main style={{ background: '#fff', minHeight: '100vh', paddingTop: 60, paddingBottom: isMobile ? stickyBarHeight : 0 }}>

        {/* Breadcrumb */}
        <div style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '12px clamp(16px, 5vw, 80px)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(0,0,0,0.38)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Link to="/" style={{ color: 'rgba(0,0,0,0.38)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <ChevronLeft size={14} /> Zpět
            </Link>
            {!isMobile && (
              <>
                <ChevronRight size={12} />
                <span>Kryty na iPhone</span>
                <ChevronRight size={12} />
                <span style={{ color: 'rgba(0,0,0,0.7)' }}>iPhone 16 – vlastní fotka</span>
              </>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: `${isMobile ? '20px' : 'clamp(32px, 5vw, 56px)'} clamp(16px, 5vw, 80px)` }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr', gap: isMobile ? 28 : 64, alignItems: 'start' }}>
            <Gallery activeImg={activeImg} setActiveImg={setActiveImg} isMobile={isMobile} />
            <div style={isMobile ? {} : { position: 'sticky', top: 80 }}>
              <ProductInfo surface={surface} setSurface={setSurface} price={price} isMobile={isMobile} />
            </div>
          </div>
        </div>

        <TabsSection isMobile={isMobile} />

      </main>

      {isMobile && <MobileStickyBar price={price} />}

      <Footer />
    </>
  )
}
