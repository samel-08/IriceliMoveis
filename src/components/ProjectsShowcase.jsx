import DriftWall from "./effects/DriftWall";

export default function ProjectsShowcase() {
  return (
    <section className="projects-showcase" id="projetos">
      <div className="projects-showcase__intro">
        <span className="eyebrow">07 — PROJETOS</span>

        <h2>
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
            columns={5}
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
        />
      </div>
    </section>
  );
}