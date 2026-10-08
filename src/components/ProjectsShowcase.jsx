import { AnimatePresence } from "motion/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { whatsappLink } from "../data/site";
import DriftWall from "./effects/DriftWall";
import { projects, projectImages, wallImages } from "./projectsImages";

const ProjectLightbox = lazy(() => import("./ProjectLightbox"));

export default function ProjectsShowcase() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 600px)").matches);
  const [selectedWallItem, setSelectedWallItem] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 600px)");
    const syncViewport = () => setIsMobile(media.matches);
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  const selectedProject = selectedWallItem && (
    projects.find(project => project.id === selectedWallItem.projectId) ?? {
      id: selectedWallItem.projectId,
      title: selectedWallItem.title,
      category: selectedWallItem.category,
      gallery: [{
        src: selectedWallItem.image,
        alt: selectedWallItem.alt,
        position: selectedWallItem.objectPosition,
      }],
      cta: {
        href: whatsappLink("Olá! Vi um projeto no site da Iriceli Móveis e gostaria de solicitar um orçamento."),
      },
    }
  );

  return (
    <section className="projects-showcase" id="projetos" aria-labelledby="projects-title">
      <div className="projects-showcase__intro">
        <span className="eyebrow">PROJETOS</span>

        <h2 id="projects-title">
          Projetos que traduzem
          <br />
          o seu espaço.
        </h2>

        <p>
          Ambientes pensados nos mínimos detalhes,
          unindo funcionalidade, precisão e acabamento.
        </p>
      </div>

      <div className="projects-showcase__wall">
        <DriftWall
            items={isMobile ? projectImages : wallImages}
            columns={7}
            tileWidth={250}
            tileHeight={145}
            gap={8}
            radius={18}
            tilt={14}
            turn={-5}
            roll={0}
            perspective={1500}
            depth={110}
            speed={26}
            direction="up"
            variance={0.32}
            parallax={0.45}
            pauseOnHover={false}
            lift={55}
            fade={0.28}
            dim={0.72}
            grayscale={false}
            overlayColor="#1F212E"
            paused={Boolean(selectedWallItem)}
            onItemSelect={setSelectedWallItem}
        />
      </div>

      <div className="projects-showcase__more">
        <p>Veja outros ambientes e detalhes feitos sob medida.</p>
        <a className="secondary-link" href="#fotos" aria-label="Abrir a galeria com mais fotos">
          Mais fotos <span className="secondary-link__icon" aria-hidden="true">↗</span>
        </a>
      </div>

      <AnimatePresence>
        {selectedProject && <Suspense fallback={null}><ProjectLightbox project={selectedProject} initialPhotoSrc={selectedWallItem.image} onClose={() => setSelectedWallItem(null)} /></Suspense>}
      </AnimatePresence>
    </section>
  );
}
