import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

export default function PillNav({ logo, items, activeId }) {
  const circleRefs = useRef([]);
  const timelinesRef = useRef([]);

  useEffect(() => {
    const timelines = timelinesRef.current;
    circleRefs.current.forEach((circle, index) => {
      const pill = circle?.parentElement;
      if (!pill) return;
      const { width, height } = pill.getBoundingClientRect();
      const radius = ((width * width) / 4 + height * height) / (2 * height);
      const size = Math.ceil(radius * 2) + 2;
      const inset = Math.ceil(radius - Math.sqrt(Math.max(0, radius * radius - (width * width) / 4))) + 1;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;
      circle.style.bottom = `-${inset}px`;
      gsap.set(circle, { scale: 0, xPercent: -50, transformOrigin: `50% ${size - inset}px` });
      timelines[index]?.kill();
      timelines[index] = gsap.timeline({ paused: true })
        .to(circle, { scale: 1.16, duration: 0.48, ease: "power3.out" });
    });

    return () => timelines.forEach(timeline => timeline?.kill());
  }, [items]);

  return (
    <nav className="pill-nav" aria-label="Navegação principal">
      <a className="pill-nav__logo" href="#top" aria-label="Iriceili Móveis - início">
        <img src={logo} alt="Iriceili Móveis" />
      </a>
      <ul className="pill-nav__list">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              className={`pill-nav__item${activeId === item.id ? " is-active" : ""}`}
              href={item.href}
              aria-current={activeId === item.id ? "location" : undefined}
              onMouseEnter={() => timelinesRef.current[index]?.play()}
              onMouseLeave={() => timelinesRef.current[index]?.reverse()}
            >
              <span className="pill-nav__circle" aria-hidden="true" ref={element => { circleRefs.current[index] = element; }} />
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
