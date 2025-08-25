"use client";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import AnimatedSidebar from "@/components/AnimatedSidebar";
import InterlockedGrid from "@/components/InterLockedGrid";
import Intro from "@/components/Intro";
import LineClampAutoPage from "@/components/LineClampAutoPage";
import MotionDemo from "@/components/MotionDemo";
import { MotionTextMath } from "@/components/MotionTextOrchestra";
import ParticleBackground from "@/components/ParticleBackground";
import ParticleItem from "@/components/ParticleItem";
import RippleBox from "@/components/RippleBox";
import Textual from "@/components/Textual";
import WaveBoxes from "@/components/WaveBoxes";
import { useState } from "react";
import SpacingPage from "./spacing/page";
import { DevConfigPanel } from "./old/DevConfigPanel";
import { LayoutOrchestra } from "@/components/LayoutOrchestra";
import { LayoutSwitcher } from "@/components/LayoutSwitcher";

export default function Home() {
   const [config, setConfig] = useState({
    radius: 160,
    spacing: 100,
    angleStart: -90,
    sweep: 120,
    spiralA: 24,
    spiralB: 32,
    spiralStepDeg: 40,
    rotateWithTangent: true,
  });
  return (
    <>
      <RippleBox />
       <DevConfigPanel
          schema={[
            { type: "number", key: "radius", label: "Radius", min: 50, max: 300, step: 10 },
            { type: "number", key: "angleStart", label: "Angle Start", min: -180, max: 180, step: 5 },
            { type: "number", key: "sweep", label: "Sweep", min: -180, max: 180, step: 5 },
            { type: "number", key: "spiralA", label: "Spiral A", min: -180, max: 180 },
            { type: "number", key: "spiralB", label: "Spiral B", min: -180, max: 180 },
            { type: "number", key: "spiralStepDeg", label: "Spiral Step Deg", min: -180, max: 180, step: 5 },
            { type: "number", key: "spacing", label: "Spacing", min: 0, max: 100, step: 1 },
            { type: "boolean", key: "rotateWithTangent", label: "Rotate With Tangent" },
          ]}
          values={config}
          onChange={setConfig}
          />
       <LayoutSwitcher overrides={{ circle: config }} {...config} >
        <LayoutOrchestra
          layout="circle"
          config={config}
          width={500}
          height={500}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-16 bg-amber-400 rounded-full flex items-center justify-center"
            >
              {i + 1}
            </div>
          ))}
        </LayoutOrchestra>
      </LayoutSwitcher>

      <LayoutSwitcher overrides={{ spiral: config }} {...config} >
        <LayoutOrchestra
          layout="spiral"
          config={config}
          width={500}
          height={500}
          className="bg-[teal] z-0"
        >
          <div className="locat"></div>
          <div className="locat"></div>
          <div className="locat"></div>
          <div className="locat"></div>
          <div className="locat"></div>
        </LayoutOrchestra>
      </LayoutSwitcher>

      <MotionDemo />
      <WaveBoxes />
      <Textual />
      <AnimatedGradientBg mode="position" opacity={0.4}>
        <div className="">
          <ParticleBackground mode="confetti" />
          <h1 className="font-size-(--step-2) text-[#5f3322] font-bold">
            🏠 Home Page
          </h1>
          <p>
            Welcome! Use the nav links above to explore responsive experiments.
          </p>
        </div>
      </AnimatedGradientBg>
      <div className=" flex aspect-video overflow-hidden ">
        <AnimatedSidebar />
        <div className="cbox">
          <div className="left-shape">
            <div className="content">Left</div>
          </div>
          <div className="right-shape"></div>
        </div>
      </div>
      {/* <ParticleItem /> */}
    </>
  );
}
