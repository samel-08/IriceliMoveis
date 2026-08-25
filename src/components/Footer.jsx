export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <strong>IRICEILI MÓVEIS</strong>

          <p>
            Móveis planejados e sob medida.
          </p>
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

          <a
            href="#top"
            className="footer__back-top"
            aria-label="Voltar ao topo"
          >
            ↑
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 IRICEILI MÓVEIS</span>
        <span>Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}