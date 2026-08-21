import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Menu, X } from 'lucide-react'

interface NavigationProps {
  scrollToForm: () => void
}

export function Navigation({ scrollToForm }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="font-display text-4xl font-bold tracking-[-.06em]" aria-label="Novalance etusivu">
          nova<span className="text-cyan">lance</span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-white/65 md:flex">
          <a className="hover:text-white" href="#how">Miten toimii</a>
          <a className="hover:text-white" href="#concept">Konsepti</a>
          <a className="hover:text-white" href="#demo">Demo</a>
          <button 
            onClick={scrollToForm} 
            className="rounded-full border border-white/20 px-4 py-2 text-white transition hover:border-cyan hover:text-cyan"
          >
            Pyydä demo <ArrowRight className="ml-1 inline size-3" />
          </button>
        </div>
        <button 
          aria-label={menuOpen ? 'Sulje valikko' : 'Avaa valikko'} 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="grid size-10 place-items-center rounded-full border border-white/15 md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden border-t border-white/10 bg-ink md:hidden"
          >
            <div className="flex flex-col p-5 text-lg">
              <a onClick={() => setMenuOpen(false)} href="#how" className="py-3">Miten toimii</a>
              <a onClick={() => setMenuOpen(false)} href="#concept" className="py-3">Konsepti</a>
              <button 
                onClick={() => { setMenuOpen(false); scrollToForm() }} 
                className="mt-3 rounded-full bg-white px-5 py-3 text-ink"
              >
                Pyydä maksuton demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}