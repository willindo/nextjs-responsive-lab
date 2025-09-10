"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Scene = {
  src: string;
  alt?: string;
};

type Step = {
  title: string;
  body: string;
  sceneIndex: number; // which visual to show for this step
};

const SCENES: Scene[] = [
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", alt: "Dawn skyline" },
  { src: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63", alt: "Mountain" },
  { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429", alt: "Forest" },
  { src: "https://images.unsplash.com/photo-1500534623283-312aade485b7", alt: "Ocean" },
  { src: "https://images.unsplash.com/photo-1500534311511-0282b5e1d9a0", alt: "Night city" },
];

const STEPS: Step[] = [
  { title: "Chapter 1", body: "Set the stage. Introduce the key idea.", sceneIndex: 0 },
  { title: "Chapter 2", body: "Zoom in: details deepen the context.", sceneIndex: 1 },
  { title: "Chapter 3", body: "Conflict or twist—tension rises.", sceneIndex: 2 },
  { title: "Chapter 4", body: "Resolution begins. Insights land.", sceneIndex: 3 },
  { title: "Chapter 5", body: "Final reveal and call to action.", sceneIndex: 4 },
];

export default function StoryScroller() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !sceneWrapRef.current) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Kill previous triggers on hot reloads
    ScrollTrigger.getAll().forEach(t => t.kill());

    // Scene elements
    const scenes = gsap.utils.toArray<HTMLImageElement>(".story-scene");

    // Helper: show a scene by index
    const showScene = (idx: number) => {
      scenes.forEach((el, i) => {
        gsap.to(el, { autoAlpha: i === idx ? 1 : 0, duration: 0.5, overwrite: true });
      });
    };
    // Initialize
    showScene(STEPS[0].sceneIndex);

    // Progress bar
    const progressEl = containerRef.current.querySelector(".story-progress-inner") as HTMLDivElement;

    // Responsive behaviors
    ScrollTrigger.matchMedia({
      // Desktop/tablet: pin visuals and scrub transitions
      "(min-width: 768px)": () => {
        if (reduceMotion) {
          // No pin/animation; let content flow
          return () => {};
        }

        // Pin the left visual panel while we scroll through steps
        const pinTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${containerRef.current!.offsetHeight - window.innerHeight}`,
          pin: sceneWrapRef.current,
          pinSpacing: false,
          anticipatePin: 1,
        });

        // One trigger per step: when step center hits center, switch scene
        const stepTriggers: ScrollTrigger[] = [];
        gsap.utils.toArray<HTMLElement>(".story-step").forEach((stepEl, stepIndex) => {
          const sceneIndex = Number(stepEl.dataset.sceneIndex ?? stepIndex);
          const trig = ScrollTrigger.create({
            trigger: stepEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => showScene(sceneIndex),
            onEnterBack: () => showScene(sceneIndex),
          });
          stepTriggers.push(trig);
        });

        // Progress bar updates across container scroll
        const progressTrig = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (progressEl) {
              progressEl.style.width = `${Math.round(self.progress * 100)}%`;
            }
          },
        });

        return () => {
          pinTrigger.kill();
          stepTriggers.forEach(t => t.kill());
          progressTrig.kill();
        };
      },

      // Mobile: no pin; images are inline above each step (accessible & simple)
      "(max-width: 767px)": () => {
        // On mobile, we don’t pin. We just ensure the scene above each step is visible.
        // The markup handles this: each step will render its image before the text (see JSX).
        return () => {};
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black text-white">
      {/* Top hero / lead-in */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          The Arc of a Story, Told by Scroll
        </h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          Heavy scrollytelling with a pinned visual that evolves as you read.
          Smooth on desktop, simple and accessible on mobile.
        </p>
      </section>

      {/* Progress bar (desktop only, kept simple) */}
      <div className="sticky top-0 z-40 hidden md:block">
        <div className="h-1 w-full bg-white/10">
          <div className="story-progress-inner h-1 w-0"></div>
        </div>
      </div>

      {/* Story body */}
      <section className="mx-auto max-w-6xl px-4 md:grid md:grid-cols-12 md:gap-8 md:py-24">
        {/* Left: pinned scene stack (desktop). Hidden on mobile. */}
        <div
          ref={sceneWrapRef}
          className="relative md:col-span-6 md:h-[80vh] md:sticky md:top-16 hidden md:block overflow-hidden rounded-2xl"
        >
          {SCENES.map((s, i) => (
            <img
              key={i}
              src={`${s.src}&auto=format&fit=crop&w=1400&q=80`}
              alt={s.alt ?? `Scene ${i + 1}`}
              className={`story-scene absolute inset-0 h-full w-full object-cover ${i === 0 ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          {/* Optional overlay text/icons can live here */}
        </div>

        {/* Right: steps (chapters) */}
        <div className="md:col-span-6 md:space-y-48">
          {STEPS.map((step, i) => (
            <article
              key={i}
              data-scene-index={step.sceneIndex}
              className="story-step prose prose-invert max-w-none py-16 border-t border-white/10 first:border-t-0"
            >
              {/* Mobile-only scene image (acts as inline scene per step) */}
              <div className="md:hidden mb-6 overflow-hidden rounded-xl">
                <img
                  src={`${SCENES[step.sceneIndex].src}&auto=format&fit=crop&w=1200&q=80`}
                  alt={SCENES[step.sceneIndex].alt ?? `Scene ${step.sceneIndex + 1}`}
                  className="h-64 w-full object-cover"
                />
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold">{step.title}</h2>
              <p className="text-white/80 mt-3">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h3 className="text-3xl md:text-4xl font-semibold">Wrap-up</h3>
        <p className="text-white/70 mt-3 max-w-2xl">
          You’ve seen pinning, scene swapping, progress, and a mobile-first fallback—ready
          to swap in your content and assets.
        </p>
      </section>
    </div>
  );
}
