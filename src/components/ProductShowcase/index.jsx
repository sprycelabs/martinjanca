import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProductModel from '../ProductModel'

const chapters = [
  {
    number: '01',
    title: 'Přední pohled',
    desc: 'Čistý, minimalistický design přední strany odráží filozofii produktu — nic navíc, vše potřebné.',
    sub: 'Design',
  },
  {
    number: '02',
    title: 'Precizní zpracování',
    desc: 'Pohled z boku odhaluje perfektní proporce a materiálové vrstvy, které tvoří jádro kvality.',
    sub: 'Materiál',
  },
  {
    number: '03',
    title: 'Technologie uvnitř',
    desc: 'Zadní strana ukrývá inovace. Každý milimetr je výsledkem stovek hodin vývoje a testování.',
    sub: 'Inovace',
  },
  {
    number: '04',
    title: 'Každý úhel',
    desc: 'Vytvořeno tak, aby bylo krásné ze všech stran. Designérský záměr viditelný v každém detailu.',
    sub: 'Perspektiva',
  },
]

export default function ProductShowcase() {
  const containerRef = useRef()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Rotation — pause at each chapter, animate during transitions
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32, 0.50, 0.64, 0.82, 0.88, 1],
    [0, 0, -Math.PI / 2, -Math.PI / 2, -Math.PI, -Math.PI, -Math.PI * 1.5, -Math.PI * 1.75]
  )
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.82, 1],
    [0.12, 0.12, -0.22]
  )

  // Chapter opacities
  const op0 = useTransform(scrollYProgress, [0, 0.12, 0.22, 0.3], [1, 1, 0, 0])
  const op1 = useTransform(scrollYProgress, [0.28, 0.36, 0.48, 0.56], [0, 1, 1, 0])
  const op2 = useTransform(scrollYProgress, [0.60, 0.68, 0.78, 0.84], [0, 1, 1, 0])
  const op3 = useTransform(scrollYProgress, [0.86, 0.93, 1], [0, 1, 1])

  const opacities = [op0, op1, op2, op3]

  // Progress bar
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_65%_50%,rgba(109,40,217,0.12),transparent)]" />

        {/* 3D Canvas */}
        <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <ProductModel rotateY={rotateY} rotateX={rotateX} />
        </div>

        {/* Chapter texts */}
        {chapters.map((ch, i) => (
          <motion.div
            key={i}
            className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 max-w-xs pointer-events-none"
            style={{ opacity: opacities[i] }}
          >
            <motion.div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[var(--color-accent-light)]" />
              <span className="text-[var(--color-accent-light)] text-xs tracking-[0.25em] uppercase font-medium">
                {ch.sub}
              </span>
            </motion.div>

            <p className="text-white/20 text-xs font-mono mb-2">{ch.number}</p>

            <h2
              className="text-white font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
              {ch.title}
            </h2>

            <p className="text-white/45 text-sm md:text-base leading-relaxed">
              {ch.desc}
            </p>
          </motion.div>
        ))}

        {/* Right side — vertical progress */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="relative w-px h-32 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[var(--color-accent-light)] rounded-full"
              style={{ height: progressHeight }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {chapters.map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-white/30"
              />
            ))}
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            className="text-white/20 text-[10px] tracking-[0.3em] uppercase"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            Pokračujte ve scrollování
          </motion.div>
        </div>
      </div>
    </section>
  )
}
