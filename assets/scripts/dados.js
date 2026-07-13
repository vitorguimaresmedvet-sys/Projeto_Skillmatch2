const CAMINHO_VAGAS = "./assets/dados/vagas.json";
const CHAVE_PERFIL = "skillmatch_perfil";

// Busca as vagas no arquivo JSON

export async function buscarVagas() {
    try { 
        const resposta = await fetch(CAMINHO_VAGAS);
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar banco de dados de vagas: ${resposta.status}`);
        }
        const vagas = await resposta.json();
        return vagas;
    } catch (erro) {
        console.error("Falha na requisição das vagas:", erro);
        throw erro;
        
    }
}

// Salva o perfil no localStorage

export function salvarPerfilLocalStorage(candidato) {
    try {
        const candidatoJSON = JSON.stringify(candidato);
        localStorage.setItem(CHAVE_PERFIL, candidatoJSON);
    } catch (erro) {
        console.error("Erro ao salvar perfil no localStorage:", erro); 
    }
    
}

// Recupera o perfil do localStorage

export function obterPerfilLocalStorage() {
    try {
        const dadosLocais = localStorage.getItem(CHAVE_PERFIL);
        if (!dadosLocais) return null;
        
        return JSON.parse(dadosLocais);
    } catch (erro) {
        console.error("Erro ao ler do LocalStorage:", erro);
        return null;
    }
}