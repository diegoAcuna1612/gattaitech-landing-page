import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../ui/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const methodologySteps = [
  {
    num: '01',
    id: 'step-1',
    title: 'Conexión y Claridad',
    desc: 'Antes de tocar una tecla, nos sumergimos en tu visión. Identificamos qué es lo que realmente hará brillar a tu empresa para asegurar resultados reales desde el primer día.',
    comment: '// STEP 01: VALUE DISCOVERY & MVP',
    code: `async defineMVP(vision: ProductVision): Promise<ValueStream> {
  const userNeeds = await this.research.discover(vision);
  const productBacklog = this.agileCoach.prioritizeByValue(userNeeds);
  
  return new ValueStream({
    focus: 'Core User Problem',
    deliverables: productBacklog.getHighestROI(),
    aligned: true
  });
}`
  },
  {
    num: '02',
    id: 'step-2',
    title: 'Cimientos para el Futuro',
    desc: 'Construimos herramientas que no caducan. Diseñamos una estructura digital flexible que se adapta a tus cambios y crece al ritmo de tu negocio sin complicaciones.',
    comment: '// STEP 02: EVOLUTIONARY ARCHITECTURE',
    code: `class CoreEngine implements IAdaptable {
  @Inject(CloudProvider)
  private readonly infrastructure: CloudProvider;

  bootstrap(stream: ValueStream): SystemBlueprint {
    return this.infrastructure.provision({
      modularity: 'High Decoupling',
      deployment: 'Serverless',
      agility: 'Built to Pivot'
    });
  }
}`
  },
  {
    num: '03',
    id: 'step-3',
    title: 'Resultados en tus Manos',
    desc: 'Tu idea toma forma pieza por pieza. Te entregamos avances constantes y funcionales para que veas el progreso real de tu proyecto con total transparencia.',
    comment: '// STEP 03: CONTINUOUS VALUE DELIVERY',
    code: `@Cron(ScrumCadence.EVERY_SPRINT)
async executeSprint(sprintGoal: SprintCycle) {
  for (const story of sprintGoal.userStories) {
    await this.squad
      .develop(story)
      .ensureQuality()
      .meetDefinitionOfDone();
  }
  
  await this.productOwner.inspectAndAdapt(sprintGoal);
}`
  },
  {
    num: '04',
    id: 'step-4',
    title: 'Tranquilidad y Estreno',
    desc: 'Nos encargamos de que todo sea perfecto. Automatizamos las revisiones para que tu software se lance al mundo de forma segura, impecable y sin errores.',
    comment: '// STEP 04: ZERO-FRICTION DEPLOYMENT',
    code: `pipeline('Gattai-Value-Pipeline')
  .stage('Continuous Integration', async () => {
    await jest.run({ coverage: true, failFast: true });
    await sonarQube.checkQualityGate();
  })
  .stage('Continuous Deployment', async () => {
    await vercel.shipToProduction();
    slack.notify('🚀 New value delivered to users!');
  });`
  },
  {
    num: '05',
    id: 'step-5',
    title: 'Aprendizaje y Evolución',
    desc: 'Tu éxito es nuestro motor. Una vez lanzado, usamos datos reales para pulir los detalles y asegurar que tu empresa siempre esté un paso adelante de la competencia.',
    comment: '// STEP 05: BUILD, MEASURE, LEARN',
    code: `@OnEvent('increment.released')
analyzeFeedback(telemetry: UserMetrics) {
  const insights = this.leanEngine.measure(telemetry);

  if (insights.indicatesPivot()) {
    this.productBacklog.adaptStrategy(insights);
  } else {
    this.growthTeam.scaleSuccessfulFeatures();
  }
}`
  }
];

function SyntaxHighlight({ code }: { code: string }) {
    let highlightedCode = code;
    highlightedCode = highlightedCode.replace(/\b(async|class|return|new|const|private|readonly|await|for|of|if|else)\b/g, '<span class="text-[#ff7b72]">$1</span>');
    highlightedCode = highlightedCode.replace(/\b(Promise|Blueprint|CoreEngine|IScaleable|CloudProvider|Architecture|VisionDraft|SprintCycle|AppMetrics)\b/g, '<span class="text-[#f0883e]">$1</span>');
    highlightedCode = highlightedCode.replace(/(@[A-Za-z_]+)/g, '<span class="text-[#d2a8ff]">$1</span>');
    highlightedCode = highlightedCode.replace(/('[^']*')/g, '<span class="text-[#a5d6ff]">$1</span>');
    highlightedCode = highlightedCode.replace(/(\/\/.*)/g, '<span class="text-slate-500">$1</span>');
    return <span dangerouslySetInnerHTML={{ __html: highlightedCode }} />;
}

export default function BlueprintSection() {
  const containerRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const codeScrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    // Configuración para Desktop (con Pinning y Timeline vinculada al scroll)
    mm.add('(min-width: 1024px)', () => {
      // Limpiamos estilos residuales de móvil
      gsap.set(cardsRef.current, { clearProps: 'all' });

      const totalScroll = 4000;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Animar el scroll del código hacia arriba
      tl.to(codeScrollRef.current, {
        y: () => {
          if (!editorRef.current || !codeScrollRef.current) return 0;
          return -(codeScrollRef.current.scrollHeight - editorRef.current.clientHeight * 0.7);
        },
        ease: 'none',
        duration: 100
      }, 0);

      const startTimings = [4, 21, 39, 56, 73];
      // Sincronizar aparición y desaparición de tarjetas
      methodologySteps.forEach((_, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const startPhase = startTimings[index]; 
        // El final de una tarjeta es el inicio de la siguiente (o 100 si es la última)
        const endPhase = index < methodologySteps.length - 1 ? startTimings[index + 1] : 100;
        
        gsap.set(card, { autoAlpha: 0, filter: 'blur(12px)', scale: 0.95 });

        // Animación de Entrada
        tl.to(card, {
          autoAlpha: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 4,
          ease: 'power2.out',
        }, startPhase); // <-- Entra en el tiempo definido en el array
        
        // Animación de Salida (excepto la última tarjeta)
        if (index < methodologySteps.length - 1) {
            tl.to(card, {
              autoAlpha: 0,
              filter: 'blur(12px)',
              scale: 1.05,
              duration: 4,
              ease: 'power2.in',
            }, endPhase - 4); // <-- Sale un poquito antes de que entre la siguiente
        }
      });
    });

    // Configuración para Mobile y Tablets (Aparición secuencial natural en flujo)
    mm.add('(max-width: 1023px)', () => {
     // Limpiamos estilos residuales de escritorio para evitar colisiones
     gsap.set(cardsRef.current, { clearProps: 'all' });
     gsap.set(codeScrollRef.current, { clearProps: 'all' });

     cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card, {
            autoAlpha: 0,
            y: 40,
            filter: 'blur(8px)'
        }, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
     });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="methodology" className="relative min-h-screen overflow-hidden bg-[#0d1117] font-sans text-slate-300">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 mx-auto flex h-full min-h-screen max-w-7xl flex-col px-6 py-20 lg:flex-row lg:px-8 lg:py-0">
        
        {/* LADO IZQUIERDO: Editor de Código */}
       <div className="hidden pointer-events-none absolute inset-0 z-0 items-center justify-center opacity-5 lg:pointer-events-auto lg:relative lg:z-10 lg:flex lg:w-[60%] lg:pr-16 lg:opacity-100">
          <div ref={editorRef} className="relative mt-8 h-full w-full max-w-2xl overflow-hidden rounded-xl border-none bg-transparent lg:h-[80vh] lg:border-solid lg:border lg:border-slate-700/50 lg:bg-[#161b22] lg:shadow-2xl lg:mt-0">
            
            <div className="relative z-30 flex h-12 items-center justify-between border-b border-slate-700/50 bg-[#0d1117] px-4">
              <div className="flex gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-[#ff5f56]"></div>
                <div className="h-3.5 w-3.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="h-3.5 w-3.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="font-mono text-xs text-slate-500">GattaiMethodology.ts</div>
              <div className="w-14"></div>
            </div>

            <div className="absolute left-0 right-0 top-1/2 z-20 h-[2px] w-full -translate-y-1/2 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)]">
               <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-green-400 blur-[4px]"></div>
            </div>
            
            <div className="pointer-events-none absolute left-0 right-0 top-12 z-10 h-32 bg-gradient-to-b from-[#161b22] to-transparent"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-[#161b22] to-transparent"></div>

            <div className="relative h-full w-full font-mono text-sm leading-relaxed tracking-wide sm:text-base">
                <div ref={codeScrollRef} className="absolute inset-x-0 top-[50%] flex flex-col pb-[100vh]">
                    <div className="h-[20vh]"></div>
                    {methodologySteps.map((step, i) => (
                        <div key={i} className="mb-[40vh] px-8">
                            <span className="mb-4 inline-block font-bold text-slate-500/80">{step.comment}</span>
                            <pre className="whitespace-pre-wrap text-[#a5d6ff]">
                                <SyntaxHighlight code={step.code} />
                            </pre>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Tarjetas de Contenido (Metodología) */}
        <div className="relative z-20 flex h-full w-full flex-col pt-12 lg:min-h-screen lg:w-[40%] lg:justify-center lg:pt-0">
            <div className="mb-16 text-center lg:mb-12 lg:text-left">
                <SectionLabel className="mb-4 block text-green-400 !bg-green-400/10">Metodología</SectionLabel>
                <h2 className="mb-4 font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Código con Propósito
                </h2>
                <p className="text-lg text-slate-400">
                  No solo escribimos software. Iteramos contigo paso a paso para construir productos que tus usuarios realmente necesiten.
                </p>
            </div>

            {/* Aquí es donde cambiamos la magia responsiva */}
            <div className="flex flex-col gap-16 pb-20 lg:relative lg:block lg:h-[400px] lg:w-full lg:pb-0">
                {methodologySteps.map((step, i) => (
                    <div 
                        key={i} 
                        ref={el => { cardsRef.current[i] = el; }}
                        // En móvil: flex en columna normal. En Desktop: absolute inset-0
                        className="relative flex flex-col items-center justify-start text-center lg:absolute lg:inset-0 lg:items-start lg:text-left"
                    >
                        <div className="mb-4 font-mono text-6xl font-black text-green-400/20 lg:text-7xl">{step.num}</div>
                        <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{step.title}</h3>
                        <p className="text-base leading-relaxed text-slate-400 md:text-lg lg:max-w-md">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
        
      </div>
    </section>
  );
}