"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean;
  stagger?: number;
  baseScale?: number;
  scaleStep?: number;
  yStep?: number;
}

export function useScrollGroup(
  selector: string,
  {
    trigger,
    start = "top 80%",
    end = "bottom top",
    scrub = true,
    stagger = 0.1,
    baseScale = 1,
    scaleStep = 0.1,
    yStep = 20,
  }: Options = {}
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(selector);
      items.forEach((el, i) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: trigger || el,
            start,
            end,
            scrub,
          },
          scale: baseScale + i * scaleStep,
          y: i * yStep,
          opacity: 1,
          ease: "none",
          stagger,
        });
      });
    });

    return () => ctx.revert();
  }, [selector, trigger, start, end, scrub, stagger, baseScale, scaleStep, yStep]);
}
