import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import FusionSection from './components/sections/FusionSection'
import PrecisionSection from './components/sections/PrecisionSection'
import BlueprintSection from './components/sections/BlueprintSection'
import SuccessSection from './components/sections/SuccessSection'
import CTASection from './components/sections/CTASection'

// Global GSAP setup
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ ease: 'power3.inOut', duration: 0.6 })

export default function App() {
  const layoutRef = useRef<HTMLDivElement>(null)

  // Data-Stream Loader — scroll-driven pulse animation
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to('.stream-pulse', {
        yPercent: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.main-layout',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })
    })
  }, { scope: layoutRef })

  return (
    <div ref={layoutRef} className="main-layout relative min-h-screen bg-surface-dim">
      <Navbar />

      {/* Data-Stream Loader — Signature vertical scroll indicator */}
      <div className="fixed left-6 top-0 z-40 hidden h-screen lg:block">
        <div className="relative h-full w-px bg-outline-variant/15">
          <div className="stream-pulse absolute top-0 left-0 h-10 w-full data-stream" />
        </div>
      </div>

      <main>
        <HeroSection />
        <FusionSection />
        <PrecisionSection />
        <BlueprintSection />
        <SuccessSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
