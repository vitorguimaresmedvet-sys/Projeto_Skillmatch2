import { buscarVagas, obterPerfilLocalStorage, salvarPerfilLocalStorage, carregarPerfilLocalStorage } from './dados.js';
import { avaliarCandidato, Candidato } from './motor.js';
import { exibirResultadosInterface, configurarFormulario, filtrarVagasPorCargo, aplicarFiltros } from './ui.js';
import { buscarVagas, obterPerfilLocalStorage, salvarPerfilLocalStorage } from './dados.js';
import { avaliarCandidato, Candidato, VagaFrontEnd } from './motor.js';
import { exibirResultadosInterface, configurarFormulario, preencherFormulario } from './ui.js';

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
    
    const statusSistema = document.getElementById("status-sistema");
    
    // 1. Estado: Carregando
    statusSistema.textContent = "Carregando banco de dados de vagas...";

    try {
        listaVagasGlobal = await buscarVagas();

        // 2. Estado: Vazio
        if (listaVagasGlobal.length === 0) {
            statusSistema.textContent = "Nenhuma vaga encontrada, tente novamente mais tarde.";
            return; 
        }

        // 3. Estado: Sucesso
        statusSistema.textContent = "Vagas carregadas com sucesso!";
        console.log(`📋 Banco de dados de vagas carregado com sucesso (${listaVagasGlobal.length} vagas encontradas).`);

        // Configura o evento de clique/envio do formulário passando a função de callback
        configurarFormulario((dadosCandidato) => {
            console.log(`📥 Dados recebidos do formulário! Nome: ${dadosCandidato.nome}`);

            const perfilCandidato = new Candidato(
                dadosCandidato.nome, 
                null, 
                dadosCandidato.area, 
                dadosCandidato.habilidades, 
                dadosCandidato.experiencia
            );

            salvarPerfilLocalStorage(perfilCandidato);
            console.log("💾 Perfil salvo no LocalStorage!");

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

            exibirResultadosInterface(relatorioResultados);
        });


        const perfilSalvo = obterPerfilLocalStorage();
        if (perfilSalvo) {
            console.log("💾 Perfil carregado do LocalStorage!");
            preencherFormulario(perfilSalvo); // Usando a função de preencher!
        }
        
    } catch (erro) {
        // 4. Estado: Erro
        statusSistema.textContent = "Ops! Ocorreu um erro ao buscar as vagas. Tente novamente mais tarde.";
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
