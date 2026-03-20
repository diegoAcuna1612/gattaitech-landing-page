import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';

const steps = [
  {
    number: '01',
    title: 'Sprint Cero: Fusión',
    description: 'Definimos el MVP y priorizamos el backlog para alinear visión y negocio.',
  },
  {
    number: '02',
    title: 'Arquitectura Adaptativa',
    description: 'Diseñamos planos técnicos flexibles y prototipos rápidos para validar el núcleo.',
  },
  {
    number: '03',
    title: 'Desarrollo Iterativo',
    description: 'Entregamos software funcional en ciclos cortos para una evolución constante.',
  },
  {
    number: '04',
    title: 'CI/CD & Calidad',
    description: 'Automatizamos pruebas y pipelines para garantizar lanzamientos siempre seguros.',
  },
  {
    number: '05',
    title: 'Escala y Aprendizaje',
    description: 'Lanzamos, medimos datos reales e iteramos para maximizar el impacto.',
  },
];
export default function BlueprintSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Header reveal
      gsap.from('.blueprint-header', {
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

      // Steps stagger — Blueprint Reveal: elements "drafted" sequentially
      gsap.from('.blueprint-step', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.blueprint-step',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Connecting line — draw from left to right
      gsap.from('.blueprint-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blueprint-line',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-surface-low py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="blueprint-header mb-16 text-center">
          <SectionLabel className="mb-4 block">Our Methodology</SectionLabel>
          <h2 className="font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl">
            The Kinetic Blueprint
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="blueprint-line absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step) => (
              <div key={step.number} className="blueprint-step relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Number Badge */}
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-sm font-bold text-surface-dim">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="mb-2 font-sans text-sm font-bold text-on-surface">
                  {step.title}
                </h3>
                <p className="font-sans text-xs leading-relaxed text-on-surface-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
