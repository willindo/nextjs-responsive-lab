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

  /** toggle animation on/off */
  enabled?: boolean;

  /** auto-fit mode: force exactly N items per row */
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
  xStep: 30,
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
};

export default function ScrollGroupA(props: ScrollGroupProps) {
  const p = { ...defaultProps, ...props } as Required<ScrollGroupProps>;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // track container width for responsive scaling
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      setContainerWidth(cr.width);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Compute scale factor relative to container width
  const responsiveScaleBase =
    p.scaleBase * (containerWidth ? containerWidth / 1200 : 1);
  const responsiveScaleStep =
    p.scaleStep * (containerWidth ? containerWidth / 1200 : 1);

  // ---------------------------
  // Prepare children
  // ---------------------------
  const normalizedChildren = React.Children.toArray(p.children).map(
    (child, i) => {
      const key =
        React.isValidElement(child) && child.key ? child.key : `sg-${i}`;

      const coreChild = React.isValidElement<{
        className?: string;
        style?: React.CSSProperties;
      }>(child)
        ? React.cloneElement(child, {
            key,
            className: `${child.props.className || ""} sg-item`.trim(),
            "data-sg-index": String(i),
            style: {
              flexShrink: 0,
              ...(child.props.style || {}),
            },
          })
        : (
            <div key={key} className="sg-item" data-sg-index={String(i)}>
              {child}
            </div>
          );

      // If disabled, apply static transforms
      if (!p.enabled) {
        const staticStyle: React.CSSProperties = {
          transform: `translate(${(p.xStep ?? 0) * i}${p.xUnit}, ${
            (p.yStep ?? 0) * i
          }${p.yUnit})
                      scale(${responsiveScaleBase + i * responsiveScaleStep})
                      rotate(${i * p.rotateStep}deg)`,
          opacity: Math.min(1, p.opacityBase + i * p.opacityStep),
          flexShrink: 0,
        };
        return (
          <div
            key={`static-${key}`}
            className="sg-item"
            style={staticStyle}
            data-sg-index={String(i)}
          >
            {coreChild}
          </div>
        );
      }

      // Wrap with auto-fit cell if enabled
      if (p.autoFit) {
        return (
          <div
            key={`fit-${key}`}
            className="sg-autofit"
            style={{
              flex: `0 0 ${100 / p.itemsPerRow}%`,
              maxWidth: `${100 / p.itemsPerRow}%`,
            }}
          >
            {coreChild}
          </div>
        );
      }

      return coreChild;
    }
  );

  // ---------------------------
  // Animate (rebuild when enabled changes)
  // ---------------------------
  useLayoutEffect(() => {
    if (!p.enabled) return; // skip GSAP

    const ctx = gsap.context(() => {
      const root = containerRef.current;
      if (!root) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>(".sg-item"));
      if (!items.length) return;

      if (p.autoWillChange) {
        items.forEach((el) => (el.style.willChange = "transform, opacity"));
      }

      if (p.useBatch) {
        ScrollTrigger.batch(items as any, {
          interval: p.batchInterval,
          batchMax: p.batchMax,
          start: p.start,
          onEnter: (batch) => {
            gsap.to(batch, {
              y: gsap.utils.unitize((i) => (p.yStep ?? 0) * i, p.yUnit),
              x: gsap.utils.unitize((i) => (p.xStep ?? 0) * i, p.xUnit),
              scale: (i) => responsiveScaleBase + i * responsiveScaleStep,
              rotation: (i) => i * p.rotateStep,
              opacity: (i) =>
                Math.min(1, p.opacityBase + i * p.opacityStep),
              stagger: p.stagger,
              duration: p.duration,
              ease: p.ease,
            });
          },
        });
        return;
      }

      const triggerEl = p.triggerSelector
        ? document.querySelector(p.triggerSelector)
        : root;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerEl as Element,
            start: p.start,
            end: p.end,
            scrub: p.scrub,
            pin: p.pin,
            anticipatePin: p.anticipatePin,
          },
        })
        .to(items, {
          y: gsap.utils.unitize((i) => (p.yStep ?? 0) * i, p.yUnit),
          x: gsap.utils.unitize((i) => (p.xStep ?? 0) * i, p.xUnit),
          scale: (i) => responsiveScaleBase + i * responsiveScaleStep,
          rotation: (i) => i * p.rotateStep,
          opacity: (i) => Math.min(1, p.opacityBase + i * p.opacityStep),
          stagger: p.stagger,
          duration: p.duration,
          ease: p.ease,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [
    p.enabled,
    p.start,
    p.end,
    p.scrub,
    p.pin,
    p.anticipatePin,
    p.stagger,
    p.useBatch,
    p.batchInterval,
    p.batchMax,
    p.xStep,
    p.xUnit,
    p.yStep,
    p.yUnit,
    responsiveScaleBase,
    responsiveScaleStep,
    p.rotateStep,
    p.opacityBase,
    p.opacityStep,
    p.ease,
    p.duration,
  ]);

  // ---------------------------
  // Layout container
  // ---------------------------
  return (
    <div
      ref={containerRef}
      className={`scroll-group-root max-w-screen overflow-hidden ${p.className}`}
    >
      <div className="sg-list flex ga-4">
        {normalizedChildren}
      </div>
    </div>
  );
}
//   ---- let's upgrade this for practical scenario: group of items same sized. parent-height  not a matter now. GAP (-❌, +✅) = parent container max-w-screen. within elements gap equally. if gap need proportionally such gap among small items <gap among big items. though both mode gap still configurable with step, step also by base unit ---- SIZE= elements should fit within screen, if css size of items then  growing  by it  sequally among all, if not given css  apply a default unit . option : step, autoFit , itemsPerRow . if try count, all size matter  relative to count - means - with non negative gap - auto- shrinking sequelly for fitting the counted elements to fit available width. even after auto sized with screen still configurable with options .upgrade current code or from scratch new code your choice. carefully. NOTE: there are many in current code beyond i mentioned here. you pick all features and review/analyze for the practical scenario mentionned here.