// Recebe o Relatorio processado pelo motor e exibe na tela

export function exibirResultadoInterface(relatorio) {
    console.log("Exibindo resultado na interface");

    console.table(relatorio);
}
