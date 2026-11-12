import { profile } from "../data/content.js";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <p className="eyebrow">Hello, I'm</p>
        <h1>{profile.name}</h1>
        <h2>{profile.title}</h2>
        <p className="lead">{profile.tagline}</p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">View my work</a>
          <a href="#contact" className="btn btn-outline">Contact me</a>
          <a href="/resume.pdf" download="Sohail-Resume.pdf" className="btn btn-outline">Download CV</a>
        </div>
      </div>
    </section>
  );
}
