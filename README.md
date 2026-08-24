# Iriceili Móveis

Landing page premium desenvolvida para a **Iriceili Móveis**, empresa especializada em móveis planejados e móveis sob medida.

O projeto foi pensado para transmitir uma identidade sofisticada, arquitetônica e profissional, valorizando os projetos realizados pela empresa e conduzindo o visitante até o principal objetivo comercial do site: **solicitar um orçamento pelo WhatsApp**.

## Conceito

A principal ideia criativa da landing page é:

**Do projeto à realidade.**

A experiência visual mistura desenho técnico, precisão arquitetônica e apresentação de mobiliário, criando uma narrativa em que o móvel evolui conforme o usuário navega pela página.

Um dos principais elementos do projeto é uma experiência controlada pelo scroll, onde um armário acompanha a navegação e vai sendo progressivamente construído.

A sequência conceitual é:

```text
IDEIA
↓
PROJETO
↓
MEDIDA
↓
ESTRUTURA
↓
ACABAMENTO
↓
REALIDADE
```

## Identidade visual

A interface utiliza uma estética inspirada em:

* marcenaria de alto padrão
* arquitetura
* design de interiores
* desenho técnico
* luxo discreto
* precisão e acabamento

### Paleta principal

```text
Azul profundo    #1F212E
Azul grafite     #2A3042
Dourado          #C9A55A
Dourado claro    #E7D59C
Creme            #F4EBD0
```

O azul profundo domina a interface, enquanto o dourado é utilizado de maneira controlada em linhas técnicas, detalhes, bordas e elementos de destaque.

## Tecnologias

O projeto utiliza:

* React
* Vite
* JavaScript
* CSS
* GSAP
* ScrollTrigger

O deploy final será preparado para a Vercel.

## Animação de scroll

A landing page possui uma sequência visual controlada pelo scroll utilizando **GSAP + ScrollTrigger**.

O armário permanece visualmente presente durante várias etapas da página e se movimenta lateralmente enquanto o conteúdo avança verticalmente.

Durante a experiência, o móvel passa por diferentes estados:

```text
01 — Apresentação

02 — Projeto

03 — Precisão

04 — Acabamento

05 — Realidade
```

A proposta é fazer com que a animação tenha função narrativa, e não apenas decorativa.

## Estrutura atual

```text
src/
├── assets/
│   └── brand/
│
├── components/
│   ├── Navbar.jsx
│   └── ScrollStory.jsx
│
├── styles/
│   └── global.css
│
├── App.jsx
└── main.jsx
```

A estrutura poderá evoluir conforme novas seções forem adicionadas.

## Próximas etapas

O projeto ainda está em desenvolvimento.

Entre as próximas etapas estão:

* refinamento da animação principal
* melhoria visual do armário
* transição entre desenho técnico e resultado real
* galeria de projetos reais
* modal dos projetos
* integração com WhatsApp
* diferenciais
* processo de atendimento
* CTA final
* responsividade completa
* otimização de performance
* SEO
* acessibilidade
* deploy na Vercel

## Objetivo

O resultado final deve parecer uma **marca de mobiliário planejado de alto padrão**, e não um template genérico de marcenaria.

A experiência deve unir:

**arquitetura + precisão + marcenaria + fotografia real + conversão**

com foco principal em gerar novos pedidos de orçamento.
