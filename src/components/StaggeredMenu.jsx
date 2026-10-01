import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import logoLion from "../assets/brand/logo_leao.png";
import "./StaggeredMenu.css";
import { navigation } from "../data/site";

export default function StaggeredMenu({ activeSection }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const mobile = window.matchMedia("(max-width: 1024px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    dialog.showModal();
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    const context = gsap.context(() => {
      if (!reduced.matches) gsap.from(".staggered-menu__item", {
        y: 32, opacity: 0, duration: 0.5, stagger: 0.08,
        ease: "power3.out", clearProps: "transform,opacity",
      });
    }, dialog);
    const resize = () => { if (!mobile.matches) setOpen(false); };
    const preference = () => { if (reduced.matches) context.revert(); };
    mobile.addEventListener("change", resize);
    reduced.addEventListener("change", preference);
    resize();
    return () => {
      mobile.removeEventListener("change", resize);
      reduced.removeEventListener("change", preference);
      context.revert();
      dialog.close();
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
      const target = mobile.matches ? trigger : document.querySelector(".navbar__brand");
      target?.focus({ preventScroll: true });
    };
  }, [open]);

  return <>
    <button ref={triggerRef} type="button" className="staggered-menu__trigger"
      aria-haspopup="dialog" aria-controls={id} aria-expanded={open} onClick={() => setOpen(true)}>
      Menu <span aria-hidden="true">&#9776;</span>
    </button>
    {createPortal(
      <dialog ref={dialogRef} id={id} className="staggered-menu" aria-label="Menu principal"
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <div className="staggered-menu__panel">
          <div className="staggered-menu__header">
            <a href="#top" onClick={() => setOpen(false)}><img src={logoLion} alt="Iriceli Móveis" /></a>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar menu">Fechar &#215;</button>
          </div>
          <nav aria-label="Navegação mobile">
            {navigation.map(({ id, href, label }, index) => <a className="staggered-menu__item" key={id} href={href}
              aria-current={activeSection === id ? "location" : undefined} onClick={() => setOpen(false)}>
              <span aria-hidden="true">0{index + 1}</span>{label}
            </a>)}
          </nav>
          <a className="staggered-menu__item staggered-menu__cta" href="#contato" onClick={() => setOpen(false)}>Solicitar orçamento</a>
        </div>
      </dialog>, document.body,
    )}
  </>;
}
