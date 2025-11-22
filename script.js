const cardsContainer = document.querySelector(".card-container");
const inputBusca = document.getElementById("input-busca-principal");
const modal = document.getElementById("modal-entrada");
const inputDesafio = document.getElementById("input-desafio");
const botaoDesafio = document.getElementById("botao-desafio");
const conteudoPagina = document.querySelectorAll(".conteudo-oculto");
const erroDesafio = document.getElementById("erro-desafio");

let dados = [];
let dadosCarregados = false;
let carregando = false;

const RESPOSTA_CORRETA = "corinthians";

function limparErroDesafio() {
    if (erroDesafio) erroDesafio.textContent = "";
}

async function carregarDados() {
    if (dadosCarregados || carregando) return dados;

    carregando = true;
    mostrarMensagemInicial("Carregando dados...");

    try {
        const resposta = await fetch("data.json", { cache: "no-cache" });
        if (!resposta.ok) throw new Error("Falha ao carregar dados.");
        dados = await resposta.json();
        dadosCarregados = true;
        exibirMensagemInicial();
        return dados;
    } catch (error) {
        console.error(error);
        mostrarMensagemInicial("Não foi possível carregar os dados. Verifique sua conexão e tente novamente.");
        throw error;
    } finally {
        carregando = false;
    }
}

function mostrarMensagemInicial(textoPersonalizado) {
    const textoPadrao = "A busca está pronta. Digite o ano de um título ou o nome de uma competição na barra acima (ex.: \"2012\", \"Libertadores\", \"Paulista\").";
    const texto = textoPersonalizado || textoPadrao;
    cardsContainer.innerHTML = `
        <div class="mensagem-inicial">
            <h2>Bem-vindo, Fiel!</h2>
            <p>${texto}</p>
            <p>Sugestões rápidas: 2024 (Feminino), 2012, 1990.</p>
        </div>
    `;
}

function renderizarCards(cardsParaRenderizar) {
    cardsContainer.innerHTML = "";

    if (!cardsParaRenderizar.length) {
        cardsContainer.innerHTML = `
            <div class="mensagem-inicial" style="color: var(--primary-color);">
                <p>Nenhum time encontrado para a busca. Experimente \"2012\", \"Libertadores\" ou \"Paulista\".</p>
            </div>
        `;
        return;
    }

    for (const card of cardsParaRenderizar) {
        const article = document.createElement("article");

        const titulo = document.createElement("h2");
        titulo.textContent = `Time de ${card.ano}`;
        article.appendChild(titulo);

        const titulos = document.createElement("p");
        const titulosLabel = document.createElement("strong");
        titulosLabel.textContent = "Títulos:";
        titulos.append(titulosLabel, " ", card.titulos);
        article.appendChild(titulos);

        const escalacao = document.createElement("p");
        const escalacaoLabel = document.createElement("strong");
        escalacaoLabel.textContent = "Escalação base:";
        escalacao.append(escalacaoLabel, " ", card.escalacao);
        article.appendChild(escalacao);

        const link = document.createElement("a");
        link.href = card.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Saiba mais";
        article.appendChild(link);

        cardsContainer.appendChild(article);
    }
}

async function realizarBusca() {
    const termoBusca = inputBusca.value.trim().toLowerCase();

    if (termoBusca === "") {
        exibirMensagemInicial();
        return;
    }

    try {
        if (!dadosCarregados) {
            await carregarDados();
        }
    } catch (erro) {
        return;
    }

    const dadosFiltrados = dados.filter(card => {
        return card.ano.toLowerCase().includes(termoBusca) || card.titulos.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function exibirMensagemInicial() {
    mostrarMensagemInicial();
}

function desbloquearConteudo() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);

    conteudoPagina.forEach(el => {
        el.style.display = "";
        if (el.tagName === "HEADER" || el.tagName === "FOOTER") el.style.display = "flex";
        if (el.tagName === "MAIN") el.style.display = "block";
    });
}

function verificarResposta() {
    const resposta = inputDesafio.value.trim().toLowerCase();
    if (resposta === RESPOSTA_CORRETA) {
        limparErroDesafio();
        desbloquearConteudo();
        carregarDados().catch(() => {});
    } else {
        erroDesafio.textContent = "Resposta incorreta. Dica extra: comece com C e termina com S.";
        inputDesafio.focus();
        inputDesafio.select();
    }
}

botaoDesafio.addEventListener("click", verificarResposta);
inputDesafio.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        verificarResposta();
    }
});
inputDesafio.addEventListener("input", limparErroDesafio);

const botaoBusca = document.getElementById("botao-busca");
botaoBusca.addEventListener("click", () => {
    realizarBusca();
});

inputBusca.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        realizarBusca();
    }
});

setTimeout(() => {
    inputDesafio.focus();
}, 300);
