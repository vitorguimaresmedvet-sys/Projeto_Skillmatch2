# SkillMatch 2.0

## Objetivo

Desenvolver uma aplicação web de "Match Profissional Inteligente", projetada para conectar candidatos a oportunidades de emprego através de um motor de análise de compatibilidade de habilidades, garantindo uma experiência de usuário performática, inclusiva e responsiva.

## Funcionalidades

* **Cadastro de Perfil:** Captura e validação de dados profissionais, com persistência de sessão via `LocalStorage`.
* **Análise Inteligente:** Motor de cálculo de compatibilidade baseado em competências entre candidato e requisitos da vaga.
* **Recomendação:** Identificação e destaque visual da oportunidade com maior afinidade técnica (`recomendação inteligente`).
* **Busca e Filtro:** Filtragem dinâmica em tempo real por cargo e modalidade, com feedback visual de estados (`carregando`, `vazio`, `erro`).
* **Acessibilidade:** Interface construída com padrões de acessibilidade (ARIA Live), atingindo nota máxima (100/100) na auditoria de qualidade do Lighthouse.

## Tecnologias

* **HTML5:** Estrutura semântica focada em acessibilidade e SEO.
* **CSS3:** Abordagem *Mobile First*, uso de variáveis CSS, *Flexbox* e *Grid Layout*.
* **JavaScript (ES6+):** Programação assíncrona (`async/await`), manipulação de DOM, Classes de Domínio e Módulos.

## Estrutura do Projeto

* `assets/dados/`: Banco de dados das vagas (`vagas.json`).
* `assets/scripts/`: Camadas de lógica (`dados.js`, `motor.js`, `ui.js`, `main.js`).
* `assets/style/`: Folhas de estilo (`style.css`, `theme.css`).
* `Index.html`: Estrutura principal da aplicação.

## Como executar

1. Clone este repositório em sua máquina local.
2. Abra o arquivo `Index.html` em qualquer navegador web moderno.
3. A aplicação roda diretamente do *file system*, sem necessidade de servidor local ou ferramentas de build.

## Roadmap

* **S1:** Estrutura base e Classes de Domínio.
* **S2:** Interface dinâmica e integração com o Motor.
* **S3:** Camada de Dados (`fetch`, `localStorage`).
* **S4:** Refinamento de Interface e filtros.
* **S5:** Recomendação Inteligente e auditoria de qualidade.
* **S6:** Design Moderno e identidade visual.
* **S7:** Documentação e entrega final.

## Links do Projeto

* **Video:** 
https://drive.google.com/file/d/1m2CL30QUPl_ErzQw-tXi8jZIsPPZuGjq/view?usp=sharing
* **Github:**
https://github.com/vitorguimaresmedvet-sys/Projeto_Skillmatch2
* **Trello:**
https://trello.com/b/qr0RdMDE/projeto-skillmatch-20

## Autor

Vitor Augusto Gonçalves Guimarães

