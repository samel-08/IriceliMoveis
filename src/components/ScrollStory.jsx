import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrandIntro from "./BrandIntro";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const storyRef = useRef(null);
  const cabinetRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });

      timeline

        /* =========================
           CENA 1 → CENA 2
        ========================= */

        // Armário vai para esquerda
        .to(cabinetRef.current, {
          xPercent: -120,
          scale: 0.9,
          ease: "none",
          duration: 1,
        })

        // Cabideiro aparece
        .from(
          ".story-cabinet__rail",
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
            ease: "none",
            duration: 0.45,
          },
          0.12
        )

        // Prateleiras aparecem
        .from(
          ".story-cabinet__shelf",
          {
            scaleX: 0,
            opacity: 0.15,
            transformOrigin: "left center",
            stagger: 0.08,
            ease: "none",
            duration: 0.55,
          },
          0.22
        )

        /* =========================
           CENA 2 → CENA 3
        ========================= */

        // Armário volta para direita
        .to(
          cabinetRef.current,
          {
            xPercent: 0,
            scale: 1,
            ease: "none",
            duration: 1,
          },
          1
        )

        // Estrutura ganha presença
        .to(
          ".story-cabinet",
          {
            borderColor: "#e7d59c",
            ease: "none",
            duration: 0.45,
          },
          1.05
        )

        // Divisórias ficam mais fortes
        .to(
          ".story-cabinet__section",
          {
            borderRightColor: "rgba(231, 213, 156, 0.95)",
            ease: "none",
            duration: 0.55,
          },
          1.08
        )

        // Prateleiras ficam mais fortes
        .to(
          ".story-cabinet__shelf",
          {
            borderBottomColor: "rgba(231, 213, 156, 0.9)",
            ease: "none",
            duration: 0.55,
          },
          1.12
        )

        // Gavetas entram
        .from(
          ".story-cabinet__drawers > div",
          {
            x: 45,
            opacity: 0,
            stagger: 0.08,
            ease: "none",
            duration: 0.55,
          },
          1.18
        )

        // Cabideiro ganha destaque
        .to(
          ".story-cabinet__rail",
          {
            backgroundColor: "#e7d59c",
            ease: "none",
            duration: 0.35,
          },
          1.22
        )

        // Pequeno destaque externo
        .to(
          cabinetRef.current,
          {
            boxShadow: "0 0 0 1px rgba(231,213,156,0.08)",
            ease: "none",
            duration: 0.4,
          },
          1.35
        )

        /* =========================
           CENA 3 → CENA 4
        ========================= */

        // Armário vai novamente para esquerda
        .to(
          cabinetRef.current,
          {
            xPercent: -120,
            scale: 0.94,
            ease: "none",
            duration: 1,
          },
          2
        )

        // Portas entram
        .fromTo(
          ".story-cabinet__door",
          {
            opacity: 0,
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            opacity: 0.94,
            scaleX: 1,
            stagger: 0.12,
            ease: "none",
            duration: 0.65,
          },
          2.12
        )

        // Puxadores aparecem
        .to(
          ".story-cabinet__handle",
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            duration: 0.35,
          },
          2.48
        )

        // Interior fica mais discreto
        .to(
          [
            ".story-cabinet__shelf",
            ".story-cabinet__rail",
            ".story-cabinet__drawers > div",
          ],
          {
            opacity: 0.3,
            ease: "none",
            duration: 0.5,
          },
          2.4
        )

        // Sensação de móvel final
        .to(
          cabinetRef.current,
          {
            boxShadow: "0 24px 70px rgba(0,0,0,0.22)",
            ease: "none",
            duration: 0.6,
          },
          2.55
        )

        /* =========================
           CENA 4 → CENA 5
        ========================= */

        // Armário centraliza e sobe
        .to(
          cabinetRef.current,
          {
            xPercent: -62,
            yPercent: -54,
            scale: 0.88,
            ease: "none",
            duration: 1,
          },
          3
        )

        // Cabeçalho técnico desaparece
        .to(
          ".story-blueprint-header",
          {
            opacity: 0,
            y: -10,
            ease: "none",
            duration: 0.45,
          },
          3.1
        )

        // Medida desaparece
        .to(
          ".story-measure",
          {
            opacity: 0,
            ease: "none",
            duration: 0.4,
          },
          3.15
        )

        // Legendas inferiores desaparecem
        .to(
          ".story-blueprint-footer",
          {
            opacity: 0,
            y: 10,
            ease: "none",
            duration: 0.45,
          },
          3.18
        )

        // Moldura externa desaparece
        .to(
          cabinetRef.current,
          {
            borderColor: "rgba(201,165,90,0)",
            backgroundColor: "rgba(31,33,46,0)",
            boxShadow: "none",
            ease: "none",
            duration: 0.55,
          },
          3.2
        )

        // Interior técnico quase desaparece
        .to(
          [
            ".story-cabinet__shelf",
            ".story-cabinet__rail",
            ".story-cabinet__drawers > div",
          ],
          {
            opacity: 0.03,
            ease: "none",
            duration: 0.6,
          },
          3.25
        )

        // Portas ficam mais sólidas
        .to(
          ".story-cabinet__door",
          {
            opacity: 1,
            background:
              "linear-gradient(135deg, rgba(231,213,156,0.13), rgba(31,33,46,0.96))",
            ease: "none",
            duration: 0.6,
          },
          3.28
        )

        // Puxadores ganham presença
        .to(
          ".story-cabinet__handle",
          {
            opacity: 1,
            scaleY: 1.15,
            ease: "none",
            duration: 0.4,
          },
          3.35
        );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="scroll-story" ref={storyRef}>
      {/* ========================================
          ARMÁRIO STICKY
      ======================================== */}
      <div className="story-visual">
        <div className="story-cabinet-wrapper" ref={cabinetRef}>
          <div className="story-blueprint-header">
            <span>ELEVAÇÃO / ARMÁRIO</span>
            <span>ESC. 1:25</span>
          </div>

          <div className="story-measure">
            <span>3200 mm</span>
          </div>

          <div className="story-cabinet">
            {/* MÓDULO ESQUERDO */}
            <div className="story-cabinet__section story-cabinet__left">
              <div className="story-cabinet__rail" />
            </div>

            {/* MÓDULO CENTRAL */}
            <div className="story-cabinet__section story-cabinet__middle">
              <div className="story-cabinet__shelf" />
              <div className="story-cabinet__shelf" />
              <div className="story-cabinet__shelf" />
            </div>

            {/* MÓDULO DIREITO */}
            <div className="story-cabinet__section story-cabinet__right">
              <div className="story-cabinet__shelf" />

              <div className="story-cabinet__drawers">
                <div />
                <div />
                <div />
              </div>
            </div>

            {/* PORTAS */}
            <div className="story-cabinet__doors">
              <div className="story-cabinet__door">
                <span className="story-cabinet__handle" />
              </div>

              <div className="story-cabinet__door">
                <span className="story-cabinet__handle" />
              </div>

              <div className="story-cabinet__door">
                <span className="story-cabinet__handle" />
              </div>
            </div>
          </div>

          <div className="story-blueprint-footer">
            <span>A · ESTRUTURA</span>
            <span>B · INTERIOR</span>
            <span>C · ACABAMENTO</span>
          </div>
        </div>
      </div>

      {/* ========================================
          CENA 1 — HERO
      ======================================== */}
      <section className="story-scene story-scene--hero">
        <div className="story-copy story-copy--left">
          <BrandIntro />

          <span className="eyebrow">
            MARCENARIA DE ALTO PADRÃO
          </span>

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
            <a href="#contato" className="button-primary">
              Solicitar orçamento
            </a>

            <a href="#projetos" className="button-link">
              Explorar projetos ↓
            </a>
          </div>
        </div>
      </section>

      {/* ========================================
          CENA 2 — IDEIA
      ======================================== */}
      <section className="story-scene story-scene--idea">
        <div className="story-copy story-copy--right">
          <span className="eyebrow">
            02 — DO PROJETO À REALIDADE
          </span>

          <h2>
            Antes da madeira,
            <br />
            existe uma ideia.
          </h2>

          <p>
            Cada ambiente pede uma solução própria. O projeto nasce das
            proporções, das necessidades e da forma como o espaço será vivido.
          </p>
        </div>
      </section>

      {/* ========================================
          CENA 3 — PRECISÃO
      ======================================== */}
      <section className="story-scene story-scene--measure">
        <div className="story-copy story-copy--left">
          <span className="eyebrow">
            03 — PRECISÃO
          </span>

          <h2>
            Tudo começa
            <br />
            pela medida.
          </h2>

          <p>
            Cada elemento é pensado para ocupar o espaço com proporção,
            funcionalidade e precisão.
          </p>
        </div>
      </section>

      {/* ========================================
          CENA 4 — ACABAMENTO
      ======================================== */}
      <section className="story-scene story-scene--finish">
        <div className="story-copy story-copy--right">
          <span className="eyebrow">
            04 — ACABAMENTO
          </span>

          <h2>
            O projeto ganha
            <br />
            sua forma final.
          </h2>

          <p>
            Estrutura, função e acabamento se encontram para transformar o
            desenho em uma peça feita para aquele ambiente.
          </p>
        </div>
      </section>

      {/* ========================================
          CENA 5 — REALIDADE
      ======================================== */}
      <section className="story-scene story-scene--reality">
        <div className="story-copy story-copy--center">
          <span className="eyebrow">
            05 — REALIDADE
          </span>

          <h2>
            Do projeto
            <br />
            à realidade.
          </h2>

          <p>
            O desenho deixa de ser apenas uma ideia e ganha forma no espaço.
          </p>
        </div>
      </section>
    </section>
  );
}