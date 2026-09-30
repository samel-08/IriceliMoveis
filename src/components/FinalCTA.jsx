import { whatsappLink } from "../data/site";
import PearlButton from "./PearlButton";

export default function FinalCTA() {
  return (
    <section className="final-cta" id="contato" aria-labelledby="contact-title">
      <div className="final-cta__label">
        SEU PROJETO
      </div>

      <div className="final-cta__content">
        <h2 id="contact-title">
          Seu espaço merece
          <br />
          um projeto à altura.
        </h2>

        <p>
          Vamos conversar sobre o seu ambiente e entender o que faz sentido
          para ele.
        </p>

        <PearlButton
          className="final-cta__button"
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
        >
          Solicitar orçamento pelo WhatsApp
        </PearlButton>
      </div>
    </section>
  );
}
