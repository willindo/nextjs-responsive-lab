'use client';
import { AnimatedScope } from "./AnimatedScope";
import { useAnimations } from "./useAnimations";
import { useRef } from "react";
export default function Intro() {
  const { trigger, stop, toggle } = useAnimations();
const animRef = useRef<Animation | null>(null);



  return (
    <div className="space-y-12 p-8">
      <AnimatedScope animation="fadeUp" stagger={0.2}>
        <h1 className="text-3xl font-bold">Hello World</h1>
        <p data-animation="slideRight" data-delay="0.4">This fades up with delay + stagger</p>
        <button
          data-animation="zoomIn"
          data-delay="1"
          className="p-2 bg-blue-500 text-white rounded"
        >
          I override zoomIn
        </button>
      </AnimatedScope>
<button
        onClick={() =>
          toggle(
            ".flash",
            [
              { opacity: 0, backgroundColor: "red", textTransform: "uppercase" },
              { opacity: 1, backgroundColor: "blue" },
              { opacity: 0 },
            ],
            { duration: 1200, repeat: "infinite", easing: "ease-in-out" }
          )
        }
      >
        Toggle Animation
      </button>

      <div className="flash mt-6 p-4 bg-gray-200">Watch me flash!</div>
    </div>
  );
}
