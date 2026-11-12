import SectionTitle from "./SectionTitle.jsx";
import { skills } from "../data/content.js";

export default function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <SectionTitle title="Skills" subtitle="Technologies I work with" />
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill" key={s.name}>
              <div className="skill-head">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
