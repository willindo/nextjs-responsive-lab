import ClippyImage from "@/components/ClippyImage";

export default function ClippyItem() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
      <ClippyImage src="https://picsum.photos/1200/600" alt="Hero">
        <button className="px-6 py-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition">
          Shop Now
        </button>
      </ClippyImage>
    </main>
  );
}
