import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./ProjectLightbox.css";

const swipeThreshold = 48;

export default function ProjectLightbox({ project, initialPhotoSrc, onClose }) {
  const [photoIndex, setPhotoIndex] = useState(() => {
    const matchingIndex = project.gallery.findIndex(photo => photo.src === initialPhotoSrc);
    return matchingIndex >= 0 ? matchingIndex : 0;
  });
  const closeButtonRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const photo = project.gallery[photoIndex];
  const multiplePhotos = project.gallery.length > 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = event => {
      if (event.key === "Escape") onClose();
      if (!multiplePhotos) return;
      if (event.key === "ArrowRight") setPhotoIndex(index => (index + 1) % project.gallery.length);
      if (event.key === "ArrowLeft") setPhotoIndex(index => (index - 1 + project.gallery.length) % project.gallery.length);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [multiplePhotos, onClose, project.gallery.length]);

  const selectPrevious = () => setPhotoIndex(index => (index - 1 + project.gallery.length) % project.gallery.length);
  const selectNext = () => setPhotoIndex(index => (index + 1) % project.gallery.length);
  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) < swipeThreshold) return;
    if (info.offset.x > 0) selectPrevious();
    else selectNext();
  };

  return (
    <motion.div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-lightbox-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        className="project-lightbox__panel"
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.985 }}
        transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="project-lightbox__header">
          <span>IRICELI MÓVEIS / PROJETO</span>
          <button ref={closeButtonRef} type="button" className="project-lightbox__close" onClick={onClose}>
            <span aria-hidden="true">×</span> Fechar
          </button>
        </header>

        <div className="project-lightbox__layout">
          <div className="project-lightbox__visual">
            <motion.div
              className="project-lightbox__image-wrap"
              drag={multiplePhotos && !reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleDragEnd}
              key={photo.src}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.36, ease: "easeOut" }}
            >
              <img src={photo.src} alt={photo.alt} style={{ objectPosition: photo.position }} draggable={false} />
            </motion.div>

            {multiplePhotos && <>
              <button type="button" className="project-lightbox__arrow project-lightbox__arrow--previous" onClick={selectPrevious} aria-label="Foto anterior">←</button>
              <button type="button" className="project-lightbox__arrow project-lightbox__arrow--next" onClick={selectNext} aria-label="Próxima foto">→</button>
              <p className="project-lightbox__counter" aria-live="polite">{String(photoIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</p>
            </>}
          </div>

          <div className="project-lightbox__details">
            <span className="project-lightbox__category">{project.category}</span>
            <h2 id="project-lightbox-title">{project.title}</h2>
            <p>Marcenaria pensada para acompanhar a rotina, respeitar as proporções do ambiente e valorizar cada detalhe.</p>

            {multiplePhotos && <div className="project-lightbox__thumbs" aria-label="Fotos do projeto">
              {project.gallery.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  className={index === photoIndex ? "is-current" : ""}
                  aria-label={`Ver foto ${index + 1}: ${item.alt}`}
                  aria-current={index === photoIndex ? "true" : undefined}
                  onClick={() => setPhotoIndex(index)}
                >
                  <img src={item.src} alt="" loading="lazy" />
                </button>
              ))}
            </div>}

            <a className="project-lightbox__cta secondary-link" href={project.cta.href} target="_blank" rel="noreferrer">
              Quero um projeto parecido <span className="secondary-link__icon" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
