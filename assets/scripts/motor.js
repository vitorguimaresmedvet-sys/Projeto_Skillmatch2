// 1. Classes de Dominio Exportadas

export class Vagas{
    constructor(cargo, salario, requisitos, modalidade, id = null){
        this.id = id;
        this.cargo = cargo;
        this.salario = salario;
        this.requisitos = requisitos;
        this.modalidade = modalidade;
    }
}

export class Candidato{
    constructor(nome, idade, area, habilidades, experienciaMeses){
        this.nome = nome;
        this.idade = idade;
        this.area = area;
        this.habilidades = habilidades;
        this.experienciaMeses = experienciaMeses;
    }
}

export class VagaFrontEnd extends Vagas{
    constructor(cargo, empresa, requisitos, salario, modalidade, nivel){
        super(cargo, salario, requisitos, modalidade);
        this.empresa = empresa;
        this.nivel = nivel;
    }
    exibirNivel(){
        return `Nivel da vaga: ${this.nivel}`;
    }
}

// 2. Logica de Compatibilidade Exportada

export function avaliarCandidato(candidatoObjeto, vagaObjeto, exibirLogs = true){
    // Encontra quais requisitos o candidato TEM (Atendidos) usando `filter` (RF08).
    const habilidadesCorrespondentes = vagaObjeto.requisitos.filter((requisito) => candidatoObjeto.habilidades.includes(requisito));

    const habilidadesFaltantes = vagaObjeto.requisitos.filter((requisito) => !candidatoObjeto.habilidades.includes(requisito));

    const requisitosAtendidos = habilidadesCorrespondentes.length;
    const totalRequisitos = vagaObjeto.requisitos.length;
    const percentualAtendimento = (requisitosAtendidos / totalRequisitos) * 100;

    let classificacao = "";
    if (percentualAtendimento >= 80) classificacao = "Alta compatibilidade";
    else if (percentualAtendimento >= 50) classificacao = "Média compatibilidade";
    else classificacao = "Baixa compatibilidade";

    return {
        percentual: percentualAtendimento,
        classificacao: classificacao,
        faltantes: habilidadesFaltantes,
        encontrados: habilidadesCorrespondentes
    };
}