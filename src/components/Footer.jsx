import BackToTop from "./BackToTop";
import FoldText from "./effects/FoldText";
import { navigation, phoneLabel, whatsappLink } from "../data/site";
import logoLion from "../assets/brand/logo_leao.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img className="footer__lion" src={logoLion} alt="" />
          <strong><FoldText text="IRICELI MÓVEIS" /></strong>

          <p>
            Móveis planejados e sob medida.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Navegação do rodapé">
          <span>NAVEGAÇÃO</span>

          {navigation.map(({ id, href, label }) => <a key={id} href={href}>{label}</a>)}
        </nav>

        <div className="footer__contact">
          <span>CONTATO</span>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
          >
            {phoneLabel}
          </a>

        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 IRICELI MÓVEIS</span>
        <span>Todos os direitos reservados.</span>
      </div>
      <span className="footer__watermark" aria-hidden="true">IRICELI</span>
      <BackToTop />
    </footer>
  );
}
