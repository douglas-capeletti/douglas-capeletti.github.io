---
title: "CSS"
pubDate: "2025-01-31"
hero: "/images/observability.webp"
tags: ["draft", "observability", "microservices"]
---

## Seletores

- Universal: "\*"

        * {
            // aplica estilos a todos os elementos da pagina
        }

- classe: "."

        .btn-main {
            // aplica estilos a tag que conter a classe "btn-main"
        }

- id: "#"

        a#main {
            // aplica estilos a tag "a" que tiver o id "main"
        }

---

## Prioridade:

- !important: marcação prioritária
- inline: estilos definidos diretamente no html
- id: seletores identificados por id
- class: seletores com o maior numero de classes
- elemento: seletores com o maior numero de elementos html
- universal: seletor universal não contém prioridade porém sobrescreve o valor padrão do browser
- ordem: em caso de empate o ultimo a ser definido no arquivo será priorizado

---

## Propriedades:

- font-family: ("Nova fonte"), (caso indisponível usar esta)

        font-family: "Lato", sans-serif;

* background-image: (imagem), (imagem abaixo), (imagem abaixo)...

  - Linear-gradient: (opcional: direcionamento), (cor inicial), (próxima cor)...


            background-image: linear-gradient(
                to right bottom,
                rgba(126, 213, 111, 0.8),
                rgba(40, 180, 131, 0.8)
            ), url(../img/hero.jpg);

- clip-path: (polygon)

  - polygon: (coordenadas dos pontos de corte)

          //Mais exemplos em: bennettfeely.com/clippy
          clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);

- transform: movimenta o elemento na tela conforme a necessidade

  - translate: traduz as coordenadas do elemento na tela

          transform: translate(-50%, -50%);

---

### Animações

---

- @keyframe (nome da animação)

  - percentis da animação e a ação a des desenvolvida


          @keyframes moveInLeft {
              0% {
                  opacity: 0;
                  transform: translate(-10%);
              }
              80% {
                  opacity: 1;
                  transform: translate(2.5%);
              }
              100% {
                  opacity: 1;
                  transform: translate(0);
              }
          }

---

### Categorias de Propriedades:

- fontes:

| Propriedade | Descrição          |
| ----------- | ------------------ |
| font-family | tipo de fonte      |
| font-weight | espessura da fonte |
| font-size   | tamanho da fonte   |
| line-height | altura da fonte    |
| color       | cor da fonte       |

- background:

| Propriedade         | Descrição                   |
| ------------------- | --------------------------- |
| background-image    | imagem de fundo             |
| background-size     | tamanho do fundo            |
| background-position | ponto de ancoragem do fundo |

- animation:

| Propriedade               | Descrição                       |
| ------------------------- | ------------------------------- |
| animation                 | ponto central das opções abaixo |
| animation-name            | nome da animação criada         |
| animation-duration        | duração total                   |
| animation-timing-function | função de variação no tempo     |
| animation-delay           | delay até começar               |
| animation-iteration-count | numero de execuções             |

---

### Unidades de grandeza:

- Absolutas

| Unidade | Descrição |
| ------- | --------- |
| px      | pixels    |

- Relativas

| Unidade | Descrição                | Fator          |
| ------- | ------------------------ | -------------- |
| em      | tamanho do elemento      | multiplicativo |
| rem     | tamanho do elemento raiz | multiplicativo |
| vh      | altura da viewport       | percentual     |
| vw      | largura da viewport      | percentual     |
| %       | relativo ao elemento pai | percentual     |
| cover   | cobre toda a viewport    | -------------- |