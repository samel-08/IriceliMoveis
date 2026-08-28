import logo from "../assets/brand/logo_removebg.png";

export default function Navbar() {
  return (
    <header className="navbar">
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
  );
}