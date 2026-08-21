import { FormEvent, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowDown, ArrowLeft, ArrowRight, Building2, CalendarDays, Check, CircleCheck, Globe2, Layers3, Menu, MoveUpRight, Rocket, Sparkles, X } from 'lucide-react'
import { Button } from './components/ui/button'

const steps = [
  ['01', 'Kerro yrityksestäsi', 'Jaa verkkosivusi tai kuvaile, mistä olet aloittamassa.'],
  ['02', 'Saat maksuttoman luonnoksen', 'Rakennamme visuaalisen suunnan, johon voit reagoida.'],
  ['03', 'Päätät itse jatketaanko', 'Demo ei sido mihinkään. Jatketaan vain, jos suunta tuntuu oikealta.'],
]

const benefits = [
  'Näet suunnan ennen ostopäätöstä',
  'Saat ideasta jotain konkreettista',
  'Demo ei sido mihinkään',
  'Arvioi ajatus omassa rauhassa',
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion()
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: .65, delay }}>{children}</motion.div>
}

function MiniSite({ after = false }: { after?: boolean }) {
  return <div className={`overflow-hidden rounded-2xl border ${after ? 'border-cyan/40 bg-[#10172a] shadow-[0_0_50px_rgba(96,230,255,.12)]' : 'border-white/10 bg-[#181a20]'}`}>
    <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-3"><i className="size-1.5 rounded-full bg-rose-400/70" /><i className="size-1.5 rounded-full bg-amber-300/70" /><i className="size-1.5 rounded-full bg-emerald-400/70" /><span className="ml-2 h-3 w-24 rounded-full bg-white/10" /></div>
    {after ? <div className="relative min-h-72 overflow-hidden p-5"><div className="absolute -right-14 -top-10 size-48 rounded-full bg-violet-500/40 blur-3xl" /><div className="relative flex justify-between text-[10px] font-semibold text-white/70"><span>brändi / uusi maailma</span><span>valikko</span></div><div className="relative mt-12 max-w-[13rem]"><div className="text-3xl font-bold leading-[.88] tracking-tight">Enemmän selkeyttä.<br/><span className="text-cyan">Enemmän vaikutusta.</span></div><div className="mt-4 h-1.5 w-3/4 rounded-full bg-white/20" /><div className="mt-2 h-1.5 w-2/5 rounded-full bg-white/10" /><div className="mt-6 h-8 w-24 rounded-full bg-cyan" /></div><div className="absolute bottom-0 right-0 h-28 w-1/2 rounded-tl-[3rem] border-l border-t border-white/10 bg-white/5" /></div> : <div className="min-h-72 p-5"><div className="flex justify-between text-[10px] text-white/35"><span>yritys oy</span><span>Etusivu&nbsp;&nbsp; Palvelut&nbsp;&nbsp; Yhteys</span></div><div className="mt-12 text-2xl font-medium text-white/65">Me autamme<br/>yrityksiä.</div><div className="mt-4 h-2 w-full bg-white/10" /><div className="mt-2 h-2 w-4/5 bg-white/10" /><div className="mt-6 h-8 w-20 bg-white/15" /></div>}
  </div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [siteStatus, setSiteStatus] = useState('')
  const [companyAge, setCompanyAge] = useState('')
  const reduced = useReducedMotion()
  const scrollToForm = () => document.querySelector('#demo')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })

  return <main className="overflow-hidden bg-ink text-white selection:bg-cyan selection:text-ink">
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl"><div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8"><a href="#top" className="font-display text-lg font-bold tracking-[-.06em]" aria-label="Novalance etusivu">nova<span className="text-cyan">lance</span>.</a><div className="hidden items-center gap-7 text-sm text-white/65 md:flex"><a className="hover:text-white" href="#how">Miten toimii</a><a className="hover:text-white" href="#concept">Konsepti</a><a className="hover:text-white" href="#demo">Demo</a><button onClick={scrollToForm} className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-cyan hover:text-cyan">Pyydä demo <ArrowRight className="ml-1 inline size-3" /></button></div><button aria-label={menuOpen ? 'Sulje valikko' : 'Avaa valikko'} onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 place-items-center rounded-full border border-white/15 md:hidden">{menuOpen ? <X /> : <Menu />}</button></div><AnimatePresence>{menuOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-ink md:hidden"><div className="flex flex-col p-5 text-lg"><a onClick={() => setMenuOpen(false)} href="#how" className="py-3">Miten toimii</a><a onClick={() => setMenuOpen(false)} href="#concept" className="py-3">Konsepti</a><button onClick={() => { setMenuOpen(false); scrollToForm() }} className="mt-3 rounded-full bg-white px-5 py-3 text-ink">Pyydä maksuton demo</button></div></motion.div>}</AnimatePresence></nav>

    <section id="top" className="relative isolate flex min-h-screen items-center pt-20"><div className="grid-field pointer-events-none absolute inset-0 -z-20 opacity-50" /><div className="absolute left-1/2 top-1/3 -z-10 size-[35rem] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" /><div className="absolute right-0 top-20 -z-10 size-80 rounded-full bg-cyan/10 blur-[110px]" /><div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-8"><div><motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.035] px-3 py-1.5 text-xs text-white/75"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-cyan" /></span> Verkkosivun suunta, ennen päätöstä</motion.div><motion.h1 initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .1 }} className="font-display max-w-3xl text-[clamp(3.15rem,7vw,6.5rem)] font-semibold leading-[.88] tracking-[-.075em]">Näe miltä sivusi <span className="text-gradient">voisivat tuntua.</span></motion.h1><motion.p initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .22 }} className="mt-7 max-w-lg text-base leading-7 text-white/65 sm:text-lg">Luomme yrityksellesi maksuttoman verkkosivukonseptin. Saat nähdä suunnan ensin — ilman sitoutumista mihinkään.</motion.p><motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .34 }} className="mt-9 flex flex-wrap gap-3"><Button onClick={scrollToForm}>Pyydä maksuton demo <ArrowRight className="ml-2 size-4" /></Button><Button variant="ghost" onClick={() => document.querySelector('#how')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })}>Katso miten se toimii <ArrowDown className="ml-2 size-4" /></Button></motion.div></div>
      <motion.div initial={reduced ? false : { opacity: 0, scale: .94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .2 }} className="relative mx-auto w-full max-w-[650px] pb-8"><div className="absolute -left-4 top-10 h-48 w-48 rounded-full bg-cyan/20 blur-3xl" /><div className="relative rounded-[2rem] border border-white/15 bg-white/[.055] p-2 shadow-2xl shadow-violet-950/40 backdrop-blur-xl"><div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#11131d]"><div className="flex h-12 items-center border-b border-white/10 px-4"><div className="flex gap-1.5"><i className="size-2 rounded-full bg-rose-400"/><i className="size-2 rounded-full bg-amber-300"/><i className="size-2 rounded-full bg-emerald-400"/></div><div className="mx-auto flex w-1/2 items-center gap-2 rounded-full bg-white/[.06] px-3 py-1 text-[9px] text-white/35"><Sparkles className="size-3 text-cyan"/> seuraava-sivusi.fi</div></div><div className="relative min-h-[340px] overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(96,230,255,.24),transparent_25%),linear-gradient(135deg,#151123_0%,#10182b_65%,#0c101a_100%)] p-6 sm:p-10"><div className="absolute right-[-8%] top-[15%] size-56 rounded-full border border-cyan/30"/><div className="absolute right-[6%] top-[28%] size-28 rounded-full bg-cyan/15 blur-2xl"/><div className="relative flex h-full min-h-[280px] flex-col justify-between"><div className="flex justify-between text-xs text-white/65"><span className="font-semibold tracking-[.16em]">OMA BRÄNDI</span><span>01—04</span></div><div><p className="max-w-sm text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[.9] tracking-[-.06em]">Uusi<br/><span className="text-cyan">digitaalinen ilme.</span></p><div className="mt-5 h-1.5 w-44 rounded-full bg-white/20"/><div className="mt-2 h-1.5 w-28 rounded-full bg-white/10"/></div><div className="flex items-center justify-between"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-ink">Näe muutos</span><span className="grid size-11 place-items-center rounded-full border border-white/30"><MoveUpRight className="size-4"/></span></div></div></div></div></div><motion.div animate={reduced ? {} : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-2 -left-3 rounded-2xl border border-white/15 bg-[#121724]/90 p-3.5 shadow-xl backdrop-blur-xl sm:-left-10"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-cyan text-ink"><Layers3 className="size-4"/></div><div><p className="text-[10px] text-white/45">Visuaalinen suunta</p><p className="text-xs font-semibold">Rakennettu tarinasi ympärille</p></div></div></motion.div></motion.div></div></section>

    <section className="border-y border-white/10 bg-white/[.025]"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-3 lg:px-8"><p className="font-display text-xl font-medium tracking-tight">Ei tarjouspyyntöä.<br/><span className="text-white/45">Vaan ensimmäinen versio.</span></p><p className="text-sm leading-6 text-white/60">Kerro millaiselle yritykselle sivut tehdään. Me tulkitsemme lähtökohdan visuaaliseksi suunnaksi, jota voit arvioida omilla ehdoillasi.</p><a href="#demo" className="group flex items-center gap-3 self-center text-sm font-semibold text-cyan">Aloita maksutta <span className="grid size-8 place-items-center rounded-full border border-cyan/40 transition group-hover:bg-cyan group-hover:text-ink"><ArrowRight className="size-4" /></span></a></div></section>

    <section id="how" className="mx-auto max-w-7xl px-5 py-28 lg:px-8"><Reveal><p className="eyebrow">Prosessi / 03 askelta</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Kevyt alku.<br/><span className="text-white/45">Selkeämpi suunta.</span></h2></Reveal><div className="relative mt-16 grid gap-4 lg:grid-cols-3"><div className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent lg:block" />{steps.map(([number, title, text], i) => <Reveal key={title} delay={i * .12} className="relative"><article className="group h-full rounded-3xl border border-white/10 bg-panel/60 p-6 transition hover:-translate-y-1 hover:border-cyan/40 hover:bg-panel"><div className="flex items-start justify-between"><span className="text-xs text-cyan">{number}</span><span className="grid size-9 place-items-center rounded-full border border-white/10 text-xs text-white/50 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-ink">{i + 1}</span></div><h3 className="mt-16 font-display text-2xl font-medium tracking-[-.04em]">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/55">{text}</p></article></Reveal>)}</div></section>

    <section id="concept" className="relative border-y border-white/10 bg-[#0d1019] py-28"><div className="absolute left-1/2 top-1/2 -z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/15 blur-[120px]"/><div className="relative mx-auto max-w-7xl px-5 lg:px-8"><Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">Konsepti / ennen ja jälkeen</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Ei valmista kaavaa.<br/>Vaan uusi näkökulma.</h2></div></Reveal><div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]"><Reveal><div><p className="mb-3 text-xs font-medium tracking-widest text-white/40">LÄHTÖKOHTA</p><MiniSite /></div></Reveal><div className="hidden lg:block"><ArrowRight className="size-7 text-cyan"/></div><Reveal delay={.12}><div><p className="mb-3 text-xs font-medium tracking-widest text-cyan">MAHDOLLINEN SUUNTA</p><MiniSite after /></div></Reveal></div></div></section>

    <section className="mx-auto grid max-w-7xl gap-12 px-5 py-28 lg:grid-cols-[.9fr_1.1fr] lg:px-8"><Reveal><p className="eyebrow">Miksi demo?</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Päätös saa tuntua helpommalta.</h2><p className="mt-6 max-w-md leading-7 text-white/60">Verkkosivun uudistaminen on iso ajatus. Siksi ensimmäinen keskustelu voi alkaa näkymästä, ei sitoumuksesta.</p></Reveal><div className="grid gap-3 sm:grid-cols-2">{benefits.map((benefit, i) => <Reveal key={benefit} delay={i * .08}><div className="flex min-h-36 flex-col justify-between rounded-2xl border border-white/10 bg-white/[.035] p-5"><CircleCheck className="size-5 text-cyan"/><p className="max-w-[13rem] font-display text-xl font-medium tracking-[-.04em]">{benefit}</p></div></Reveal>)}</div></section>

    <DemoJourney
      submitted={submitted}
      setSubmitted={setSubmitted}
      demoStep={demoStep}
      setDemoStep={setDemoStep}
      siteStatus={siteStatus}
      setSiteStatus={setSiteStatus}
      companyAge={companyAge}
      setCompanyAge={setCompanyAge}
    />

    <section className="relative px-5 py-32 lg:px-8"><div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(155,140,255,.2),transparent_56%)]"/><Reveal className="mx-auto max-w-5xl text-center"><p className="font-display text-[clamp(3.4rem,9vw,8.5rem)] font-semibold leading-[.82] tracking-[-.085em]">Näe ensin.<br/><span className="text-gradient">Päätä vasta sitten.</span></p><p className="mx-auto mt-8 max-w-md text-white/60">Yksi ajatus riittää alkuun. Katsotaan, millaisen suunnan siitä voisi tehdä.</p><Button onClick={scrollToForm} className="mt-9 px-7 py-4">Pyydä maksuton demo <ArrowRight className="ml-2 size-4" /></Button></Reveal></section>

    <footer className="border-t border-white/10 px-5 py-10 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm sm:flex-row sm:items-center sm:justify-between"><a href="#top" className="font-display text-lg font-bold tracking-[-.06em]">nova<span className="text-cyan">lance</span>.</a><p className="max-w-lg text-xs leading-5 text-white/40">Tämä on itsenäisesti laadittu verkkosivuluonnos, eikä se ole yrityksen virallinen verkkosivusto.</p><a href="#demo" className="text-white/65 hover:text-cyan">Maksuton demo</a></div></footer>
  </main>
}

function DemoJourney({
  submitted, setSubmitted, demoStep, setDemoStep, siteStatus, setSiteStatus, companyAge, setCompanyAge,
}: {
  submitted: boolean
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  demoStep: number
  setDemoStep: React.Dispatch<React.SetStateAction<number>>
  siteStatus: string
  setSiteStatus: React.Dispatch<React.SetStateAction<string>>
  companyAge: string
  setCompanyAge: React.Dispatch<React.SetStateAction<string>>
}) {
  const reduced = useReducedMotion()
  const chooseSiteStatus = (value: string) => { setSiteStatus(value); setDemoStep(1) }
  const chooseCompanyAge = (value: string) => { setCompanyAge(value); setDemoStep(2) }
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true) }
  const cardMotion = reduced ? {} : { whileHover: { y: -5, scale: 1.015 }, whileTap: { scale: .985 } }

  return <section id="demo" className="relative overflow-hidden border-y border-white/10 bg-white/[.025] py-28">
    <div className="absolute right-0 top-0 size-96 rounded-full bg-cyan/10 blur-[110px]" />
    <div className="absolute bottom-0 left-[12%] size-72 rounded-full bg-violet-600/10 blur-[110px]" />
    <div className="grid-field pointer-events-none absolute inset-0 opacity-20" />
    <div className="relative mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[.72fr_1.28fr] lg:px-8">
      <Reveal>
        <p className="eyebrow">Maksuton demo</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.06em] sm:text-6xl">Aloitetaan<br />tilanteestasi.</h2>
        <p className="mt-6 max-w-sm leading-7 text-white/60">Kaksi nopeaa valintaa auttaa muotoilemaan demon juuri oikeasta lähtökohdasta.</p>
        <div className="mt-10 flex items-center gap-4 text-2xl font-display font-semibold tracking-[-.04em] text-white sm:text-3xl"><span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15"><Check className="size-5 text-cyan" /></span> Ei sitoumusta, ei painetta.</div>
        <div className="relative mt-14 hidden h-36 max-w-xs lg:block">
          <motion.div animate={reduced ? {} : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-3 top-7 grid size-20 place-items-center rounded-3xl border border-cyan/30 bg-cyan/10 text-cyan"><Globe2 className="size-8" /></motion.div>
          <motion.div animate={reduced ? {} : { y: [0, 11, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: .4 }} className="absolute left-24 top-0 grid size-16 place-items-center rounded-2xl border border-violet-400/30 bg-violet-400/10 text-violet-300"><Building2 className="size-6" /></motion.div>
          <motion.div animate={reduced ? {} : { y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: .8 }} className="absolute bottom-0 left-40 grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[.06] text-white"><Rocket className="size-5" /></motion.div>
        </div>
      </Reveal>

      <div className="relative rounded-[2rem] border border-white/15 bg-[#11131c]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
        <div className="mb-8 flex items-center gap-2" aria-label={`Vaihe ${Math.min(demoStep + 1, 3)} / 3`}>
          {[0, 1, 2].map((step) => <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${step <= demoStep ? 'bg-cyan shadow-[0_0_16px_rgba(96,230,255,.7)]' : 'bg-white/10'}`} />)}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {submitted ? <motion.div key="success" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .45 }} className="flex min-h-[410px] flex-col justify-center">
            <motion.div initial={reduced ? false : { scale: .6, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 17 }} className="grid size-14 place-items-center rounded-2xl bg-cyan text-ink"><Check className="size-7" /></motion.div>
            <h3 className="mt-7 font-display text-4xl font-semibold tracking-[-.06em]">Pyyntö vastaanotettu</h3>
            <p className="mt-4 max-w-md leading-7 text-white/60">Kiitos — tässä prototyypissä lähetys on simuloitu eikä tietoja välitetä eteenpäin. Oikeassa toteutuksessa pyyntö ohjattaisiin sovittuun kanavaan.</p>
            <Button variant="ghost" className="mt-8 w-fit" onClick={() => { setSubmitted(false); setDemoStep(0); setSiteStatus(''); setCompanyAge('') }}>Lähetä uusi pyyntö</Button>
          </motion.div> : demoStep === 0 ? <motion.div key="situation" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: .38 }}>
            <div className="flex items-center gap-3 text-cyan"><span className="grid size-9 place-items-center rounded-xl border border-cyan/30 bg-cyan/10"><Globe2 className="size-4" /></span><span className="text-xs font-semibold uppercase tracking-[.16em]">Vaihe 1 / 2</span></div>
            <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-.055em] sm:text-4xl">Mikä on tilanteesi?</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">Valitse lähtökohta — eteneminen tapahtuu heti valinnan jälkeen.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[['Minulla on jo verkkosivut', 'Tarkastellaan, miten nykyinen sivu voisi kehittyä.', Globe2], ['Minulla ei ole vielä sivuja', 'Luodaan ensimmäiselle digitaaliselle ilmeelle suunta.', Rocket]].map(([title, text, Icon], index) => <motion.button {...cardMotion} type="button" key={title as string} onClick={() => chooseSiteStatus(title as string)} className="group relative min-h-48 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-5 text-left outline-none transition hover:border-cyan/60 hover:bg-cyan/[.06] focus-visible:ring-2 focus-visible:ring-cyan">
                <div className="absolute -right-7 -top-7 size-24 rounded-full bg-cyan/0 blur-2xl transition group-hover:bg-cyan/20" />
                <span className={`grid size-11 place-items-center rounded-xl border ${index === 0 ? 'border-cyan/30 bg-cyan/10 text-cyan' : 'border-violet-400/30 bg-violet-400/10 text-violet-300'}`}><Icon className="size-5" /></span>
                <span className="mt-8 block font-display text-xl font-medium tracking-[-.04em]">{title as string}</span><span className="mt-2 block text-sm leading-5 text-white/50">{text as string}</span>
                <ArrowRight className="absolute bottom-5 right-5 size-4 text-white/35 transition group-hover:translate-x-1 group-hover:text-cyan" />
              </motion.button>)}
            </div>
          </motion.div> : demoStep === 1 ? <motion.div key="age" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: .38 }}>
            <button type="button" onClick={() => setDemoStep(0)} className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"><ArrowLeft className="size-4" /> Muuta tilannetta</button>
            <div className="mt-5 flex items-center gap-3 text-violet-300"><span className="grid size-9 place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10"><CalendarDays className="size-4" /></span><span className="text-xs font-semibold uppercase tracking-[.16em]">Vaihe 2 / 2</span></div>
            <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-.055em] sm:text-4xl">Kuinka vanha yrityksesi on?</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">Tämä auttaa meitä hahmottamaan, mistä tarina alkaa.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['0–5 vuotta', '5–10 vuotta', '10–20 vuotta', '+20 vuotta'].map((age, index) => <motion.button {...cardMotion} type="button" key={age} onClick={() => chooseCompanyAge(age)} className="group relative min-h-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[.035] p-4 text-left outline-none transition hover:border-violet-400/60 hover:bg-violet-400/[.07] focus-visible:ring-2 focus-visible:ring-violet-300"><span className="absolute right-4 top-4 text-xs text-white/25">0{index + 1}</span><span className="block font-display text-2xl font-medium tracking-[-.05em]">{age}</span><span className="mt-3 block h-px w-8 bg-violet-300/50 transition group-hover:w-16" /></motion.button>)}
            </div>
          </motion.div> : <motion.div key="form" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .4 }}>
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-cyan">Yhteystiedot</p><h3 className="mt-2 font-display text-3xl font-semibold tracking-[-.055em]">Viimeinen vaihe.</h3></div><button type="button" onClick={() => setDemoStep(1)} className="text-sm text-white/50 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan">Muuta valintoja</button></div>
            <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1.5 text-xs text-cyan">{siteStatus}</span><span className="rounded-full border border-violet-400/25 bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">{companyAge}</span></div>
            <motion.form onSubmit={submit} className="mt-7 grid gap-5" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}>
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Yrityksen nimi" name="company" autoComplete="organization" required /><Field label="Sähköposti" name="email" type="email" autoComplete="email" required /></div>
              <Field label="Nykyinen verkkosivu tai “ei verkkosivua”" name="website" placeholder="https://... / ei verkkosivua" required />
              <div className="grid gap-5 sm:grid-cols-2"><Field label="Puhelinnumero (valinnainen)" name="phone" type="tel" autoComplete="tel" /><Field label="Lisätiedot (valinnainen)" name="notes" /></div>
              <Button type="submit" className="mt-2 w-full sm:w-fit">Pyydä maksuton demo <ArrowRight className="ml-2 size-4" /></Button>
            </motion.form>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </section>
}

function Field({ label, name, textarea, ...props }: { label: string; name: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  const shared = 'mt-2 w-full rounded-xl border border-white/10 bg-white/[.045] px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-cyan/70 focus:ring-1 focus:ring-cyan/70'
  return <label className="block text-sm font-medium text-white/85">{label}{textarea ? <textarea name={name} className={`${shared} min-h-24 resize-y`} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} /> : <input name={name} className={shared} {...props} />}</label>
}
