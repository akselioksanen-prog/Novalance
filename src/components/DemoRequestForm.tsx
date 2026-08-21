import { FormEvent, useState, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, Building2, CalendarDays, Check, Globe2, Rocket } from 'lucide-react'
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

export function DemoRequestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [siteStatus, setSiteStatus] = useState('')
  const [companyAge, setCompanyAge] = useState('')
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const formRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  
  const chooseSiteStatus = (value: string) => { 
    setSiteStatus(value); 
    setDemoStep(1) 
  }
  
  const chooseCompanyAge = (value: string) => { 
    setCompanyAge(value); 
    setDemoStep(2) 
  }
  
  const validateField = (name: string, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    switch (name) {
      case 'company':
        return value.trim().length < 2 ? 'Yrityksen nimi on pakollinen (vähintään 2 merkkiä)' : ''
      case 'email':
        return !emailRegex.test(value) ? 'Anna voimassa oleva sähköpostiosoite' : ''
      case 'phone':
        return value && !/^\+?[\d\s-]{8,}$/.test(value) ? 'Puhelinnumeron tulee olla vähintään 8 numeroa' : ''
      default:
        return ''
    }
  }
  
  const handleFieldChange = (name: string, e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }
  
  const handleFieldBlur = (name: string, value: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }
  
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    // Validate all fields
    const newErrors: Record<string, string> = {}
    Object.entries(formData).forEach(([name, value]) => {
      if (name === 'company' || name === 'email') {
        const error = validateField(name, value)
        if (error) newErrors[name] = error
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched({
        company: true,
        email: true,
        phone: true,
        notes: true
      })
      return
    }
    
    setSubmitted(true)
    // Scroll to success state
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
  
  const cardMotion = reduced ? {} : { whileHover: { y: -5, scale: 1.015 }, whileTap: { scale: .985 } }

  return (
    <section id="demo" className="relative overflow-hidden border-y border-white/10 bg-white/[.025] py-28">
      <div className="absolute right-0 top-0 size-96 rounded-full bg-cyan/10 blur-[110px]" />
      <div className="absolute bottom-0 left-[12%] size-72 rounded-full bg-violet-600/10 blur-[110px]" />
      <div className="grid-field pointer-events-none absolute inset-0 opacity-20" />
      
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
        <Reveal>
          <p className="eyebrow">Maksuton demo</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-.06em] sm:text-4xl lg:text-6xl">
            Aloitetan<br />tilanteestasi.
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-white/60 sm:text-lg">
            Kaksi nopeaa valintaa auttaa muotoilemaan demon juuri oikeasta lähtökohdasta.
          </p>
          <div className="mt-8 sm:mt-10 flex items-center gap-4 text-xl font-display font-semibold tracking-[-.04em] text-white sm:text-2xl lg:text-3xl">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15">
              <Check className="size-5 text-cyan" />
            </span>
            Ei sitoumusta, ei painetta.
          </div>
          <div className="relative mt-12 sm:mt-14 hidden h-36 max-w-xs lg:block">
            <motion.div 
              animate={reduced ? {} : { y: [0, -10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} 
              className="absolute left-3 top-7 grid size-20 place-items-center rounded-3xl border border-cyan/30 bg-cyan/10 text-cyan"
            >
              <Globe2 className="size-8" />
            </motion.div>
            <motion.div 
              animate={reduced ? {} : { y: [0, 11, 0] }} 
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: .4 }} 
              className="absolute left-24 top-0 grid size-16 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/10 text-violet-300"
            >
              <Building2 className="size-6" />
            </motion.div>
            <motion.div 
              animate={reduced ? {} : { y: [0, -7, 0] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: .8 }} 
              className="absolute bottom-0 left-40 grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[.06] text-white"
            >
              <Rocket className="size-5" />
            </motion.div>
          </div>
        </Reveal>

        <div ref={formRef} className="relative rounded-[1.5rem] sm:rounded-[2rem] border border-white/15 bg-[#11131c]/90 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8" role="form" aria-label="Demo pyyntölomake">
          <div className="mb-8 flex items-center gap-2" aria-label={`Vaihe ${Math.min(demoStep + 1, 3)} / 3`}>
            {[0, 1, 2].map((step) => (
              <div 
                key={step} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                  step <= demoStep ? 'bg-cyan shadow-[0_0_16px_rgba(96,230,255,.7)]' : 'bg-white/10'
                }`} 
              />
            ))}
          </div>
          
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div 
                key="success" 
                initial={{ opacity: 0, y: 24, scale: .98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={{ opacity: 0, y: -16 }} 
                transition={{ duration: .45 }} 
                className="flex min-h-[410px] flex-col justify-center"
              >
                <motion.div 
                  initial={reduced ? false : { scale: .6, rotate: -12 }} 
                  animate={{ scale: 1, rotate: 0 }} 
                  transition={{ type: 'spring', stiffness: 260, damping: 17 }} 
                  className="grid size-14 place-items-center rounded-2xl bg-cyan text-ink"
                >
                  <Check className="size-7" />
                </motion.div>
                <h3 className="mt-7 font-display text-4xl font-semibold tracking-[-.06em]">
                  Pyyntö vastaanotettu
                </h3>
                <p className="mt-4 max-w-md leading-7 text-white/60">
                  Kiitos. Tämä on prototyyppi — oikeassa käytössä tietosi lähetettäisiin palvelimelle.
                </p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <Button 
                    onClick={() => {
                      setSubmitted(false)
                      setDemoStep(0)
                      setSiteStatus('')
                      setCompanyAge('')
                      setFormData({ company: '', email: '', phone: '', notes: '' })
                      setErrors({})
                      setTouched({})
                    }}
                    variant="ghost"
                  >
                    Lähetä uusi pyyntö
                  </Button>
                </motion.div>
              </motion.div>
            ) : demoStep === 0 ? (
              <motion.div 
                key="situation" 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -28 }} 
                transition={{ duration: .38 }}
              >
                <div className="flex items-center gap-3 text-cyan">
                  <span className="grid size-9 place-items-center rounded-xl border border-cyan/30 bg-cyan/10">
                    <Globe2 className="size-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[.16em]">Vaihe 1 / 3</span>
                </div>
                <h3 className="mt-4 sm:mt-6 font-display text-2xl font-semibold tracking-[-.055em] sm:text-3xl lg:text-4xl">
                  Mikä on tilanteesi?
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  Valitse lähtökohta — eteneminen tapahtuu heti valinnan jälkeen.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ['Minulla on jo verkkosivut', 'Tarkastellaan, miten nykyinen sivu voisi kehittyä.', Globe2], 
                    ['Minulla ei ole vielä sivuja', 'Luodaan ensimmäiselle digitaaliselle ilmeelle suunta.', Rocket]
                  ].map(([title, text, Icon], index) => (
                    <motion.button 
                      {...cardMotion} 
                      type="button" 
                      key={title as string} 
                      onClick={() => chooseSiteStatus(title as string)} 
                      className="group relative min-h-40 sm:min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4 sm:p-5 text-left outline-none transition hover:border-cyan/60 hover:bg-cyan/[.06] focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131c]"
                    >
                      <div className="absolute -right-7 -top-7 size-24 rounded-full bg-cyan/0 blur-2xl transition group-hover:bg-cyan/20" />
                      <span className={`grid size-11 place-items-center rounded-xl border ${
                        index === 0 
                          ? 'border-cyan/30 bg-cyan/10 text-cyan' 
                          : 'border-violet-400/30 bg-violet-400/10 text-violet-300'
                      }`}>
                        <Icon className="size-5" />
                      </span>
                      <span className="mt-8 block font-display text-xl font-medium tracking-[-.04em]">
                        {title as string}
                      </span>
                      <span className="mt-2 block text-sm leading-5 text-white/50">
                        {text as string}
                      </span>
                      <ArrowRight className="absolute bottom-5 right-5 size-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-cyan" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : demoStep === 1 ? (
              <motion.div 
                key="age" 
                initial={{ opacity: 0, x: 28 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -28 }} 
                transition={{ duration: .38 }}
              >
                <button 
                  type="button" 
                  onClick={() => setDemoStep(0)} 
                  className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131c]"
                >
                  <ArrowLeft className="size-4" /> Muuta tilannetta
                </button>
                <div className="mt-5 flex items-center gap-3 text-violet-300">
                  <span className="grid size-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10">
                    <CalendarDays className="size-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[.16em]">Vaihe 2 / 3</span>
                </div>
                <h3 className="mt-4 sm:mt-6 font-display text-2xl font-semibold tracking-[-.055em] sm:text-3xl lg:text-4xl">
                  Kuinka vanha yrityksesi on?
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  Tämä auttaa meitä hahmottamaan, mistä tarina alkaa.
                </p>
                <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-2 sm:gap-3">
                  {['0–5 vuotta', '5–10 vuotta', '10–20 vuotta', '+20 vuotta'].map((age, index) => (
                    <motion.button 
                      {...cardMotion} 
                      type="button" 
                      key={age} 
                      onClick={() => chooseCompanyAge(age)} 
                      className="group relative min-h-24 sm:min-h-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-3 sm:p-4 text-left outline-none transition hover:border-violet-400/60 hover:bg-violet-400/[.07] focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131c]"
                    >
                      <span className="absolute right-4 top-4 text-xs text-white/25">0{index + 1}</span>
                      <span className="block font-display text-2xl font-medium tracking-[-.05em]">{age}</span>
                      <span className="mt-3 block h-px w-8 bg-violet-300/50 transition group-hover:w-16" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="form" 
                initial={{ opacity: 0, x: 28 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, y: -16 }} 
                transition={{ duration: .4 }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan">
                      Vaihe 3 / 3 · yhteystiedot
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.055em] sm:text-3xl">
                      Kerro, miten tavoitamme sinut.
                    </h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setDemoStep(1)} 
                    className="text-sm text-white/50 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#11131c]"
                  >
                    Muuta valintoja
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-xs text-cyan">
                    {siteStatus}
                  </span>
                  <span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">
                    {companyAge}
                  </span>
                </div>
                <form 
                  onSubmit={submit} 
                  className="mt-7 grid gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field 
                      label="Yrityksen nimi" 
                      name="company" 
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e)}
                      onBlur={() => handleFieldBlur('company', formData.company)}
                      error={touched.company ? errors.company : ''}
                      autoComplete="organization" 
                      required 
                    />
                    <Field 
                      label="Sähköposti" 
                      name="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e)}
                      onBlur={() => handleFieldBlur('email', formData.email)}
                      error={touched.email ? errors.email : ''}
                      autoComplete="email" 
                      required 
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field 
                      label="Puhelinnumero (valinnainen)" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e)}
                      onBlur={() => handleFieldBlur('phone', formData.phone)}
                      error={touched.phone ? errors.phone : ''}
                      autoComplete="tel" 
                    />
                    <Field 
                      label="Lisätiedot (valinnainen)" 
                      name="notes" 
                      value={formData.notes}
                      onChange={(e) => handleFieldChange('notes', e)}
                      onBlur={() => handleFieldBlur('notes', formData.notes)}
                      error={touched.notes ? errors.notes : ''}
                      textarea 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="mt-2 w-full sm:w-fit"
                    disabled={Object.keys(errors).length > 0 && touched.company && touched.email}
                  >
                    Pyydä maksuton demo <ArrowRight className="ml-2 size-4" />
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Field({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error = '', 
  textarea = false, 
  ...props 
}: { 
  label: string; 
  name: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  error?: string;
  textarea?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const shared = `mt-2 w-full rounded-xl border px-4 py-3.5 sm:py-4 text-base text-white outline-none placeholder:text-white/25 transition-all duration-200 ${
    error 
      ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
      : 'border-white/10 bg-white/[.045] focus:border-cyan/70 focus:ring-1 focus:ring-cyan/70'
  }`
  
  return (
    <label className="block text-base font-medium text-white/85">
      {label}
      {textarea ? (
        <textarea 
          name={name} 
          className={`${shared} min-h-24 resize-y`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input 
          name={name} 
          className={shared}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      )}
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mt-1.5 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </label>
  )
}