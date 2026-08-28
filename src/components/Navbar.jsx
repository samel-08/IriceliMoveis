import logo from "../assets/brand/logo_removebg.png";
import StaggeredMenu from "./effects/StaggeredMenu";

const menuItems = [
  { label: "Início", ariaLabel: "Voltar ao início", link: "#top" },
  { label: "Projetos", ariaLabel: "Ver projetos", link: "#projetos" },
  { label: "Diferenciais", ariaLabel: "Ver diferenciais", link: "#diferenciais" },
  { label: "Processo", ariaLabel: "Ver processo", link: "#processo" },
  { label: "Contato", ariaLabel: "Entrar em contato", link: "#contato" }
];

export default function Navbar() {
  return (
    <>
      <header className="navbar navbar--desktop">
        <a href="#top" className="navbar__brand">
          <img src={logo} alt="Iriceili Móveis" />
        </a>

        <nav className="navbar__links">
          <a href="#projetos">Projetos</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </nav>

        <a className="navbar__cta" href="#contato">
          Solicitar orçamento
        </a>
      </header>

      <div className="navbar--mobile">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={[]}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#E7D59C"
          openMenuButtonColor="#E7D59C"
          changeMenuColorOnOpen={true}
          colors={["#C9A55A", "#2A3042"]}
          logoUrl={logo}
          accentColor="#C9A55A"
          isFixed={true}
        />
      </div>
    </>
  );
}