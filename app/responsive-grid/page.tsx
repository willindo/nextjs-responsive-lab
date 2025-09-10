"use client"
import BackimageDemo from "@/components/BackimageDemo";
import BgImageFun from "@/components/BgImageFun";
import ExplodeStack from "@/components/ExplodeTree";
import GridFlex from "@/components/GridFlex";
import MultiBgAnim from "@/components/MultiBgAnim";
import PortionImage from "@/components/StickyPortion";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo2";
import RoundFoldList from "@/components/RoundFoldList";
import SlideDeck from "@/components/SlideDeck";
import StoryScroller from "@/components/StoryScroller";
import ReadMore from "@/components/ui-tools/ReadMore";
import UniqueClipChoice from "@/components/UniqueClipChoice";
import { imageList } from "@/data/images";
import { useState } from "react";
import StickyPortion from "@/components/StickyPortion";

export default function ResponsiveGridPage() {

  return (
    <>
      {/* <MultiBgAnim  /> */} 
      
      <div className=" mx-auto sm:grid sm:grid-rows-auto  sm:grid-cols-[65vw_30vw] md:grid-cols-[70vw_25vw] lg:grid-cols-[60vw_30vw] sm:place-items-center ">
        <UniqueClipChoice speed={30} shape="circle" className="max-sm:w-[90vw] min-sm:max-lg:w-[70vw] lg:w-[60vw]" />
        <div className="max-sm:hidden max-w-prose text-center">
          <h2 className="text-xl font-semibold mb-4">Balanced Responsive Block</h2>
          <ReadMore>
            <p className=" line-clamp-4 md:line-clamp-5 overflow-ellipsis" > These are some sample content throughout the pages manipulating responsive phase. On larger
              screens it will take up proportion of viewport or container size. Aspect ratio scenario relevance .
              On smaller screens, it will stay hidden.
            </p>
          </ReadMore>
        </div>
      </div>
      <div className="mx-auto  w-[90vw] max-sm:aspect-square lg:w-[90vw] sm:aspect-video my-10">
        <BgImageFun className=" h-full w-full rounded-lg shadow-lg"
          layers={[
            { src: imageList[6], size: "200%", position: "top-left", direction: "diagonal", speed: 15 },
            { src: imageList[1], size: "150%", position: "top-right", direction: "vertical", speed: 25 },
            { src: imageList[1], size: "150%", position: "bottom-left", direction: "diagonal", speed: 20, reverse: true },
            { src: imageList[2], size: "150%", position: "bottom-right", direction: "horizontal", speed: 30 },
          ]}
        >
          <h1 className=" font-bold  text-[#7f5522] ">Responsive Background Image</h1>
        </BgImageFun>
      </div>
      <BackimageDemo />
      {/* <ExplodeStack>
          <>
            <div>🍎</div>
            <div>🍌</div>
            <div>🍇</div>
            <div>🍉</div>
          </>
          <>
            <img
              src="https://picsum.photos/300/300"
              alt="Logo"
              className="w-12 h-12"
            />
            <p className="tex text-green-400">Logo Text</p>
            <p className="text-xl text-green-400">Logo Text</p>
          </>
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-16 w-16 bg-amber-400 rounded-full flex items-center justify-center"
              >
                {i + 1}
              </div>
            ))}
          </>
          <>
            <img
              src="https://picsum.photos/300/300"
              alt="Logo"
              className="w-12 h-12"
            />
            <p className=" text-green-400">double</p>
            <p className="text-xl text-green-400">double</p>
          </>
        </ExplodeStack> */}

      <div>
        <h1 className="text-3xl font-bold">Responsive Grid Demo</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 rounded-lg bg-gray-500">
              Card {i + 1}
            </div>
          ))}
          <GridFlex />
        </div>
        <GridFlex />
      </div>
    </>
  );
}
