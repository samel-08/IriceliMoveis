import logoLion from "../assets/brand/logo_leao.png";
import PearlButton from "./PearlButton";
import StaggeredMenu from "./StaggeredMenu";
import { navigation } from "../data/site";
import useActiveSection from "../hooks/useActiveSection";

export default function Navbar() {
  const activeSection = useActiveSection();
  return (
    <header className="navbar">
      <nav className="navbar__links" aria-label="Navegação principal">
        {navigation.map(({ id, href, label }) => (
          <a key={id} href={href} aria-current={activeSection === id ? "location" : undefined}>{label}</a>
        ))}
      </nav>

      <PearlButton href="#contato" className="navbar__cta pearl-cta--compact">Solicitar orçamento</PearlButton>
      <a href="#top" className="navbar__brand" aria-label="Iriceili Móveis - início">
        <img src={logoLion} alt="" />
      </a>
      <StaggeredMenu activeSection={activeSection} />
    </header>
  );
}
