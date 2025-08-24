import { MotionTextMath } from "./MotionTextOrchestra";

export default function Textual() {
  return (
    <div className="space-y-6 p-6">
      <MotionTextMath as="h1" text="Hello World" pattern="waveY" />
      <MotionTextMath as="p" text="Animating letters individually!" pattern="pendulum" />
    </div>
  );
}
