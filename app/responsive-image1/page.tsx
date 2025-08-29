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
import SpacingPage from "../spacing/page";
import { LayoutOrchestra } from "@/components/LayoutOrchestra";
import { LayoutSwitcher } from "@/components/LayoutSwitcher";
import { DevConfigPanel1 } from "@/components/ui-tools/DevConfigPanel1";
import { AnimatedScope } from "@/components/AnimatedScope";
import { MotionScopeMath } from "@/components/MotionPlayground";
import { arcSpiralSchema, ConfigField } from "@/configs/panelSchemas";
import { useLayoutConfig } from "@/configs/useLayoutConfig";

export default function Home() {
  const { config, setConfig } = useLayoutConfig("circle");
  return (
    <>
      <RippleBox />
      <DevConfigPanel1
        schema={arcSpiralSchema as ConfigField[]}
        values={config}
        onChange={setConfig}
      />
      <LayoutSwitcher overrides={{ circle: config }} {...config}>
        <LayoutOrchestra
          layout="spiral"
          config={config}
          width={200}
          height={200}
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
      {/* <AnimatedScope animation="zoomIn" stagger={0.3} > */}
      <LayoutSwitcher overrides={{ spiral: config }} {...config}>
        <LayoutOrchestra
          layout="spiral"
          config={config}
          width={200}
          height={200}
          className="bg-[teal] z-0"
        >
          <MotionScopeMath
            pattern="breath"
            params={{ freq: 1, growth: 1, phaseGap: 0.5 }}
          >
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
            <h3 className=" locate">ok</h3>
          </MotionScopeMath>
        </LayoutOrchestra>
        {/* </AnimatedScope> */}
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
      <LineClampAutoPage />
    </>
  );
}
