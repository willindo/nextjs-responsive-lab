import Circle3D from "./Circle3d";

export default function Projects() {
  const projects = [
    {
      name: "Reload-Ops",
      desc: "Fullstack app with authentication, CRUD, pagination, filtering. Deployed on Vercel.",
      tech: "Next.js, NestJS, PostgreSQL, Prisma, Docker",
      link: "https://reload-ops.vercel.app",
    },
    {
      name: "DevOps Miniapp",
      desc: "Implemented CI/CD pipelines with GitHub Actions, ArgoCD, and Kubernetes (Kind).",
      tech: "Kubernetes, Helm, Terraform, GitHub Actions",
      link: "https://github.com/willindo/devops-miniapp",
    },
    {
      name: "Playground",
      desc: "Responsive UI demos and 3D integration using React Three Fiber.",
      tech: "React, r3f, Three.js",
      link: "https://nextjs-responsive-lab.vercel.app/responsive-image1",
    },
  ];

  return (
    <div id="projects" className="px-6 py-20">
      <Circle3D
        className="h-auto w-auto relative max-w-5xl  mx-auto bg-blue-500"
        radius={100}
        perspective={800}
        // rotateX={0}
        real3D={false}
        // bend={true}
        autoRotate={true}   // enable carousel spin
        speed={0.2}         // lower = slower, higher = faster
      >
        {projects.map((p) => (
          <div key={p.name} className=" w-[30vw] grid bg-amber-600 ">
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w p-6 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:scale-105"
          />
            <h3 className="text-[#154114] font-semibold mb-2">{p.name}</h3>
            <p className="text-gray-600">{p.desc}</p>
            <p className="text-gray-500 mt-4 text-sm">{p.tech}</p>
          </div>
        ))}
       {/* <div className="3d h-[200px] w-[100px] bg-violet-700  ">one</div>
       <div className="3d h-[200px] w-[100px] bg-violet-700  ">two</div>
       <div className="3d h-[200px] w-[100px] bg-violet-700  ">three</div>
       <div className="3d h-[200px] w-[100px] bg-violet-700  ">four</div> */}
      </Circle3D>

    </div>
  );
}
