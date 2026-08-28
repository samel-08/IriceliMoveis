import BackToTop from "./BackToTop";
import FoldText from "./effects/FoldText";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <FoldText
            text="IRICEILI MÓVEIS"
            splitBy="char"
            hinge="left"
            duration={1.5}
            stagger={0.035}
            ease="power3.out"
            perspective={700}
            creaseShading={0.4}
            trigger="scroll"
            fontSize="clamp(22px,2vw,28px)"
            fontWeight={400}
            color="#F4EBD0"
            className="footer__fold"
        />

  <p>Móveis planejados e sob medida.</p>
</div>

        <div className="footer__nav">
          <span>NAVEGAÇÃO</span>

          <a href="#projetos">Projetos</a>
          <a href="#diferenciais">Diferenciais</a>
          <a href="#processo">Processo</a>
          <a href="#contato">Contato</a>
        </div>

        <div className="footer__contact">
          <span>CONTATO</span>

          <a
            href="https://wa.me/5541988132385"
            target="_blank"
            rel="noreferrer"
          >
            (41) 98813-2385
          </a>

        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 IRICEILI MÓVEIS</span>
        <span>Todos os direitos reservados.</span>
      </div>
      <BackToTop />
    </footer>
  );
}