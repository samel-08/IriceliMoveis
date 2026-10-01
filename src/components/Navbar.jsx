import logo from "../assets/brand/logo_removebg.png";
import PearlButton from "./PearlButton";
import PillNav from "./effects/PillNav";
import StaggeredMenu from "./StaggeredMenu";
import { navigation } from "../data/site";
import useActiveSection from "../hooks/useActiveSection";

export default function Navbar() {
  const activeSection = useActiveSection();
  return (
    <header className="navbar">
      <div className="navbar__pill"><PillNav logo={logo} items={navigation} activeId={activeSection} /></div>
      <a href="#top" className="navbar__brand" aria-label="Iriceli Móveis - início"><img src={logo} alt="Iriceli Móveis" /></a>
      <PearlButton href="#contato" className="navbar__cta pearl-cta--compact">Solicitar orçamento</PearlButton>
      <StaggeredMenu activeSection={activeSection} />
    </header>
  );
}
