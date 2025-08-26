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
        Hello
        <span>World</span>
        <div>Nice to meet you</div>
      </ExplodeStack>

      <ExplodeStack>
        {/* Block 1 */}
        <>
          <h1 className="text-3xl font-bold text-purple-600">Hello</h1>
          <p className="text-white">World</p>
          <h1 className="text-3xl font-bold text-purple-600">Hello</h1>
          <p className="text-white">World</p>
        </>

        {/* Block 2 */}
        <>
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <span className="text-xl text-green-400">Logo Text</span>
          <span className="text-xl text-green-400">Logo Text</span>
        </>
        <>
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <span className="text-xl text-green-400">Logo Text</span>
          <span className="text-xl text-green-400">Logo Text</span>
        </>
      </ExplodeStack>
      <ExplodeStack>
        <div>
          <h1>Title</h1>
          <p>Subtitle here</p>
        </div>
        <div>
          <button>Click Me</button>
        </div>
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
