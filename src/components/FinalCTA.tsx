import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from './ui/button'

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

interface FinalCTAProps {
  scrollToForm: () => void
}

export function FinalCTA({ scrollToForm }: FinalCTAProps) {
  return (
    <section className="relative px-5 py-20 sm:py-24 lg:py-32 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(155,140,255,.2),transparent_56%)]"/>
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="font-display text-[clamp(2.5rem,8vw,6rem)] sm:text-[clamp(3rem,8.5vw,7rem)] lg:text-[clamp(3.4rem,9vw,8.5rem)] font-semibold leading-[.82] tracking-[-.085em]">
          Näe ensin.<br/><span className="text-gradient">Päätä vasta sitten.</span>
        </p>
        <p className="mx-auto mt-6 sm:mt-8 max-w-md text-sm sm:text-base text-white/60">
          Yksi ajatus riittää alkuun. Katsotaan, millaisen suunnan siitä voisi tehdä.
        </p>
        <Button onClick={scrollToForm} className="mt-6 sm:mt-9 px-6 py-3 sm:px-7 sm:py-4">
          Pyydä maksuton demo <ArrowRight className="ml-2 size-4" />
        </Button>
      </Reveal>
    </section>
  )
}