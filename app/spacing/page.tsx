"use client";
import AnimatedElements from "@/components/AnimatedElements";
import { AnimatedScope } from "@/components/AnimatedScope";
import CircleCarousel from "@/components/CircleCarousel";
import CircleGallery from "@/components/CircleGallery";
import PageTurnCarousel from "@/components/PageTurnCarousel";
import ClippyItem from "@/components/ClippyItem";
import GridFlex from "@/components/GridFlex";
import MotionPlayground, { MotionScopeMath } from "@/components/MotionPlayground";
import ParallaxGroup from "@/components/ParallaxGroup";
import PathDrivenMotionGroup from "@/components/PathDrivenMotionGroup";
import ScrollGroupA, { SequentialSizeGroup } from "@/components/ScrollGroupA";
import Staircase from "@/components/Staircase";
import StickyPortion from "@/components/StickyPortion";
import ThreeStepNestedCards from "@/components/ThreeStepNestedCards";
import { PathControllerPanel, PathProvider } from "@/components/ui-tools/PathControls1";
import ScrollGroup from "@/components/ui-tools/ScrollGroup";
import { useLayoutConfig } from "@/configs/useLayoutConfig";
import { tr } from "framer-motion/client";


export default function SpacingPage() {
  const {config ,setConfig } = useLayoutConfig("circle")
  return (
    <>
      <SequentialSizeGroup>

      {/* <MotionScopeMath pattern="waveY" > */}
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
        <div className="w-12 h-12 bg-indigo-500 rounded-full" />
      {/* </MotionScopeMath> */}
      </SequentialSizeGroup>
      {/* <CircleGallery  /> */}
      <ClippyItem />
      <PathProvider>
        <PathControllerPanel className="mx-auto md:w-[50vw] " />
        <div className=" mx-auto grid lg:grid-cols-2 ">
          <div className="  h-[300px]  space-y-8">
            <PathDrivenMotionGroup className="    " duration={8} gap={1.5} >

              {/* {[...Array(6)].map((_, i) => (
          <span key={i} className="text-2xl">🌟</span>
          ))} */}
              {/* <div className="w-6 h-6 bg-red-500 rounded-full" />
          <div className="w-6 h-6 bg-blue-500 rounded-full" /> */}
              {["🚗", "h", "🚙", "a", "🚌", "i", "🚛", "🚓"].map((car, i) => (
                <span key={i} className="text-3xl">{car}</span>
              ))}
            </PathDrivenMotionGroup>
          </div>
          <StickyPortion />
        </div>
      </PathProvider>
      <Staircase mode="two-side" direction="down" stepY={10} stepX={7} className="   left-10">
        {[...Array(20)].map((_, i) => (
          <span key={i} className=" hover:opacity-50 text-2xl">❤️</span>
        ))}
      </Staircase>
      {/* <div>
      <ParallaxGroup />
      </div> */}
      <div>
        {/* <PageTurnCarousel
        images={["https://picsum.photos/800/450", "https://picsum.photos/1200/600", "https://picsum.photos/1200/600"]}
        width={720}
        height={480}
        /> */}
        {/* <MediaAnimate /> */}
        <h1 className="text-3xl font-bold">Responsive Spacing Demo</h1>
        <p className="mt-[clamp(12px,4vw,48px)] p-[clamp(8px,2vw,32px)] bg-teal-200 rounded-lg">
          This box uses <code>clamp()</code> for margin and padding that scale
          with viewport.
        </p>
        <p className="">this use className 'tiny'</p>
        <div className="@container/varies">
          <div className="mt-3 p-2  rounded-lg  @md/varies:bg-amber-600 @sm/varies:bg-green-600 @lg/varies:bg-blue-600 @2xl/varies:@max-5xl/varies:bg-purple-600 @lg:mt-12 @lg:p-8">
            Card content
          </div>
        </div>
        <div className="@container">
          <div
            className=" h-20 bg-amber-600 
          @md:mt-[max(18px,2vw)] @xl:mt-[min(30px,2.5vw)] @md:bg-green-700  @md:p-[clamp(8px,2.5vw,16px)] @lg:p-[clamp(18px,2.5vw,33px)]"
          >
            Card content container expertise
          </div>
        </div>
        {/* <CircleCarousel  /> */}
        <ThreeStepNestedCards />
        <GridFlex />
      </div>
    </>
  );
}

