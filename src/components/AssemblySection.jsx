import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AssemblySection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=3500",
            scrub: 1,
            pin: stageRef.current,
            anticipatePin: 1,
          },
        });

        tl.from(".cabinet__outer", {
          opacity: 0.25,
          duration: 0.8,
        });

        tl.from(
          ".cabinet__section",
          {
            opacity: 0,
            y: 25,
            stagger: 0.18,
            duration: 1,
          },
          0.6
        );

        tl.from(
          ".cabinet__rail",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.7,
          },
          1.5
        );

        tl.from(
          ".cabinet__shelf",
          {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.12,
            duration: 0.7,
          },
          1.7
        );

        tl.from(
          ".cabinet__drawers > div",
          {
            x: 40,
            opacity: 0,
            stagger: 0.16,
            duration: 0.8,
          },
          2.5
        );

        tl.fromTo(
          ".cabinet__doors",
          {
            opacity: 0,
          },
          {
            opacity: 0.22,
            duration: 1,
          },
          3.3
        );

        tl.to(
          ".assembly__progress-bar",
          {
            width: "100%",
            ease: "none",
            duration: 4.3,
          },
          0
        );
      });

      mm.add("(max-width: 900px)", () => {
        gsap.from(".cabinet__outer", {
          scrollTrigger: {
            trigger: ".assembly__visual",
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
        });
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="assembly" id="experiencia" ref={sectionRef}>
      <div className="assembly__stage" ref={stageRef}>
        <div className="assembly__copy">
          <span className="assembly__eyebrow">
            03 — DO DESENHO À EXECUÇÃO
          </span>

          <span className="assembly__step">01 / PROJETO</span>

          <h2>
            Tudo começa
            <br />
            pela medida.
          </h2>

          <p>
            Cada elemento é pensado para ocupar o espaço com proporção,
            funcionalidade e precisão.
          </p>

          <div className="assembly__progress">
            <span className="assembly__progress-bar" />
          </div>
        </div>

        <div className="assembly__visual">
          <div className="assembly__drawing">
            <div className="dimension dimension--top">
              <span>3200 mm</span>
            </div>

            <div className="dimension dimension--left">
              <span>2400 mm</span>
            </div>

            <div className="cabinet">
              <div className="cabinet__outer">
                <div className="cabinet__section cabinet__section--left">
                  <div className="cabinet__rail" />
                </div>

                <div className="cabinet__section cabinet__section--middle">
                  <div className="cabinet__shelf" />
                  <div className="cabinet__shelf" />
                  <div className="cabinet__shelf" />
                </div>

                <div className="cabinet__section cabinet__section--right">
                  <div className="cabinet__shelf" />

                  <div className="cabinet__drawers">
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </div>

              <div className="cabinet__doors">
                <div className="cabinet__door" />
                <div className="cabinet__door" />
                <div className="cabinet__door" />
              </div>
            </div>

            <div className="assembly__labels">
              <span>A — ESTRUTURA</span>
              <span>B — INTERIOR</span>
              <span>C — ACABAMENTO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}