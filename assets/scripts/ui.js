// Recebe o Relatorio processado pelo motor e exibe na tela

export function exibirResultadosInterface(relatorio, dadosCandidato) {
    const container = document.getElementById("container-cards");
    const statusSistema = document.getElementById("status-sistema");

    container.innerHTML = "";

    statusSistema.textContent =
        `${relatorio.length} vaga(s) encontrada(s) para ${dadosCandidato.nome}.`;

    const fragmento = document.createDocumentFragment();

    relatorio.forEach(resultado => {
        fragmento.appendChild(
            criarCard(resultado, dadosCandidato)
        );
    });

    container.appendChild(fragmento);

    console.log("Exibindo resultado na interface");
    console.table(relatorio);
}

function criarCard(resultado, candidato) {

    const card = document.createElement("div");

    card.classList.add("card");

    if (resultado.isMelhorVaga) {
        card.classList.add("destaque-recomendado");
    }

    card.dataset.modalidade =
        (resultado.modalidadeVaga || "indefinido").toLowerCase();

    const salarioCompativel =
        resultado.salarioVaga >= candidato.pretensaoSalarial;

    const modalidadeCompativel =
        resultado.modalidadeVaga.toLowerCase() === candidato.modalidadePreferencia.toLowerCase();

    card.innerHTML = `
        <div class="card-header">

            <h3>${resultado.vagaCargo}</h3>

            <span class="match-badge">
                ${resultado.compatibilidade}% Match
            </span>

        </div>

        <p class="empresa-nome">
            🏢 ${resultado.empresa}
        </p>

        <p>
            <strong>Classificação:</strong>
            ${resultado.classificacao}
        </p>

        <div class="badges-meta">

            <span class="badge ${salarioCompativel ? "badge-success" : "badge-warning"}">
                ${salarioCompativel ? "💰 Salário Compatível" : "⚠️ Pretensão acima"}
            </span>

            <span class="badge ${modalidadeCompativel ? "badge-success" : "badge-neutral"}">
                📍 ${resultado.modalidadeVaga}
            </span>

        </div>

        <div class="habilidades-box">

            <p>
                ✅ <strong>Encontradas:</strong><br>
                ${resultado.encontradas.length ? resultado.encontradas.join(", ") : "Nenhuma"}
            </p>

            <p>
                ❌ <strong>Faltantes:</strong><br>
                ${resultado.faltantes.length ? resultado.faltantes.join(", ") : "Nenhuma"}
            </p>

        </div>

        <div class="card-footer">
            <span class="link-detalhes">
                Ver detalhes →
            </span>
        </div>
    `;

    card.addEventListener("click", () => {
        abrirModalDetalhes(resultado, candidato);
    });

    return card;
}

function abrirModalDetalhes(resultado, candidato) {

    const modal = document.getElementById("modal-detalhe-vaga");
    const modalBody = document.getElementById("modal-body-vaga");

    const salarioCompativel =
        resultado.salarioVaga >= candidato.pretensaoSalarial;

    const modalidadeCompativel =
        resultado.modalidadeVaga.toLowerCase() ===
        candidato.modalidadePreferencia.toLowerCase();

    const recomendacoes =
        resultado.faltantes.length
            ? `Considere estudar <strong>${resultado.faltantes.join(", ")}</strong>.`
            : "Parabéns! Você atende todos os requisitos desta vaga.";

    modalBody.innerHTML = `
        <div class="modal-header-info">
            <h2>${resultado.vagaCargo}</h2>
            <p>Empresa: <strong>${resultado.empresa}</strong></p>
        </div>

        <hr>

        <h3>Compatibilidade</h3>
        <p><strong>${resultado.compatibilidade}%</strong></p>
        <p>Classificação: ${resultado.classificacao}</p>

        <hr>

        <h3>Habilidades Encontradas</h3>
        <p>${resultado.encontradas.length ? resultado.encontradas.join(", ") : "Nenhuma"}</p>

        <h3>Habilidades Faltantes</h3>
        <p>${resultado.faltantes.length ? resultado.faltantes.join(", ") : "Nenhuma"}</p>

        <hr>

        <h3>Salário</h3>

        <p>Vaga: R$ ${resultado.salarioVaga.toLocaleString("pt-BR")}</p>

        <p>Pretensão: R$ ${candidato.pretensaoSalarial.toLocaleString("pt-BR")}</p>

        <p>${salarioCompativel ? "✅ Compatível" : "⚠️ Abaixo da pretensão"}</p>

        <hr>

        <h3>Modalidade</h3>

        <p>Vaga: ${resultado.modalidadeVaga}</p>

        <p>Preferência: ${candidato.modalidadePreferencia}</p>

        <p>${modalidadeCompativel ? "✅ Compatível" : "⚠️ Diferente da preferência"}</p>

        <hr>

        <h3>Plano de Estudos</h3>

        <p>${recomendacoes}</p>

        <div class="modal-actions">
            <button id="btn-candidatar" class="btn-primary">
                Simular candidatura
            </button>
        </div>
    `;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.getElementById("btn-candidatar")
        .addEventListener("click", () => {

            alert(`Simulação realizada com sucesso!\n\nPerfil: ${candidato.nome}\nVaga: ${resultado.vagaCargo}`);

            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        });
}

// Configura a escuta de eventos do formulario de Perfil

export function configurarFormulario(aoEnviarFormulario) {
    const formulario = document.getElementById("form-perfil");
    const statusSistema = document.getElementById("status-sistema");

    if (!formulario) return;

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const nome = document.getElementById("input-nome").value.trim();
        const area = document.getElementById("select-area").value.trim();
        const habilidadesTexto = document.getElementById("input-habilidades").value.trim();
        const experiencia = document.getElementById("input-experiencia").value.trim();
        const pretensaoSalarial = document.getElementById("input-pretensao").value.trim();
        const modalidadePreferencia = document.getElementById("select-modalidade-pref").value.trim();

        if ( !nome || !area || !habilidadesTexto || !experiencia || !pretensaoSalarial || !modalidadePreferencia) {
            document.getElementById("erro-nome").textContent = !nome ? "Por favor, preencha o campo de nome completo." : "";
            document.getElementById("erro-area").textContent = !area ? "Por favor, selecione uma área de atuação." : "";
            document.getElementById("erro-habilidades").textContent = !habilidadesTexto ? "Por favor, preencha o campo de habilidades." : "";
            document.getElementById("erro-experiencia").textContent = !experiencia ? "Por favor, preencha o campo de experiência." : "";
            document.getElementById("erro-pretensao").textContent = !pretensaoSalarial ? "Informe sua pretensão salarial." : "";
            document.getElementById("erro-modalidade").textContent = !modalidadePreferencia ? "Selecione sua modalidade preferida." : "";
            statusSistema.textContent = "Por favor, preencha todos os campos do formulário.";
            return;
        }

        const habilidadesArray = habilidadesTexto.split(",").map(habilidade => habilidade.trim()).filter(habilidade => habilidade.length > 0);

        const dadosCapturados = {
            nome: nome,
            area: area,
            habilidades: habilidadesArray,
            experiencia: parseInt(experiencia, 10),
            pretensaoSalarial: parseInt(pretensaoSalarial, 10),
            modalidadePreferencia: modalidadePreferencia
        };

        document.querySelectorAll(".erro-mensagem").forEach(erro => erro.textContent = "");

        aoEnviarFormulario(dadosCapturados);
        statusSistema.textContent = "Análise concluída com sucesso!";
    });
}

// Filtra as vagas por cargo

export function filtrarVagasPorCargo(termo) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cargo = card.querySelector('h3').textContent.toLowerCase();
        if (!cargo.includes(termo.toLowerCase())) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

// Logica de Modalidade

export function aplicarFiltros() {
    const termo = document.getElementById("input-busca").value.toLowerCase().trim();
    const modalidade = document.getElementById('filtro-modalidade').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    const container = document.getElementById('container-cards');

    let encontrouVagas = false;

    cards.forEach(card => {
        const titulo = card.querySelector('h3').textContent.toLowerCase();
        const cardModalidade = card.dataset.modalidade.toLowerCase();
        const condicaoBusca = titulo.includes(termo);
        const condicaoModalidade = (modalidade === "todos" || cardModalidade === modalidade);
        if (condicaoBusca && condicaoModalidade) {
            card.style.display = 'block';
            encontrouVagas = true;
        } else {
            card.style.display = 'none';
        }
    });
    let mensagemZero = document.getElementById('mensagem-zero');
    if (!mensagemZero) {
        mensagemZero = document.createElement("p");
        mensagemZero.id = "mensagem-zero";
        container.appendChild(mensagemZero);
    }

    mensagemZero.textContent = encontrouVagas ? "" : "Nenhuma vaga encontrada com estes filtros.";
}

// Função responsável unicamente por pegar dados existentes e colocar dentro dos inputs
export function preencherFormulario(perfil) {
    if (!perfil) return;

    const inputNome = document.querySelector("#input-nome");
    const inputArea = document.querySelector("#select-area");
    const inputHabilidades = document.querySelector("#input-habilidades");
    const inputExperiencia = document.querySelector("#input-experiencia");
    const inputPretensao = document.querySelector("#input-pretensao");
    const inputModalidade = document.querySelector("#select-modalidade-pref");

    if (inputNome) inputNome.value = perfil.nome || "";
    if (inputArea) inputArea.value = perfil.area || "";
    if (inputHabilidades) {
        // Se as habilidades forem um array, junta com vírgula para exibir no input de texto
        inputHabilidades.value = Array.isArray(perfil.habilidades)
            ? perfil.habilidades.join(", ")
            : perfil.habilidades || "";
    }
    if (inputExperiencia) inputExperiencia.value = perfil.experienciaMeses ?? perfil.experiencia ?? "";

if (inputPretensao) inputPretensao.value = perfil.pretensaoSalarial || "";

if (inputModalidade) inputModalidade.value = perfil.modalidadePreferencia || "";
}

export function destacarMelhorVaga(id) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.id === id) {
            card.classList.add('destaque');
        } else {
            card.classList.remove('destaque');
        }
    });
}

document
    .querySelector(".close-modal")
    ?.addEventListener("click", () => {

        const modal =
            document.getElementById("modal-detalhe-vaga");

        modal.classList.remove("active");

        modal.setAttribute("aria-hidden", "true");
    });