import { motion, useReducedMotion } from 'motion/react'

const steps = [
  ['01', 'Kerro yrityksestäsi', 'Jaa verkkosivusi tai kuvaile, mistä olet aloittamassa.'],
  ['02', 'Saat maksuttoman luonnoksen', 'Rakennamme visuaalisen suunnan, johon voit reagoida.'],
  ['03', 'Päätät itse jatketaanko', 'Demo ei sido mihinkään. Jatketaan vain, jos suunta tuntuu oikealta.'],
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div 
      className={className} 
      initial={reduced ? false : { opacity: 0, y: 22 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: .65, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ProcessSection() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8 lg:py-28">
      <Reveal>
        <p className="eyebrow">Prosessi / 03 askelta</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-.06em] sm:text-4xl lg:text-6xl">
          Kevyt alku.<br/><span className="text-white/45">Selkeämpi suunta.</span>
        </h2>
      </Reveal>
      
      <div className="relative mt-12 sm:mt-16 grid gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent lg:block" />
        
        {steps.map(([number, title, text], i) => (
          <Reveal key={title} delay={i * .12} className="relative">
            <article className="group h-full rounded-3xl border border-white/10 bg-panel/60 p-5 sm:p-6 transition hover:-translate-y-1 hover:border-cyan/40 hover:bg-panel">
              <div className="flex items-start justify-between">
                <span className="text-xs text-cyan">{number}</span>
                <span className="grid size-9 place-items-center rounded-full border border-white/10 text-xs text-white/50 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-ink">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-12 sm:mt-16 font-display text-xl font-medium tracking-[-.04em] sm:text-2xl">{title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}