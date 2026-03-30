import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';
import { siPhp, siLaravel, siDocker, siPostgresql, siFilament, siReact, siNestjs, siSupabase, siTailwindcss } from 'simple-icons';

/* ─── Icon data type ─── */
interface TechIcon {
  title: string;
  path: string;
  hex: string;          // brand colour (no #)
  initialX: number;     // % of swarm zone width
  initialY: number;     // % of swarm zone height
}

/* ─── Project data ─── */
interface Project {
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  icons: TechIcon[];
  status: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    title: 'SpiralWash',
    subtitle: 'SaaS · Multi-tenant',
    metric: '90%',
    metricLabel: 'Reducción en tiempos operativos',
    description:
      'Plataforma integral para redes de car-wash: facturación, control de inventario y métricas en tiempo real.',
    status: 'En Producción',
    imageUrl: '/carwash-dashboard.png',
    link: 'https://spiralwash.com/',
    icons: [
      { title: siPhp.title,        path: siPhp.path,        hex: siPhp.hex,        initialX: 15, initialY: 20 },
      { title: siLaravel.title,    path: siLaravel.path,    hex: siLaravel.hex,    initialX: 70, initialY: 10 },
      { title: siDocker.title,     path: siDocker.path,     hex: siDocker.hex,     initialX: 45, initialY: 55 },
      { title: siPostgresql.title, path: siPostgresql.path, hex: siPostgresql.hex, initialX: 80, initialY: 50 },
      { title: siFilament.title,   path: siFilament.path,   hex: siFilament.hex,   initialX: 25, initialY: 70 },
    ],
  },
 {
    title: 'Don Paleto',
    subtitle: 'Landing Page · E-commerce App',
    metric: '100%',
    metricLabel: 'Disponibilidad Serverless',
    description: 'Donde la alta repostería encuentra la alta ingeniería. Un despliegue reactivo que automatiza el flujo de ventas y garantiza la seguridad de la información.',
    status: 'En Producción',
    imageUrl: '/donpaleto.png',
    link: 'https://donpaleto.com.pe/',
    icons: [
      { title: siReact.title,     path: siReact.path,     hex: siReact.hex,     initialX: 20, initialY: 15 },
      { title: siNestjs.title,    path: siNestjs.path,    hex: siNestjs.hex,    initialX: 75, initialY: 25 },
      { title: siSupabase.title,  path: siSupabase.path,  hex: siSupabase.hex,  initialX: 50, initialY: 50 },
      //{ title: siAmazonaws.title, path: siAmazonaws.path, hex: siAmazonaws.hex, initialX: 85, initialY: 70 },
      { title: siTailwindcss.title, path: siTailwindcss.path, hex: siTailwindcss.hex, initialX: 30, initialY: 80 },
    ],
  }
  
];

/* ────────────────────────────────────────────
   SwarmCard — isolated card with its own GSAP
   ──────────────────────────────────────────── */

function SwarmCard({ project }: { project: Project }) {
  const cardRef   = useRef<HTMLDivElement>(null);
  const swarmRef  = useRef<HTMLDivElement>(null);
  const iconsRef  = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef  = useRef<HTMLImageElement>(null);
  const floatTweens = useRef<gsap.core.Tween[]>([]);

  /* helper: random float in range */
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  /* Start the organic floating animation for all icons */
  const startFloating = useCallback(() => {
    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      const icon = project.icons[i];

      // reset to scattered positions
      gsap.set(el, {
        x: 0, y: 0,
        left: `${icon.initialX}%`,
        top:  `${icon.initialY}%`,
        scale: 1,
        opacity: 0.5,
      });

      // individual yoyo tween per axis
      const tweenX = gsap.to(el, {
        x: `random(-30, 30)`,
        duration: rand(2.5, 4),
        delay: rand(0, 1.5),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const tweenY = gsap.to(el, {
        y: `random(-25, 25)`,
        duration: rand(3, 5),
        delay: rand(0, 2),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      floatTweens.current.push(tweenX, tweenY);
    });
  }, [project.icons]);

  /* Kill every float tween */
  const killFloating = useCallback(() => {
    floatTweens.current.forEach(t => t.kill());
    floatTweens.current = [];
  }, []);

  /* ─── GSAP Lifecycle ─── */
  useGSAP(() => {
    startFloating();
    return () => killFloating();
  }, { scope: cardRef });

  /* ─── Hover handlers ─── */
  const handleMouseEnter = () => {
    killFloating();

    const count = project.icons.length;
    const swarmEl = swarmRef.current;
    if (!swarmEl) return;

    // Animate background image: grayscale → color, opacity up
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        filter: 'grayscale(0)',
        opacity: 1,
        scale: 1.05,
        duration: 0.7,
        ease: 'power2.out',
      });
    }

    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      const slotX = ((i + 0.5) / count) * 100;       // evenly distributed
      const slotY = 78;                                // bottom row

      gsap.to(el, {
        left: `${slotX}%`,
        top:  `${slotY}%`,
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
        delay: i * 0.06,
        onComplete: () => {
          // pulse
          gsap.fromTo(el,
            { scale: 1 },
            { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }
          );
        },
      });
    });
  };

  const handleMouseLeave = () => {
    killFloating();

    // Animate background image back to grayscale
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        filter: 'grayscale(1)',
        opacity: 0.35,
        scale: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    iconsRef.current.forEach((el, i) => {
      if (!el) return;
      const icon = project.icons[i];
      gsap.to(el, {
        left: `${icon.initialX}%`,
        top:  `${icon.initialY}%`,
        x: 0,
        y: 0,
        opacity: 0.5,
        scale: 1,
        duration: 0.45,
        ease: 'power3.out',
        delay: i * 0.04,
        onComplete: () => {
          if (i === project.icons.length - 1) startFloating();
        },
      });
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="success-card group relative flex flex-col overflow-hidden rounded-xl bg-surface ghost-border transition-all duration-500 hover:shadow-[0_0_40px_rgba(63,229,108,0.08)]"
    >
      {/* ── Swarm Zone (clickable) ── */}
      <div
        ref={swarmRef}
        onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
        className="relative h-56 w-full cursor-pointer overflow-hidden bg-gradient-to-b from-surface-low/60 to-surface sm:h-64"
      >
        {/* Background project image */}
        <img
          ref={imageRef}
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="absolute inset-0 z-0 h-full w-full object-cover object-top"
          style={{ filter: 'grayscale(1)', opacity: 0.35 }}
        />

        {/* subtle grid overlay */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* icons */}
        {project.icons.map((icon, i) => (
          <div
            key={icon.title}
            ref={el => { iconsRef.current[i] = el; }}
            className="absolute z-[3] -translate-x-1/2 -translate-y-1/2 transition-[color] duration-500"
            style={{ left: `${icon.initialX}%`, top: `${icon.initialY}%` }}
            title={icon.title}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 drop-shadow-md sm:h-8 sm:w-8"
              style={{ fill: 'currentColor' }}
            >
              <path d={icon.path} />
            </svg>
            {/* brand colour shown via group-hover */}
            <style>{`
              [title="${icon.title}"] { color: rgba(229,226,225,0.55); }
              .group:hover [title="${icon.title}"] { color: #${icon.hex}; }
            `}</style>
          </div>
        ))}

        {/* grid alignment guides — visible on hover */}
        <div className="pointer-events-none absolute bottom-[18%] left-[8%] right-[8%] z-[2] flex justify-around opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {project.icons.map((_, i) => (
            <div key={i} className="h-px w-4 bg-primary/30" />
          ))}
        </div>

        {/* Dark gradient overlay to ensure icons/guides are visible over image */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-surface via-surface/60 to-transparent" />
      </div>

      {/* ── Content Zone ── */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* header row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans text-base font-bold text-on-surface">
              {project.title}
            </h3>
            <p className="mt-0.5 font-mono text-[11px] tracking-wide text-on-surface-muted">
              {project.subtitle}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] font-semibold text-primary">
            {project.status}
          </span>
        </div>

        {/* description */}
        <p className="text-sm leading-relaxed text-on-surface-muted">
          {project.description}
        </p>

        {/* metric bar */}
        <div className="mt-auto flex items-end gap-3 border-t border-outline-variant/15 pt-4">
          <span className="font-mono text-3xl font-extrabold leading-none text-primary">
            {project.metric}
          </span>
          <span className="pb-1 font-mono text-xs text-on-surface-muted">
            {project.metricLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SuccessSection — Section wrapper
   ════════════════════════════════════════════ */

export default function SuccessSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="case-studies" className="bg-surface-dim py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <SectionLabel className="success-text mb-4 block">Casos de Éxito</SectionLabel>
          <h2 className="success-text font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
            Éxito Integrado
          </h2>
        </div>
        <p className="success-text mb-16 max-w-2xl font-sans text-base leading-relaxed text-on-surface-muted">
          Resultados transformadores para líderes de la industria mediante sistemas integrados y arquitecturas nativas de la nube.
        </p>

        {/* Project Cards */}
        <div className="success-cards-container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <SwarmCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
