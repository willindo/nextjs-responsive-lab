'use client';
import { AnimatedScope } from "./AnimatedScope";
import { useAnimations } from "./useAnimations";

export default function Intro() {
  const { trigger } = useAnimations();

  return (
    <div className="space-y-12 p-8">
      <AnimatedScope animation="fadeUp" stagger={0.2}>
        <h1 className="text-3xl font-bold">Hello World</h1>
        <p>This fades up with delay + stagger</p>
        <button
          data-animation="zoomIn"
          data-delay="0.8"
          className="p-2 bg-blue-500 text-white rounded"
        >
          I override zoomIn
        </button>
      </AnimatedScope>

      <button
        onClick={() =>
          trigger(".flash", { opacity: [0, 1, 0, 1] }, { duration: 1.2 })
        }
        className="p-2 bg-green-500 text-white rounded"
      >
        Trigger Flash (imperative)
      </button>

      <div className="flash mt-6 p-4 bg-gray-200">Watch me flash!</div>
    </div>
  );
}
