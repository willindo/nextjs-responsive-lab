'use client'
import ClippyImage from "@/components/ClippyImage";

export default function ClippyItem() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <ClippyImage src="https://picsum.photos/1200/600" alt="Hero">
        <button  style={{
           background: "radial-gradient(ellipse at center, #87e0fd 40%,#05abe0 100%,#87e0fd 100%)"
           }} className="px-6 py-3  text-yellow-600 rounded-full shadow-lg hover:bg-pink-700 transition">
          Shop Now
        </button>
      </ClippyImage>
    </main>
  );
}
