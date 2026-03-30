import { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';

/* ─────────────────────────────────────────────────────────
   Domain data
   ───────────────────────────────────────────────────────── */
const domains = [
  {
    id: 'producto',
    label: 'Ingeniería de Producto',
    description:
      'Transformamos ideas en productos digitales rentables en tiempo récord. Construimos plataformas diseñadas para escalar, retener usuarios y acelerar tus ventas, asegurando que tu inversión tecnológica crezca a la par de tu facturación.',
    domainIndex: '01',
  },
  {
    id: 'ia',
    label: 'IA & Automatización',
    description:
      'Convertimos la Inteligencia Artificial en tu mayor ventaja competitiva. Automatizamos operaciones para reducir costos drásticamente e implementamos sistemas inteligentes para hiper-personalizar la experiencia de tus clientes, disparando tus tasas de conversión.',
    domainIndex: '02',
  },
  {
    id: 'cloud',
    label: 'Arquitectura Cloud',
    description:
      'Blindamos tu negocio contra caídas que cuestan ventas. Diseñamos infraestructuras elásticas y ultra-seguras que garantizan total disponibilidad, permitiéndote capturar cada oportunidad de mercado sin importar los picos masivos de tráfico.',
    domainIndex: '03',
  },
  {
    id: 'web3',
    label: 'Tecnologías Emergentes',
    description:
      'Lidera la disrupción en tu industria. Aterrizamos innovaciones como Web3 y redes descentralizadas en modelos de negocio accionables, abriendo nuevas líneas de ingresos y posicionándote años luz por delante de tus competidores.',
    domainIndex: '04',
  },
  {
    id: 'consultoria',
    label: 'Consultoría Estratégica',
    description:
      'Alineamos cada decisión técnica con tus objetivos comerciales. Diseñamos roadmaps de alto impacto que minimizan riesgos, optimizan tu presupuesto y aseguran que tu inversión en software se traduzca directamente en crecimiento empresarial.',
    domainIndex: '05',
  },
];

/* ─────────────────────────────────────────────────────────
   Orbital node positions — pentagon on a 500×500 viewBox
   Percentages relative to the orbital container
   ───────────────────────────────────────────────────────── */
const nodePositions = [
  { cx: 50, cy: 8 },   // top center — Producto
  { cx: 92, cy: 35 },  // top-right — IA
  { cx: 78, cy: 85 },  // bottom-right — Cloud
  { cx: 22, cy: 85 },  // bottom-left — Web3
  { cx: 8, cy: 35 },   // top-left — Consultoría
];

/* ─────────────────────────────────────────────────────────
   Mini SVG icons for each orbital node (simple glyphs)
   ───────────────────────────────────────────────────────── */
function NodeIcon({ id }: { id: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    producto: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="5" width="4" height="2" rx="0.5" fill="currentColor" opacity={0.6} />
        <rect x="4" y="9" width="8" height="1.5" rx="0.5" fill="currentColor" opacity={0.4} />
      </svg>
    ),
    ia: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
        <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1" />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="8" x2="10" y2="5.5" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="8" x2="10" y2="10.5" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
        <path d="M4 12a3 3 0 01-.5-5.96A4 4 0 0111.5 5 3 3 0 0112 12H4z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    web3: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
        <rect x="1" y="6" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <rect x="10" y="6" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="1" />
        <rect x="5.5" y="2" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="0.8" opacity={0.5} />
      </svg>
    ),
    consultoria: (
      <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none">
        <path d="M3 13L8 3l5 10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="8" cy="3" r="1.5" fill="currentColor" opacity={0.5} />
        <line x1="5" y1="9" x2="11" y2="9" stroke="currentColor" strokeWidth="0.8" opacity={0.4} />
      </svg>
    ),
  };
  return <span className="text-primary">{iconMap[id]}</span>;
}

/* ─────────────────────────────────────────────────────────
   SVG Detail Visuals — shown in the detail panel (larger)
   ───────────────────────────────────────────────────────── */

function ProductoVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="104" height="84" rx="4" stroke="#3FE56C" strokeWidth="0.8" opacity={0.5} />
      <rect x="10" y="10" width="22" height="80" fill="#3FE56C" opacity={0.08} />
      <rect x="14" y="16" width="14" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="14" y="22" width="10" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="27" width="12" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="32" width="8" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="37" width="14" height="1.5" rx="0.75" fill="#E9C349" opacity={0.3} />
      <rect x="36" y="12" width="72" height="8" fill="#3FE56C" opacity={0.06} />
      <rect x="40" y="15" width="20" height="2" rx="1" fill="#3FE56C" opacity={0.3} />
      <circle cx="102" cy="16" r="2" fill="#E9C349" opacity={0.4} />
      <rect x="36" y="24" width="36" height="32" rx="2" fill="#3FE56C" opacity={0.06} />
      <rect x="40" y="44" width="4" height="8" fill="#3FE56C" opacity={0.35} />
      <rect x="46" y="38" width="4" height="14" fill="#3FE56C" opacity={0.5} />
      <rect x="52" y="42" width="4" height="10" fill="#E9C349" opacity={0.4} />
      <rect x="58" y="34" width="4" height="18" fill="#3FE56C" opacity={0.6} />
      <rect x="64" y="40" width="4" height="12" fill="#3FE56C" opacity={0.35} />
      <rect x="76" y="24" width="32" height="14" rx="2" fill="#3FE56C" opacity={0.06} />
      <rect x="80" y="28" width="12" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="80" y="33" width="8" height="1.5" rx="0.75" fill="#9E9C9B" opacity={0.3} />
      <rect x="76" y="42" width="32" height="14" rx="2" fill="#E9C349" opacity={0.06} />
      <rect x="80" y="46" width="14" height="2" rx="1" fill="#E9C349" opacity={0.4} />
      <rect x="80" y="51" width="10" height="1.5" rx="0.75" fill="#9E9C9B" opacity={0.3} />
      <rect x="36" y="60" width="36" height="28" rx="2" fill="#3FE56C" opacity={0.04} />
      <rect x="76" y="60" width="32" height="28" rx="2" fill="#E9C349" opacity={0.04} />
      <path d="M42 72 L52 68 L62 74 L68 70" stroke="#3FE56C" strokeWidth="0.8" opacity={0.4} />
      <circle cx="42" cy="72" r="1.5" fill="#3FE56C" opacity={0.5} />
      <circle cx="62" cy="74" r="1.5" fill="#3FE56C" opacity={0.5} />
    </svg>
  );
}

function IAVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      <circle cx="20" cy="22" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="20" cy="42" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="20" cy="62" r="4" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.1} />
      <circle cx="20" cy="82" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="48" cy="30" r="5" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="48" cy="52" r="6" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.1} />
      <circle cx="48" cy="74" r="5" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="76" cy="36" r="5" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="76" cy="58" r="6" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="76" cy="78" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="104" cy="42" r="5" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.2} />
      <circle cx="104" cy="66" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.15} />
      <line x1="24" y1="22" x2="43" y2="30" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="22" x2="43" y2="52" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="42" x2="43" y2="30" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="42" x2="43" y2="52" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="24" y1="42" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="62" x2="43" y2="52" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="62" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="82" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <line x1="53" y1="30" x2="71" y2="36" stroke="#3FE56C" strokeWidth="0.5" opacity={0.35} />
      <line x1="53" y1="30" x2="71" y2="58" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="54" y1="52" x2="71" y2="36" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="54" y1="52" x2="71" y2="58" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="54" y1="52" x2="71" y2="78" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="53" y1="74" x2="71" y2="58" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="53" y1="74" x2="71" y2="78" stroke="#3FE56C" strokeWidth="0.5" opacity={0.35} />
      <line x1="81" y1="36" x2="99" y2="42" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="81" y1="36" x2="99" y2="66" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="82" y1="58" x2="99" y2="42" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="82" y1="58" x2="99" y2="66" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="80" y1="78" x2="99" y2="66" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <circle cx="36" cy="40" r="1" fill="#3FE56C" opacity={0.7} className="animate-energy-pulse" />
      <circle cx="64" cy="47" r="1" fill="#E9C349" opacity={0.6} className="animate-energy-pulse" style={{ animationDelay: '1s' }} />
      <circle cx="92" cy="54" r="1" fill="#3FE56C" opacity={0.7} className="animate-energy-pulse" style={{ animationDelay: '2s' }} />
    </svg>
  );
}

function CloudVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      <rect x="12" y="14" width="28" height="20" rx="2" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="16" y="18" width="8" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="16" y="22" width="12" height="2" rx="1" fill="#3FE56C" opacity={0.25} />
      <circle cx="34" cy="19" r="1.5" fill="#3FE56C" opacity={0.5} />
      <circle cx="34" cy="24" r="1.5" fill="#E9C349" opacity={0.4} />
      <rect x="46" y="10" width="28" height="24" rx="2" stroke="#E9C349" strokeWidth="0.6" fill="#E9C349" fillOpacity={0.04} />
      <rect x="50" y="14" width="10" height="2" rx="1" fill="#E9C349" opacity={0.4} />
      <rect x="50" y="19" width="16" height="2" rx="1" fill="#E9C349" opacity={0.25} />
      <rect x="50" y="24" width="8" height="2" rx="1" fill="#3FE56C" opacity={0.3} />
      <rect x="80" y="14" width="28" height="20" rx="2" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="84" y="18" width="10" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="84" y="22" width="14" height="2" rx="1" fill="#3FE56C" opacity={0.25} />
      <path d="M60 44 L52 48 L52 58 Q52 66 60 70 Q68 66 68 58 L68 48 Z" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.08} />
      <path d="M57 56 L60 59 L66 53" stroke="#3FE56C" strokeWidth="1.2" strokeLinecap="round" opacity={0.6} />
      <line x1="26" y1="34" x2="26" y2="76" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="3 4" opacity={0.3} />
      <line x1="60" y1="70" x2="60" y2="92" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="2 3" opacity={0.3} />
      <line x1="94" y1="34" x2="94" y2="76" stroke="#E9C349" strokeWidth="0.5" strokeDasharray="3 4" opacity={0.25} />
      <line x1="26" y1="76" x2="94" y2="76" stroke="#3FE56C" strokeWidth="0.6" strokeDasharray="4 6" opacity={0.25} />
      <circle cx="26" cy="76" r="2" fill="#3FE56C" opacity={0.4} />
      <circle cx="60" cy="76" r="2" fill="#E9C349" opacity={0.4} />
      <circle cx="94" cy="76" r="2" fill="#3FE56C" opacity={0.4} />
      <rect x="14" y="80" width="24" height="10" rx="2" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="18" y="84" width="10" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.3} />
      <rect x="48" y="80" width="24" height="10" rx="2" fill="#E9C349" fillOpacity={0.06} />
      <rect x="52" y="84" width="12" height="1.5" rx="0.75" fill="#E9C349" opacity={0.3} />
      <rect x="82" y="80" width="24" height="10" rx="2" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="86" y="84" width="8" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.3} />
    </svg>
  );
}

function Web3Visual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      <rect x="8" y="32" width="20" height="16" rx="2" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.08} />
      <rect x="12" y="36" width="8" height="2" rx="1" fill="#E9C349" opacity={0.4} />
      <rect x="12" y="40" width="12" height="2" rx="1" fill="#E9C349" opacity={0.25} />
      <rect x="36" y="22" width="20" height="16" rx="2" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.08} />
      <rect x="40" y="26" width="10" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="40" y="30" width="8" height="2" rx="1" fill="#3FE56C" opacity={0.25} />
      <rect x="64" y="32" width="20" height="16" rx="2" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.08} />
      <rect x="68" y="36" width="12" height="2" rx="1" fill="#E9C349" opacity={0.4} />
      <rect x="68" y="40" width="6" height="2" rx="1" fill="#E9C349" opacity={0.25} />
      <rect x="92" y="22" width="20" height="16" rx="2" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.08} />
      <rect x="96" y="26" width="8" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="96" y="30" width="12" height="2" rx="1" fill="#3FE56C" opacity={0.25} />
      <line x1="28" y1="40" x2="36" y2="30" stroke="#E9C349" strokeWidth="0.6" opacity={0.4} />
      <line x1="56" y1="30" x2="64" y2="40" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="84" y1="40" x2="92" y2="30" stroke="#E9C349" strokeWidth="0.6" opacity={0.4} />
      <rect x="30" y="58" width="28" height="22" rx="3" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.05} />
      <path d="M34 64 L38 60 L54 60 L58 64" stroke="#3FE56C" strokeWidth="0.8" opacity={0.5} strokeLinecap="round" />
      <circle cx="42" cy="64" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="50" cy="64" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <rect x="36" y="70" width="16" height="6" rx="1" fill="#E9C349" fillOpacity={0.06} />
      <rect x="38" y="72" width="8" height="1.5" rx="0.75" fill="#E9C349" opacity={0.3} />
      <g opacity={0.6}>
        <rect x="70" y="58" width="16" height="16" rx="4" stroke="#E9C349" strokeWidth="0.6" fill="none" transform="rotate(15 78 66)" />
        <rect x="74" y="62" width="8" height="8" rx="2" stroke="#3FE56C" strokeWidth="0.4" fill="#3FE56C" fillOpacity={0.08} transform="rotate(15 78 66)" />
      </g>
      <circle cx="100" cy="60" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="108" cy="70" r="2" stroke="#E9C349" strokeWidth="0.5" fill="#E9C349" fillOpacity={0.1} />
      <line x1="100" y1="63" x2="108" y2="68" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <rect x="14" y="54" width="10" height="4" rx="1" fill="#E9C349" fillOpacity={0.1} />
      <rect x="16" y="55.5" width="5" height="1" rx="0.5" fill="#E9C349" opacity={0.35} />
      <rect x="95" y="44" width="12" height="4" rx="1" fill="#3FE56C" fillOpacity={0.1} />
      <rect x="97" y="45.5" width="6" height="1" rx="0.5" fill="#3FE56C" opacity={0.35} />
    </svg>
  );
}

function ConsultoriaVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      <path d="M12 82 Q30 72 36 60 Q42 48 54 44 Q66 40 72 32 Q78 24 90 20 L108 16" stroke="#3FE56C" strokeWidth="1.2" opacity={0.4} strokeLinecap="round" />
      <path d="M12 82 Q30 72 36 60 Q42 48 54 44 Q66 40 72 32 Q78 24 90 20 L108 16 L108 82 Z" fill="#3FE56C" fillOpacity={0.04} />
      <circle cx="12" cy="82" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="36" cy="60" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="54" cy="44" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="72" cy="32" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="90" cy="20" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="108" cy="16" r="3" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.2} />
      <line x1="36" y1="60" x2="36" y2="82" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.25} />
      <line x1="54" y1="44" x2="54" y2="82" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.2} />
      <line x1="72" y1="32" x2="72" y2="82" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.25} />
      <line x1="90" y1="20" x2="90" y2="82" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.2} />
      <line x1="8" y1="82" x2="112" y2="82" stroke="#3FE56C" strokeWidth="0.5" opacity={0.2} />
      <rect x="8" y="86" width="18" height="6" rx="1" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="10" y="88" width="10" height="1" rx="0.5" fill="#3FE56C" opacity={0.3} />
      <rect x="30" y="86" width="18" height="6" rx="1" fill="#E9C349" fillOpacity={0.06} />
      <rect x="32" y="88" width="8" height="1" rx="0.5" fill="#E9C349" opacity={0.3} />
      <rect x="52" y="86" width="18" height="6" rx="1" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="54" y="88" width="12" height="1" rx="0.5" fill="#3FE56C" opacity={0.3} />
      <rect x="74" y="86" width="18" height="6" rx="1" fill="#E9C349" fillOpacity={0.06} />
      <rect x="76" y="88" width="10" height="1" rx="0.5" fill="#E9C349" opacity={0.3} />
      <rect x="96" y="86" width="18" height="6" rx="1" fill="#3FE56C" fillOpacity={0.06} />
      <rect x="98" y="88" width="8" height="1" rx="0.5" fill="#3FE56C" opacity={0.3} />
      <line x1="36" y1="60" x2="54" y2="44" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="3 4" opacity={0.3} />
      <line x1="72" y1="32" x2="90" y2="20" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="3 4" opacity={0.3} />
      <rect x="22" y="50" width="12" height="6" rx="2" fill="#3FE56C" fillOpacity={0.08} />
      <rect x="24" y="52" width="6" height="1" rx="0.5" fill="#3FE56C" opacity={0.35} />
      <rect x="78" y="18" width="10" height="6" rx="2" fill="#E9C349" fillOpacity={0.08} />
      <rect x="80" y="20" width="5" height="1" rx="0.5" fill="#E9C349" opacity={0.35} />
    </svg>
  );
}

const visualComponents: Record<string, React.FC> = {
  producto: ProductoVisual,
  ia: IAVisual,
  cloud: CloudVisual,
  web3: Web3Visual,
  consultoria: ConsultoriaVisual,
};

/* ─────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────── */
export default function PrecisionSection() {
  const containerRef = useRef<HTMLElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const connectionRefs = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  const activeDomain = domains[activeIndex];
  const ActiveVisual = visualComponents[activeDomain.id];

  /* ── Animate detail panel content swap ── */
  const animateContentSwap = useCallback((newIndex: number) => {
    if (newIndex === prevIndexRef.current) return;

    const el = detailContentRef.current;
    if (!el) return;

    // Fade out → swap → fade in
    gsap.to(el, {
      opacity: 0,
      x: 20,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        prevIndexRef.current = newIndex;
        setActiveIndex(newIndex);
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      },
    });

    // Highlight active connection line, dim others
    connectionRefs.current.forEach((line, i) => {
      if (!line) return;
      gsap.to(line, {
        attr: {
          'stroke-width': i === newIndex ? '1.5' : '0.5',
          opacity: i === newIndex ? 0.6 : 0.15,
        },
        duration: 0.3,
      });
    });

    // Highlight active node, dim others
    nodeRefs.current.forEach((node, i) => {
      if (!node) return;
      gsap.to(node, {
        scale: i === newIndex ? 1.3 : 1,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });
    });
  }, []);

  const handleNodeInteract = useCallback((index: number) => {
    animateContentSwap(index);
  }, [animateContentSwap]);

  /* ── GSAP scroll animations ── */
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Header reveal (all screens)
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.precision-header', {
        y: 30, opacity: 0, duration: 0.6,
        clearProps: 'all',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Desktop animations
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      // Orbital nodes
      gsap.from('.orbital-node', {
        scale: 0, opacity: 0, stagger: 0.1, duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Connection lines
      gsap.from('.orbital-connection', {
        scaleY: 0, scaleX: 0, transformOrigin: 'center center',
        stagger: 0.06, duration: 0.6, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Core
      gsap.from('.orbital-core', {
        scale: 0, opacity: 0, duration: 0.8,
        ease: 'elastic.out(1, 0.5)', delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // Detail panel slide in
      gsap.from('.detail-panel', {
        x: 60, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Mobile animations
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.mobile-container .domain-moon', {
        scale: 0, opacity: 0, stagger: 0.12, duration: 0.7,
        ease: 'back.out(1.4)',
        clearProps: 'scale,opacity',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="previews" className="bg-surface-dim py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="precision-header mb-12 lg:mb-16 text-center">
          <SectionLabel className="mb-4 block">Dominios de Expertise</SectionLabel>
          <h2 className="font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
            Ingeniería de Precisión
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-on-surface-muted">
            Cinco dominios interconectados que convergen en un solo núcleo de fusión tecnológica.
          </p>
        </div>

        {/* ═══ DESKTOP: Orbital (left) + Detail Panel (right) ═══ */}
        <div className="hidden lg:grid lg:grid-cols-[45%_55%] lg:items-center lg:gap-8 lg:min-h-[560px]">

          {/* ── LEFT: Orbital Map ── */}
          <div className="relative mx-auto w-full max-w-[480px] aspect-square">
            {/* SVG connection lines + orbit ring */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
              {/* Orbit ring */}
              <circle cx="50" cy="50" r="38" stroke="#3FE56C" strokeWidth="0.15" strokeDasharray="2 4" opacity={0.15} />
              <circle cx="50" cy="50" r="42" stroke="#3FE56C" strokeWidth="0.08" strokeDasharray="1 6" opacity={0.1} />

              {/* Connection lines from center to each node */}
              {nodePositions.map((pos, i) => (
                <line
                  key={i}
                  ref={(el) => { connectionRefs.current[i] = el; }}
                  className="orbital-connection"
                  x1="50" y1="50"
                  x2={pos.cx} y2={pos.cy}
                  stroke={i === 0 ? '#3FE56C' : '#3FE56C'}
                  strokeWidth={i === activeIndex ? '1.5' : '0.5'}
                  strokeDasharray="2 4"
                  opacity={i === activeIndex ? 0.6 : 0.15}
                />
              ))}
            </svg>

            {/* Central Core */}
            <div className="orbital-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative flex h-14 w-14 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-singularity-pulse" />
                <div className="absolute -inset-2 rounded-full bg-primary/6 blur-2xl animate-singularity-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-1 rounded-full border border-secondary/30" />
                <div className="relative h-5 w-5 rounded-full bg-gradient-to-br from-primary via-secondary to-primary shadow-[0_0_20px_rgba(63,229,108,0.7),0_0_40px_rgba(233,195,73,0.25)]" />
              </div>
            </div>

            {/* Orbital Nodes */}
            {domains.map((domain, i) => {
              const pos = nodePositions[i];
              const isActive = i === activeIndex;
              return (
                <button
                  key={domain.id}
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="orbital-node absolute z-20 group cursor-pointer"
                  style={{
                    left: `${pos.cx}%`,
                    top: `${pos.cy}%`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.3 : 1})`,
                  }}
                  onMouseEnter={() => handleNodeInteract(i)}
                  onClick={() => handleNodeInteract(i)}
                  aria-label={domain.label}
                >
                  {/* Outer glow ring */}
                  <div className={`
                    absolute -inset-3 rounded-full transition-all duration-500
                    ${isActive
                      ? 'bg-primary/20 blur-md shadow-[0_0_24px_rgba(63,229,108,0.5)]'
                      : 'bg-primary/5 blur-sm shadow-none'
                    }
                  `} />
                  {/* Node dot */}
                  <div className={`
                    relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300
                    ${isActive
                      ? 'border-primary/80 bg-surface-high shadow-[0_0_12px_rgba(63,229,108,0.6)]'
                      : 'border-primary/30 bg-surface-dim/80 group-hover:border-primary/60 group-hover:shadow-[0_0_8px_rgba(63,229,108,0.3)]'
                    }
                  `}>
                    <NodeIcon id={domain.id} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT: Detail Panel ── */}
          <div className="detail-panel relative flex items-center justify-center">
            <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden">
              {/* Background gradient border effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/20" />

              {/* Card body */}
              <div className="relative rounded-2xl bg-surface-high/90 backdrop-blur-lg p-8 lg:p-10">
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                {/* Content (animated) */}
                <div ref={detailContentRef}>
                  {/* Domain index label */}
                  <SectionLabel className="mb-3 block">
                    Dominio {activeDomain.domainIndex}
                  </SectionLabel>

                  {/* Title */}
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-on-surface leading-tight mb-6">
                    {activeDomain.label}
                  </h3>

                  {/* Visual */}
                  <div className="relative mb-6 rounded-xl bg-surface-dim/60 p-4 ghost-border overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent" />
                    <div className="relative h-[180px] lg:h-[200px]">
                      <ActiveVisual />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-base leading-relaxed text-on-surface-muted">
                    {activeDomain.description}
                  </p>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  {/* Navigation dots */}
                  <div className="flex items-center gap-2">
                    {domains.map((_, i) => (
                      <button
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeIndex
                            ? 'w-6 bg-primary'
                            : 'w-1.5 bg-on-surface-muted/30 hover:bg-on-surface-muted/50'
                        }`}
                        onClick={() => handleNodeInteract(i)}
                        aria-label={`Ver dominio ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev/Next Arrows */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleNodeInteract((activeIndex - 1 + domains.length) % domains.length)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-on-surface-muted/20 bg-surface/50 text-on-surface-muted transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                      aria-label="Dominio anterior"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleNodeInteract((activeIndex + 1) % domains.length)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-on-surface-muted/20 bg-surface/50 text-on-surface-muted transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                      aria-label="Dominio siguiente"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE STACK LAYOUT ═══ */}
        <div className="mobile-container flex flex-col gap-6 lg:hidden">
          {domains.map((domain) => {
            const Visual = visualComponents[domain.id];
            return (
              <div
                key={domain.id}
                className="domain-moon flex items-center gap-4 rounded-lg bg-surface p-4 ghost-border transition-all duration-300 hover:bg-surface-high"
              >
                <div className="h-20 w-24 shrink-0">
                  <Visual />
                </div>
                <div>
                  <span className="block font-mono text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-muted">
                    {domain.label}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-muted/70">
                    {domain.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
