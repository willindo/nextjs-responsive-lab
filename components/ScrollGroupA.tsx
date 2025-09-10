"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutConfig } from "@/configs/useLayoutConfig";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { DevConfigPanel1 } from "./ui-tools/DevConfigPanel1";
import { arcSpiralSchema, ConfigField } from "@/configs/panelSchemas";
import LayoutOrchestra from "./LayoutOrchestra";
gsap.registerPlugin(ScrollTrigger);

type Unit = "px" | "vh" | "vw" | "%" | "";
type GapMode = "fixed" | "relativeX" | "relativeY" | "both";

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

  /** multiplier used for relative sizing */
  stepBase?: number;

  /** fixed-step values (used when gapMode includes fixed) */
  xStep?: number;
  xUnit?: Unit;
  yStep?: number;
  yUnit?: Unit;

  gapMode?: GapMode;

  scaleBase?: number;
  scaleStep?: number;
  rotateStep?: number;
  opacityBase?: number;
  opacityStep?: number;

  ease?: string;
  duration?: number;
  autoWillChange?: boolean;

  enabled?: boolean;

  autoFit?: boolean;
  itemsPerRow?: number;
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

  stepBase: 0.3,
  xStep: 0,
  xUnit: "px",
  yStep: 24,
  yUnit: "px",
  gapMode: "both",

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
};

export default function ScrollGroup(rawProps: ScrollGroupProps) {
  const p = { ...defaultProps, ...rawProps } as Required<ScrollGroupProps>;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // measurements
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [itemSizes, setItemSizes] = useState<Record<number, { w: number; h: number }>>({});

  // Auto-fit basic computation (returns pixel widths)
  const computeAutoFitBasic = (cw: number) => {
    const n = Math.max(1, Math.floor(p.itemsPerRow));
    if (!p.autoFit || !cw || n <= 0) return { itemW: 0, gapPx: 0 };
    // simple even-fit (no preserveChildWidth here)
    // we assume a fixed gap (0) between auto cells by default — actual gap logic can be added later
    const gapPx = 0;
    const itemW = Math.max(0, (cw - gapPx * (n - 1)) / n);
    return { itemW, gapPx };
  };

  // Convert a unit value (value + unit) into px based on container/window
  const unitToPx = (value: number, unit: Unit, cw: number) => {
    if (unit === "px" || unit === "") return value;
    if (unit === "%") return cw ? (value / 100) * cw : value;
    if (unit === "vw") return (value / 100) * window.innerWidth;
    if (unit === "vh") return (value / 100) * window.innerHeight;
    return value;
  };

  // Observe container width and items
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const roContainer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setContainerWidth(entries[0].contentRect.width);
    });
    roContainer.observe(container);

    // observe items
    const roItems = new ResizeObserver((entries) => {
      setItemSizes((prev) => {
        const next = { ...prev };
        for (const e of entries) {
          const idx = Number(e.target.getAttribute("data-sg-index"));
          next[idx] = { w: e.contentRect.width, h: e.contentRect.height };
        }
        return next;
      });
    });

    const items = container.querySelectorAll<HTMLElement>(".sg-item");
    items.forEach((it) => roItems.observe(it));

    // also observe future children additions by watching subtree (simple approach)
    const mo = new MutationObserver(() => {
      // re-observe newly added items
      const nowItems = container.querySelectorAll<HTMLElement>(".sg-item");
      nowItems.forEach((it) => {
        // avoid double-observe (ResizeObserver ignores duplicates), but safe to call
        roItems.observe(it);
      });
    });
    mo.observe(container, { childList: true, subtree: true });

    return () => {
      roContainer.disconnect();
      roItems.disconnect();
      mo.disconnect();
    };
    // re-run when children change (rawProps.children length changes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawProps.children]);

  // compute offsets (cumulative) in px
  const computeOffsets = () => {
    const itemsCount = Math.max(React.Children.count(p.children), 0);
    const { itemW: autoItemW } = computeAutoFitBasic(containerWidth);

    // Precompute fixed-step px versions
    const baseXFixedPx = unitToPx(p.xStep, p.xUnit, containerWidth);
    const baseYFixedPx = unitToPx(p.yStep, p.yUnit, containerWidth);

    // per-item gaps
    const gapX: number[] = new Array(itemsCount).fill(0);
    const gapY: number[] = new Array(itemsCount).fill(0);

    for (let i = 0; i < itemsCount; i++) {
      const size = itemSizes[i] ?? { w: autoItemW || baseXFixedPx || 0, h: 0 };
      // horizontal gap
      switch (p.gapMode) {
        case "fixed":
          gapX[i] = baseXFixedPx;
          gapY[i] = baseYFixedPx;
          break;
        case "relativeX":
          gapX[i] = p.stepBase * (size.w || baseXFixedPx);
          gapY[i] = baseYFixedPx;
          break;
        case "relativeY":
          gapX[i] = baseXFixedPx;
          gapY[i] = p.stepBase * (size.h || baseYFixedPx);
          break;
        case "both":
        default:
          gapX[i] = baseXFixedPx + p.stepBase * (size.w || baseXFixedPx);
          gapY[i] = baseYFixedPx + p.stepBase * (size.h || baseYFixedPx);
      }
    }

    // cumulative offsets (0 for first element)
    const cumX: number[] = new Array(itemsCount).fill(0);
    const cumY: number[] = new Array(itemsCount).fill(0);
    for (let i = 1; i < itemsCount; i++) {
      cumX[i] = cumX[i - 1] + gapX[i - 1];
      cumY[i] = cumY[i - 1] + gapY[i - 1];
    }

    return { gapX, gapY, cumX, cumY, autoItemW };
  };

  // compute offsets memo-like each render (cheap)
  const { gapX, gapY, cumX, cumY, autoItemW } = computeOffsets();

  // responsive scales
  const responsiveScaleBase =
    p.scaleBase * (containerWidth ? containerWidth / 1200 : 1);
  const responsiveScaleStep =
    p.scaleStep * (containerWidth ? containerWidth / 1200 : 1);

  // normalized children (attach sg-item etc)
  const normalizedChildren = React.Children.toArray(p.children).map((child, i) => {
    const key = React.isValidElement(child) && (child as any).key != null ? (child as any).key : `sg-${i}`;

    const coreChild = React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, {
        key,
        className: `${(child.props as any)?.className || ""} sg-item`.trim(),
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

    if (p.autoFit) {
      // cell width - use percentage CSS (keeps responsive) but we still compute offsets in px for animation
      const pct = 100 / p.itemsPerRow;
      return (
        <div
          key={`fit-${key}`}
          className="sg-cell"
          style={{
            flex: `0 0 ${pct}%`,
            maxWidth: `${pct}%`,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", boxSizing: "border-box", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {coreChild}
          </div>
        </div>
      );
    }

    // default
    return (
      <div key={`cell-${key}`} style={{ boxSizing: "border-box" }}>
        {coreChild}
      </div>
    );
  });

  // STATIC mode: apply transforms directly (cumulative offsets used)
  useLayoutEffect(() => {
    if (p.enabled) return; // only when disabled
    const root = containerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".sg-item"));
    items.forEach((el, idx) => {
      const tx = cumX[idx] ?? 0;
      const ty = cumY[idx] ?? 0;
      const scale = responsiveScaleBase + idx * responsiveScaleStep;
      const rot = idx * p.rotateStep;
      const opa = Math.min(1, p.opacityBase + idx * p.opacityStep);
      const target = (el.closest(".sg-cell") ?? el) as HTMLElement | SVGElement ;
      target.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
      target.style.opacity = `${opa}`;
      target.style.willChange = p.autoWillChange ? "transform, opacity" : "";
    });

    return () => {
      items.forEach((el) => {
        const target = (el.closest(".sg-cell") ?? el) as HTMLElement | SVGElement  ;
        target.style.transform = "";
        target.style.opacity = "";
        if (p.autoWillChange) target.style.willChange = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    p.enabled,
    // recalc when offsets or sizes change:
    JSON.stringify(cumX),
    JSON.stringify(cumY),
    responsiveScaleBase,
    responsiveScaleStep,
    p.rotateStep,
    p.opacityBase,
    p.opacityStep,
  ]);

  // ANIMATION mode: GSAP using cumulative offsets
  useLayoutEffect(() => {
    if (!p.enabled) return;
    const root = containerRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const items = Array.from(root.querySelectorAll<HTMLElement>(".sg-item"));
      if (!items.length) return;

      if (p.autoWillChange) items.forEach((el) => (el.style.willChange = "transform, opacity"));

      if (p.useBatch) {
        ScrollTrigger.batch(items as any, {
          interval: p.batchInterval,
          batchMax: p.batchMax,
          start: p.start,
          onEnter: (batch) => {
            gsap.to(batch, {
              x: (ii, el) => cumX[ii as number] ?? 0,
              y: (ii, el) => cumY[ii as number] ?? 0,
              scale: (ii) => responsiveScaleBase + (ii as number) * responsiveScaleStep,
              rotation: (ii) => (ii as number) * p.rotateStep,
              opacity: (ii) => Math.min(1, p.opacityBase + (ii as number) * p.opacityStep),
              stagger: p.stagger,
              duration: p.duration,
              ease: p.ease,
            });
          },
        });
        return;
      }

      const triggerEl = p.triggerSelector ? document.querySelector(p.triggerSelector) : root;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl as Element,
          start: p.start,
          end: p.end,
          scrub: p.scrub,
          pin: p.pin,
          anticipatePin: p.anticipatePin,
        },
      });

      tl.to(items, {
        x: (ii, el) => cumX[ii as number] ?? 0,
        y: (ii, el) => cumY[ii as number] ?? 0,
        scale: (ii) => responsiveScaleBase + (ii as number) * responsiveScaleStep,
        rotation: (ii) => (ii as number) * p.rotateStep,
        opacity: (ii) => Math.min(1, p.opacityBase + (ii as number) * p.opacityStep),
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
    // include offsets and dependent pieces
    JSON.stringify(cumX),
    JSON.stringify(cumY),
    responsiveScaleBase,
    responsiveScaleStep,
    p.rotateStep,
    p.opacityBase,
    p.opacityStep,
    p.stagger,
    p.duration,
    p.ease,
    p.useBatch,
    p.start,
    p.end,
    p.scrub,
    p.pin,
    p.anticipatePin,
  ]);

  // list gap style when autoFit === false we can apply a CSS gap (but note transforms still used)
  const listInlineStyle: React.CSSProperties = {};
  if (!p.autoFit) {
    // choose a representative gap value for layout spacing (use first gapX if relative)
    const gapSample = gapX[0] ?? unitToPx(p.xStep, p.xUnit, containerWidth);
    listInlineStyle.gap = `${gapSample}px`;
  }

  return (
    <div ref={containerRef} className={`scroll-group-root max-w-screen verflow-hidden ${p.className || ""}`}>
      <div className="sg-list flex flex-wra ustify-center" style={{ alignItems: "stretch", ...listInlineStyle }}>
        {normalizedChildren}
      </div>
    </div>
  );
}
export function SequentialSizeGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config, setConfig } = useLayoutConfig("circle")
  return (
    <div className=" " style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <DevConfigPanel1
        schema={arcSpiralSchema as ConfigField[]}
        values={{...config,  }}
      onChange={setConfig}
      />
      <LayoutSwitcher>
        <LayoutOrchestra
          layout="arc"
          config={{ ...config, spacing: 40, }}
          // width={200}
          // height={200}
          className=" overflow-hidden"
        >
          {React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child)) return child;

            // each item is +20px wider and +10px taller
            const width = 20 + i * 10;
            const height = 20 + i * 10;
            return React.cloneElement(child as React.ReactElement<any>, {
              style: {
                ...(React.isValidElement(child) && child.props && typeof child.props === "object" ? (child.props as { style?: React.CSSProperties }).style : {}),
                width,
                height,
                // margins remain stable (not affected by scale)
                background: "lightblue",
                textAlign: "center",
                // lineHeight: `${height}px`,
                borderRadius: "50%",
              },
            });
          }) || []}
        </LayoutOrchestra>
      </LayoutSwitcher>
    </div>
  );
}

//   ---- let's upgrade this for practical scenario: group of items same sized. parent-height  not a matter now. GAP (-❌, +✅) = parent container max-w-screen. within elements gap equally. if gap need proportionally such gap among small items <gap among big items. though both mode gap still configurable with step, step also by base unit ---- SIZE= elements should fit within screen, if css size of items then  growing  by it  sequally among all, if not given css  apply a default unit . option : step, autoFit , itemsPerRow . if try count, all size matter  relative to count - means - with non negative gap - auto- shrinking sequelly for fitting the counted elements to fit available width. even after auto sized with screen still configurable with options .upgrade current code or from scratch new code your choice. carefully. NOTE: there are many in current code beyond i mentioned here. you pick all features and review/analyze for the practical scenario mentionned here.