import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import AnimatedSidebar from "@/components/AnimatedSidebar";
import InterlockedGrid from "@/components/InterLockedGrid";
import LineClampAutoPage from "@/components/LineClampAutoPage";
import ParticleBackground from "@/components/ParticleBackground";
import ParticleItem from "@/components/ParticleItem";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo";

export default function Home() {
  return (
    <>
    <AnimatedGradientBg mode="position" opacity={0.4} >
      <div className="">
        <ParticleBackground mode="confetti" />
        <h1 className="text-3xl font-bold">🏠 Home Page</h1>
        <p>
          Welcome! Use the nav links above to explore responsive experiments.
        </p>
      </div>
    </AnimatedGradientBg>
      {/* <div className=" flex aspect-video overflow-hidden ">
        <AnimatedSidebar />
        <div className="cbox">
          <div className="left-shape">
            <div className="content">Left</div>
          </div>
          <div className="right-shape"></div>
        </div>
      </div> */}
      {/* <ParticleItem /> */}
    </>
  );
}
