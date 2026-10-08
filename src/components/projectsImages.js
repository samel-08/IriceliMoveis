import { whatsappLink } from "../data/site";

const optimizedAssetModules = import.meta.glob("../assets/brand-optimized/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
});
const optimizedPhoto = sourceName => optimizedAssetModules[`../assets/brand-optimized/${sourceName}.webp`];
const stairs = optimizedPhoto("1000369156.jpg");
const geometricPanel = optimizedPhoto("1000369158.jpg");
const drawers = optimizedPhoto("1000369160.jpg");
const roundTable = optimizedPhoto("1000369162.jpg");
const woodOffice = optimizedPhoto("1000369164.jpg");
const slattedPanel = optimizedPhoto("20250203_171113.jpg");
const kitchenIsland = optimizedPhoto("20250725_171632.jpg");
const kitchenWide = optimizedPhoto("20250725_171702.jpg");
const kitchenCounter = optimizedPhoto("20250725_171759.jpg");
const kitchenSink = optimizedPhoto("20250725_171806.jpg");
const wineDisplay = optimizedPhoto("20251013_110821.jpg");
const woodTVPanel = optimizedPhoto("20251013_114612.jpg");
const whiteKitchen = optimizedPhoto("20260515_151254.jpg");
const woodDoor = optimizedPhoto("IMG-20241127-WA0003.jpg");
const slattedPanelWide = optimizedPhoto("IMG-20250203-WA0049.jpeg");
const kitchenOverview = optimizedPhoto("IMG-20250725-WA0027.jpg");
const kitchenDetail = optimizedPhoto("IMG-20250725-WA0030.jpg");
const glassCabinet = optimizedPhoto("Screenshot_20260910_200854_Instagram.jpg");
const nonPhotoWallAssets = new Set([
  "logo.jpg",
  "logo_leao.png",
  "logo_removebg.png",
  "IMG-20260820-WA0143.jpg",
  "Sem título - 05 de agosto de 2026 às 12.51.23-1.png",
]);

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
    href: whatsappLink(`Olá! Vi o projeto "${project.title}" no site da Iriceli Móveis e gostaria de um projeto parecido.`),
  },
}));

export const projectImages = projects.map(({ id, title, category, cover }) => ({
  projectId: id, title, category,
  image: cover.src,
  alt: cover.alt,
  objectPosition: cover.position,
}));

const projectPhotos = projects.flatMap(project =>
  project.gallery.map(photo => ({
    projectId: project.id,
    title: project.title,
    category: project.category,
    image: photo.src,
    alt: photo.alt,
    objectPosition: photo.position,
  })),
);

const knownPhotoByUrl = new Map(projectPhotos.map(photo => [photo.image, photo]));
const photoDetailsByFilename = {
  "IMG-20260923-WA0034.jpg": { title: "Painel e marcenaria para sala", category: "Salas e painéis", alt: "Painel de madeira planejado em sala de estar" },
  "IMG-20260923-WA0037.jpg": { title: "Gaveteiro sob medida", category: "Móveis e detalhes", alt: "Gaveteiro branco integrado a um móvel planejado" },
  "IMG-20260923-WA0038.jpg": { title: "Móvel de apoio em madeira", category: "Móveis e detalhes", alt: "Móvel de apoio em madeira fotografado na oficina" },
  "IMG-20260923-WA0039.jpg": { title: "Banco com encosto estofado", category: "Móveis e detalhes", alt: "Banco planejado com estrutura de madeira e assento estofado" },
  "IMG-20260923-WA0041.jpg": { title: "Cozinha clara sob medida", category: "Cozinhas", alt: "Cozinha planejada clara com bancada e armários" },
  "IMG-20260923-WA0043.jpg": { title: "Sala com painel e mobiliário", category: "Salas e painéis", alt: "Sala de estar com painel decorativo e mobiliário planejado" },
  "IMG-20260923-WA0044.jpg": { title: "Quarto com armário planejado", category: "Quartos e armários", alt: "Quarto com armário aberto integrado à marcenaria" },
  "IMG-20260923-WA0045.jpg": { title: "Adega comercial em madeira", category: "Adegas e comerciais", alt: "Adega comercial com prateleiras para garrafas" },
  "IMG-20260923-WA0046.jpg": { title: "Exposição de vinhos sob medida", category: "Adegas e comerciais", alt: "Parede de adega com nichos de madeira e iluminação" },
  "IMG-20260923-WA0047.jpg": { title: "Mesa e banco para jantar", category: "Móveis e detalhes", alt: "Conjunto de mesa e banco de madeira em sala de jantar" },
  "IMG-20260923-WA0048.jpg": { title: "Bancada de trabalho", category: "Móveis e detalhes", alt: "Bancada sob medida em etapa de montagem" },
  "IMG-20260923-WA0049.jpg": { title: "Painel de TV para sala", category: "Salas e painéis", alt: "Painel de TV e aparador integrados à sala" },
  "IMG-20260923-WA0050.jpg": { title: "Gabinete para banheiro", category: "Banheiros", alt: "Gabinete de banheiro com cuba de apoio e espelheira" },
  "IMG-20260923-WA0051.jpg": { title: "Adega com nichos iluminados", category: "Adegas e comerciais", alt: "Parede de adega com nichos para garrafas e iluminação" },
  "IMG-20260923-WA0052.jpg": { title: "Mesa de jantar e banco", category: "Móveis e detalhes", alt: "Mesa de jantar com banco estofado e base de madeira" },
  "IMG-20260923-WA0054.jpg": { title: "Móvel em produção", category: "Móveis e detalhes", alt: "Móvel sob medida em etapa de produção na oficina" },
  "IMG-20260923-WA0071.jpg": { title: "Armário espelhado e penteadeira", category: "Quartos e armários", alt: "Armário planejado com espelho e bancada de penteadeira" },
};

// The wall can use every real project photo without hard-coding a stale list.
// Curated projects retain their existing title and multi-photo gallery on click.
export const wallImages = Object.entries(optimizedAssetModules)
  .map(([path, image]) => ({ sourceName: path.split("/").at(-1).replace(/\.webp$/i, ""), image }))
  .filter(({ sourceName }) => !nonPhotoWallAssets.has(sourceName))
  .sort((first, second) => first.sourceName.localeCompare(second.sourceName))
  .map(({ sourceName, image }) => {
    const knownPhoto = knownPhotoByUrl.get(image);
    const photoDetails = photoDetailsByFilename[sourceName];
    return knownPhoto ? { ...knownPhoto, sourceName } : {
      projectId: `portfolio-${sourceName}`,
      title: photoDetails?.title ?? "Detalhe de marcenaria",
      category: photoDetails?.category ?? "Móveis e detalhes",
      image,
      alt: photoDetails?.alt ?? "Projeto de marcenaria sob medida da Iriceli Móveis",
      objectPosition: "center",
      sourceName,
    };
  });
