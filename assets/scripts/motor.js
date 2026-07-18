// 1. Classes de Dominio Exportadas

export class Vagas {
    constructor(cargo, salario, requisitos, modalidade, id = null) {
        this.id = id;
        this.cargo = cargo;
        this.salario = salario;
        this.requisitos = requisitos;
        this.modalidade = modalidade;
    }
}

export class Candidato {
    constructor(nome, idade, area, habilidades, experienciaMeses, pretensaoSalarial = 0, modalidadePreferencia = "") {
        this.nome = nome;
        this.idade = idade;
        this.area = area;
        this.habilidades = habilidades;
        this.experienciaMeses = experienciaMeses;
        this.pretensaoSalarial = pretensaoSalarial;
        this.modalidadePreferencia = modalidadePreferencia;
    }
}

export class VagaFrontEnd extends Vagas {
    constructor(cargo, empresa, requisitos, salario, modalidade, nivel) {
        super(cargo, salario, requisitos, modalidade);
        this.empresa = empresa;
        this.nivel = nivel;
    }
    exibirNivel() {
        return `Nivel da vaga: ${this.nivel}`;
    }
}

// 2. Logica de Compatibilidade Exportada

export function avaliarCandidato(candidatoObjeto, vagaObjeto, exibirLogs = true) {

    let requisitosVaga = vagaObjeto.requisitos || [];

const habilidadesCandidato =
    (candidatoObjeto.habilidades || [])
        .map(habilidade => habilidade.toLowerCase());

if (typeof requisitosVaga === "string") {
    requisitosVaga = [requisitosVaga];
}

requisitosVaga =
    requisitosVaga.map(requisito => requisito.toLowerCase());
    if (exibirLogs) {
        console.log("Requisitos da vaga:", requisitosVaga);
        console.log("Habilidades do candidato:", habilidadesCandidato);
    }

    const habilidadesCorrespondentes = requisitosVaga.filter((requisito) =>
        habilidadesCandidato.includes(requisito)
    );

    const habilidadesFaltantes = requisitosVaga.filter((requisito) =>
        !habilidadesCandidato.includes(requisito)
    );
    const requisitosAtendidos = habilidadesCorrespondentes.length;
    const totalRequisitos = requisitosVaga.length;
    const percentualAtendimento = (requisitosAtendidos / totalRequisitos) * 100;

    let classificacao = "";
    if (percentualAtendimento >= 80) classificacao = "Alta compatibilidade";
    else if (percentualAtendimento >= 50) classificacao = "Média compatibilidade";
    else classificacao = "Baixa compatibilidade";

    return {

        vagaCargo: vagaObjeto.cargo,

        empresa: vagaObjeto.empresa,

        salarioVaga: vagaObjeto.salario,

        modalidadeVaga: vagaObjeto.modalidade,

        compatibilidade: Math.round(percentualAtendimento),

        classificacao,

        faltantes: habilidadesFaltantes,

        encontradas: habilidadesCorrespondentes

    };
}

/*
    Obrigado por visitar nosso código.

    Se chegou até aqui,
    significa que a curiosidade venceu.

    Continue programando.

    :)
*/