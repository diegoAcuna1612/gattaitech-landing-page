import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';
import ServiceCard from '../ui/ServiceCard';

const services = [
  {
    title: 'Custom Web Applications',
    description:
      'Bespoke, scalable web experiences engineered for high-concurrency and critical infrastructure.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3.1 3.1a.75.75 0 010 1.06l-3.1 3.1m4.5 1.5h4.5M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    title: 'AI & Machine Learning',
    description:
      'Pioneering predictive intelligence and processing power to fuel next-generation solutions.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    title: 'Cloud Architecture',
    description:
      'High-performance IT ecosystems executing across global data centers with zero-downtime guarantees.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Platforms',
    description:
      'Unified backend solutions optimized for massive organizational scalability.',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 3v18m16.5-18v18M5.25 3h13.5M5.25 7.5h13.5M5.25 12h13.5M5.25 16.5h13.5" />
      </svg>
    ),
  },
];

export default function PrecisionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header reveal
      gsap.from('.precision-header', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger — Blueprint Reveal from bottom
      gsap.from('.precision-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.precision-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="previews" className="bg-surface-dim py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="precision-header mb-16">
          <SectionLabel className="mb-4 block">Our Expertise</SectionLabel>
          <h2 className="font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl">
            Precision Engineering
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className="precision-card"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
