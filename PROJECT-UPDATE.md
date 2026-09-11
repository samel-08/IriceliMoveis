# Atualizacao de projetos e acabamento

## Imagens revisadas

A pasta `src/assets/brand` foi inventariada novamente e todas as imagens foram conferidas visualmente. Ha 22 arquivos: 18 fotos e 4 arquivos de identidade visual. Nenhum original foi modificado.

As 18 fotos foram organizadas em 12 projetos. Os nomes sao descritivos do que aparece nas fotos; nao sao nomes de clientes ou obras confirmados. A cozinha azul tem seis fotos e o painel ripado tem duas. Os demais ambientes possuem uma foto cada.

Novas fotos incluidas:

| Arquivo | Projeto / categoria |
| --- | --- |
| `1000369156.jpg` | Madeira ao ar livre / Areas externas |
| `1000369158.jpg` | Painel geometrico / Paineis |
| `1000369160.jpg` | Organizacao sob medida / Marcenaria |
| `1000369162.jpg` | Mesa em madeira / Mobiliario |
| `1000369164.jpg` | Escritorio em madeira / Escritorios |
| `Screenshot_20260910_200854_Instagram.jpg` | Cristaleira iluminada / Cristaleiras |

Fotos que estavam na revisao anterior e nao existem mais: `20250203_171110.jpg`, `20250725_171714.jpg`, `IMG-20241127-WA0008.jpg` e `IMG-20250725-WA0028.jpg`. Nao havia imports individuais quebrados: a implementacao anterior usava um glob. Esse glob foi substituido por imports explicitos dos arquivos atuais, incluindo os nomes novos que os filtros antigos ignoravam.

`logo.jpg`, `logo_removebg.png`, `IMG-20260820-WA0143.jpg` e o PNG iniciado por `Sem titulo` sao materiais de marca e nao entram no DriftWall. Nao ha Picsum no codigo do site. Nao foi encontrado um link de perfil do Instagram; por isso nenhuma rede social foi inventada.

## Dados e parede de projetos

`projectsImages.js` exporta `projects`, com `id`, `title`, `category`, `cover`, `gallery` e `cta`. Cada foto possui `src`, `alt` e `position`. O CTA individual ja tem a mensagem "Quero um projeto parecido" e o nome descritivo do projeto no WhatsApp.

`projectImages` adapta esses dados para o DriftWall: uma capa por projeto. As demais fotos nao sao inseridas na parede. Cada coluna percorre todas as capas em uma ordem deterministica diferente, evitando a repeticao de uma unica foto em sequencia. O movimento vertical, a perspectiva, o parallax e o destaque permanecem. Titulo/categoria aparecem no destaque.

O componente aceita um callback opcional `onItemSelect(projectId)` para uma futura tela/modal. Sem esse callback, nao ha botao sem acao nem promessa de abrir uma galeria. Nenhum modal foi criado.

## Fotos que merecem otimizacao

Valores aproximados em MB decimais. Os originais foram preservados. Uma futura geracao de versoes WebP/AVIF com `srcset` pode reduzir transferencia mantendo as fotos grandes para a galeria.

| Arquivo | MB | Uso |
| --- | ---: | --- |
| `20251013_110821.jpg` | 3.56 | Capa, prioridade alta |
| `20251013_114612.jpg` | 3.10 | Capa, prioridade alta |
| `20250725_171632.jpg` | 2.92 | Galeria |
| `20250203_171113.jpg` | 2.52 | Galeria |
| `20250725_171702.jpg` | 2.31 | Galeria |
| `20260515_151254.jpg` | 1.65 | Capa |
| `IMG-20250203-WA0049.jpeg` | 1.37 | Capa |
| `20250725_171759.jpg` | 1.12 | Galeria |

## Fluxo e navegacao

ScrollStory -> 06 Projetos -> 07 Diferenciais -> 08 Processo -> 09 Contato -> Footer.

Diferenciais usa uma lista tecnica curta. Processo mostra Medida, Projeto, Producao e Instalacao. As duas secoes usam os tokens e limites responsivos existentes, com apenas dois ScrollTriggers de entrada unica e cleanup por matchMedia. Movimento reduzido mantem o conteudo visivel.

Os antigos IDs de Processo e Diferenciais foram retirados das cenas do ScrollStory para evitar destinos duplicados. Navbar, StaggeredMenu e Footer compartilham os mesmos links. Um IntersectionObserver atualiza `aria-current` no desktop/mobile, sem adicionar um listener de scroll para isso.

O botao Pearl foi mantido e os links de WhatsApp agora compartilham a mensagem solicitada. FoldText permanece no Footer. BackToTop ja aparecia apenas apos 400px e sumia proximo do topo/CTA, portanto nao foi recriado. DriftWall ja pausava fora da tela, na aba oculta e com movimento reduzido; esse comportamento foi mantido. ShinyText e FoldText foram revisados e preservados.

O global.css foi lido integralmente. A alteracao foi pontual: estado ativo, linha de transicao e unificacao da regra duplicada do pseudo-elemento Pearl. Nenhuma classe foi removida como supostamente morta e os breakpoints existentes foram preservados.

## SEO

Idioma pt-BR, titulo descritivo, meta description, theme-color e Open Graph textual. Favicon de monograma na paleta da marca substitui o icone do template. H1 unico, secoes com headings/rotulos e Footer com nav semantico. Dominio canonico, og:url e imagem absoluta de compartilhamento nao foram inventados: dependem da URL definitiva de publicacao.

## Arquivos desta rodada

- `src/App.jsx`: integra as secoes.
- `src/components/projectsImages.js`: imports atuais, agrupamentos e CTAs por projeto.
- `src/components/ProjectsShowcase.jsx`: capas, heading e numeracao.
- `src/components/effects/DriftWall.jsx` e `DriftWall.css`: distribuicao das capas, legendas e callback futuro.
- `src/components/CraftSections.jsx` e `CraftSections.css`: Diferenciais e Processo.
- `src/components/ScrollStory.jsx`: remove somente os dois IDs transferidos.
- `src/components/Navbar.jsx`, `StaggeredMenu.jsx` e `StaggeredMenu.css`: links compartilhados e estado ativo.
- `src/components/Footer.jsx` e `FinalCTA.jsx`: WhatsApp, semantica e numeracao.
- `src/data/site.js`: fonte unica de links e contato.
- `src/hooks/useActiveSection.js`: observacao da secao atual.
- `src/styles/global.css`: acabamento pontual.
- `index.html` e `public/favicon.svg`: SEO e favicon.
- `scripts/verify-projects.mjs`: verificacao reproduzivel das imagens e dados.
- `PROJECT-UPDATE.md`: este relatorio.

## Verificacao

`npm.cmd run lint`, `npm.cmd run build` e `git diff --check` passaram na verificacao final.

`node scripts/verify-projects.mjs` passou: 12 projetos, 18 fotos, capas unicas, CTAs validos e inventario atual coberto. O script acusa fotos novas sem cadastro, referencias removidas, galerias invalidas e duplicatas.

No navegador local: console sem erros/avisos observados, 12 capas distintas, nenhuma imagem visivel quebrada e nenhum ID duplicado. Conferidos links Projetos/Diferenciais/Processo, abertura/fechamento do menu e estado ativo. O link do WhatsApp foi inspecionado sem enviar mensagem.

As secoes novas foram medidas em 320x568, 390x844, 600x960, 768x1024, 1024x768, 1280x720, 1920x1080, 3440x1440 e 3840x2160: sem overflow horizontal ou texto excedendo os elementos verificados. Inspecao visual em desktop e 320px. Sao verificacoes no navegador local, nao em aparelhos fisicos ou em todos os navegadores.
