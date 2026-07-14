// Recebe o Relatorio processado pelo motor e exibe na tela

export function exibirResultadosInterface(relatorio) {
    const container = document.getElementById("container-cards");
    const statusSistema = document.getElementById("status-sistema");

    container.innerHTML = "";
    statusSistema.textContent = "Resultados encontrados:";

    relatorio.forEach(resultado => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h3>${resultado.vagaCargo}</h3>
            <p><strong>Empresa:</strong> ${resultado.empresa}</p>
            <p><strong>Compatibilidade:</strong> ${resultado.compatibilidade}%</p>
            <p><strong>Classificação:</strong> ${resultado.classificacao}</p>
            <div class="habilidades-box">
                <p>✅ Encontradas: ${resultado.encontradas.join(', ')}</p>
                <p>❌ Faltantes: ${resultado.faltantes.join(', ')}</p>
            </div>`;

        container.appendChild(card);
    });

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