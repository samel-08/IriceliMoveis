import stairs from "../assets/brand/1000369156.jpg";
import geometricPanel from "../assets/brand/1000369158.jpg";
import drawers from "../assets/brand/1000369160.jpg";
import roundTable from "../assets/brand/1000369162.jpg";
import woodOffice from "../assets/brand/1000369164.jpg";
import slattedPanel from "../assets/brand/20250203_171113.jpg";
import kitchenIsland from "../assets/brand/20250725_171632.jpg";
import kitchenWide from "../assets/brand/20250725_171702.jpg";
import kitchenCounter from "../assets/brand/20250725_171759.jpg";
import kitchenSink from "../assets/brand/20250725_171806.jpg";
import wineDisplay from "../assets/brand/20251013_110821.jpg";
import woodTVPanel from "../assets/brand/20251013_114612.jpg";
import whiteKitchen from "../assets/brand/20260515_151254.jpg";
import woodDoor from "../assets/brand/IMG-20241127-WA0003.jpg";
import slattedPanelWide from "../assets/brand/IMG-20250203-WA0049.jpeg";
import kitchenOverview from "../assets/brand/IMG-20250725-WA0027.jpg";
import kitchenDetail from "../assets/brand/IMG-20250725-WA0030.jpg";
import glassCabinet from "../assets/brand/Screenshot_20260910_200854_Instagram.jpg";
import { whatsappLink } from "../data/site";

const photo = (src, alt, position = "center") => ({ src, alt, position });

// Descriptive names identify photographed environments, not client names.
// Galleries include the cover first and can feed a future project detail view.
const collection = [
  {
    id: "cozinha-azul", title: "Cozinha azul e madeira", category: "Cozinhas",
    gallery: [
      photo(kitchenOverview, "Cozinha com armários azuis, bancada e ilha em madeira"),
      photo(kitchenIsland, "Ilha de cozinha com gavetas azuis e tampo de madeira"),
      photo(kitchenWide, "Vista do ambiente integrado com cozinha e ilha central"),
      photo(kitchenCounter, "Bancada de madeira com cooktop e armários inferiores"),
      photo(kitchenSink, "Armários da cozinha sob a bancada da pia"),
      photo(kitchenDetail, "Detalhe da bancada e da marcenaria junto à janela"),
    ],
  },
  {
    id: "escritorio-madeira", title: "Escritório em madeira", category: "Escritórios",
    gallery: [photo(woodOffice, "Escritório com painéis de madeira, bancada e estantes integradas")],
  },
  {
    id: "painel-ripado", title: "Painel e prateleiras", category: "Salas",
    gallery: [
      photo(slattedPanelWide, "Painel de TV com ripado lateral e prateleiras abertas"),
      photo(slattedPanel, "Vista lateral do painel de TV com prateleiras e ripado"),
    ],
  },
  {
    id: "escada-madeira", title: "Madeira ao ar livre", category: "Áreas externas",
    gallery: [photo(stairs, "Escada revestida em madeira junto à piscina", "center 60%")],
  },
  {
    id: "cristaleira-iluminada", title: "Cristaleira iluminada", category: "Cristaleiras",
    gallery: [photo(glassCabinet, "Cristaleira com portas de vidro, prateleiras e iluminação interna")],
  },
  {
    id: "cozinha-clara", title: "Cozinha em tons claros", category: "Cozinhas",
    gallery: [photo(whiteKitchen, "Cozinha com armários claros sob a bancada em L")],
  },
  {
    id: "expositor-vinhos", title: "Expositor de vinhos", category: "Comercial",
    gallery: [photo(wineDisplay, "Expositor de madeira com nichos para garrafas em loja de vinhos")],
  },
  {
    id: "mesa-redonda", title: "Mesa em madeira", category: "Mobiliário",
    gallery: [photo(roundTable, "Mesa redonda de madeira com base central")],
  },
  {
    id: "painel-geometrico", title: "Painel geométrico", category: "Painéis",
    gallery: [photo(geometricPanel, "Painel branco com desenho geométrico e faixas verticais douradas")],
  },
  {
    id: "porta-madeira", title: "Porta e revestimento", category: "Portas",
    gallery: [photo(woodDoor, "Porta de madeira integrada ao revestimento do ambiente")],
  },
  {
    id: "gaveteiro", title: "Organização sob medida", category: "Marcenaria",
    gallery: [photo(drawers, "Móvel em produção com gavetas abertas e divisões internas")],
  },
  {
    id: "painel-tv-madeira", title: "Madeira na sala", category: "Salas",
    gallery: [photo(woodTVPanel, "Painel de madeira para TV entre cortinas, com poltronas à frente")],
  },
];

export const projects = collection.map(project => ({
  ...project,
  cover: project.gallery[0],
  cta: {
    label: "Quero um projeto parecido",
    href: whatsappLink(`Olá! Vi o projeto "${project.title}" no site da Iriceili Móveis e gostaria de um projeto parecido.`),
  },
}));

export const projectImages = projects.map(({ id, title, category, cover }) => ({
  projectId: id, title, category,
  image: cover.src,
  alt: cover.alt,
  objectPosition: cover.position,
}));
