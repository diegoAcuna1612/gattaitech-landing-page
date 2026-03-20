import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';

const caseStudies = [
  {
    title: 'Global Alpha Analytics',
    metric: '+80%',
    metricLabel: 'Performance Increase',
    description: 'Real-time data visualization platform for enterprise analytics.',
    gradient: 'from-primary-container/20 to-surface',
  },
  {
    title: 'Gen Stream Marketplace',
    metric: '2.5M+',
    metricLabel: 'Users Onboarded',
    description: 'High-throughput marketplace for digital content distribution.',
    gradient: 'from-secondary/20 to-surface',
  },
  {
    title: 'Unified Backend Platform',
    metric: '99.9%',
    metricLabel: 'Uptime Achieved',
    description: 'Enterprise-grade microservices infrastructure for global operations.',
    gradient: 'from-primary/20 to-surface',
  },
];

export default function SuccessSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header + description reveal
      gsap.from('.success-text', {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Cards stagger from bottom
      gsap.from('.success-card', {
        y: 50,
        opacity: 0,
        stagger: 0.18,
        duration: 0.7,
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.success-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax depth — cards container moves at different speed
      gsap.to('.success-cards-container', {
        y: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="case-studies" className="bg-surface-dim py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <SectionLabel className="success-text mb-4 block">Case Studies</SectionLabel>
          <h2 className="success-text font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
            Integrated Success
          </h2>
        </div>
        <p className="success-text mb-16 max-w-2xl font-sans text-base leading-relaxed text-on-surface-muted">
          Transformative results for industry leaders through integrated
          AI systems and cloud-native architectures.
        </p>

        {/* Case Study Cards */}
        <div className="success-cards-container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="success-card group flex flex-col overflow-hidden rounded-lg bg-surface card-hover"
            >
              {/* Image placeholder with gradient */}
              <div
                className={`flex h-48 items-end bg-gradient-to-b ${study.gradient} p-6`}
              >
                {/* Decorative chart-like element */}
                <div className="flex h-full w-full items-end gap-1.5">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-primary/20 transition-all duration-500 group-hover:bg-primary/40"
                      style={{
                        height: `${20 + Math.sin(i * 0.8) * 30 + i * 4}%`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-1 font-sans text-sm font-semibold text-on-surface">
                  {study.title}
                </h3>
                <p className="mb-4 font-sans text-xs text-on-surface-muted">
                  {study.description}
                </p>

                {/* Metric */}
                <div className="mt-auto flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-primary">
                    {study.metric}
                  </span>
                  <span className="font-mono text-xs text-on-surface-muted">
                    {study.metricLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
