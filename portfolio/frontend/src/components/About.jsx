import SectionTitle from "./SectionTitle.jsx";
import { profile } from "../data/content.js";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle title="About Me" subtitle="A little about who I am" />
        <div className="about-text">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
