"use client"
import BackimageDemo from "@/components/BackimageDemo";
import BgImageFun from "@/components/BgImageFun";
import GridFlex from "@/components/GridFlex";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo2";
import RoundFoldList from "@/components/RoundFoldList";
import SlideDeck from "@/components/SlideDeck";
import StoryScroller from "@/components/StoryScroller";
import UniqueClip from "@/components/UniqueClip";
import { useState } from "react";
const srcList = [
  "https://picsum.photos/800/600",
  "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=600&q=80",
  "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80",
];

export default function ResponsiveGridPage() {

  return (
    <>
    <UniqueClip />
    <div className=" h-[300px] ">
        <BgImageFun 
         layers={[
    { src: srcList[0],size:"200%",position: "top-left", direction: "horizontal", speed: 15 },
    { src: srcList[1], position: "top-right", direction: "vertical", speed: 25 },
    { src: srcList[1], position: "bottom-left", direction: "diagonal", speed: 20, reverse: true },
    { src: srcList[0], size:"150%",position: "bottom-right", direction: "horizontal", speed: 30 },
  ]}
        >
          <h1 className="text-4xl font-bold text-white">Responsive Background Image</h1>
        </BgImageFun>
      </div>
      <BackimageDemo />
      <StoryScroller />
      {/* <div>
        <ExplodeSequence>
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
        </ExplodeSequence>
      </div>

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
      </div> */}
    </>
  );
}
