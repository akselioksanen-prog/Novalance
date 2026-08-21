import { ArrowRight } from 'lucide-react'

export function TrustStrip() {
  return (
    <section className="border-y border-white/10 bg-white/[.025]">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:gap-8 sm:py-12 sm:grid-cols-3 lg:px-8">
        <p className="font-display text-lg font-medium tracking-tight sm:text-xl">
          Ei tarjouspyyntöä.<br/><span className="text-white/45">Vaan ensimmäinen versio.</span>
        </p>
        <p className="text-sm leading-6 text-white/60">
          Kerro millaiselle yritykselle sivut tehdään. Me tulkitsemme lähtökohdan visuaaliseksi suunnaksi, jota voit arvioida omilla ehdoillasi.
        </p>
        <a 
          href="#demo" 
          className="group flex items-center gap-3 self-center text-sm font-semibold text-cyan"
        >
          Aloita maksutta 
          <span className="grid size-8 place-items-center rounded-full border border-cyan/40 transition group-hover:bg-cyan group-hover:text-ink">
            <ArrowRight className="size-4" />
          </span>
        </a>
      </div>
    </section>
  )
}