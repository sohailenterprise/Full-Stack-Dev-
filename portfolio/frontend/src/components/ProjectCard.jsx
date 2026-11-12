export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="tags">
        {project.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="card-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">GitHub →</a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer">Live demo →</a>
        )}
      </div>
    </article>
  );
}
