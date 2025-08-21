import ParticleBackground from "@/components/ParticleBackground"

export default function ParticleItem() {
  return (
    <div className="relative h-[300px] w-[300px] flex items-center justify-center">
      {/* Switch mode by prop */}
      <ParticleBackground mode="confetti" />
    </div>
  )
}
