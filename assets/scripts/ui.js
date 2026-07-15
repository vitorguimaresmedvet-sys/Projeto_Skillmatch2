// Recebe o Relatorio processado pelo motor e exibe na tela

export function exibirResultadosInterface(relatorio) {
    const container = document.getElementById("container-cards");
    const statusSistema = document.getElementById("status-sistema");

    container.innerHTML = "";
    statusSistema.textContent = "Resultados encontrados:";
    const fragmento = document.createDocumentFragment();

    relatorio.forEach(resultado => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.modalidade = resultado.vaga.modalidade.toLowerCase();
        card.innerHTML = `<h3>${resultado.vagaCargo}</h3>
            <p><strong>Empresa:</strong> ${resultado.empresa}</p>
            <p><strong>Compatibilidade:</strong> ${resultado.compatibilidade}%</p>
            <p><strong>Classificação:</strong> ${resultado.classificacao}</p>
            <div class="habilidades-box">
                <p>✅ Encontradas: ${resultado.encontradas.join(', ')}</p>
                <p>❌ Faltantes: ${resultado.faltantes.join(', ')}</p>
            </div>`;

        fragmento.appendChild(card);
    });

    container.appendChild(card);

    console.log("Exibindo resultado na interface");

    console.table(relatorio);
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

        if (!nome || !area || !habilidadesTexto || !experiencia) {
            document.getElementById("erro-nome").textContent = !nome ? "Por favor, preencha o campo de nome completo." : "";
            document.getElementById("erro-area").textContent = !area ? "Por favor, selecione uma área de atuação." : "";
            document.getElementById("erro-habilidades").textContent = !habilidadesTexto ? "Por favor, preencha o campo de habilidades." : "";
            document.getElementById("erro-experiencia").textContent = !experiencia ? "Por favor, preencha o campo de experiência." : "";
            statusSistema.textContent = "Por favor, preencha todos os campos do formulário.";
            return;
        }

        const habilidadesArray = habilidadesTexto.split(",").map(habilidade => habilidade.trim()).filter(habilidade => habilidade.length > 0);

        const dadosCapturados = {
            nome: nome,
            area: area,
            habilidades: habilidadesArray,
            experiencia: parseInt(experiencia, 10)
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
    const termo = document.getElementById('input-modalidade').value.toLowerCase().trim();
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

    mensagemZero.textContent = encontrouAlgum ? "" : "Nenhuma vaga encontrada com estes filtros.";
}

