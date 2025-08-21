import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import LineClampAutoPage from "@/components/LineClampAutoPage";
import ParticleItem from "@/components/ParticleItem";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo";

export default function Home() {
  return (
    <>
      <div className="">
        <h1 className="text-3xl font-bold">🏠 Home Page</h1>
        <p>
          Welcome! Use the nav links above to explore responsive experiments.
        </p>
      </div>
      <div className="container">
  <div className="left-shape">
    <div className="content">Left</div>
  </div>
  <div className="right-shape">
    {/* <div className="content">Right</div> */}
  </div>
</div>
<AnimatedGradientBg  className="h-80 rounded-2xl overflow-hidden" opacity={0.4} mode="position" colors={["#00E5FF", "#29FF6A", "#FFD600", "#FF3D00"]} />
  {/* <ParticleItem /> */}
    </>
  );
  
        {/* <div className="max-w-md h-32 overflow-hidden relative bg-yellow-100 p-4">
    <p className="text-base leading-relaxed">
      This paragraph will auto-adjust how many lines it shows depending on the
      parent’s height. No fixed line count — instead, the text is clipped by the
      parent’s height.
      This paragraph will auto-adjust how many lines it shows depending on the
        <ResponsiveImagesDemo />
      parent’s height. No fixed line count — instead, the text is clipped by the
      parent’s height.
    </p>
    <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-yellow-300"></div>
  </div>
  <div className="max-w-md h-[clamp(80px, 20vh, 200px)] overflow-hidden relative bg-green-100 p-4">
    <p className="text-base leading-relaxed line-clamp-5">
      The parent’s height changes fluidly with viewport, so the number of visible
      lines adjusts automatically without changing font size.
      The parent’s height changes fluidly with viewport, so the number of visible
      lines adjusts automatically without changing font size.
      The parent’s height changes fluidly with viewport, so the number of visible
      lines adjusts automatically without changing font size.
    </p>
    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-green-400"></div>
  </div> */}
        {/* <LineClampAutoPage /> */}
}
