import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';
import Button from '../ui/Button';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Blueprint Reveal — stagger entrance for text elements
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-label', {
        y: 30,
        opacity: 0,
        duration: 0.5,
      })
        .from('.hero-heading', {
          y: 40,
          opacity: 0,
          duration: 0.7,
        }, '-=0.3')
        .from('.hero-description', {
          y: 30,
          opacity: 0,
          duration: 0.5,
        }, '-=0.4')
        .from('.hero-cta', {
          y: 20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
          clearProps: 'all',
        }, '-=0.3');

      // Core Spire entrance — scale up with reveal
      gsap.from('.hero-sphere', {
        scale: 0.5,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.2,
        clearProps: 'opacity',
      });

      // Data shards converge toward center
      gsap.from('.spire-shard', {
        scale: 0,
        opacity: 0,
        stagger: { each: 0.1, from: 'edges' },
        duration: 0.8,
        ease: 'back.out(1.4)',
        delay: 0.6,
        clearProps: 'all',
      });

      // Energy veins draw in
      gsap.from('.spire-vein', {
        scaleY: 0,
        opacity: 0,
        transformOrigin: 'bottom center',
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      });

      // Singularity core pulse in
      gsap.from('.spire-singularity', {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        delay: 1.2,
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: '.hero-sphere',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        animation: gsap.to('.hero-sphere', {
          y: -40,
          ease: 'none',
        }),
      });
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface-dim pt-20"
    >
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(63,229,108,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <SectionLabel className="hero-label">The Kinetic Architect</SectionLabel>

          <h1 className="hero-heading font-serif text-4xl font-bold leading-[1.1] tracking-tight text-on-surface sm:text-5xl lg:text-6xl">
            GattaiTech: Fusing Vision into{' '}
            <span className="bg-gradient-to-r from-primary-container to-primary bg-clip-text text-transparent italic">
              Integrated
            </span>{' '}
            Custom Software.
          </h1>

          <p className="hero-description max-w-lg font-sans text-base leading-relaxed text-on-surface-muted sm:text-lg">
            We collaborate with global enterprises to build high-performance,
            intelligent applications that seamlessly unite complex functionality
            and premium user experience.
          </p>

          <div className="mt-2 flex flex-wrap gap-4">
            <Button variant="energy" href="#properties" className="hero-cta">
              Explore Services
            </Button>
            <Button variant="outline" href="#insights" className="hero-cta">
              Talk to an Expert
            </Button>
          </div>
        </div>

        {/* Right Visual — The Core Spire */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="hero-sphere relative flex h-[420px] w-[340px] items-center justify-center sm:h-[520px] sm:w-[420px] lg:h-[600px] lg:w-[480px]">

            {/* === AMBIENT GLOW LAYER === */}
            <div className="pointer-events-none absolute inset-0">
              {/* Soft green rim light from right */}
              <div className="absolute -right-10 top-1/4 h-1/2 w-1/3 rounded-full bg-primary/8 blur-[80px]" />
              {/* Soft ambient from left */}
              <div className="absolute -left-10 top-1/3 h-1/3 w-1/4 rounded-full bg-primary/4 blur-[60px]" />
              {/* Gold accent glow at center */}
              <div className="absolute left-1/3 top-1/3 h-1/4 w-1/4 rounded-full bg-secondary/6 blur-[50px]" />
            </div>

            {/* === DOUBLE-HELIX ENERGY STRANDS (Möbius Spiral Energy) === */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 480 600" fill="none">
              <defs>
                <linearGradient id="helixGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3FE56C" stopOpacity="0" />
                  <stop offset="20%" stopColor="#3FE56C" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#3FE56C" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#00C853" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3FE56C" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="helixGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E9C349" stopOpacity="0" />
                  <stop offset="30%" stopColor="#E9C349" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#E9C349" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#E9C349" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E9C349" stopOpacity="0" />
                </linearGradient>
                <filter id="helixGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Helix strand 1 — clockwise spiral */}
              <path
                className="spire-vein animate-helix-flow"
                d="M240,40 C290,100 320,140 290,180 C260,220 200,230 210,280 C220,330 290,340 300,390 C310,440 270,500 240,560"
                stroke="url(#helixGreen)"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#helixGlow)"
              />
              {/* Helix strand 2 — counter-clockwise */}
              <path
                className="spire-vein animate-helix-flow-reverse"
                d="M240,40 C190,100 160,140 190,180 C220,220 280,230 270,280 C260,330 190,340 180,390 C170,440 210,500 240,560"
                stroke="url(#helixGold)"
                strokeWidth="1"
                strokeLinecap="round"
                filter="url(#helixGlow)"
              />

              {/* Energy nodes at intersection points */}
              <circle cx="240" cy="180" r="3" fill="#3FE56C" className="animate-energy-pulse" />
              <circle cx="240" cy="280" r="3" fill="#E9C349" className="animate-energy-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="240" cy="390" r="3" fill="#3FE56C" className="animate-energy-pulse" style={{ animationDelay: '2s' }} />
            </svg>

            {/* === THE CORE SPIRE STRUCTURE === */}
            <div className="relative z-10 flex flex-col items-center gap-3" style={{ perspective: '800px' }}>

              {/* Top Shard — floating above, converging */}
              <div className="spire-shard" style={{ animation: 'shardFloat 5s ease-in-out infinite' }}>
                <div
                  className="h-10 w-20 sm:h-12 sm:w-24"
                  style={{
                    background: 'linear-gradient(135deg, #1C1B1B 0%, #2A2A2A 50%, #1C1B1B 100%)',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                    boxShadow: '0 0 30px rgba(63, 229, 108, 0.06)',
                  }}
                >
                  {/* Gold circuitry etching */}
                  <div className="flex h-full items-center justify-center gap-1.5 px-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
                    <div className="h-1 w-1 rounded-full bg-secondary/60" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Upper Plate — matte black interlocking */}
              <div className="spire-shard" style={{ animation: 'shardFloat 6s ease-in-out infinite 0.5s' }}>
                <div
                  className="h-14 w-28 sm:h-16 sm:w-36"
                  style={{
                    background: 'linear-gradient(180deg, #20201F 0%, #131313 100%)',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1 px-4">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="flex w-full gap-1">
                      <div className="h-2 flex-1 bg-surface-high/60" />
                      <div className="h-2 w-3 bg-primary/20" />
                      <div className="h-2 flex-1 bg-surface-high/60" />
                    </div>
                    <div className="h-px w-2/3 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Middle Core Section — widest part of the spire */}
              <div className="spire-shard relative">
                <div
                  className="h-20 w-36 sm:h-24 sm:w-44"
                  style={{
                    background: 'linear-gradient(180deg, #131313 0%, #0E0E0E 50%, #131313 100%)',
                    clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
                  }}
                >
                  {/* Internal structure lines */}
                  <div className="flex h-full flex-col items-center justify-center gap-1.5 px-5">
                    <div className="flex w-full items-center gap-2">
                      <div className="h-px flex-1 bg-primary/25" />
                      <div className="h-1.5 w-1.5 rotate-45 bg-primary/40" />
                      <div className="h-px flex-1 bg-primary/25" />
                    </div>
                    <div className="flex w-full gap-1">
                      <div className="h-3 flex-1 rounded-sm bg-surface-high/40" />
                      <div className="h-3 w-4 rounded-sm bg-primary/15 shadow-[inset_0_0_4px_rgba(63,229,108,0.2)]" />
                      <div className="h-3 flex-1 rounded-sm bg-surface-high/40" />
                      <div className="h-3 w-4 rounded-sm bg-secondary/10" />
                      <div className="h-3 flex-1 rounded-sm bg-surface-high/40" />
                    </div>
                    <div className="h-px w-4/5 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                    <div className="flex w-full gap-1">
                      <div className="h-2 flex-1 rounded-sm bg-surface-high/30" />
                      <div className="h-2 flex-1 rounded-sm bg-surface-high/30" />
                      <div className="h-2 flex-1 rounded-sm bg-surface-high/30" />
                    </div>
                  </div>
                </div>

                {/* === THE SINGULARITY — green-gold fusion at the heart === */}
                <div className="spire-singularity absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {/* Outer pulse ring */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-singularity-pulse" />
                    <div className="absolute -inset-2 rounded-full bg-primary/8 blur-xl animate-singularity-pulse" style={{ animationDelay: '0.5s' }} />
                    {/* Gold inner ring */}
                    <div className="absolute inset-1 rounded-full border border-secondary/50" />
                    {/* Core point */}
                    <div className="relative h-3 w-3 rounded-full bg-gradient-to-br from-primary via-secondary to-primary shadow-[0_0_20px_rgba(63,229,108,0.8),0_0_40px_rgba(233,195,73,0.3)]" />
                  </div>
                </div>
              </div>

              {/* Lower Plate — tapers down */}
              <div className="spire-shard" style={{ animation: 'shardFloat 5.5s ease-in-out infinite 1s' }}>
                <div
                  className="h-14 w-28 sm:h-16 sm:w-36"
                  style={{
                    background: 'linear-gradient(180deg, #131313 0%, #20201F 100%)',
                    clipPath: 'polygon(5% 0%, 95% 0%, 85% 100%, 15% 100%)',
                  }}
                >
                  <div className="flex h-full flex-col items-center justify-center gap-1 px-4">
                    <div className="flex w-full gap-1">
                      <div className="h-2 flex-1 bg-surface-high/50" />
                      <div className="h-2 w-2 bg-secondary/30" />
                      <div className="h-2 flex-1 bg-surface-high/50" />
                    </div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Bottom Shard — narrowest */}
              <div className="spire-shard" style={{ animation: 'shardFloat 4.5s ease-in-out infinite 1.5s' }}>
                <div
                  className="h-10 w-16 sm:h-12 sm:w-20"
                  style={{
                    background: 'linear-gradient(135deg, #2A2A2A 0%, #1C1B1B 100%)',
                    clipPath: 'polygon(10% 0%, 90% 0%, 70% 100%, 30% 100%)',
                    boxShadow: '0 0 30px rgba(63, 229, 108, 0.04)',
                  }}
                >
                  <div className="flex h-full items-center justify-center px-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* === CONVERGING DATA SHARDS (floating toward center) === */}
            {/* Left shard — gold rimmed cube */}
            <div className="spire-shard absolute left-[5%] top-[30%] sm:left-[8%]" style={{ animation: 'shardConverge 8s ease-in-out infinite' }}>
              <div className="h-10 w-10 rotate-12 border border-secondary/30 bg-surface-dim/90 p-1.5 transition-all duration-700 hover:border-secondary/60 hover:shadow-[0_0_20px_rgba(233,195,73,0.2)]">
                <div className="h-full w-full bg-surface-high/50">
                  <div className="flex h-full flex-col items-center justify-center gap-0.5">
                    <div className="h-0.5 w-3/4 bg-secondary/40" />
                    <div className="h-0.5 w-1/2 bg-secondary/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right shard — green data prism */}
            <div className="spire-shard absolute right-[5%] top-[45%] sm:right-[8%]" style={{ animation: 'shardConverge 7s ease-in-out infinite 1s' }}>
              <div className="h-12 w-8 -rotate-6 bg-primary/10 p-0.5 transition-all duration-700 hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(63,229,108,0.15)]">
                <div className="flex h-full w-full flex-col gap-0.5 bg-surface-dim p-1">
                  <div className="h-0.5 w-full bg-primary/50" />
                  <div className="h-0.5 w-2/3 bg-primary/25" />
                  <div className="h-0.5 w-full bg-primary/50" />
                </div>
              </div>
            </div>

            {/* Top-right floating shard */}
            <div className="spire-shard absolute right-[15%] top-[10%] sm:right-[18%]" style={{ animation: 'shardConverge 9s ease-in-out infinite 2s' }}>
              <div className="h-7 w-7 rotate-45 bg-surface-high/70 ghost-border transition-all duration-700 hover:bg-surface-high">
                <div className="flex h-full items-center justify-center">
                  <div className="h-2 w-2 -rotate-45 rounded-full bg-primary/30" />
                </div>
              </div>
            </div>

            {/* Bottom-left floating shard */}
            <div className="spire-shard absolute bottom-[12%] left-[12%] sm:left-[15%]" style={{ animation: 'shardConverge 6.5s ease-in-out infinite 0.5s' }}>
              <div className="h-8 w-12 -rotate-3 bg-surface/80 p-1 ghost-border transition-all duration-700 hover:shadow-[0_0_15px_rgba(63,229,108,0.1)]">
                <div className="flex h-full gap-0.5">
                  <div className="flex-1 bg-surface-high/40" />
                  <div className="w-1 bg-primary/20" />
                  <div className="flex-1 bg-surface-high/40" />
                </div>
              </div>
            </div>

            {/* === GOLD CIRCUITRY TRACES (etched lines) === */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 480 600" fill="none">
              {/* Horizontal circuit traces */}
              <line x1="60" y1="200" x2="180" y2="280" stroke="#E9C349" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="420" y1="220" x2="300" y2="290" stroke="#E9C349" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="50" y1="380" x2="190" y2="330" stroke="#E9C349" strokeWidth="0.3" strokeDasharray="2 8" />
              <line x1="430" y1="400" x2="290" y2="340" stroke="#E9C349" strokeWidth="0.3" strokeDasharray="2 8" />
              {/* Subtle green traces */}
              <line x1="100" y1="150" x2="200" y2="240" stroke="#3FE56C" strokeWidth="0.3" strokeDasharray="4 10" />
              <line x1="380" y1="160" x2="280" y2="250" stroke="#3FE56C" strokeWidth="0.3" strokeDasharray="4 10" />
            </svg>

          </div>
        </div>
      </div>
    </section>
  );
}
