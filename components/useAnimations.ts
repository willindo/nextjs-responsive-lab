"use client";

import { useCallback } from "react";

export function useAnimations() {
  const trigger = useCallback(
    (
      selector: string,
      keyframes: Record<string, any>,
      options: KeyframeAnimationOptions = {}
    ) => {
      if (typeof document === "undefined") return;

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.animate(keyframes, options);
        }
      });
    },
    []
  );

  return { trigger };
}
