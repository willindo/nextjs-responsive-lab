export default function Projects() {
  const projects = [
    {
      name: "Reload-Ops",
      desc: "Fullstack app with authentication, CRUD, pagination, filtering. Deployed on Vercel.",
      tech: "Next.js, NestJS, PostgreSQL, Prisma, Docker",
      link: "https://reload-ops.vercel.app", // change if you have actual deployed link
    },
    {
      name: "DevOps Miniapp",
      desc: "Implemented CI/CD pipelines with GitHub Actions, ArgoCD, and Kubernetes (Kind).",
      tech: "Kubernetes, Helm, Terraform, GitHub Actions",
      link: "https://github.com/willindo/devops-miniapp", // adjust link
    },
    {
      name: "Playground",
      desc: "Responsive UI demos and 3D integration using React Three Fiber.",
      tech: "React, r3f, Three.js",
      link: "http://localhost:3000/spacing", // replace with actual playground link
    },
  ];

  return (
    <section id="projects" className="px-6 py-20 ">
      <h2 className=" text-[#154114] font-semibold text-center mb-12">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col"
          >
            <h3 className=" text-[#154114] font-semibold mb-2">{p.name}</h3>
            <p className="text-gray-600 flex-grow">{p.desc}</p>
            <p className=" text-gray-500 mt-4">{p.tech}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
