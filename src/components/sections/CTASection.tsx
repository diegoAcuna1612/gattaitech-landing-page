import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../ui/Button';

export default function CTASection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.cta-element', {
        y: 30,
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
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="insights"
      className="relative overflow-hidden bg-surface-low py-24 lg:py-32"
    >
      {/* Background gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(63,229,108,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
        <h2 className="cta-element font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
          Ready to Fuse Your Vision?
        </h2>

        <p className="cta-element mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-on-surface-muted">
          Let's engineer the high-performance digital future. If you're ready,
          our architects are ready.
        </p>

        <div className="cta-element mt-10">
          <Button variant="energy" className="px-8 py-4 text-base">
            Initiate Project Consult
          </Button>
        </div>
      </div>
    </section>
  );
}
