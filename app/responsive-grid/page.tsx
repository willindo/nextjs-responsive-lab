"use client"
import GridFlex from "@/components/GridFlex";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo2";
import RoundFoldList from "@/components/RoundFoldList";
import SlideDeck from "@/components/SlideDeck";
import StoryScroller from "@/components/StoryScroller";
import { useState } from "react";

export default function ResponsiveGridPage() {

  return (
    <>
    <main className="p-10 space-y-10">
    </main>

    <SlideDeck/>
      {/* <RoundFoldList/>  */}
      {/* <StoryScroller /> */}
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
