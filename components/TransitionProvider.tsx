"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
// top of TransitionProvider.tsx
const PRESETS = {
  snappy: {
    startD: "M 800,1000 Q 900,700 1200,800 V 1000 H 800 Z",
    endD:   "M 0,0 H 1000 V 1000 H 0 Z",
    config: { duration: 1.2, ease: "power3.inOut" },
  },
  liquid: {
    startD: "M 400,900 Q 550,700 750,750 Q 950,800 1100,950 V 1000 H 400 Z",
    endD:   "M 0,0 H 1000 V 1000 H 0 Z",
    config: { duration: 1.2, ease: "elastic.out(1, 0.5)" },
  },
  cinematic: {
    startD: "M 200,1000 Q 500,400 1000,600 V 1000 H 200 Z",
    endD:   "M 0,0 H 1000 V 1000 H 0 Z",
    config: { duration: 1.8, ease: "slow(0.7, 0.7, false)" },
  },
} as const;

type PresetName = keyof typeof PRESETS;


// Optional (paid Club GreenSock). If available, we morph the SVG path; otherwise we fall back to a clip-path animation.
// To enable, install and expose the plugin as per GSAP docs, then uncomment the import below.
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// if (typeof window !== "undefined") gsap.registerPlugin(MorphSVGPlugin);

/**
 * TransitionProvider wraps your root layout. It exposes a <TransitionLink> you can use for page navigations
 * so we can play an OUT morph -> navigate -> IN morph sequence using a gsap.timeline().
 *
 * Usage (App Router):
 * 1) Add <TransitionProvider> in app/layout.tsx around {children}.
 * 2) Replace <Link href="/about">About</Link> with <TransitionLink href="/about">About</TransitionLink>.
 */
export default function TransitionProvider({
  children,
  preset = "snappy",
}: {
  children: React.ReactNode;
  preset?: PresetName;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <TransitionContextProvider preset={preset}>
      {children}
      {mounted && createPortal(<MorphOverlay preset={preset} />, document.body)}
    </TransitionContextProvider>
  );
}

// ---------------- Context API ---------------- //
const TransitionContext = React.createContext<{
  navigate: (href: string) => void;
  busy: boolean;
} | null>(null);

function TransitionContextProvider({
  children,
    preset,
}: {
  children: React.ReactNode;
  preset: PresetName;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);
  const pendingHrefRef = useRef<string | null>(null);

  // Tell overlay to play the OUT animation, then push()
  const navigate = useCallback(
    (href: string) => {
      if (busy) return; // avoid double-clicks
      setBusy(true);
      pendingHrefRef.current = href;
      window.dispatchEvent(new CustomEvent("morph:out"));
    },
    [busy]
  );

  // When pathname changes (i.e., after router.push completes), play the IN animation
  const lastPathRef = useRef(pathname);
  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      window.dispatchEvent(new CustomEvent("morph:in"));
    }
  }, [pathname]);

  // Router push happens only after OUT completes (overlay dispatches 'morph:navigate')
  useEffect(() => {
    function onNavigate() {
      const href = pendingHrefRef.current;
      if (href) {
        router.push(href);
      }
    }
    function onIdle() {
      setBusy(false);
      pendingHrefRef.current = null;
    }

    window.addEventListener("morph:navigate", onNavigate as EventListener);
    window.addEventListener("morph:idle", onIdle as EventListener);
    return () => {
      window.removeEventListener("morph:navigate", onNavigate as EventListener);
      window.removeEventListener("morph:idle", onIdle as EventListener);
    };
  }, [router]);

  const value = useMemo(() => ({ navigate, busy }), [navigate, busy]);
  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(TransitionContext);
  if (!ctx)
    throw new Error("TransitionLink must be used inside <TransitionProvider>");

  return (
    <button
      type="button"
      className={className}
      onClick={() => ctx.navigate(href)}
      aria-busy={ctx.busy}
      disabled={ctx.busy}
    >
      {children}
    </button>
  );
}

// ---------------- Overlay ---------------- //
function MorphOverlay({ preset }: { preset: PresetName }) {
  const { startD, endD, config } = PRESETS[preset];
  const tl = gsap.timeline({ paused: true, defaults: { ...config } });
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);

  // Shapes: start is a small blob at bottom-right, end is a full screen cover blob
//   const startD =
//     "M 100,600 C 200,580 240,520 280,520 C 360,520 420,580 520,600 C 620,620 760,640 900,700 L 900,900 L 100,900 Z";
//   const endD = "M 0,0 H 1000 V 1000 H 0 Z"; // full-rect cover fallback

  useLayoutEffect(() => {
    const root = rootRef.current!;
    const path = pathRef.current!;
    gsap.set(root, { autoAlpha: 0, pointerEvents: "none" });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.7 },
    });

    // If MorphSVGPlugin is registered, use it. Else, fall back to clip-path scale + path scale.
    const hasMorph = Boolean((gsap as any).plugins?.MorphSVGPlugin);

    if (hasMorph) {
      tl.set(root, { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo(path, { attr: { d: startD } }, { attr: { d: endD } })
        .add(() => {
          window.dispatchEvent(new CustomEvent("morph:navigate"));
        })
        .to(path, { attr: { d: startD } }) // reset back for the next intro
        .set(root, { autoAlpha: 0, pointerEvents: "none" });
    } else {
      // Fallback: scale a big circle with clip-path to cover the screen
      tl.set(root, { autoAlpha: 1, pointerEvents: "auto" })
        .fromTo(
          ".morph-mask",
          { scale: 0, transformOrigin: "50% 50%" },
          { scale: 14 }
        )
        .add(() => {
          window.dispatchEvent(new CustomEvent("morph:navigate"));
        })
        .to(".morph-mask", { scale: 0 })
        .set(root, { autoAlpha: 0, pointerEvents: "none" });
    }

    tlRef.current = tl;

    // Intro: play a quick reveal when the new page mounts
    const intro = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.6 },
    });
    if (hasMorph) {
      intro
        .set(root, { autoAlpha: 1, pointerEvents: "none" })
        .fromTo(path, { attr: { d: endD } }, { attr: { d: startD } })
        .set(root, { autoAlpha: 0 });
    } else {
      intro
        .set(root, { autoAlpha: 1, pointerEvents: "none" })
        .fromTo(".morph-mask", { scale: 14 }, { scale: 0 })
        .set(root, { autoAlpha: 0 });
    }
    introRef.current = intro;

    function handleOut() {
      tl.play(0);
    }
    function handleIn() {
      intro.play(0);
      // Signal context that we're idle (ready for more clicks)
      intro.then(() => window.dispatchEvent(new CustomEvent("morph:idle")));
    }

    window.addEventListener("morph:out", handleOut);
    window.addEventListener("morph:in", handleIn);
    return () => {
      window.removeEventListener("morph:out", handleOut);
      window.removeEventListener("morph:in", handleIn);
      tl.kill();
      intro.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden
    >
      {/* Fallback circle for non-Morph setups */}
      <div
        className="morph-mask absolute inset-0"
        style={{
          clipPath: "circle(6% at 85% 85%)",
          WebkitClipPath: "circle(6% at 85% 85%)",
          width: "100%",
          height: "100%",
          background: "green",
          transform: "scale(0)",
        }}
      />

      {/* SVG path for MorphSVGPlugin users */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 100,600 C 200,580 240,520 280,520 C 360,520 420,580 520,600 C 620,620 760,640 900,700 L 900,900 L 100,900 Z"
          fill="green"
        />
      </svg>
    </div>
  );
}

// ---------------- Convenience Demo Header ---------------- //
export function DemoHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <nav className="flex gap-3">
        <TransitionLink className="px-3 py-1 rounded-xl border" href="/">
          Home
        </TransitionLink>
        <TransitionLink className="px-3 py-1 rounded-xl border" href="/about">
          About
        </TransitionLink>
        <TransitionLink className="px-3 py-1 rounded-xl border" href="/contact">
          Contact
        </TransitionLink>
      </nav>
    </header>
  );
}
