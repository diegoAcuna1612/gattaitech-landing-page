import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export default function FusionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Blueprint Reveal — heading and paragraph
      gsap.from('.fusion-text', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Fusion visual — scale in from center
      gsap.from('.fusion-visual', {
        scale: 0.6,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        clearProps: 'opacity',
        scrollTrigger: {
          trigger: '.fusion-visual',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Orbiting fragments entrance — stagger from different angles
      gsap.from('.fusion-fragment', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.fusion-visual',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Connection lines draw in
      gsap.from('.fusion-connection', {
        scaleY: 0,
        transformOrigin: 'center center',
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fusion-visual',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax depth shift
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        animation: gsap.to('.fusion-visual', {
          y: -30,
          ease: 'none',
        }),
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="properties" className="bg-surface-low py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <h2 className="fusion-text font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
              Complejidad Simplificada mediante la Fusión
            </h2>
            <p className="fusion-text mt-6 max-w-lg font-sans text-base leading-relaxed text-on-surface-muted">
              La esencia de &quot;Gattai&quot; reside en la integración fluida de servicios fragmentados. Nos especializamos en unificar UI, infraestructura en la nube y sistemas heredados en un único producto digital de alta velocidad.
            </p>
          </div>

          {/* Right — Fusion Reactor Visual */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="fusion-visual relative flex h-[340px] w-[340px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[460px] lg:w-[460px]">

              {/* Anillos concéntricos giratorios — representan la "fusión" */}
              {/* Anillo externo — rotación lenta */}
              <div className="absolute inset-0 animate-spiral-rotate opacity-25">
                <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
                  <circle cx="200" cy="200" r="180" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="8 12" />
                  <circle cx="200" cy="200" r="160" stroke="#3FE56C" strokeWidth="0.3" strokeDasharray="4 20" />
                </svg>
              </div>

              {/* Anillo medio — rotación inversa */}
              <div className="absolute inset-[15%] opacity-35" style={{ animation: 'spiralRotate 15s linear infinite reverse' }}>
                <svg viewBox="0 0 300 300" className="h-full w-full" fill="none">
                  <circle cx="150" cy="150" r="130" stroke="#E9C349" strokeWidth="0.5" strokeDasharray="6 14" />
                  <circle cx="150" cy="150" r="110" stroke="#3FE56C" strokeWidth="0.3" strokeDasharray="3 16" />
                </svg>
              </div>

              {/* Anillo interno — rotación rápida */}
              <div className="absolute inset-[30%] opacity-50" style={{ animation: 'spiralRotate 10s linear infinite' }}>
                <svg viewBox="0 0 200 200" className="h-full w-full" fill="none">
                  <circle cx="100" cy="100" r="80" stroke="#3FE56C" strokeWidth="0.8" strokeDasharray="2 8" />
                </svg>
              </div>

              {/* Líneas de conexión — representan integración de sistemas */}
              <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 400 400" fill="none">
                <line x1="200" y1="40" x2="200" y2="360" stroke="#3FE56C" strokeWidth="0.5" className="fusion-connection" />
                <line x1="40" y1="200" x2="360" y2="200" stroke="#3FE56C" strokeWidth="0.5" className="fusion-connection" />
                <line x1="80" y1="80" x2="320" y2="320" stroke="#E9C349" strokeWidth="0.3" className="fusion-connection" />
                <line x1="320" y1="80" x2="80" y2="320" stroke="#E9C349" strokeWidth="0.3" className="fusion-connection" />
              </svg>

              {/* Fragmento 1: UI Module — top-left */}
              <div className="fusion-fragment absolute left-[10%] top-[12%] h-16 w-16 rotate-12">
                <div className="h-full w-full rounded-md bg-surface-high p-2 shadow-ambient ghost-border transition-all duration-500 hover:scale-110 hover:shadow-glow-primary">
                  <div className="flex h-full flex-col gap-1">
                    <div className="h-1 w-full rounded-full bg-primary" />
                    <div className="h-1 w-3/4 rounded-full bg-primary/40" />
                    <div className="flex flex-1 gap-1">
                      <div className="flex-1 rounded-sm bg-surface" />
                      <div className="flex-1 rounded-sm bg-primary/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fragmento 2: Cloud Infrastructure — top-right */}
              <div className="fusion-fragment absolute right-[12%] top-[18%] h-14 w-14 -rotate-6">
                <div className="flex h-full w-full items-center justify-center rounded-full border border-outline-variant/30 bg-surface-dim/80 transition-all duration-500 hover:border-primary/40 hover:shadow-glow-primary">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-primary/60" fill="none" strokeWidth={1.2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                  </svg>
                </div>
              </div>

              {/* Fragmento 3: Data Prism — bottom-right */}
              <div className="fusion-fragment absolute bottom-[15%] right-[15%] h-18 w-12 rotate-6">
                <div className="h-full w-full bg-primary/15 p-1 transition-all duration-500 hover:bg-primary/25">
                  <div className="flex h-full w-full flex-col justify-center gap-1 bg-surface-dim p-1.5">
                    <div className="h-0.5 w-full bg-primary" />
                    <div className="h-0.5 w-2/3 bg-primary/50" />
                    <div className="h-0.5 w-full bg-primary" />
                    <div className="h-0.5 w-1/2 bg-secondary/60" />
                    <div className="h-0.5 w-4/5 bg-primary/40" />
                  </div>
                </div>
              </div>

              {/* Fragmento 4: Legacy Core — bottom-left */}
              <div className="fusion-fragment absolute bottom-[18%] left-[14%] h-14 w-14 -rotate-12">
                <div className="h-full w-full rounded-md bg-surface p-2 ghost-border transition-all duration-500 hover:scale-110">
                  <svg viewBox="0 0 24 24" className="h-full w-full text-secondary/50" fill="none" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
                  </svg>
                </div>
              </div>

              {/* Núcleo central brillante — punto de fusión */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center">
                {/* Glow pulsante */}
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                <div className="absolute inset-1 rounded-full bg-primary/10 blur-md" />
                
                {/* Icono central estilo gattai */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-surface-dim border border-primary/40">
                  <svg viewBox="0 0 32 32" className="h-8 w-8 animate-energy-pulse" fill="none">
                    {/* Forma abstracta de fusión — hexágono con conexiones */}
                    <path d="M16 4L26 10V22L16 28L6 22V10L16 4Z" stroke="#3FE56C" strokeWidth="1.5" />
                    <path d="M16 10L21 13V19L16 22L11 19V13L16 10Z" stroke="#E9C349" strokeWidth="1" />
                    <circle cx="16" cy="16" r="2" fill="#3FE56C" />
                    {/* Líneas de conexión al exterior */}
                    <line x1="16" y1="4" x2="16" y2="10" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="26" y1="10" x2="21" y2="13" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="2 2" />
                    <line x1="6" y1="10" x2="11" y2="13" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="2 2" />
                  </svg>
                </div>
              </div>

              {/* Partículas flotantes decorativas */}
              <div className="absolute left-[45%] top-[5%] h-2 w-2 rounded-full bg-primary/40" style={{ animation: 'float 4s ease-in-out infinite' }} />
              <div className="absolute right-[8%] top-[50%] h-1.5 w-1.5 rounded-full bg-secondary/50" style={{ animation: 'float 5s ease-in-out infinite 1s' }} />
              <div className="absolute left-[8%] bottom-[40%] h-1 w-1 rounded-full bg-primary/60" style={{ animation: 'float 3.5s ease-in-out infinite 0.5s' }} />
              <div className="absolute right-[40%] bottom-[5%] h-2 w-2 rounded-full bg-secondary/30" style={{ animation: 'float 4.5s ease-in-out infinite 2s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
