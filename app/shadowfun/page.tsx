"use client"
import BackimageDemo from '@/components/BackimageDemo'
import ClipImage from '@/components/ClipImage'
import ClipItem from '@/components/ClipItem'
import ClippyItem from '@/components/ClippyItem'
import Horiz from '@/components/Horiz'
import HorizSmall from '@/components/HorizSmall'
import Intro from '@/components/Intro'
import ResponsiveImagesDemo from '@/components/ResponsiveImageDemo1'
import ResponsiveImageDemo2 from '@/components/ResponsiveImageDemo2'
import ResponsiveShowcase from '@/components/ResponsiveShowcase'
import ShadowDemo from '@/components/Shadowdemo'
import React from 'react'

function ShadowFun() {
  return (
    <div>
      <ResponsiveShowcase />
      <BackimageDemo />
      <ShadowDemo />
      <HorizSmall />
      <ClipItem />
      {/* <ClippyItem /> */}
      <Intro />
      <Horiz />
    </div>
  )
}

export default ShadowFun