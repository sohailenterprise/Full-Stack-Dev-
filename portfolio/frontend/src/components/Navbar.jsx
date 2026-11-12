import { useEffect, useState } from "react";
import { profile } from "../data/content.js";
import ThemeToggle from "./ThemeToggle.jsx";

const links = ["about", "skills", "projects", "contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const ids = ["home", ...links];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a href="#home" className="logo">
          {profile.name}<span>.</span>
        </a>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              className={active === l ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
