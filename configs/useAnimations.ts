"use client";
import { useCallback, useRef } from "react";

export function useAnimations() {
  // Store animations by selector
  const anims = useRef<Record<string, Animation[]>>({});

  const trigger = useCallback(
    (
      selector: string,
      keyframes: Keyframe[] | PropertyIndexedKeyframes,
      options?: KeyframeAnimationOptions & {
        repeat?: number | "infinite";
      }
    ) => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      const resolvedOptions: KeyframeAnimationOptions = {
        duration:
          typeof options?.duration === "number"
            ? options.duration < 50
              ? options.duration * 1000
              : options.duration
            : 1000,
        iterations:
          options?.repeat === "infinite" ? Infinity : options?.repeat ?? 1,
        easing: options?.easing ?? "ease-in-out",
        fill: options?.fill ?? "forwards",
        direction: options?.direction ?? "normal",
        delay: options?.delay ?? 0,
        ...options,
      };

      const newAnims: Animation[] = [];
      elements.forEach((el) => {
        const anim = el.animate(keyframes, resolvedOptions);
        newAnims.push(anim);
      });

      anims.current[selector] = newAnims;
      return newAnims;
    },
    []
  );

  const stop = useCallback((selector: string) => {
    anims.current[selector]?.forEach((anim) => {
      anim.cancel();
    });
    anims.current[selector] = [];
  }, []);

  const toggle = useCallback(
    (
      selector: string,
      keyframes: Keyframe[] | PropertyIndexedKeyframes,
      options?: KeyframeAnimationOptions & {
        repeat?: number | "infinite";
      }
    ) => {
      const active = anims.current[selector]?.some(
        (anim) => anim.playState === "running"
      );
      if (active) {
        stop(selector);
      } else {
        trigger(selector, keyframes, options);
      }
    },
    [stop, trigger]
  );

  return { trigger, stop, toggle };

}
//  <div className="box" data-state={state} />
//             <button onClick={() => setState(!state)}>Toggle position</button>
//  transition: transform ${spring(0.5, 0.8)};
//                         transform: translateX(-100%);
//                     }

//                     .example-container .box[data-state="true"] {
//                         transform: translateX(100%) rotate(180deg);
//  <motion.div
//                 drag
//                 dragConstraints={constraintsRef}
//                 dragElastic={0.2}
//                 style={box}
//             />
//         </motion.div>
// { AnimatePresence, motion, usePresenceData, wrap } 
// const nextItem = wrap(1, items.length, selectedItem + newDirection)
// initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//                 duration: 0.8,
//                 delay: 0.5,
//                 ease: [0, 0.71, 0.2, 1.01],
//             }}