import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'motion/react'
import { ArrowDown, ArrowRight, Layers3, MoveUpRight, Sparkles, Globe2, Code2 } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'

interface HeroProps {
  scrollToForm: () => void
  scrollToHow: () => void
}

export function Hero({ scrollToForm, scrollToHow }: HeroProps) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y1 = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 100, damping: 30 })
  const y2 = useSpring(useTransform(scrollY, [0, 500], [0, -100]), { stiffness: 100, damping: 30 })
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), { stiffness: 100, damping: 30 })
  const scale = useSpring(useTransform(scrollY, [0, 500], [1, 0.95]), { stiffness: 100, damping: 30 })
  const rotate = useSpring(useTransform(scrollY, [0, 500], [0, 2]), { stiffness: 100, damping: 30 })
  
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section id="top" className="relative isolate flex min-h-screen items-center pt-20">
      <div className="grid-field pointer-events-none absolute inset-0 -z-20 opacity-50" />
      
      {/* Animated background gradients */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute left-1/2 top-1/3 -z-10 size-[35rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]"
      />
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute right-0 top-20 -z-10 size-80 rounded-full bg-cyan/10 blur-[110px]"
      />
      
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-8">
        <div>
          <motion.div 
            initial={reduced ? false : { opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .65 }} 
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.035] px-3 py-1.5 text-xs text-white/75"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            Verkkosivun suunta, ennen päätöstä
          </motion.div>
          
          <motion.h1 
            initial={reduced ? false : { opacity: 0, y: 28 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .75, delay: .1 }} 
            className="font-display max-w-3xl text-[clamp(3.15rem,7vw,6.5rem)] font-semibold leading-[.88] tracking-[-.075em]"
          >
            Näe miltä sivusi <span className="text-gradient">voisivat tuntua.</span>
          </motion.h1>
          
          <motion.p 
            initial={reduced ? false : { opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .65, delay: .22 }} 
            className="mt-7 max-w-lg text-base leading-7 text-white/65 sm:text-lg"
          >
            Luomme yrityksellesi maksuttoman verkkosivukonseptin. Saat nähdä suunnan ensin — ilman sitoutumista mihinkään.
          </motion.p>
          
          <motion.div 
            initial={reduced ? false : { opacity: 0, y: 18 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: .65, delay: .34 }} 
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button onClick={scrollToForm}>Pyydä maksuton demo <ArrowRight className="ml-2 size-4" /></Button>
            <Button variant="ghost" onClick={scrollToHow}>Katso miten se toimii <ArrowDown className="ml-2 size-4" /></Button>
          </motion.div>
        </div>

        <motion.div 
          style={{ scale, rotate }}
          initial={reduced ? false : { opacity: 0, scale: .94, y: 30 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ duration: .9, delay: .2 }} 
          className="relative mx-auto w-full max-w-[650px] pb-8"
        >
          <div className="absolute -left-4 top-10 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" />
          
          {/* Main browser mockup */}
          <motion.div 
            className="relative rounded-[2rem] border border-white/15 bg-white/[.055] p-2 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"
            whileHover={reduced ? {} : { scale: 1.02, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#11131d]">
              {/* Browser header */}
              <div className="flex h-12 items-center border-b border-white/10 px-4">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-rose-400" />
                  <div className="size-2 rounded-full bg-amber-300" />
                  <div className="size-2 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-auto flex w-1/2 items-center gap-2 rounded-full bg-white/[.06] px-3 py-1 text-[9px] text-white/35">
                  <Sparkles className="size-3 text-cyan"/>
                  seuraava-sivusi.fi
                </div>
              </div>
              
              {/* Browser content */}
              <div className="relative min-h-[340px] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(96,230,255,.24),transparent_25%),linear-gradient(135deg,#151123_0%,#10182b_65%,#0c101a_100%)] p-6 sm:p-10">
                <motion.div 
                  animate={reduced ? {} : { 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-[-8%] top-[15%] size-56 rounded-full border border-cyan/30" 
                />
                <motion.div 
                  animate={reduced ? {} : { 
                    x: [0, 10, 0],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute right-[6%] top-[28%] size-28 rounded-full bg-cyan/15 blur-2xl" 
                />
                
                <div className="relative flex h-full min-h-[280px] flex-col justify-between">
                  <div className="flex justify-between text-xs text-white/65">
                    <span className="font-semibold tracking-[.16em]">OMA BRÄNDI</span>
                    <span>01—04</span>
                  </div>
                  
                  <div>
                    <p className="max-w-sm text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[.9] tracking-[-.06em]">
                      Uusi<br/><span className="text-cyan">digitaalinen ilme.</span>
                    </p>
                    <div className="mt-5 h-1.5 w-44 rounded-full bg-white/20" />
                    <div className="mt-2 h-1.5 w-28 rounded-full bg-white/10" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <motion.span 
                      className="rounded-full bg-white px-4 py-2 text-xs font-bold text-ink cursor-pointer"
                      whileHover={reduced ? {} : { scale: 1.05 }}
                      whileTap={reduced ? {} : { scale: 0.95 }}
                    >
                      Näe muutos
                    </motion.span>
                    <motion.span 
                      className="grid size-11 place-items-center rounded-full border border-white/30 cursor-pointer"
                      whileHover={reduced ? {} : { scale: 1.1, borderColor: '#60e6ff' }}
                      whileTap={reduced ? {} : { scale: 0.9 }}
                    >
                      <MoveUpRight className="size-4"/>
                    </motion.span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating cards */}
          <motion.div 
            animate={reduced ? {} : { y: [0, -10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
            className="absolute -bottom-2 -left-3 rounded-2xl border border-white/15 bg-[#121724]/90 p-3.5 shadow-xl backdrop-blur-xl sm:-left-10"
            onMouseEnter={() => setHoveredCard('direction')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="grid size-9 place-items-center rounded-xl bg-cyan text-ink"
                animate={hoveredCard === 'direction' && !reduced ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Layers3 className="size-4"/>
              </motion.div>
              <div>
                <p className="text-[10px] text-white/45">Visuaalinen suunta</p>
                <p className="text-xs font-semibold">Rakennettu tarinasi ympärille</p>
              </div>
            </div>
          </motion.div>

          {/* Additional floating element */}
          <motion.div 
            animate={reduced ? {} : { y: [0, 8, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -right-4 top-20 rounded-2xl border border-white/15 bg-[#121724]/90 p-3 shadow-xl backdrop-blur-xl sm:-right-8"
            onMouseEnter={() => setHoveredCard('web')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                className="grid size-8 place-items-center rounded-xl bg-violet-500/20 text-violet-300"
                animate={hoveredCard === 'web' && !reduced ? { scale: 1.2 } : {}}
                transition={{ duration: 0.3 }}
              >
                <Globe2 className="size-4"/>
              </motion.div>
              <div>
                <p className="text-[10px] text-white/45">Verkkoläsnäolo</p>
                <p className="text-xs font-semibold">Moderni & nopea</p>
              </div>
            </div>
          </motion.div>

          {/* Code element */}
          <motion.div 
            animate={reduced ? {} : { y: [0, -6, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-20 -right-2 rounded-xl border border-white/15 bg-[#121724]/90 p-2.5 shadow-lg backdrop-blur-xl sm:bottom-24 sm:-right-6"
            onMouseEnter={() => setHoveredCard('code')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex items-center gap-2">
              <motion.div 
                className="grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-emerald-300"
                animate={hoveredCard === 'code' && !reduced ? { rotate: 90 } : {}}
                transition={{ duration: 0.4 }}
              >
                <Code2 className="size-3.5"/>
              </motion.div>
              <div className="text-[9px] text-white/40">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}