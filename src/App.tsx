import { useReducedMotion } from 'motion/react'
import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { ProcessSection } from './components/ProcessSection'
import { BeforeAfter } from './components/BeforeAfter'
import { Benefits } from './components/Benefits'
import { DemoRequestForm } from './components/DemoRequestForm'
import { ContactInfo } from './components/ContactInfo'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  const reduced = useReducedMotion()
  
  const scrollToForm = () => {
    document.querySelector('#demo')?.scrollIntoView({ 
      behavior: reduced ? 'auto' : 'smooth' 
    })
  }
  
  const scrollToHow = () => {
    document.querySelector('#how')?.scrollIntoView({ 
      behavior: reduced ? 'auto' : 'smooth' 
    })
  }

  return (
    <main className="overflow-hidden bg-ink text-white selection:bg-cyan selection:text-ink">
      <Navigation scrollToForm={scrollToForm} />
      <Hero scrollToForm={scrollToForm} scrollToHow={scrollToHow} />
      <TrustStrip />
      <ProcessSection />
      <BeforeAfter />
      <Benefits />
      <DemoRequestForm />
      <ContactInfo />
      <FinalCTA scrollToForm={scrollToForm} />
      <Footer />
    </main>
  )
}
