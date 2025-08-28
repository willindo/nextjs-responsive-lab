export default function Experience() {
  return (
    <section id="experience" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-12">Experience</h2>
      <div className="space-y-6">
        <div className="p-6 bg-white rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">
            Independent Full-Stack & DevOps Projects (2024–2025)
          </h3>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>
              Designed and deployed fullstack apps with CI/CD pipelines.
            </li>
            <li>
              Implemented real-world DevOps workflows (K8s, ArgoCD, GitHub Actions).
            </li>
            <li>
              Converted UX mockups into responsive UIs with mobile-first design.
            </li>
            <li>
              Integrated 3D elements into web apps for interactive experiences.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
