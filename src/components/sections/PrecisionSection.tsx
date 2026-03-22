import { useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../ui/SectionLabel';

/* ─────────────────────────────────────────────────────────
   Domain Moon positions (pentagon, clockwise from top)
   Coordinates are % of the 700×700 orbital container
   ───────────────────────────────────────────────────────── */
const moons = [
  {
    id: 'producto',
    label: 'Ingeniería de Producto',
    description: 'Diseño y desarrollo de productos digitales escalables con arquitectura modular y experiencia de usuario excepcional.',
    top: '0%',
    left: '50%',
    translate: '-50%',
    delay: 0,
    popupSide: 'right' as const,
  },
  {
    id: 'ia',
    label: 'Sistemas Cognitivos (IA)',
    description: 'Integración de modelos de inteligencia artificial para automatización inteligente, análisis predictivo y sistemas adaptativos.',
    top: '25%',
    left: '95%',
    translate: '-100%',
    delay: 0.12,
    popupSide: 'left' as const,
  },
  {
    id: 'cloud',
    label: 'Infraestructura Resiliente',
    description: 'Arquitectura cloud-native con DevSecOps, alta disponibilidad y pipelines de despliegue continuo.',
    top: '70%',
    left: '85%',
    translate: '-100%',
    delay: 0.24,
    popupSide: 'left' as const,
  },
  {
    id: 'web3',
    label: 'Tecnologías Emergentes',
    description: 'Exploración y aplicación de blockchain, realidad aumentada y protocolos descentralizados.',
    top: '70%',
    left: '15%',
    translate: '0%',
    delay: 0.36,
    popupSide: 'right' as const,
  },
  {
    id: 'consultoria',
    label: 'Consultoría Estratégica',
    description: 'Roadmaps tecnológicos alineados con objetivos de negocio, desde diagnóstico hasta implementación.',
    top: '25%',
    left: '5%',
    translate: '0%',
    delay: 0.48,
    popupSide: 'right' as const,
  },
];

/* ─────────────────────────────────────────────────────────
   SVG Visualizations — one per domain moon
   ───────────────────────────────────────────────────────── */

function ProductoVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      {/* Dashboard frame */}
      <rect x="8" y="8" width="104" height="84" rx="4" stroke="#3FE56C" strokeWidth="0.8" opacity={0.5} />
      {/* Sidebar */}
      <rect x="10" y="10" width="22" height="80" fill="#3FE56C" opacity={0.08} />
      <rect x="14" y="16" width="14" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="14" y="22" width="10" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="27" width="12" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="32" width="8" height="1.5" rx="0.75" fill="#3FE56C" opacity={0.25} />
      <rect x="14" y="37" width="14" height="1.5" rx="0.75" fill="#E9C349" opacity={0.3} />
      {/* Top bar */}
      <rect x="36" y="12" width="72" height="8" fill="#3FE56C" opacity={0.06} />
      <rect x="40" y="15" width="20" height="2" rx="1" fill="#3FE56C" opacity={0.3} />
      <circle cx="102" cy="16" r="2" fill="#E9C349" opacity={0.4} />
      {/* Main chart area */}
      <rect x="36" y="24" width="36" height="32" rx="2" fill="#3FE56C" opacity={0.06} />
      {/* Bar chart */}
      <rect x="40" y="44" width="4" height="8" fill="#3FE56C" opacity={0.35} />
      <rect x="46" y="38" width="4" height="14" fill="#3FE56C" opacity={0.5} />
      <rect x="52" y="42" width="4" height="10" fill="#E9C349" opacity={0.4} />
      <rect x="58" y="34" width="4" height="18" fill="#3FE56C" opacity={0.6} />
      <rect x="64" y="40" width="4" height="12" fill="#3FE56C" opacity={0.35} />
      {/* KPI cards */}
      <rect x="76" y="24" width="32" height="14" rx="2" fill="#3FE56C" opacity={0.06} />
      <rect x="80" y="28" width="12" height="2" rx="1" fill="#3FE56C" opacity={0.4} />
      <rect x="80" y="33" width="8" height="1.5" rx="0.75" fill="#9E9C9B" opacity={0.3} />
      <rect x="76" y="42" width="32" height="14" rx="2" fill="#E9C349" opacity={0.06} />
      <rect x="80" y="46" width="14" height="2" rx="1" fill="#E9C349" opacity={0.4} />
      <rect x="80" y="51" width="10" height="1.5" rx="0.75" fill="#9E9C9B" opacity={0.3} />
      {/* Bottom row modules */}
      <rect x="36" y="60" width="36" height="28" rx="2" fill="#3FE56C" opacity={0.04} />
      <rect x="76" y="60" width="32" height="28" rx="2" fill="#E9C349" opacity={0.04} />
      {/* Flow lines inside bottom */}
      <path d="M42 72 L52 68 L62 74 L68 70" stroke="#3FE56C" strokeWidth="0.8" opacity={0.4} />
      <circle cx="42" cy="72" r="1.5" fill="#3FE56C" opacity={0.5} />
      <circle cx="62" cy="74" r="1.5" fill="#3FE56C" opacity={0.5} />
    </svg>
  );
}

function IAVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      {/* Neural nodes — layered network */}
      {/* Input layer */}
      <circle cx="20" cy="22" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="20" cy="42" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="20" cy="62" r="4" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.1} />
      <circle cx="20" cy="82" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      {/* Hidden layer 1 */}
      <circle cx="48" cy="30" r="5" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="48" cy="52" r="6" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.1} />
      <circle cx="48" cy="74" r="5" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.15} />
      {/* Hidden layer 2 */}
      <circle cx="76" cy="36" r="5" stroke="#E9C349" strokeWidth="0.8" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="76" cy="58" r="6" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="76" cy="78" r="4" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.1} />
      {/* Output layer */}
      <circle cx="104" cy="42" r="5" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.2} />
      <circle cx="104" cy="66" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.15} />
      {/* Connections — input to hidden1 */}
      <line x1="24" y1="22" x2="43" y2="30" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="22" x2="43" y2="52" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="42" x2="43" y2="30" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="42" x2="43" y2="52" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="24" y1="42" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="24" y1="62" x2="43" y2="52" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="62" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      <line x1="24" y1="82" x2="43" y2="74" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      {/* hidden1 to hidden2 */}
      <line x1="53" y1="30" x2="71" y2="36" stroke="#3FE56C" strokeWidth="0.5" opacity={0.35} />
      <line x1="53" y1="30" x2="71" y2="58" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="54" y1="52" x2="71" y2="36" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="54" y1="52" x2="71" y2="58" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="54" y1="52" x2="71" y2="78" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="53" y1="74" x2="71" y2="58" stroke="#E9C349" strokeWidth="0.4" opacity={0.3} />
      <line x1="53" y1="74" x2="71" y2="78" stroke="#3FE56C" strokeWidth="0.5" opacity={0.35} />
      {/* hidden2 to output */}
      <line x1="81" y1="36" x2="99" y2="42" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="81" y1="36" x2="99" y2="66" stroke="#3FE56C" strokeWidth="0.3" opacity={0.2} />
      <line x1="82" y1="58" x2="99" y2="42" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="82" y1="58" x2="99" y2="66" stroke="#E9C349" strokeWidth="0.5" opacity={0.35} />
      <line x1="80" y1="78" x2="99" y2="66" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />
      {/* Flowing data pulse indicators */}
      <circle cx="36" cy="40" r="1" fill="#3FE56C" opacity={0.7} className="animate-energy-pulse" />
      <circle cx="64" cy="47" r="1" fill="#E9C349" opacity={0.6} className="animate-energy-pulse" style={{ animationDelay: '1s' }} />
      <circle cx="92" cy="54" r="1" fill="#3FE56C" opacity={0.7} className="animate-energy-pulse" style={{ animationDelay: '2s' }} />
    </svg>
  );
}

function CloudVisual() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="h-full w-full">
      {/* Server rack blocks — immutable infrastructure */}
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

      {/* Shield (Zero-Trust) */}
      <path d="M60 44 L52 48 L52 58 Q52 66 60 70 Q68 66 68 58 L68 48 Z" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.08} />
      <path d="M57 56 L60 59 L66 53" stroke="#3FE56C" strokeWidth="1.2" strokeLinecap="round" opacity={0.6} />

      {/* Data streams — vertical DevSecOps signals */}
      <line x1="26" y1="34" x2="26" y2="76" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="3 4" opacity={0.3} />
      <line x1="60" y1="70" x2="60" y2="92" stroke="#3FE56C" strokeWidth="0.5" strokeDasharray="2 3" opacity={0.3} />
      <line x1="94" y1="34" x2="94" y2="76" stroke="#E9C349" strokeWidth="0.5" strokeDasharray="3 4" opacity={0.25} />

      {/* Horizontal connection — pipeline */}
      <line x1="26" y1="76" x2="94" y2="76" stroke="#3FE56C" strokeWidth="0.6" strokeDasharray="4 6" opacity={0.25} />
      <circle cx="26" cy="76" r="2" fill="#3FE56C" opacity={0.4} />
      <circle cx="60" cy="76" r="2" fill="#E9C349" opacity={0.4} />
      <circle cx="94" cy="76" r="2" fill="#3FE56C" opacity={0.4} />

      {/* Pipeline label blocks */}
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
      {/* Decentralized blocks — interlocking chain */}
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

      {/* Chain links connecting blocks */}
      <line x1="28" y1="40" x2="36" y2="30" stroke="#E9C349" strokeWidth="0.6" opacity={0.4} />
      <line x1="56" y1="30" x2="64" y2="40" stroke="#3FE56C" strokeWidth="0.6" opacity={0.4} />
      <line x1="84" y1="40" x2="92" y2="30" stroke="#E9C349" strokeWidth="0.6" opacity={0.4} />

      {/* AR/VR floating module */}
      <rect x="30" y="58" width="28" height="22" rx="3" stroke="#3FE56C" strokeWidth="0.8" fill="#3FE56C" fillOpacity={0.05} />
      {/* VR viewport */}
      <path d="M34 64 L38 60 L54 60 L58 64" stroke="#3FE56C" strokeWidth="0.8" opacity={0.5} strokeLinecap="round" />
      <circle cx="42" cy="64" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="50" cy="64" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <rect x="36" y="70" width="16" height="6" rx="1" fill="#E9C349" fillOpacity={0.06} />
      <rect x="38" y="72" width="8" height="1.5" rx="0.75" fill="#E9C349" opacity={0.3} />

      {/* Floating XR element */}
      <g opacity={0.6}>
        <rect x="70" y="58" width="16" height="16" rx="4" stroke="#E9C349" strokeWidth="0.6" fill="none" transform="rotate(15 78 66)" />
        <rect x="74" y="62" width="8" height="8" rx="2" stroke="#3FE56C" strokeWidth="0.4" fill="#3FE56C" fillOpacity={0.08} transform="rotate(15 78 66)" />
      </g>

      {/* Floating interaction nodes */}
      <circle cx="100" cy="60" r="3" stroke="#3FE56C" strokeWidth="0.6" fill="#3FE56C" fillOpacity={0.1} />
      <circle cx="108" cy="70" r="2" stroke="#E9C349" strokeWidth="0.5" fill="#E9C349" fillOpacity={0.1} />
      <line x1="100" y1="63" x2="108" y2="68" stroke="#3FE56C" strokeWidth="0.4" opacity={0.3} />

      {/* Hash indicators */}
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
      {/* Roadmap trajectory — ascending path */}
      <path d="M12 82 Q30 72 36 60 Q42 48 54 44 Q66 40 72 32 Q78 24 90 20 L108 16" stroke="#3FE56C" strokeWidth="1.2" opacity={0.4} strokeLinecap="round" />
      {/* Growth area fill */}
      <path d="M12 82 Q30 72 36 60 Q42 48 54 44 Q66 40 72 32 Q78 24 90 20 L108 16 L108 82 Z" fill="#3FE56C" fillOpacity={0.04} />

      {/* Milestone nodes */}
      <circle cx="12" cy="82" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="36" cy="60" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="54" cy="44" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="72" cy="32" r="5" stroke="#E9C349" strokeWidth="1" fill="#E9C349" fillOpacity={0.12} />
      <circle cx="90" cy="20" r="4" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.15} />
      <circle cx="108" cy="16" r="3" stroke="#3FE56C" strokeWidth="1" fill="#3FE56C" fillOpacity={0.2} />

      {/* Vertical milestone indicators */}
      <line x1="36" y1="60" x2="36" y2="82" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.25} />
      <line x1="54" y1="44" x2="54" y2="82" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.2} />
      <line x1="72" y1="32" x2="72" y2="82" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.25} />
      <line x1="90" y1="20" x2="90" y2="82" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="2 3" opacity={0.2} />

      {/* Base line */}
      <line x1="8" y1="82" x2="112" y2="82" stroke="#3FE56C" strokeWidth="0.5" opacity={0.2} />

      {/* Phase labels */}
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

      {/* Data-driven synergy connections */}
      <line x1="36" y1="60" x2="54" y2="44" stroke="#E9C349" strokeWidth="0.4" strokeDasharray="3 4" opacity={0.3} />
      <line x1="72" y1="32" x2="90" y2="20" stroke="#3FE56C" strokeWidth="0.4" strokeDasharray="3 4" opacity={0.3} />

      {/* Annotation bubbles */}
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
   MoonCard — individual domain card with GSAP hover popup
   ───────────────────────────────────────────────────────── */
function MoonCard({ moon }: { moon: typeof moons[number] }) {
  const Visual = visualComponents[moon.id];
  const popupRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const isLeft = moon.popupSide === 'left';
  const xOffset = isLeft ? 15 : -15;

  const handleEnter = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(popupRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(popupRef.current, {
      opacity: 0,
      x: xOffset,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
    });
  }, [xOffset]);

  return (
    <div
      className="domain-moon relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="group flex flex-col items-center"
        style={{
          animation: `float 5s ease-in-out infinite ${moon.delay + 1}s`,
        }}
      >
        {/* Moon visual container */}
        <div className="relative h-[130px] w-[150px] rounded-lg bg-surface/60 p-2 ghost-border transition-all duration-500 group-hover:scale-[1.08] group-hover:bg-surface-high/80 group-hover:shadow-[0_0_30px_rgba(63,229,108,0.12)]">
          {/* Subtle inner glow on hover */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/0 to-primary/0 transition-all duration-500 group-hover:from-primary/5 group-hover:to-transparent" />
          <div className="relative h-full w-full">
            <Visual />
          </div>
        </div>

        {/* Label */}
        <span className="mt-3 max-w-[160px] text-center font-mono text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-on-surface-muted transition-colors duration-300 group-hover:text-primary">
          {moon.label}
        </span>
      </div>

      {/* ── Hover Popup ── */}
      <div
        ref={popupRef}
        className="pointer-events-none absolute top-1/2 z-20 w-[220px] -translate-y-1/2 rounded-lg bg-surface-high/95 p-4 shadow-ambient ghost-border backdrop-blur-sm"
        style={{
          ...(isLeft
            ? { right: '100%', marginRight: 12 }
            : { left: '100%', marginLeft: 12 }),
          opacity: 0,
          transform: `translateY(-50%) translateX(${xOffset}px) scale(0.95)`,
        }}
      >
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary mb-2">
          {moon.label}
        </p>
        <p className="text-xs leading-relaxed text-on-surface-muted">
          {moon.description}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Pentagon connection line endpoints (center = 350,350)
   ───────────────────────────────────────────────────────── */
const connectionEndpoints = [
  { x: 350, y: 65 },   // top (Producto) — centered at 50%
  { x: 590, y: 240 },  // top-right (IA) — right-aligned at 95%
  { x: 520, y: 555 },  // bottom-right (Cloud) — right-aligned at 85%
  { x: 180, y: 555 },  // bottom-left (Web3) — left-aligned at 15%
  { x: 110, y: 240 },  // top-left (Consultoría) — left-aligned at 5%
];

export default function PrecisionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
   // 1. Animaciones COMUNES (Header) - Para todas las pantallas
    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
    });

    // 2. Animaciones DESKTOP (Pantallas >= 1024px)
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Solo apuntamos a las lunas dentro de orbital-container
      gsap.from('.orbital-container .domain-moon', {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'back.out(1.4)',
        clearProps: 'scale,opacity',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from('.orbital-connection', {
        scaleY: 0, scaleX: 0, transformOrigin: 'center center',
        stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.orbital-container', start: 'top 80%', toggleActions: 'play none none none',
        },
      });

      gsap.from('.orbital-core', {
        scale: 0, opacity: 0, duration: 1, ease: 'elastic.out(1, 0.5)', delay: 0.5,
        scrollTrigger: {
          trigger: '.orbital-container', start: 'top 80%', toggleActions: 'play none none none',
        },
      });
    });

    // 3. Animaciones MOBILE (Pantallas < 1024px)
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      // Solo apuntamos a las lunas dentro del mobile-container
      gsap.from('.mobile-container .domain-moon', {
        scale: 0,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
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
        <div className="precision-header mb-16 text-center">
          <SectionLabel className="mb-4 block">Dominios de Expertise</SectionLabel>
          <h2 className="font-serif text-3xl font-bold leading-tight text-on-surface sm:text-4xl lg:text-5xl">
            Ingeniería de Precisión
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-on-surface-muted">
            Cinco dominios interconectados que convergen en un solo núcleo de fusión tecnológica.
          </p>
        </div>

        {/* ═══ ORBITAL LAYOUT (Desktop) ═══ */}
        <div className="orbital-container relative mx-auto hidden h-[700px] w-[700px] lg:block">

          {/* SVG Connection lines from core to each moon */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 700" fill="none">
            {connectionEndpoints.map((ep, i) => (
              <line
                key={i}
                className="orbital-connection"
                x1="350" y1="350"
                x2={ep.x} y2={ep.y}
                stroke="#3FE56C"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity={0.2}
              />
            ))}
            {/* Orbit ring */}
            <circle cx="350" cy="350" r="260" stroke="#3FE56C" strokeWidth="0.3" strokeDasharray="6 12" opacity={0.1} />
          </svg>

          {/* Central Fusion Core */}
          <div className="orbital-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-singularity-pulse" />
              <div className="absolute -inset-3 rounded-full bg-primary/6 blur-2xl animate-singularity-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-1 rounded-full border border-secondary/40" />
              <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-primary via-secondary to-primary shadow-[0_0_24px_rgba(63,229,108,0.8),0_0_48px_rgba(233,195,73,0.3)]" />
            </div>
          </div>

          {/* Domain Moons */}
          {moons.map((moon) => (
            <div
              key={moon.id}
              className="absolute"
              style={{
                top: moon.top,
                left: moon.left,
                transform: `translateX(${moon.translate})`,
              }}
            >
              <MoonCard moon={moon} />
            </div>
          ))}
        </div>

        {/* ═══ MOBILE STACK LAYOUT ═══ */}
        <div className="mobile-container flex flex-col gap-6 lg:hidden">
          {moons.map((moon) => {
            const Visual = visualComponents[moon.id];
            return (
              <div
                key={moon.id}
                className="domain-moon flex items-center gap-4 rounded-lg bg-surface p-4 ghost-border transition-all duration-300 hover:bg-surface-high"
              >
                <div className="h-20 w-24 shrink-0">
                  <Visual />
                </div>
                <div>
                  <span className="block font-mono text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-muted">
                    {moon.label}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-on-surface-muted/70">
                    {moon.description}
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
