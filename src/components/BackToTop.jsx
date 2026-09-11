import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export default function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let nearCTA = false;
    const update = () => setVisible(window.scrollY > 400 && !nearCTA);
    const cta = document.querySelector(".final-cta");
    const observer = new IntersectionObserver(([entry]) => {
      nearCTA = entry.isIntersecting;
      update();
    }, { rootMargin: "80px" });
    if (cta) observer.observe(cta);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  const handleClick = () => {
    document.querySelector(".navbar__brand")?.focus({ preventScroll: true });
    window.scrollTo({
      top: 0,
      behavior: reduced ? "instant" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="back-top"
      style={reduced ? { transition: "none", transform: "none" } : undefined}
      onClick={handleClick}
      aria-label="Voltar ao topo"
    >
      <span className="back-top__shine" aria-hidden="true" />

      <span className="back-top__default" aria-hidden="true" style={reduced ? { transition: "none" } : undefined}>
        ↑
      </span>

      <span className="back-top__hover" aria-hidden="true" style={reduced ? { transition: "none" } : undefined}>
        ↑
      </span>
    </button>
  );
}
