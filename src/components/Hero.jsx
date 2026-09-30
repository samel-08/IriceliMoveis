import PearlButton from "./PearlButton";

export default function Hero() {
  return (
    <main className="hero">
      <section className="hero__content">
        <span className="eyebrow">MARCENARIA DE ALTO PADRÃO</span>

        <h1>
          Móveis sob medida
          <br />
          para o seu espaço.
        </h1>

        <p>
          Projetos exclusivos, acabamento impecável e soluções pensadas
          especialmente para cada ambiente.
        </p>

        <div className="hero__actions">
          <PearlButton href="#contato" className="hero__cta">
            Solicitar orçamento
          </PearlButton>

          <a href="#projetos" className="button-link">
            Explorar projetos ↓
          </a>
        </div>
      </section>

      <section className="hero__visual">
        <div className="blueprint-header">
          <span>ELEVAÇÃO / ARMÁRIO 01</span>
          <span>ESC. 1:25</span>
        </div>

        <div className="blueprint-measure blueprint-measure--top">
          <span>3200 mm</span>
        </div>

        <div className="wardrobe">
          <div className="wardrobe__module wardrobe__module--left">
            <div className="wardrobe__shelf" />
            <div className="wardrobe__shelf" />
            <div className="wardrobe__shelf" />
          </div>

          <div className="wardrobe__module wardrobe__module--center">
            <div className="wardrobe__rail" />
          </div>

          <div className="wardrobe__module wardrobe__module--right">
            <div className="wardrobe__shelf" />
            <div className="wardrobe__shelf" />
            <div className="wardrobe__drawers">
              <div />
              <div />
            </div>
          </div>
        </div>

        <div className="blueprint-footer">
          <span>A · PORTAS</span>
          <span>B · PRATELEIRAS</span>
          <span>C · GAVETAS</span>
        </div>
      </section>
    </main>
  );
}
