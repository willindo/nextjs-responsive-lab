"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Unit = "px" | "vh" | "vw" | "%" | "";

export interface ScrollGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;

  triggerSelector?: string | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  anticipatePin?: number;
  markers?: boolean;
  stagger?: number;

  useBatch?: boolean;
  batchInterval?: number;
  batchMax?: number;

  /** if true, xStep/yStep scale relative to item size */
  gapRelative?: boolean;

  /** base multiplier for all step distances (scales with container) */
  stepBase?: number;

  xStep?: number;
  xUnit?: Unit;
  yStep?: number;
  yUnit?: Unit;

  scaleBase?: number;
  scaleStep?: number;
  rotateStep?: number;
  opacityBase?: number;
  opacityStep?: number;

  ease?: string;
  duration?: number;
  autoWillChange?: boolean;

  /** toggle animation on/off (if false applies static transforms) */
  enabled?: boolean;

  /** auto-fit mode: force exactly N items per row */
  autoFit?: boolean;
  itemsPerRow?: number;

  /** preserve child width by scaling its inner content to fit the cell */
  preserveChildWidth?: boolean;

  /** gap settings (used when not autoFit proportional gap) */
  gap?: number;
  gapUnit?: Unit;
  gapProportional?: boolean;
  gapRatio?: number;
}

const defaultProps: Partial<ScrollGroupProps> = {
  className: "",
  triggerSelector: null,
  start: "top 80%",
  end: "bottom top",
  scrub: true,
  pin: false,
  anticipatePin: 1,
  markers: false,
  stagger: 0.08,

  useBatch: false,
  batchInterval: 0.12,
  batchMax: 6,

  gapRelative: false,
  stepBase: 0.3,

  xStep: 0,
  xUnit: "px",
  yStep: 24,
  yUnit: "px",

  scaleBase: 1,
  scaleStep: 0.06,
  rotateStep: 4,
  opacityBase: 0.0,
  opacityStep: 0.15,

  ease: "none",
  duration: 1,
  autoWillChange: true,
  enabled: true,

  autoFit: false,
  itemsPerRow: 4,
  preserveChildWidth: false,

  gap: 16,
  gapUnit: "px",
  gapProportional: false,
  gapRatio: 0.04,
};

export default function ScrollGroup(props: ScrollGroupProps) {
  const p = { ...defaultProps, ...props } as Required<ScrollGroupProps>;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // track container width for responsive scaling
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // preserveScale is computed after first mount when preserveChildWidth requested
  const [preserveScale, setPreserveScale] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      setContainerWidth(cr.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // utils
  const gapToPx = (gap: number, unit: Unit, cw: number) => {
    if (unit === "%") return cw ? (gap / 100) * cw : gap;
    if (unit === "vw") return (gap / 100) * window.innerWidth;
    if (unit === "vh") return (gap / 100) * window.innerHeight;
    return gap; // px or fallback
  };

  // responsive scales (kept from your logic)
  const responsiveScaleBase =
    p.scaleBase * (containerWidth ? containerWidth / 1200 : 1);
  const responsiveScaleStep =
    p.scaleStep * (containerWidth ? containerWidth / 1200 : 1);

  // compute basic autoFit (item width and gap) — independent of preserveChildWidth
  const computeAutoFitBasic = () => {
    const n = Math.max(1, Math.floor(p.itemsPerRow));
    if (!p.autoFit || !containerWidth || n <= 0) {
      return {
        itemW: 0,
        gapPx: gapToPx(p.gap, p.gapUnit, containerWidth),
      };
    }

    if (p.gapProportional) {
      const r = Math.max(0, p.gapRatio);
      const denom = n + r * (n - 1);
      const itemW = denom > 0 ? containerWidth / denom : 0;
      const gapPx = r * itemW;
      return { itemW, gapPx };
    } else {
      const gapPx = gapToPx(p.gap, p.gapUnit, containerWidth);
      const totalGap = gapPx * (n - 1);
      const itemW = Math.max(0, (containerWidth - totalGap) / n);
      return { itemW, gapPx };
    }
  };

  const { itemW: autoItemW, gapPx: autoGapPx } = computeAutoFitBasic();

  // compute preserveScale *after* mount (measuring the actual child widths)
  useLayoutEffect(() => {
    if (!p.autoFit || !p.preserveChildWidth || !containerRef.current) {
      setPreserveScale(1);
      return;
    }

    const items = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(".sg-item")
    );
    if (!items.length) {
      setPreserveScale(1);
      return;
    }

    const childWidths: number[] = [];
    items.forEach((el) => {
      // try computed width, fallback to offsetWidth
      const cs = window.getComputedStyle(el);
      const w = parseFloat(cs.width || "0") || el.offsetWidth;
      if (w) childWidths.push(w);
    });

    if (!childWidths.length) {
      setPreserveScale(1);
      return;
    }

    const avgChild =
      childWidths.reduce((a, b) => a + b, 0) / childWidths.length;
    const available = autoItemW || Math.max(1, containerWidth / p.itemsPerRow);
    const scale = avgChild > 0 ? Math.min(1, available / avgChild) : 1; // clamp <= 1
    setPreserveScale(scale);
  }, [containerWidth, p.preserveChildWidth, p.itemsPerRow, p.autoFit, p.children, autoItemW]);

  // effective step base (responsive)
  const responsiveStepBase = p.stepBase * (containerWidth ? containerWidth / 1200 : 1);

  // normalize children (coreChild is created before conditionals)
  const normalizedChildren = React.Children.toArray(p.children).map((child, i) => {
    const key = React.isValidElement(child) && (child as any).key != null ? (child as any).key : `sg-${i}`;

    const coreChild = React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement, {
          key,
          className: `${(child as any).props?.className || ""} sg-item`.trim(),
          "data-sg-index": String(i),
          style: {
            boxSizing: "border-box",
            ...(child && typeof (child as any).props?.style === "object" ? (child as any).props.style : {}),
          },
        })
      : (
          <div key={key} className="sg-item" data-sg-index={String(i)} style={{ boxSizing: "border-box" }}>
            {child}
          </div>
        );

    // If autoFit: wrap into a fixed-size cell
    if (p.autoFit) {
      return (
        <div
          key={`fit-${key}`}
          className="sg-cell"
          style={{
            flex: `0 0 ${autoItemW}px`,
            maxWidth: `${autoItemW}px`,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* inner wrapper to apply preserveScale (so we don't mutate child's own size) */}
          <div
            className="sg-item-inner"
            style={{
              width: "100%",
              transform: p.preserveChildWidth ? `scale(${preserveScale})` : undefined,
              transformOrigin: "center center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {coreChild}
          </div>
        </div>
      );
    }

    // default : no autoFit, return core child directly (GSAP will animate .sg-item)
    return (
      <div key={`cell-${key}`} style={{ boxSizing: "border-box" }}>
        {coreChild}
      </div>
    );
  });

  // LIST GAP style
  const listInlineStyle: React.CSSProperties = {};
  if (p.autoFit) {
    listInlineStyle.gap = `${autoGapPx}px`;
  } else {
    const gapPx = gapToPx(p.gap, p.gapUnit, containerWidth);
    listInlineStyle.gap = `${gapPx}px`;
  }

  // ---------------------------
  // STATIC MODE (enabled === false)
  // Apply transforms directly to DOM (so we can measure each item)
  // ---------------------------
  useLayoutEffect(() => {
    if (p.enabled) return; // only when disabled
    const root = containerRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".sg-item"));
    if (!items.length) return;

    // For autoFit, we will apply transforms on the outer .sg-cell, not on inner .sg-item,
    // to avoid interfering with preserveScale (which is on .sg-item-inner).
    items.forEach((el, idx) => {
      const parentCell = el.closest(".sg-cell") as HTMLElement | null;
      const targetEl = parentCell ?? el; // where we apply translate/rotate/opacity

      const elW = el.offsetWidth || 0;
      const elH = el.offsetHeight || 0;

      // compute tx/ty based on gapRelative or fixed steps
      let tx = 0;
      let ty = 0;
      if (p.gapRelative) {
        // gap proportional to element size
        tx = elW * idx * responsiveStepBase;
        ty = elH * idx * responsiveStepBase;
      } else {
        if (p.autoFit) {
          tx = (autoItemW + autoGapPx) * idx * responsiveStepBase;
        } else {
          tx = (p.xStep ?? 0) * idx * responsiveStepBase;
        }
        ty = (p.yStep ?? 0) * idx * responsiveStepBase;
      }

      const scale = p.preserveChildWidth ? 1 : responsiveScaleBase + idx * responsiveScaleStep;
      const rot = idx * p.rotateStep * responsiveStepBase;
      const opa = Math.min(1, p.opacityBase + idx * p.opacityStep * responsiveStepBase);

      targetEl.style.transform = `translate(${tx}${p.xUnit}, ${ty}${p.yUnit}) rotate(${rot}deg) scale(${scale})`;
      targetEl.style.opacity = `${opa}`;
      targetEl.style.willChange = p.autoWillChange ? "transform, opacity" : "";
    });

    // cleanup function: none (we leave static transforms) - but optionally revert style on unmount
    return () => {
      items.forEach((el) => {
        const parentCell = el.closest(".sg-cell") as HTMLElement | null;
        const targetEl = parentCell ?? el;
        targetEl.style.transform = "";
        targetEl.style.opacity = "";
        if (p.autoWillChange) targetEl.style.willChange = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    p.enabled,
    containerWidth,
    p.gapRelative,
    p.stepBase,
    p.xStep,
    p.xUnit,
    p.yStep,
    p.yUnit,
    autoItemW,
    autoGapPx,
    preserveScale,
    p.preserveChildWidth,
    p.autoFit,
  ]);

  // ---------------------------
  // GSAP ANIMATION MODE (enabled === true)
  // ---------------------------
  useLayoutEffect(() => {
    if (!p.enabled) return; // only run when enabled
    const root = containerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = Array.from(root.querySelectorAll<HTMLElement>(".sg-item"));
      if (!items.length) return;

      if (p.autoWillChange) items.forEach((el) => (el.style.willChange = "transform, opacity"));

      // Helper for x/y generator (handles autoFit/gapRelative)
      const calcX = (i: number, el: HTMLElement) => {
        if (p.gapRelative) {
          const w = el.offsetWidth || 0;
          return w * i * responsiveStepBase;
        }
        if (p.autoFit) {
          return (autoItemW + autoGapPx) * i * responsiveStepBase;
        }
        return (p.xStep ?? 0) * i * responsiveStepBase;
      };

      const calcY = (i: number, el: HTMLElement) => {
        if (p.gapRelative) {
          const h = el.offsetHeight || 0;
          return h * i * responsiveStepBase;
        }
        return (p.yStep ?? 0) * i * responsiveStepBase;
      };

      // If using batch (fast for large lists)
      if (p.useBatch) {
        ScrollTrigger.batch(items as any, {
          interval: p.batchInterval,
          batchMax: p.batchMax,
          start: p.start,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: (ii, el) => calcY(ii as number, el as HTMLElement),
              x: (ii, el) => calcX(ii as number, el as HTMLElement),
              scale: (ii, el) => (p.preserveChildWidth ? 1 : responsiveScaleBase + (ii as number) * responsiveScaleStep),
              rotation: (ii) => (ii as number) * p.rotateStep * responsiveStepBase,
              opacity: (ii) => Math.min(1, p.opacityBase + (ii as number) * p.opacityStep * responsiveStepBase),
              stagger: p.stagger,
              duration: p.duration,
              ease: p.ease,
            });
          },
        });
        return;
      }

      // Timeline mode (scrubbed)
      const triggerEl = p.triggerSelector ? document.querySelector(p.triggerSelector) : root;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl as Element,
          start: p.start,
          end: p.end,
          scrub: p.scrub,
          pin: p.pin,
          anticipatePin: p.anticipatePin,
          // markers: p.markers,
        },
      });

      tl.to(items, {
        y: (ii, el) => calcY(ii as number, el as HTMLElement),
        x: (ii, el) => calcX(ii as number, el as HTMLElement),
        scale: (ii) => (p.preserveChildWidth ? 1 : responsiveScaleBase + (ii as number) * responsiveScaleStep),
        rotation: (ii) => (ii as number) * p.rotateStep * responsiveStepBase,
        opacity: (ii) => Math.min(1, p.opacityBase + (ii as number) * p.opacityStep * responsiveStepBase),
        stagger: p.stagger,
        duration: p.duration,
        ease: p.ease,
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    p.enabled,
    containerWidth,
    p.start,
    p.end,
    p.scrub,
    p.pin,
    p.anticipatePin,
    p.stagger,
    p.useBatch,
    p.batchInterval,
    p.batchMax,
    p.stepBase,
    p.xStep,
    p.xUnit,
    p.yStep,
    p.yUnit,
    autoItemW,
    autoGapPx,
    responsiveScaleBase,
    responsiveScaleStep,
    p.rotateStep,
    p.opacityBase,
    p.opacityStep,
    p.ease,
    p.duration,
    p.preserveChildWidth,
    p.gapRelative,
  ]);

  // ---------------------------
  // Render container
  // ---------------------------
  return (
    <div
      ref={containerRef}
      className={`scroll-group-root max-w-screen overflow-hidden ${p.className || ""}`}
    >
      <div
        className="sg-list flex flex-wrap justify-center"
        style={{
          alignItems: "stretch",
          ...listInlineStyle,
        }}
      >
        {normalizedChildren}
      </div>
    </div>
  );
}
