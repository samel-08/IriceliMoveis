import logo from "../assets/brand/logo_removebg.png";
import StaggeredMenu from "./StaggeredMenu";
import { navigation } from "../data/site";
import useActiveSection from "../hooks/useActiveSection";

export default function Navbar() {
  const activeSection = useActiveSection();
  return (
    <header className="navbar">
      <a href="#top" className="navbar__brand">
        <img src={logo} alt="Iriceili Móveis" />
      </a>

      <nav className="navbar__links" aria-label="Navegação principal">
        {navigation.map(({ id, href, label }) => (
          <a key={id} href={href} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
        ))}
      </nav>

      <a className="navbar__cta" href="#contato">
        Solicitar orçamento
      </a>
      <StaggeredMenu activeSection={activeSection} />
    </header>
  );
}
