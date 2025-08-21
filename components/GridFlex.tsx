'use client'
import React from 'react'

function GridFlex() {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
  <div className="bg-gray-200 p-6 rounded-lg">Box 1</div>
  <div className="bg-gray-300 p-6 rounded-lg">Box 2</div>
  <div className="bg-gray-400 p-6 rounded-lg">Box 3</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  <div className="bg-gray-200 p-6 rounded-lg">Card 1</div>
  <div className="bg-gray-300 p-6 rounded-lg">Card 2</div>
  <div className="bg-gray-400 p-6 rounded-lg">Card 3</div>
  <div className="bg-gray-500 p-6 rounded-lg">Card 4</div>
</div>

</>
  )
}

export default GridFlex