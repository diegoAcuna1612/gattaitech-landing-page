## 7. Motion Strategy: GSAP Implementation

To bring "The Kinetic Architect" to life, animation is not an afterthought; it is a structural material. We use GSAP (GreenSock Animation Platform) v3 to handle complex, orchestrated timelines and scroll-driven interactions, while leaving simple micro-interactions (like button hovers) to Tailwind's native CSS transitions.

### 7.1. The Kinetic Easing Standard

The Design System mandates "Slow-In, Fast-Out" easing to mimic high-performance machinery. In GSAP, our global standard for structural movement is:

- **Primary Ease:** `power3.inOut` (Smooth acceleration an**s**d deceleration).
- **Duration:** Base transitions should take `0.6s` to `0.8s`. Fast enough to feel responsive, slow enough to perceive the "weight" of the digital architecture.

**Global Setup (Execute at App entry point):**
\`\`\`javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.inOut", duration: 0.6 });
\`\`\`

### 7.2. React Integration Standards (@gsap/react)

Never use standard `useEffect` for GSAP animations in this project. To prevent layout thrashing and React 18 Strict Mode double-firing, **all GSAP code must live inside the `useGSAP()` hook**.

- Always pass a `ref` (scope) to `useGSAP()` to keep selector queries local to the component.
- Animate `transform` (x, y, scale) and `opacity` ONLY. Never animate layout properties like `width`, `height`, or `margin` via GSAP to maintain 60fps performance.

### 7.3. Implementation Zones (Where to use GSAP)

#### A. The "Blueprint Reveal" (Page Load)

When a user lands on a page, the UI should not just "appear"; it should be drafted or constructed.

- **Target:** Headlines (Noto Serif) and Bento Grid Cards.
- **Execution:** Use GSAP `stagger` to reveal elements sequentially from bottom to top, mimicking a blueprint being rolled out.

\`\`\`tsx
useGSAP(() => {
gsap.from(".blueprint-element", {
y: 40,
opacity: 0,
stagger: 0.15,
clearProps: "all" // Removes inline styles after animation to let Tailwind take over
});
}, { scope: containerRef });

\`\`\`

#### B. The Signature Component: "Data-Stream" Loader

This is our anchor scroll-interaction. A fine vertical line (`0.5px`, `#3FE56C`) that pulses with Matte Gold (`#E9C349`) based on user scroll progress.

- **Execution:** Bind a GSAP timeline to `ScrollTrigger` with `scrub: true`.

\`\`\`tsx
useGSAP(() => {
gsap.to(".stream-pulse", {
yPercent: 100,
ease: "none", // Linear ease is crucial for scrubbed scroll animations
scrollTrigger: {
trigger: ".main-layout",
start: "top top",
end: "bottom bottom",
scrub: 0.5, // 0.5s lag for a smoother, heavier feel
}
});
}, { scope: layoutRef });
\`\`\`

#### C. The "Layering" Depth Shifts (Parallax)

To reinforce "The Layering Principle", nested surfaces (`surface-container-low` vs `surface-container`) should move at slightly different speeds on scroll to create physical depth without lines.

- **Execution:** Apply minor negative `y` values to deeper layers using ScrollTrigger's `scrub`.

### 7.4. Division of Labor: GSAP vs. Tailwind

To maintain performance and clean code, adhere to this strict division:

| Interaction Type      | Tool                               | Rationale                                                                                  |
| :-------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------- |
| **Card Hovers**       | Tailwind (`hover:bg-surface-high`) | CSS is faster for simple state changes and doesn't require JS event listeners.             |
| **Input Glows**       | Tailwind (`focus-within:`)         | Native browser pseudo-classes map perfectly to our "Blueprint" input styles.               |
| **Scroll Animations** | **GSAP** (`ScrollTrigger`)         | Required for math-heavy scroll tracking (Data-Stream Loader).                              |
| **Complex Entrances** | **GSAP** (`stagger`, timelines)    | Required to orchestrate multiple elements entering the DOM at once (The Blueprint Reveal). |

### 7.5. Animation Do's and Don'ts

- **DO clear inline styles:** Always use `clearProps: "all"` at the end of structural entrance animations so GSAP doesn't lock properties that Tailwind might need to change on window resize.
- **DON'T animate colors with GSAP unless necessary:** While GSAP can animate CSS variables (e.g., `gsap.to("html", {"--color-primary": "#E9C349"})`), rely on Tailwind for hover/active state color changes to respect the "Tonal Depth Strategy" effortlessly.
- **DO respect accessibility:** Use `gsap.matchMedia()` to disable complex motion if the user prefers reduced motion.

\`\`\`javascript
let mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => {
// Complex Kinetic Architect animations here
});
\`\`\`
