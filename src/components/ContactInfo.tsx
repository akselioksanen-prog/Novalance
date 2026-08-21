import { motion, useReducedMotion } from 'motion/react'

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

export function ContactInfo() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <Reveal>
          <h1 className="font-display text-3xl font-semibold tracking-[-.06em] sm:text-4xl lg:text-5xl">
            Yhteystiedot
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-7 text-white/60 sm:text-lg">
            Voit olla yhteyshenkilöömme yhteydessä riippumatta asiasta joko sähköpostilla tai puhelimitse. Vastaamme aina viimeistään 24 tunnin sisällä.
          </p>
          <div className="mt-8 space-y-4 inline-block text-left">
            <div className="text-lg">
              <span className="text-white/40">Nimi:</span>{' '}
              <span className="text-white">Akseli Oksanen</span>
            </div>
            <div className="text-lg">
              <span className="text-white/40">Sähköposti:</span>{' '}
              <a href="mailto:novalancestudio@gmail.com" className="text-cyan hover:underline">
                novalancestudio@gmail.com
              </a>
            </div>
            <div className="text-lg">
              <span className="text-white/40">Puhelin:</span>{' '}
              <a href="tel:0456066089" className="text-cyan hover:underline">
                0456066089
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}