import ExplodeStack from "@/components/ExplodeStack";
import ExplodeAnimation from "@/components/ExplodeStack";
import GridFlex from "@/components/GridFlex";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo2";
import RoundFoldList from "@/components/RoundFoldList";

export default function ResponsiveGridPage() {
  return (
    <>
      {/* <RoundFoldList/>  */}

      <ExplodeStack>
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
          <img
            src="https://picsum.photos/300/300"
            alt="Logo"
            className="w-12 h-12"
          />
          <span className="text-xl text-green-400">Logo Text</span>
          <span className="text-xl text-green-400">Logo Text</span>
        </>
        <>
          <img
            src="https://picsum.photos/300/300"
            alt="Logo"
            className="w-22 h-22"
          />
          <span className="text-xl text-green-400">Logo Text</span>
          <span className="text-xl text-green-400">Logo Text</span>
        </>
      </ExplodeStack>

      <div>
        {/* <ResponsiveImagesDemo /> */}
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
      </div>
    </>
  );
}
