import { useEffect, useState } from "react";
import StrokeText from "./effects/StrokeText";
import ShinyText from "./effects/ShinyText";
import "./BrandIntro.css";

export default function BrandIntro() {
  const [showShiny, setShowShiny] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShiny(true);
    }, 1550);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="brand-intro" aria-label="IRICEILI MÓVEIS">
      <div
        className={`brand-intro__layer brand-intro__stroke ${
          showShiny ? "is-hidden" : "is-visible"
        }`}
      >
        <StrokeText
          text="IRICEILI MÓVEIS"
          strokeColor="#C9A55A"
          fillColor="#F4EBD0"
          strokeWidth={1.3}
          drawDuration={1.2}
          fillDelay={0.15}
          stagger={0.04}
          ease="sine.inOut"
          trigger="mount"
          fillMode="fade"
          fontSize={68}
          fontWeight={500}
          letterSpacing={0}
        />
      </div>

      <div
        className={`brand-intro__layer brand-intro__shiny ${
          showShiny ? "is-visible" : "is-hidden"
        }`}
      >
        <ShinyText
          text="IRICEILI MÓVEIS"
          speed={1.6}
          delay={0.3}
          color="#C9A55A"
          shineColor="#F4EBD0"
          spread={110}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={!showShiny}
          className="brand-intro__shiny-text"
        />
      </div>
    </div>
  );
}