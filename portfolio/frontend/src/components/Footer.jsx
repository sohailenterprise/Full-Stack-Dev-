import { profile } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {profile.name}. Built with React & Vite.</p>
    </footer>
  );
}
