import GridFlex from "@/components/GridFlex";
import ResponsiveImagesDemo from "@/components/ResponsiveImageDemo2";

export default function ResponsiveGridPage() {
  return (
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
  );
}
