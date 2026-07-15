import { buscarVagas, obterPerfilLocalStorage, salvarPerfilLocalStorage, carregarPerfilLocalStorage } from './dados.js';
import { avaliarCandidato, Candidato } from './motor.js';
import { exibirResultadosInterface, configurarFormulario, filtrarVagasPorCargo, aplicarFiltros } from './ui.js';

// Função Closure real para contagem de análises realizadas

function criarContadorDeAnalises() {
    let contagem = 0;
    return function () {
        contagem += 1;
        return contagem;
    };
}

const incrementarAnalises = criarContadorDeAnalises();

let listaVagasGlobal = [];

async function iniciarAplicacao() {

    console.log("⚙️ SkillMatch 2.0: Inicializando sistemas modulares...");
    
    try {
        listaVagasGlobal = await buscarVagas();
        console.log(`📋 Banco de dados de vagas carregado com sucesso (${listaVagasGlobal.length} vagas encontradas).`);
            configurarFormulario((dadosCandidato) => {
            console.log(`📥 Dados recebidos do formulário! Nome: ${dadosCandidato.nome}`);

            // 1. Instanciamos a classe com os dados reais digitados na tela
            const perfilCandidato = new Candidato(
                dadosCandidato.nome, 
                null, 
                dadosCandidato.area, 
                dadosCandidato.habilidades, 
                dadosCandidato.experiencia // O nome que veio do seu ui.js
            );

            salvarPerfilLocalStorage(perfilCandidato);
            console.log("💾 Perfil salvo no LocalStorage!");

            // 2. Roda a análise percorrendo as vagas globais
            const relatorioResultados = listaVagasGlobal.map(vaga => {
                const numeroAnalise = incrementarAnalises();
                const resultadoMecanismo = avaliarCandidato(perfilCandidato, vaga);
                
                return {
                    analiseID: numeroAnalise,
                    vagaCargo: vaga.cargo,
                    empresa: vaga.empresa || "Tech Corp",
                    compatibilidade: resultadoMecanismo.percentual,
                    classificacao: resultadoMecanismo.classificacao,
                    encontradas: resultadoMecanismo.encontradas,
                    faltantes: resultadoMecanismo.faltantes
                };
            });

            // 3. Manda para a interface (cuidado com a letra 's' que corrigimos!)
            exibirResultadosInterface(relatorioResultados);
        });
        
    } catch (erro) {
        console.error("🚨 Falha crítica ao inicializar aplicação modular:", erro);
    }
}

// Inicializa a aplicação quando o DOM estiver completamente pronto
document.addEventListener("DOMContentLoaded", iniciarAplicacao);

// Filtro de vagas por cargo
const inputBusca = document.getElementById("input-busca");
const selectModalidade = document.getElementById("filtro-modalidade");

if (inputBusca && selectModalidade) {
    inputBusca.addEventListener("input", aplicarFiltros);
    selectModalidade.addEventListener("change", aplicarFiltros);
}