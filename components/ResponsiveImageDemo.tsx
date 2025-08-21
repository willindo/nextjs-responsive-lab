"use client"
import Image from "next/image";

export default function ResponsiveImagesDemo() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Responsive Images Demo</h1>

      {/* 1. layout=responsive (aspect ratio fixed) */}
      <div className="border-2 border-red-500 w-1/2">
        <p className="text-sm bg-red-100 p-1">1️⃣ Responsive Layout (Aspect Ratio)</p>
        <Image
          src="https://picsum.photos/800/500"
          alt="Responsive Layout"
          width={800}
          height={500}
          layout="responsive"
          className="rounded-lg"
        />
      </div>

      {/* 2. fill + object-cover */}
      <div className="relative border-2 border-blue-500 w-1/2 h-64">
        <p className="absolute top-0 left-0 bg-blue-100 text-sm p-1">2️⃣ Fill + Object Cover</p>
        <Image
          src="https://picsum.photos/1200/800"
          alt="Fill Cover"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* 3. Background Image Cover */}
      <div
        className="w-1/2 h-64 border-2 border-green-500 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: "url('https://picsum.photos/1000/600')" }}
      >
        <p className="bg-green-100 text-sm p-1">3️⃣ Background Image (Cover)</p>
      </div>

      {/* 4. Background Image Contain */}
      <div
        className="w-1/2 h-64 border-2 border-purple-500 bg-contain bg-no-repeat bg-center rounded-lg"
        style={{ backgroundImage: "url('https://picsum.photos/600/1000')" }}
      >
        <p className="bg-purple-100 text-sm p-1">4️⃣ Background Image (Contain)</p>
      </div>

      {/* 5. Plain <img> with CSS */}
      <div className="border-2 border-orange-500 w-1/2">
        <p className="text-sm bg-orange-100 p-1">5️⃣ Plain &lt;img&gt; (max-width:100%)</p>
        <img
          src="https://picsum.photos/900/500"
          alt="Plain Img"
          className="max-w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
