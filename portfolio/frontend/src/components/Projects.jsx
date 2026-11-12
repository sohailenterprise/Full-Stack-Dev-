import SectionTitle from "./SectionTitle.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { projects } from "../data/content.js";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle title="Projects" subtitle="Things I've built" />
        <div className="cards">
          {projects.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
