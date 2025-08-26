import BackimageDemo from '@/components/BackimageDemo'
import ClipImage from '@/components/ClipImage'
import ClipItem from '@/components/ClipItem'
import ClippyItem from '@/components/ClippyItem'
import Horiz from '@/components/Horiz'
import HorizSmall from '@/components/HorizSmall'
import Intro  from '@/components/Intro'
import ResponsiveImagesDemo from '@/components/ResponsiveImageDemo1'
import ResponsiveImageDemo2 from '@/components/ResponsiveImageDemo2'
import ResponsiveShowcase from '@/components/ResponsiveShowcase'
import ShadowDemo from '@/components/Shadowdemo'
import React from 'react'
function ResponsiveImagePage() {
  return (
    <div>
      <ResponsiveShowcase />
      {/* <ResponsiveImagesDemo /> */}
      {/* <ResponsiveImageDemo2 /> */}
      <BackimageDemo />
      <ShadowDemo />
      <ClipItem />
        {/* <ClippyItem /> */}
        <Intro />               
        <Horiz />
        <HorizSmall />  
    </div>
  )
}

export default ResponsiveImagePage