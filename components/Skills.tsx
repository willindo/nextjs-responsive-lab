"use client"
import { useState } from "react";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { LayoutOrchestra } from "./LayoutOrchestra";
import { DevConfigPanel1 } from "./ui-tools/DevConfigPanel1";
export default function Skills() {
    const [config, setConfig] = useState({
        radius: 160,
        spacing: 100,
        angleStart: -90,
        sweep: 120,
        spiralA: 24,
        spiralB: 32,
        spiralStepDeg: 40,
        rotateWithTangent: true,
      });
  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "TailwindCSS", "r3f", "Three.js", "Babylon.js"],
    Backend: ["NestJS", "Fastify", "Express", "GraphQL", "REST APIs"],
    Authentication: ["Auth.js", "JWT"],
    Databases: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM"],
    DevOps: ["Docker", "Kubernetes", "Helm", "ArgoCD", "Terraform", "GitHub Actions"],
    Monitoring: ["Prometheus", "Grafana", "Loki", "k9s", "Lens"],
    Tools: ["Git", "Linux CLI", "Vercel", "AWS", "GCP"],
};
return (
    <>
<DevConfigPanel1
        schema={[
          {
            type: "number",
            key: "radius",
            label: "Radius",
            min: 50,
            max: 300,
            step: 10,
          },
          {
            type: "number",
            key: "angleStart",
            label: "Angle Start",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "sweep",
            label: "Sweep",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "spiralA",
            label: "Spiral A",
            min: -180,
            max: 180,
          },
          {
            type: "number",
            key: "spiralB",
            label: "Spiral B",
            min: -180,
            max: 180,
          },
          {
            type: "number",
            key: "spiralStepDeg",
            label: "Spiral Step Deg",
            min: -180,
            max: 180,
            step: 5,
          },
          {
            type: "number",
            key: "spacing",
            label: "Spacing",
            min: 0,
            max: 100,
            step: 1,
          },
          {
            type: "boolean",
            key: "rotateWithTangent",
            label: "Rotate With Tangent",
          },
        ]}
        values={config}
        onChange={setConfig}
      />

    <section id="skills" className="px-6 py-20 bg-white max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-12">Skills</h2>
      <div className="grid md:grid-cols-2 gap-10">

        {Object.entries(skills).map(([category, list]) => (
            <div key={category}>
            <h3 className="text-xl font-semibold mb-3">{category}</h3>
            <ul className="flex flex-wrap gap-2">
                <LayoutSwitcher overrides={{ circle: config }} {...config}>
                <LayoutOrchestra
                  layout="circle"
                  config={config}
                  width={200}
                  height={200}
                >
              {list.map((skill) => (
                  <li
                  key={skill}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                  {skill}
                </li>
              ))}
              </LayoutOrchestra>
              </LayoutSwitcher>
            </ul>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
