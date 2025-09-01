"use client"
import { useState } from "react";
import { LayoutSwitcher } from "./LayoutSwitcher";
import { LayoutOrchestra } from "./LayoutOrchestra";
import { DevConfigPanel1 } from "./ui-tools/DevConfigPanel1";
import ExplodeStack from "./ExplodeSequence";
import ExplodeSequence from "./ExplodeSequence";
import { arcSpiralSchema, ConfigField } from "@/configs/panelSchemas";
import { AnimatedScope } from "./AnimatedScope";
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
        Databases: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "TypeORM"],
        DevOps: ["Docker", "Kubernetes", "Helm", "ArgoCD", "Terraform", "GitHub Actions"],
        Monitoring: ["Prometheus", "Grafana", "Loki", "k9s", "Lens"],
        Tools: ["Git", "Linux CLI", "Vercel", "AWS", "GCP"],
    };
    return (
        <>
            <DevConfigPanel1
                schema={arcSpiralSchema as ConfigField[]}
                values={config}
                onChange={setConfig}
            />

            <section id="skills" className="px-6 py-2 max-w-5xl mx-auto">
                <h2 className=" font-semibold text-[#154114] text-center mb-12">Skills</h2>
                    <div className="grid md:grid-cols-2 auto-rows-[200px] gap-x-10 gap-y-1.5 ">
                {/* <AnimatedScope className="grid md:grid-cols-2 gap-10" animation="zoomIn" once={false} stagger={0.5} > */}
                        {Object.entries(skills).map(([category, list]) => (
                            <div key={category}>
                                <h3 className=" text-[#195119] font-semibold mb-3">{category}</h3>
                                <ul className=" tech h-[60%] flex flex-wrap text-[#4f2832] font-bold gap-2">
                                        {/* <LayoutSwitcher overrides={{ circle: config }} {...config}>
                                    <LayoutOrchestra
                                    layout="circle"
                                    config={config}
                                    width={200}
                                    height={200}
                                    > */}

                                    <AnimatedScope className=" flex flex-wrap items-center" animation="slideRight" once={false} stagger={0.3} >
                                            {list.map((skill) => (
                                                <span key={skill}
                                                    className="px-3 py-1 rounded-full "
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </AnimatedScope>
                                        {/* </LayoutOrchestra>
                                </LayoutSwitcher> */}
                                </ul>
                            </div>
                        ))}
                {/* </AnimatedScope> */}
                    </div>
            </section>
        </>
    );
}
