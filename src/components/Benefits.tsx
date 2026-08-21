import { CircleCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

const benefits = [
  'Näet suunnan ennen ostopäätöstä',
  'Saat ideasta jotain konkreettista',
  'Demo ei sido mihinkään',
  'Arvioi ajatus omassa rauhassa',
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

export function Benefits() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 sm:gap-12 px-5 py-20 sm:py-24 lg:py-28 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
      <Reveal>
        <p className="eyebrow">Miksi demo?</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.06em] sm:text-4xl lg:text-6xl">
          Päätös saa tuntua helpommalta.
        </h2>
        <p className="mt-6 max-w-md text-base leading-7 text-white/60 sm:text-lg">
          Verkkosivun uudistaminen on iso ajatus. Siksi ensimmäinen keskustelu voi alkaa näkymästä, ei sitoumuksesta.
        </p>
      </Reveal>
      
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {benefits.map((benefit, i) => (
          <Reveal key={benefit} delay={i * .08}>
            <div className="flex min-h-32 sm:min-h-36 flex-col justify-between rounded-2xl border border-white/10 bg-white/[.035] p-4 sm:p-5">
              <CircleCheck className="size-5 text-cyan"/>
              <p className="max-w-[13rem] font-display text-lg font-medium tracking-[-.04em] sm:text-xl">{benefit}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}