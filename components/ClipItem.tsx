import ClipImage from "@/components/ClipImage";

export default function ClipItem() {
  return (
    <div className="flex flex-wrap gap-6 p-10 bg-gray-100">
      {/* Hero image (no width/height, auto fill) */}
      <ClipImage
        src="https://picsum.photos/1200/600"
        shape="diagonal"
        aboveFold
        className="h-[400px] w-full"
      />

      {/* Circle profile (explicit width/height) */}
      <ClipImage
        src="https://picsum.photos/300/300"
        shape="wave"
        width={200}
        height={200}
      />

      {/* Hexagon */}
      <ClipImage
        src="https://picsum.photos/300/300"
        // shape="wave"
        width={250}
        height={250}
      />

      {/* Wave bottom */}
      <ClipImage
        src="https://picsum.photos/800/400"
        // shape="wave"
        aboveFold
        className="h-[300px] w-[600px]"
      />
    </div>
  );
}
