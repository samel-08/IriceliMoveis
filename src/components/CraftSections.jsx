import { lazy, Suspense, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CraftSections.css";

gsap.registerPlugin(ScrollTrigger);

const GradientWaves = lazy(() => import("./effects/GradientWaves"));

const differentials = [
  ["Sob medida", "Desenho exclusivo para o seu ambiente e a sua rotina."],
  ["Precisão", "Medidas e encaixes que dão equilíbrio ao conjunto."],
  ["Acabamento", "Cuidado nos materiais, nas superfícies e em cada encontro."],
  ["Uso do espaço", "Soluções que aproveitam cada centímetro com leveza."],
  ["Acompanhamento", "Proximidade em cada etapa, da primeira conversa à entrega."],
];

const steps = [
  ["Medida", "Conhecemos o ambiente, suas proporções e o que você precisa."],
  ["Projeto", "Definimos desenho, materiais e detalhes junto com você."],
  ["Produção", "O desenho ganha forma, com atenção a cada peça."],
  ["Instalação", "Montamos e ajustamos o conjunto no seu espaço."],
];

export default function CraftSections() {
  const rootRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      ({ conditions }) => {
        if (conditions.reduced) return;

        rootRef.current.querySelectorAll(".craft-sections__section").forEach((section) => {
          gsap.from(section.querySelectorAll("[data-craft-reveal]"), {
            opacity: 0,
            y: 16,
            duration: 0.65,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              once: true,
            },
          });
        });
      },
      rootRef,
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="craft-sections" ref={rootRef}>
      <Suspense fallback={null}>
        <GradientWaves className="craft-sections__waves" horizonColor="#1F212E" waveColor="#2A3042" crestColor="#C9A55A" opacity={0.14} />
      </Suspense>
      <section className="craft-sections__section" id="diferenciais" aria-labelledby="craft-differentials-title">
        <header className="craft-sections__intro" data-craft-reveal>
          <span className="craft-sections__label">DIFERENCIAIS</span>
          <h2 id="craft-differentials-title">O cuidado está<br />nos detalhes.</h2>
          <p>Escolhas que fazem a diferença no olhar, no toque e no uso diário.</p>
        </header>

        <dl className="craft-sections__list">
          {differentials.map(([title, description]) => (
            <div className="craft-sections__row" key={title} data-craft-reveal>
              <dt className="craft-sections__term">
                <span>{title}</span>
              </dt>
              <dd className="craft-sections__description">{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="craft-sections__section craft-sections__section--process" id="processo" aria-labelledby="craft-process-title">
        <header className="craft-sections__intro" data-craft-reveal>
          <span className="craft-sections__label">PROCESSO</span>
          <h2 id="craft-process-title">Do projeto<br />à realidade.</h2>
          <p>Quatro etapas, uma mesma atenção. A sua ideia toma forma com clareza em cada decisão.</p>
        </header>

        <ol className="craft-sections__list" role="list">
          {steps.map(([title, description]) => (
            <li className="craft-sections__row" key={title} data-craft-reveal>
              <h3 className="craft-sections__term">
                <span>{title}</span>
              </h3>
              <p className="craft-sections__description">{description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
