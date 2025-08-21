
export default function LineClampAutoPage() {
  const sampleText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ligula nec ligula fermentum blandit. Morbi congue, sem ut aliquam fringilla, risus justo tincidunt magna, a aliquet massa turpis ut lorem. Etiam faucibus felis nec libero faucibus, ut sodales tortor tempus. Donec non ipsum ut turpis dapibus vulputate. Nulla facilisi. Suspendisse nec eros sit amet lorem varius tincidunt.";

  return (
    <div className="">
      <h1 className="text-3xl font-bold">Line Clamp Auto Demo</h1>

      {/* Fixed Responsive Line Clamp */}
        <h2 className="text-xl font-semibold">1️⃣ Fixed Responsive Line Clamp</h2>
      <div className=" ">
        <p className="line-clamp-2 leading-relaxed text-base sm:line-clamp-3 lg:line-clamp-5 bg-blue-200 p-4 rounded-lg">
          {sampleText}
        </p>
        <p className="text-sm text-gray-600">
          ➡ On small screens shows 2 lines, medium 3 lines, large 5 lines.
        </p>
      </div>

      {/* Auto Height Clamp */}
      <div className="">
        <h2 className="text-xl font-semibold">2️⃣ Auto Height Clamp</h2>
        <div className="max-w-lg h- overflow-hidden relativ bg-green-200 p-4 rounded-lg">
          <p className="text-base line-clamp-3 leading-relaxed">{sampleText}</p>
          {/* Fade overlay */}
          {/* <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-green-100"></div> */}
        </div>
        <p className="text-sm text-gray-600">
          ➡ Parent height controls how many lines fit. Shrinks/grows with viewport.
        </p>
      </div>
    </div>
  );
}
