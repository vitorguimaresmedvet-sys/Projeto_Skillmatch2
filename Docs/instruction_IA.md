# Instruction IA — Projeto SkillMatch 2.0

## Contexto do Projeto

Este repositório contém o desenvolvimento do SkillMatch 2.0, uma evolução do projeto SkillMatch 1.0.

O objetivo é transformar o projeto original desenvolvido em JavaScript em uma aplicação web modular, mantendo a lógica existente e adicionando novas funcionalidades exigidas pelo projeto do curso.

A base oficial do desenvolvimento é o SkillMatch 1.0.

O projeto deve evoluir através de refatoração incremental.

Não criar uma solução completamente nova sem necessidade.

Não copiar código externo sem compreensão ou adaptação.

---

# Objetivo Principal

Desenvolver uma aplicação que:

- permita cadastrar um perfil de candidato;
- carregue vagas;
- calcule compatibilidade;
- classifique vagas;
- indique a melhor oportunidade;
- apresente recomendações;
- mantenha dados utilizando localStorage;
- possua interface responsiva e acessível.

---

# Diretriz Fundamental

Toda alteração realizada neste projeto deve priorizar:

1. Clareza do código.
2. Organização.
3. Facilidade de manutenção.
4. Facilidade de explicação pelo desenvolvedor.
5. Atendimento aos requisitos oficiais.

Não utilizar soluções complexas quando uma solução simples e explicável resolver o problema.

---

# Arquitetura

Respeitar a separação de responsabilidades.

## main.js

Responsável por:

- inicialização da aplicação;
- conexão entre módulos;
- controle geral do fluxo.

Não deve conter regras de negócio.

---

## motor.js

Responsável por:

- classes;
- regras de compatibilidade;
- cálculo de resultados;
- classificação;
- recomendação.

Não deve manipular DOM.

---

## dados.js

Responsável por:

- fetch;
- carregamento dos dados;
- localStorage;
- tratamento de estados de carregamento e erro.

---

## ui.js

Responsável por:

- manipulação do DOM;
- eventos;
- criação dos cards;
- atualização visual.

Não deve conter regras de negócio.

---

# Código

Antes de adicionar código:

- compreender a necessidade;
- avaliar impacto;
- manter padrão existente.

Priorizar:

- nomes descritivos;
- funções pequenas;
- responsabilidades únicas;
- comentários apenas quando necessários.

Evitar:

- código duplicado;
- funções gigantes;
- lógica misturada entre módulos.

---

# Git

Seguir o fluxo:

main
|
develop
|
feature branches


Branches devem representar funcionalidades.

Exemplo:

feature/motor
feature/dados
feature/interface

Commits devem:

- ser pequenos;
- possuir descrição objetiva;
- representar uma alteração específica.

Exemplo:

Correto:
"implementa cálculo de compatibilidade"

Evitar:
"alterações"

---

# Processo de Desenvolvimento

O projeto é dividido em Sprints.

Cada Sprint deve possuir:

- objetivo;
- etapas;
- arquivos envolvidos;
- critério de conclusão.

Não iniciar uma Sprint antes da anterior estar concluída.

---

# Regra de Aprendizado

O desenvolvedor precisa compreender todo código criado.

Ao sugerir alterações:

- explicar o conceito;
- explicar a lógica;
- explicar o motivo da implementação.

A solução escolhida deve ser defensável durante apresentação ou avaliação.

---

# Reaproveitamento do SkillMatch 1.0

O código existente deve ser analisado e migrado.

Manter:

- lógica validada;
- conceitos obrigatórios;
- estruturas úteis.

Melhorar:

- organização;
- modularização;
- interface;
- persistência.

Não realizar apenas cópia do código antigo.

---

# Escopo

Não adicionar tecnologias fora do solicitado.

Evitar:

- React;
- TypeScript;
- frameworks;
- backend;
- ferramentas de build.

Priorizar:

- HTML;
- CSS;
- JavaScript Vanilla;
- módulos ES.

---

Documentar apenas o suficiente para manter organização. O restante do tempo é implementação.