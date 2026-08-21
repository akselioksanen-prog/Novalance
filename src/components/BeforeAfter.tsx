import { useState, useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

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

function BrowserMockup({ variant = 'before' }: { variant?: 'before' | 'after' }) {
  const isAfter = variant === 'after'
  
  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
      isAfter 
        ? 'border-cyan/40 bg-[#10172a] shadow-[0_0_50px_rgba(96,230,255,.12)]' 
        : 'border-white/10 bg-[#181a20]'
    }`}>
      {/* Browser header */}
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3">
        <div className="size-1.5 rounded-full bg-rose-400/70" />
        <div className="size-1.5 rounded-full bg-amber-300/70" />
        <div className="size-1.5 rounded-full bg-emerald-400/70" />
        <div className="ml-2 h-3 w-24 rounded-full bg-white/10" />
      </div>
      
      {/* Browser content */}
      {isAfter ? (
        <div className="relative min-h-72 overflow-hidden p-5">
          <div className="absolute -right-14 -top-10 size-48 rounded-full bg-violet-500/40 blur-3xl" />
          <div className="relative flex justify-between text-[10px] font-semibold text-white/70">
            <span>brändi / uusi maailma</span>
            <span>valikko</span>
          </div>
          <div className="relative mt-12 max-w-[13rem]">
            <div className="text-3xl font-bold leading-[.88] tracking-tight">
              Enemmän selkeyttä.<br/><span className="text-cyan">Enemmän vaikutusta.</span>
            </div>
            <div className="mt-4 h-1.5 w-3/4 rounded-full bg-white/20" />
            <div className="mt-2 h-1.5 w-2/5 rounded-full bg-white/10" />
            <div className="mt-6 h-8 w-24 rounded-full bg-cyan" />
          </div>
          <div className="absolute bottom-0 right-0 h-28 w-1/2 rounded-tl-[3rem] border-l border-t border-white/10 bg-white/5" />
        </div>
      ) : (
        <div className="min-h-72 p-5">
          <div className="flex justify-between text-[10px] text-white/35">
            <span>yritys oy</span>
            <span>Etusivu&nbsp;&nbsp; Palvelut&nbsp;&nbsp; Yhteys</span>
          </div>
          <div className="mt-12 text-2xl font-medium text-white/65">
            Me autamme<br/>yrityksiä.
          </div>
          <div className="mt-4 h-2 w-full bg-white/10" />
          <div className="mt-2 h-2 w-4/5 bg-white/10" />
          <div className="mt-6 h-8 w-20 bg-white/15" />
        </div>
      )}
    </div>
  )
}

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  
  const handleSliderChange = (newPosition: number) => {
    setSliderPosition(newPosition)
  }
  
  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    handleSliderChange(Math.max(0, Math.min(100, percentage)))
  }
  
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    handleSliderChange(Math.max(0, Math.min(100, percentage)))
  }
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    handleSliderChange(Math.max(0, Math.min(100, percentage)))
  }
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1
    if (e.key === 'ArrowLeft') {
      handleSliderChange(Math.max(0, sliderPosition - step))
    } else if (e.key === 'ArrowRight') {
      handleSliderChange(Math.min(100, sliderPosition + step))
    }
  }
  
  // Add global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp)
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])
  
  if (reduced) {
    // Fallback for reduced motion: side-by-side comparison
    return (
      <section id="concept" className="relative border-y border-white/10 bg-[#0d1019] py-28">
        <div className="absolute left-1/2 top-1/2 -z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[120px]"/>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Konsepti / ennen ja jälkeen</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
                Ei valmista kaavaa.<br/>Vaan uusi näkökulma.
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <Reveal>
              <div>
                <p className="mb-3 text-xs font-medium tracking-widest text-white/40">LÄHTÖKOHTA</p>
                <BrowserMockup variant="before" />
              </div>
            </Reveal>
            <div className="hidden lg:block">
              <ArrowRight className="size-7 text-cyan"/>
            </div>
            <Reveal delay={.12}>
              <div>
                <p className="mb-3 text-xs font-medium tracking-widest text-cyan">MAHDOLLINEN SUUNTA</p>
                <BrowserMockup variant="after" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    )
  }
  
  return (
    <section id="concept" className="relative border-y border-white/10 bg-[#0d1019] py-28">
      <div className="absolute left-1/2 top-1/2 -z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[120px]"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Konsepti / ennen ja jälkeen</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">
                Ei valmista kaavaa.<br/>Vaan uusi näkökulma.
              </h2>
              <p className="mt-4 max-w-md text-sm text-white/60">
                Vedä liukusäädintä nähdäksesi, miten verkkosivusi voisivat kehittyä.
              </p>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={.12} className="mt-14">
          <div 
            ref={containerRef}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#0d1019]"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Vertaa ennen ja jälkeen versioita"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuetext={`${Math.round(sliderPosition)}% muutosta`}
          >
            {/* Before version (background) */}
            <div className="relative min-h-[400px] sm:min-h-[500px]">
              <BrowserMockup variant="before" />
              
              {/* After version (foreground with clip) */}
              <motion.div 
                className="absolute inset-0 overflow-hidden"
                style={{ 
                  clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                  width: '100%'
                }}
              >
                <BrowserMockup variant="after" />
              </motion.div>
              
              {/* Slider handle */}
              <motion.div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%` }}
                animate={{
                  boxShadow: isDragging 
                    ? '0 0 20px rgba(96, 230, 255, 0.8)' 
                    : '0 0 10px rgba(96, 230, 255, 0.4)'
                }}
              >
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full border-2 border-white bg-cyan shadow-lg cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  <div className="flex gap-1">
                    <div className="w-0.5 h-4 bg-white/80 rounded-full" />
                    <div className="w-0.5 h-4 bg-white/80 rounded-full" />
                  </div>
                </div>
              </motion.div>
              
              {/* Labels */}
              <div className="absolute left-4 top-4 rounded-full bg-cyan/20 px-3 py-1.5 text-xs font-medium text-cyan backdrop-blur-sm">
                Mahdollinen suunta
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                Nykyinen
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}