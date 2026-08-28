export default function FinalCTA() {
  return (
    <section className="final-cta" id="contato">
      <div className="final-cta__label">
        06 — SEU PROJETO
      </div>

      <div className="final-cta__content">
        <h2>
          Seu espaço merece
          <br />
          um projeto à altura.
        </h2>

        <p>
          Vamos conversar sobre o seu ambiente e entender o que faz sentido
          para ele.
        </p>

        <a
          className="final-cta__button pearl-cta"
          href="https://wa.me/5541988132385"
          target="_blank"
          rel="noreferrer"
        >
          <span className="pearl-cta__wrap">
            <span className="pearl-cta__content">
              <span className="pearl-cta__icon pearl-cta__icon--default">
                ↗
              </span>

              <span className="pearl-cta__icon pearl-cta__icon--hover">
                ✦
              </span>

              Solicitar orçamento pelo WhatsApp
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}