import { AnimatePresence } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { whatsappLink } from "../data/site";
import ProjectLightbox from "./ProjectLightbox";
import { projects, wallImages } from "./projectsImages";
import "./GalleryPage.css";

const pageSize = 24;
const categoryAliases = {
  Salas: "Salas e painéis",
  Painéis: "Salas e painéis",
  Comercial: "Adegas e comerciais",
  Cristaleiras: "Adegas e comerciais",
  Mobiliário: "Móveis e detalhes",
  Marcenaria: "Móveis e detalhes",
  "Marcenaria sob medida": "Móveis e detalhes",
  Portas: "Portas e revestimentos",
};

const categoryOrder = new Map([
  "Quartos e armários",
  "Cozinhas",
  "Salas e painéis",
  "Banheiros",
  "Adegas e comerciais",
  "Escritórios",
  "Móveis e detalhes",
  "Áreas externas",
  "Portas e revestimentos",
].map((category, index) => [category, index]));

const photos = wallImages.map(photo => ({
  ...photo,
  category: categoryAliases[photo.category] ?? photo.category,
})).sort((first, second) => (categoryOrder.get(first.category) ?? categoryOrder.size) - (categoryOrder.get(second.category) ?? categoryOrder.size));

const categories = ["Todos", ...new Set(photos.map(photo => photo.category))];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const previousTitleRef = useRef(document.title);
  const filteredPhotos = activeCategory === "Todos"
    ? photos
    : photos.filter(photo => photo.category === activeCategory);
  const visiblePhotos = filteredPhotos.slice(0, visibleCount);
  const selectedProject = selectedPhoto && (
    projects.find(project => project.id === selectedPhoto.projectId) ?? {
      id: selectedPhoto.projectId,
      title: selectedPhoto.title,
      category: selectedPhoto.category,
      gallery: [{
        src: selectedPhoto.image,
        alt: selectedPhoto.alt,
        position: selectedPhoto.objectPosition,
      }],
      cta: {
        href: whatsappLink(`Olá! Vi o projeto "${selectedPhoto.title}" no site da Iriceli Móveis e gostaria de solicitar um orçamento.`),
      },
    }
  );

  useLayoutEffect(() => {
    const previousTitle = previousTitleRef.current;
    document.title = "Galeria de projetos | Iriceli Móveis";
    return () => { document.title = previousTitle; };
  }, []);

  const selectCategory = category => {
    setActiveCategory(category);
    setVisibleCount(pageSize);
  };

  return (
    <main className="photo-gallery" id="fotos">
      <header className="photo-gallery__header">
        <a className="photo-gallery__brand" href="#top" aria-label="Voltar ao início da Iriceli Móveis">
          IRICELI <span>MÓVEIS</span>
        </a>
        <a className="photo-gallery__back" href="#top">
          <span aria-hidden="true">←</span> Voltar ao site
        </a>
      </header>

      <section className="photo-gallery__intro" aria-labelledby="photo-gallery-title">
        <div>
          <span className="photo-gallery__eyebrow">PROJETOS REALIZADOS</span>
          <h1 id="photo-gallery-title">Cada espaço,<br />um projeto único.</h1>
        </div>
        <p>Ambientes e móveis feitos sob medida, com soluções pensadas para a rotina de cada cliente.</p>
      </section>

      <section className="photo-gallery__collection" aria-label="Fotos dos projetos">
        <div className="photo-gallery__filters" role="group" aria-label="Filtrar fotos por categoria">
          {categories.map(category => (
            <button
              className={activeCategory === category ? "is-active" : ""}
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              onClick={() => selectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="photo-gallery__summary" aria-live="polite">
          <span>{String(visiblePhotos.length).padStart(2, "0")} fotos exibidas</span>
          <span>{String(filteredPhotos.length).padStart(2, "0")} no acervo</span>
        </div>

        <div className="photo-gallery__grid">
          {visiblePhotos.map((photo, index) => (
            <button
              className="photo-gallery__card"
              type="button"
              key={photo.sourceName}
              aria-label={`Abrir ${photo.title}, categoria ${photo.category}`}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.image}
                alt={photo.alt}
                style={{ objectPosition: photo.objectPosition || "center" }}
                loading={index < 4 ? "eager" : "lazy"}
                decoding="async"
              />
              <span className="photo-gallery__caption">
                <small>{photo.category}</small>
                <strong>{photo.title}</strong>
              </span>
              <span className="photo-gallery__open" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>

        {visibleCount < filteredPhotos.length && (
          <button className="photo-gallery__load-more" type="button" onClick={() => setVisibleCount(count => count + pageSize)}>
            Carregar mais fotos <span aria-hidden="true">↓</span>
          </button>
        )}
      </section>

      <section className="photo-gallery__contact" aria-label="Solicitar um projeto">
        <p>Tem um ambiente em mente?</p>
        <a href={whatsappLink()} target="_blank" rel="noreferrer">Vamos conversar <span aria-hidden="true">↗</span></a>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectLightbox
            project={selectedProject}
            initialPhotoSrc={selectedPhoto.image}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}