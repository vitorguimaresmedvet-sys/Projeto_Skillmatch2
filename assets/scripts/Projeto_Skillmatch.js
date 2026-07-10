// 1. Dados de teste (descomentados)
// const candidatoOriginal = {
//   nome: "João Silva",
//   idade: 30,
//   area: "Desenvolvimento Back-End",
//   habilidades: ["JavaScript", "React", "Node.js"],
//   experienciaMeses: 5,
// };

const candidatoOriginal = {
  nome: "nome",
  idade: "idade",
  area: "area",
  habilidades: "",
  experienciaMeses: "experienciaMeses",
};

// Controle global de saída no console. Defina `true` para suprimir logs de listagem.

// Lista de vagas do sistema (RF02) -- array de objetos que descrevem cada vaga.
// Cada objeto deve conter: id, empresa, cargo, requisitos (array), salario e modalidade.
const listaVagas = [
  {
    id: 1,
    empresa: "Tech Solutions",
    cargo: "Desenvolvedor Back-End Júnior",
    requisitos: ["JavaScript", "Node.js", "SQL"],
    salario: 4800,
    modalidade: "Presencial",
  },
  {
    id: 2,
    empresa: "InovaTech",
    cargo: "Desenvolvedor Back-End Pleno",
    requisitos: ["JavaScript", "Node.js", "Docker", "React"],
    salario: 7000,
    modalidade: "Remoto",
  },
  {
    id: 3,
    empresa: "CodeMasters",
    cargo: "Desenvolvedor Back-End Sênior",
    requisitos: ["JavaScript", "Node.js", "Docker", "Kubernetes"],
    salario: 11000,
    modalidade: "Híbrido",
  },
];

// 2. Classes (Com iniciais maiúsculas para evitar conflito de escopo)
// `Vaga` representa o modelo de uma vaga (RF09). Usamos classes para demonstrar POO.
class Vaga {
  constructor(cargo, salario, requisitos, modalidade, id = null) {
    this.id = id;
    this.cargo = cargo;
    this.salario = salario;
    this.requisitos = requisitos;
    this.modalidade = modalidade;
  }
}

// Classe simples para representar o candidato (objeto de domínio - RF01).
class Candidato {
  constructor(nome, idade, area, habilidades, experienciaMeses) {
    this.nome = nome;
    this.idade = idade;
    this.area = area;
    this.habilidades = habilidades;
    this.experienciaMeses = experienciaMeses;
  }
}

// Exemplo de herança (RF10): VagaFrontEnd estende Vaga e adiciona `nivel`.
class VagaFrontEnd extends Vaga {
  constructor(cargo, empresa, requisitos, salario, modalidade, nivel) {
    super(cargo, salario, requisitos, modalidade);
    this.empresa = empresa;
    this.nivel = nivel;
  }
  // Método que demonstra o uso de `this` (RF11).
  exibirNivel() {
    return `Nivel da vaga: ${this.nivel}`;
  }
}

// // console.log(listaVagas[0]);
// Mostrar listagem de vagas (true = suprimir listagem inicial)
const SILENT = false;
// Controla se os detalhes por vaga devem ser impressos durante a avaliação
const PRINT_PER_VAGA = false;
if (!SILENT) {
  console.log("---------------------------------------");
  console.log("Vagas disponíveis:");
  console.log("---------------------------------------");
  listaVagas.forEach((vaga) => {
    console.log(` EMPRESA: ${vaga.empresa}`);
    console.log(` CARGO:   ${vaga.cargo} (ID: ${vaga.id})`);
    console.log(` SALÁRIO: R$ ${vaga.salario.toLocaleString("pt-BR")},00`);
    console.log(` MODELO:  ${vaga.modalidade}`);
    console.log(` REQUISITOS ORIGINAIS: ${vaga.requisitos.join(", ")}`);
    console.log("---------------------------------------");
  });
}

// Função de avaliação (atualizada para mostrar os nomes das tecnologias)
// Esta função compara as habilidades do candidato com os requisitos da vaga
// e retorna o percentual de compatibilidade (RF03). Ela também pode imprimir
// informações detalhadas quando `exibirLogs` está true.
function avaliarCandidato(candidatoObjeto, vagaObjeto, exibirLogs = true) {
  // Encontra quais requisitos o candidato TEM (Atendidos) usando `filter` (RF08).
  const habilidadesCorrespondentes = vagaObjeto.requisitos.filter((requisito) =>
    candidatoObjeto.habilidades.includes(requisito),
  );

  // Encontra quais requisitos o candidato NÃO TEM (Não encontrados).
  const habilidadesFaltantes = vagaObjeto.requisitos.filter(
    (requisito) => !candidatoObjeto.habilidades.includes(requisito),
  );

  // Cálculos matemáticos usando o .length das listas acima
  const requisitosAtendidos = habilidadesCorrespondentes.length;
  const totalRequisitos = vagaObjeto.requisitos.length;
  const percentualAtendimento = (requisitosAtendidos / totalRequisitos) * 100;

// Classificação textual (RF04) — converte o percentual em um rótulo legível.
  let classificacao = "";
  if (percentualAtendimento >= 80) classificacao = "Alta compatibilidade";
  else if (percentualAtendimento >= 50) classificacao = "Média compatibilidade";
  else classificacao = "Baixa compatibilidade";

  // EXIBE OS LOGS DETALHADOS (apenas se exibirLogs=true)
  if (exibirLogs) {
    console.log("---------------------------------------");
    console.log(
      `Habilidades correspondentes: ${habilidadesCorrespondentes.join(", ")}`,
    );

    // Mostra quais requisitos foram atendidos e quantos são.
    console.log(
      `Requisitos atendidos: ${habilidadesCorrespondentes.join(", ")} que corresponde ao total de ${requisitosAtendidos} requisitos atendidos.`,
    );
    console.log(
      `Total de requisitos da vaga: ${vagaObjeto.requisitos.join(", ")} (${totalRequisitos} requisitos no total).`,
    );
    console.log(
      `Habilidades atendidas: ${habilidadesCorrespondentes.join(", ")} (${requisitosAtendidos} requisitos atendidos).`,
    );
    // Mostra o que falta para o candidato atingir a vaga (RF05).
    console.log(
      `Habilidades não encontradas: ${habilidadesFaltantes.join(", ") || "Nenhuma!"}`,
    );
    console.log(`Classificação: ${classificacao}`);
    console.log("---------------------------------------");
    console.log(
      `Recomendações de estudo: priorize estudar ${habilidadesFaltantes.join(", ") || "Nenhuma!"}, pois esta(s) é(são) a(s) habilidade(s) que você ainda não possui e que é(são) requisitada(s) para a vaga. Focar nela(s) pode aumentar suas chances de conseguir a vaga!`,
    );
    console.log("---------------------------------------");
  }

  // Retorna apenas o percentual (valor numérico) para uso em comparações.
  return percentualAtendimento;
}


// 4. Criação do objeto (instância do candidato) — exemplo preenchido (RF01).
const novoCandidato = new Candidato(
  "Carlos Pereira",
  36,
  "Desenvolvimento Front-End",
  ["HTML", "CSS", "JavaScript"],
  24,
);

console.log(
  `Candidato: ${novoCandidato.nome}, ${novoCandidato.idade} anos, área: ${novoCandidato.area}, habilidades: ${novoCandidato.habilidades.join(", ")}, experiência: ${novoCandidato.experienciaMeses} meses.`,
);

// Função utilitária para aguardar um tempo (retorna Promise) — usada para simular latência.
function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simula o carregamento das vagas (RF14). Isso demonstra Promise + setTimeout.
function buscarVagasSimuladas() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(listaVagas), 2000);
  });
}
// Função assíncrona que executa a análise das vagas para um candidato.
// Usa `await` para esperar o carregamento simulado das vagas e demonstra o fluxo
// de processamento principal (RF14). Também usa o closure `contarAnalise()` para
// numerar as análises realizadas (RF13).
async function executarAnalise(candidato) {
  // Carrega as vagas (simulação de requisição)
  const vagasCarregadas = await buscarVagasSimuladas();

  const numeroAnalise = contarAnalise();
  console.log(`Análise nº ${numeroAnalise} para ${candidato.nome} foi executada!`);

  const _originalConsoleLog = console.log;
  if (SILENT) console.log = function () {};

  if (PRINT_PER_VAGA) console.log("Comparando o candidato com todas as vagas disponíveis:");

  const resultadosVagas = vagasCarregadas.map((vaga, index) => {
    if (PRINT_PER_VAGA) {
      console.log("=======================================");
      console.log(`Vaga ${index + 1} de ${vagasCarregadas.length}`);
      console.log(`Empresa: ${vaga.empresa}`);
      console.log(`Cargo: ${vaga.cargo}`);
    }

    const resultadoVaga = avaliarCandidato(candidato, vaga, false);
    return { vaga, resultadoVaga };
  });

  if (SILENT) console.log = _originalConsoleLog;

  const melhorVaga = resultadosVagas.reduce((melhor, atual) => {
    return atual.resultadoVaga > melhor.resultadoVaga ? atual : melhor;
  }, resultadosVagas[0]);

  console.log("=======================================");
  return melhorVaga;
}

// Closure que mantém um contador privado de quantas análises foram executadas (RF13).
function criarContadorDeAnalises() {
  let total = 0; // variável privada ao closure
  return function () {
    total += 1; // incrementa a cada chamada
    return total; // retorna o total atual
  };
}

const contarAnalise = criarContadorDeAnalises();


// IIFE (immediately-invoked function expression) assíncrona para iniciar o fluxo
// principal do script: inicia a análise do candidato usando as funções implementadas.
(async () => {
  console.log(`Iniciando análise de ${novoCandidato.nome} para as vagas disponíveis...`);
  const melhorVaga = await executarAnalise(novoCandidato);

  finalizarAnalise(novoCandidato.nome, (nome) => {
    console.log(
      `Notificação: análise de ${nome} concluída. Melhor vaga: ${melhorVaga.vaga.cargo} na empresa ${melhorVaga.vaga.empresa}, com ${melhorVaga.resultadoVaga.toFixed(2)}% dos requisitos atendidos.`,
    );
    // opcional: mostrar logs detalhados da melhor vaga
    avaliarCandidato(novoCandidato, melhorVaga.vaga, true);
    recomendacaoVaga(melhorVaga.vaga, melhorVaga.resultadoVaga);
  });
})();
function recomendacaoVaga(vaga, resultadoVaga) {
  if (resultadoVaga >= 80) {
    console.log("Recomendação: O candidato é altamente recomendado para esta vaga.");
  } else if (resultadoVaga >= 50) {
    console.log("Recomendação: O candidato é recomendado para esta vaga, mas pode precisar de desenvolvimento em algumas áreas.");
  } else {
    console.log("Recomendação: O candidato não atende a maioria dos requisitos para esta vaga.");
  }
}


// / Função que demonstra o uso de callback (RF12).
function finalizarAnalise(nomeCandidato, callback) {
  console.log("Análise finalizada.");
  callback(nomeCandidato);
}