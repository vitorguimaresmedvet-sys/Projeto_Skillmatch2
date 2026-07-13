import { executarAnalise, avaliarCandidato, Candidato } from "./motor.js";
import { buscarVagas, obterPerfilLocalStorage, salvarPerfilLocalStorage } from "./dados.js";
import { exibirRelatorioInterface } from "./ui.js";

// Função Closure real para contagem de análises realizadas

function criarContadorDeAnalises() {
    let contagem = 0;
    return function () {
        contagem += 1;
        return contagem;
    };
}

const incrementarContagem = criarContadorDeAnalises();

async function iniciarAplicacao() {

    console.log("⚙️ SkillMatch 2.0: Inicializando sistemas modulares...");
    
    try {
        // 1. Tenta carregar os dados brutos de vagas do arquivo JSON externo
        const listaVagas = await buscarVagas();
        console.log(`📋 Banco de dados de vagas carregado com sucesso (${listaVagas.length} vagas encontradas).`);
        
        // 2. Tenta recuperar perfil salvo ou simula um perfil temporário para testes na S1
        let perfilCandidato = obterPerfilLocalStorage();
        
        if (!perfilCandidato) {
            console.log("👋 Primeira visita detectada ou perfil limpo. Criando perfil de teste padrão...");
            perfilCandidato = new Candidato("Vitor Desenvolvedor", 25, "Front-End", ["JavaScript", "HTML", "CSS"], 6);
            salvarPerfilLocalStorage(perfilCandidato);
        } else {
            console.log(`👤 Perfil carregado do LocalStorage: ${perfilCandidato.nome}`);
        }

        // 3. Executa a lógica de compatibilidade percorrendo o array de vagas com MAP (Requisito de Arrays)
        console.log("\n--- ⚡ EXECUTANDO MOTOR DE COMPATIBILIDADE (TESTE S1) ---");
        
        const relatorioResultados = listaVagas.map(vaga => {
            const numeroAnalise = incrementarAnalises();
            const resultadoMecanismo = avaliarCandidato(perfilCandidato, vaga);
            
            return {
                analiseID: numeroAnalise,
                vagaCargo: vaga.cargo,
                empresa: vaga.empresa || "Tech Corp",
                compatibilidade: `${resultadoMecanismo.percentual.toFixed(0)}%`,
                classificacao: resultadoMecanismo.classificacao,
                faltantes: resultadoMecanismo.faltantes
            };
        });

        exibirRelatorioInterface (relatorioResultados);
        console.log("-------------------------------------------------------");

    } catch (erro) {
        console.error("🚨 Falha crítica ao inicializar aplicação modular:", erro);
    }
}

// Inicializa a aplicação quando o DOM estiver completamente pronto
document.addEventListener("DOMContentLoaded", iniciarAplicacao);

iniciarAplicacao();