export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="font-display text-lg font-bold tracking-[-.06em]">
          nova<span className="text-cyan">lance</span>.
        </a>
        <p className="max-w-lg text-xs leading-5 text-white/40">
          Tämä on itsenäisesti laadittu verkkosivuluonnos, eikä se ole yrityksen virallinen verkkosivusto.
        </p>
        <a href="#demo" className="text-white/65 hover:text-cyan">
          Maksuton demo
        </a>
      </div>
    </footer>
  )
}