import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import ResponsiveImagesDemo1 from "@/components/ResponsiveImageDemo1"

export default function FluidTextPage() {
  return (
    <>
    <AnimatedGradientBg>

    <ResponsiveImagesDemo1 />
    <div>
      <h1 className="text-3xl font-bold">Fluid Text Demo</h1>
      <h2>fluid text check</h2>
      <h3 className="text-2xl font-semibold">Fluid Text Example</h3>
      <p className="text-[clamp(16px, 2vw, 24px)]">
        This paragraph uses <code>clamp()</code> for fluid text scaling.
      </p>
    </div>
    </AnimatedGradientBg>
    </>
  );
}
