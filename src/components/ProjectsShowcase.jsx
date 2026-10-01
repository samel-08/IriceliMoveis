import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { whatsappLink } from "../data/site";
import ProjectLightbox from "./ProjectLightbox";
import DriftWall from "./effects/DriftWall";
import { projects, wallImages } from "./projectsImages";

export default function ProjectsShowcase() {
  const [selectedWallItem, setSelectedWallItem] = useState(null);
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
            items={wallImages}
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

      <AnimatePresence>
        {selectedProject && <ProjectLightbox project={selectedProject} initialPhotoSrc={selectedWallItem.image} onClose={() => setSelectedWallItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
