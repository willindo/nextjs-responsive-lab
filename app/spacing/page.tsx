import GridFlex from "@/components/GridFlex";

export default function SpacingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Responsive Spacing Demo</h1>
      <p className="mt-[clamp(12px,4vw,48px)] p-[clamp(8px,2vw,32px)] bg-teal-200 rounded-lg">
        This box uses <code>clamp()</code> for margin and padding that scale
        with viewport.
      </p>
      <p className="tiny">this use className 'tiny'</p>
      <div className="@container">
        <div className="mt-3 p-2 bg-teal-200 rounded-lg  @md:mt-6 @md:p-4 @lg:mt-12 @lg:p-8">
          Card content
        </div>
      </div>
      <div className="@container">
        <div
          className=" h-20 bg-amber-600 
           @md:mt-[max(18px,2vw)] @xl:mt-[min(30px,2.5vw)] @md:bg-green-700  @md:p-[clamp(8px,2.5vw,16px)] @lg:p-[clamp(18px,2.5vw,33px)]"
           >
           Card content container expertise
        </div>
      </div>
      <div className="cardi">
        <p className="mt-2 bg-lime-800">
          Clean sugar syntax 🚀
        </p>
      </div>

        <GridFlex />
        </div>
  );
}
