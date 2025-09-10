"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadFull } from "tsparticles"
import type { ISourceOptions } from "@tsparticles/engine"
import { MoveDirection, OutMode } from "@tsparticles/engine"

type Mode = "stars" | "snow" | "confetti"

export default function ParticleBackground({ mode = "stars" }: { mode?: Mode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadFull(engine)
    }).then(() => setReady(true))
  }, [])

  const options: ISourceOptions = useMemo(() => {
    const base: Partial<ISourceOptions> = {
      fullScreen: { enable: false }, // ✅ not global, stays inside parent
      detectRetina: true,
      background: { color: { value: "transparent" } },
    }

    switch (mode) {
      case "snow":
        return {
          ...base,
          particles: {
            color: { value: "#ffffff" },
            move: {
              enable: true,
              direction: MoveDirection.bottom,
              speed: 1,
              outModes: { default: OutMode.out },
            },
            number: { value: 120 },
            opacity: { value: { min: 0.4, max: 0.8 } },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 4 } },
          },
        }

      case "confetti":
        return {
          ...base,
          particles: {
            color: {
              value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: MoveDirection.none,
              outModes: { default: OutMode.out },
            },
            number: { value: 80 },
            opacity: { value: 1 },
            shape: { type: ["circle", "square"] },
            size: { value: { min: 3, max: 6 } },
          },
        }

      case "stars":
      default:
        return {
          ...base,
          particles: {
            color: { value: "#ffffff" },
            move: {
              enable: true,
              speed: 0.3,
              direction: MoveDirection.none,
            },
            number: { value: 100 },
            opacity: { value: { min: 0.6, max: 1 } },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
          },
        }
    }
  }, [mode])

  if (!ready) return null

  return (
    <Particles
      id={`tsparticles-${mode}`}
      options={options}
      className="absolute inset-0"
    />
  )
}
