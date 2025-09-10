"use client";
import React, {
  useEffect,
  useRef,
  useState,
  cloneElement,
  ReactNode,
  ReactElement,
} from "react";
import gsap from "gsap";

type ScrollGroupProps = {
  children: ReactNode;
  className?: string;
  gap?: number; // numeric gap value
  gapUnit?: "px" | "%"; // unit of gap
  gapProportional?: boolean; // interpret gap as ratio
  gapRatio?: number; // if proportional
  animate?: boolean; // enable animations
  preserveChildWidth?: boolean; // NEW: autoFit respects child widths
  autoFit?: boolean;
  itemsPerRow?: number;
  animationDuration?: number; // seconds
  animationEase?: string;
  animationScale?: number;
};

const defaultProps: Partial<ScrollGroupProps> = {
  gap: 16,
  gapUnit: "px",
  gapProportional: false,
  gapRatio: 0.2,
  animate: true,
  preserveChildWidth: false,
  autoFit: false,
  itemsPerRow: 3,
  animationDuration: 0.6,
  animationEase: "power2.out",
  animationScale: 1.05,
};

const ScrollGroup = (props: ScrollGroupProps) => {
  const p = { ...defaultProps, ...props };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // measure container width
  useEffect(() => {
    if (!containerRef.current) return;
    const measure = () =>
      setContainerWidth(containerRef.current?.offsetWidth || 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // gap utility
  const gapToPx = (gap: number, unit: "px" | "%", cw: number): number =>
    unit === "px" ? gap : (gap / 100) * cw;

  // --- AUTO-FIT math
  const computeAutoFit = () => {
    const n = Math.max(1, Math.floor(p.itemsPerRow || 0));
    if (!p.autoFit || !containerWidth || n <= 0) {
      return {
        itemW: 0,
        gapPx: gapToPx(p.gap!, p.gapUnit!, containerWidth),
        scale: 1,
      };
    }

    let itemW = 0;
    let gapPx = 0;

    if (p.gapProportional) {
      const r = Math.max(0, p.gapRatio!);
      const denom = n + r * (n - 1);
      itemW = denom > 0 ? containerWidth / denom : 0;
      gapPx = r * itemW;
    } else {
      gapPx = gapToPx(p.gap!, p.gapUnit!, containerWidth);
      const totalGap = gapPx * (n - 1);
      itemW = Math.max(0, (containerWidth - totalGap) / n);
    }

    if (!p.preserveChildWidth) return { itemW, gapPx, scale: 1 };

    // measure child widths
    const tmp =
      containerRef.current?.querySelectorAll<HTMLElement>(".sg-item") || [];
    const childWidths: number[] = [];
    tmp.forEach((el) => {
      const cs = window.getComputedStyle(el);
      const w = parseFloat(cs.width || "0") || el.offsetWidth;
      if (w) childWidths.push(w);
    });

    if (!childWidths.length) return { itemW, gapPx, scale: 1 };

    const avgChild =
      childWidths.reduce((a, b) => a + b, 0) / childWidths.length;
    const available = itemW;
    const scale = available / avgChild;

    return { itemW: available, gapPx, scale };
  };

  const {
    itemW: autoItemW,
    gapPx: autoGapPx,
    scale: preserveScale,
  } = computeAutoFit();

  // --- normalize children
  const normalizedChildren = React.Children.map(p.children, (child, idx) => {
    if (!React.isValidElement(child)) return child;

    const key = (child as ReactElement).key ?? idx;

    // core child clone (preserve className)
    const coreChild = cloneElement(child as ReactElement | any , {
      className: `${(child.props as any)?.className || ""} sg-item`.trim(),
    });

    // auto-fit wrapping
    if (p.autoFit) {
      return (
        <div
          key={`fit-${key}`}
          className="sg-cell flex justify-center items-center"
          style={{
            flex: `0 0 ${autoItemW}px`,
            maxWidth: `${autoItemW}px`,
            boxSizing: "border-box",
          }}
        >
          <div
            className="sg-item-inner"
            style={{
              transform: p.preserveChildWidth
                ? `scale(${preserveScale})`
                : undefined,
              transformOrigin: "center center",
            }}
          >
            {coreChild}
          </div>
        </div>
      );
    }

    // fallback gap spacing
    const isLast = idx === React.Children.count(p.children) - 1;
    const style = !isLast ? { marginRight: gapToPx(p.gap!, p.gapUnit!, containerWidth) } : {};

    return (
      <div key={key} style={style}>
        {coreChild}
      </div>
    );
  });

  // --- animate
  useEffect(() => {
    if (!p.animate || !containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sg-item",
        { opacity: 0, y: 20, scale: p.preserveChildWidth ? 1 : 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: p.preserveChildWidth ? 1 : p.animationScale,
          duration: p.animationDuration,
          ease: p.animationEase,
          stagger: 0.08,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [
    p.animate,
    p.animationDuration,
    p.animationEase,
    p.animationScale,
    p.preserveChildWidth,
  ]);

  // --- render
  return (
    <div
      ref={containerRef}
      className={`scroll-group-root max-w-screen overflow-hidden ${p.className || ""}`}
    >
      <div className="sg-list flex flex-wr justify-center">{normalizedChildren}</div>
    </div>
  );
};

export default ScrollGroup;



{/* Auto-fit: exactly 5 per row, gap = 12px (fixed) */}
{/* <ScrollGroup autoFit itemsPerRow={5} gap={12} enabled>
  {cards.map(c => <Card key={c.id} />)}
</ScrollGroup> */}

{/* Auto-fit with proportional gap (4% of item width) */}
{/* <ScrollGroup autoFit itemsPerRow={4} gapProportional gapRatio={0.04} enabled>
  {items}
</ScrollGroup> */}

{/* Manual mode: no auto-fit, use xStep for offset */}
{/* <ScrollGroup autoFit={false} xStep={40} xUnit="px" yStep={20} enabled>
  ...
</ScrollGroup> */}

{/* Static layout (no GSAP), still auto-fit */}
{/* <ScrollGroup enabled={false} autoFit itemsPerRow={3} gap={16}>
  ...
</ScrollGroup> */}
