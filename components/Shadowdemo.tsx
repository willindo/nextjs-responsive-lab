export default function ShadowDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 bg-gray-100 min-h-screen">
      {/* Card with Box Shadow */}
      <div className="p-6 bg-white rounded-xl shadow-2xl text-center">
        <h2 className="text-xl font-bold mb-2">Box Shadow</h2>
        <p className="text-gray-600">
          Applied to the <code>div</code>. Notice how the entire rectangle has a soft shadow.
        </p>
      </div>

      {/* Circle with Drop Shadow */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 bg-blue-500 rounded-full drop-shadow-2xl"></div>
        <p className="mt-3 font-medium">Drop Shadow on Circle</p>
      </div>

      {/* Text with Drop Shadow */}
      <div className="col-span-2 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold text-purple-600 drop-shadow-xl">
          Drop Shadow Text
        </h1>
        <p className="mt-2 text-gray-700">
          Shadows follow the glyphs instead of a box.
        </p>
      </div>

      {/* SVG Icon with Drop Shadow */}
      <div className="flex flex-col items-center">
        <svg
          className="w-24 h-24 text-green-500 drop-shadow-2xl"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L15 8H9L12 2ZM2 22L12 12L22 22H2Z" />
        </svg>
        <p className="mt-3 font-medium">Drop Shadow on SVG</p>
      </div>
    </div>
  );
}
