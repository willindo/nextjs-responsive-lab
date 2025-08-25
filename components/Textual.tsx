import { MotionTextMath } from "./MotionTextOrchestra";

export default function Textual() {
  return (
    <div className="p-6 space-y-4">
      <MotionTextMath as="h1" text="Welcome Home" pattern="waveY" />
      <MotionTextMath as="p" text="Animating with MotionTextMath" pattern="pendulum" />
      <MotionTextMath text="Just inline text" /> {/* defaults to <span> */}
    </div>
  );
}
