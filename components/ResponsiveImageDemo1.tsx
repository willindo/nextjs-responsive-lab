"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useContainerSize() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    function update() {
      if (ref.current) {
        setSize({
          w: ref.current.offsetWidth,
          h: ref.current.offsetHeight,
        });
      }
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return { ref, size };
}

export default function ResponsiveImagesDemo1() {
  return (
    <div className="@container/h1 p-6 space-y- max-sm:grid-cols-1 min-[641px]:max-md:grid-cols-2 grid grid-cols-3">
      <h2 className=" text-center text-balance  font-bold">📐 Responsive Images + Container Size Demo</h2>

      {/* 1. layout=responsive (16:9 aspect ratio) */}
      <ResponsiveBox
        label="1️⃣ layout=responsive (16:9)"
        src="https://picsum.photos/800/450"
        type="responsive"
        width={800}
        height={450}
      />

      {/* 2. layout=responsive (4:3 aspect ratio) */}
      <ResponsiveBox
        label="2️⃣ layout=responsive (4:3)"
        src="https://picsum.photos/800/600"
        type="responsive"
        width={800}
        height={600}
      />

      {/* 3. fill + object-cover */}
      <ResponsiveBox
        label="3️⃣ fill + object-cover"
        src="https://picsum.photos/1200/800"
        type="fill"
      />

      {/* 4. background cover */}
      <BackgroundBox
        label="4️⃣ Background Image (cover)"
        url="https://picsum.photos/1000/600"
        type="cover"
      />

      {/* 5. background contain */}
      <BackgroundBox
        label="5️⃣ Background Image (contain)"
        url="https://picsum.photos/300/300"
        type="contain"
      />

      {/* 6. Plain <img> */}
      <PlainImgBox
        label="6️⃣ Plain <img> (max-width:100%)"
        url="https://picsum.photos/900/500"
      />
    </div>
  );
}

function ResponsiveBox({
  label,
  src,
  type,
  width,
  height,
}: {
  label: string;
  src: string;
  type: "responsive" | "fill";
  width?: number;
  height?: number;
}) {
  const { ref, size } = useContainerSize();
  return (
    <div ref={ref} className="   relative">
      <p className="bg-red-100 text-sm p-1">{label}</p>
      {type === "responsive" && width && height && (
        <Image src={src} alt={label} width={width} height={height} layout="responsive" />
      )}
      {type === "fill" && (
        <div className="relative h-64">
          <Image src={src} alt={label} fill className="object-cover" />
        </div>
      )}
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
    </div>
  );
}

function BackgroundBox({ label, url, type }: { label: string; url: string; type: "cover" | "contain" }) {
  const { ref, size } = useContainerSize();
  return (
    <div
      ref={ref}
      className={` place-self-center h-64 bg-no-repeat   rounded-lg bg-${type} bg-center`}
      style={{ backgroundImage: `url(${url})` }}
    >
      <p className="bg-blue-100 text-sm p-1">{label}</p>
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
    </div>
  );
}

function PlainImgBox({ label, url }: { label: string; url: string }) {
  const { ref, size } = useContainerSize();
  return (
    <div ref={ref} className="  ">
      <p className="bg-green-100 text-sm p-1">{label}</p>
      <img src={url} alt={label} className="max-w-full h-auto" />
      <p className="text-xs text-gray-700 p-1">
        📏 Container: {size.w}px × {size.h}px
      </p>
    </div>
  );
}
