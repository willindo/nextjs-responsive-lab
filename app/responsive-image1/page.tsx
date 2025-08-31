"use client";
import AnimatedGradientBg from "@/components/AnimatedGradientBg";
import AnimatedSidebar from "@/components/AnimatedSidebar";
import InterlockedGrid from "@/components/InterLockedGrid";
import Intro from "@/components/Intro";
import LineClampAutoPage from "@/components/LineClampAutoPage";
import { MotionTextMath } from "@/components/MotionTextOrchestra";
import ParticleBackground from "@/components/ParticleBackground";
import ParticleItem from "@/components/ParticleItem";
import RippleBox from "@/components/RippleBox";
import Textual from "@/components/Textual";
import { useState } from "react";
import SpacingPage from "../spacing/page";
import { LayoutOrchestra } from "@/components/LayoutOrchestra";
import { LayoutSwitcher } from "@/components/LayoutSwitcher";
import { DevConfigPanel1 } from "@/components/ui-tools/DevConfigPanel1";
import MotionPlayground from "@/components/MotionPlayground";
import { arcSpiralSchema, ConfigField } from "@/configs/panelSchemas";
import { useLayoutConfig } from "@/configs/useLayoutConfig";
import { techStack } from "@/data/techStack";
import Image from "next/image";

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
          {techStack.map((item, i) => (
            <div
              key={i}
              className="h-16 w-16  rounded-full flex items-center justify-center"
            >
              <Image
                src={item.src}
                alt={""}
                width={30}
                height={30}
                // className="transition-transform duration-300 group-hover:scale-110"
                className="object-contain place-self-center"
              />
            </div>
          ))}
        </LayoutOrchestra>
      </LayoutSwitcher>
      <MotionPlayground>
        {techStack.map((item, i) => (
          <div
            key={i}
            className="h-16 w-16  rounded-full flex items-center justify-center"
          >
            <Image
              src={item.src}
              alt={""}
              width={30}
              height={30}
              // className="transition-transform duration-300 group-hover:scale-110"
              className="object-contain place-self-center"
            />
          </div>
        ))}
      </MotionPlayground>
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
