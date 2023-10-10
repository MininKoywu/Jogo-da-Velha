let jogadorAtual = "O";
let jogador1Simbolo = "";
let jogador2Simbolo = "";
let movimentosX = [];
let movimentosO = [];
let jogoIniciado = false;
let jogador1Nome = "";
let jogador2Nome = "";
let nivel = 1;

function selecionarSimbolo(simbolo) {
    if (jogoIniciado) return;

    jogador1Simbolo = simbolo;
    jogador2Simbolo = simbolo === "X" ? "O" : "X";

    document.getElementById("botaoX").classList.remove("selecionado");
    document.getElementById("botaoO").classList.remove("selecionado");
    document.getElementById(`botao${simbolo}`).classList.add("selecionado");
}

function iniciarJogo() {
    jogador1Nome = document.getElementById("jogador1Input").value;
    jogador2Nome = document.getElementById("jogador2Input").value;

    if (!jogador1Nome || !jogador2Nome || (!jogador1Simbolo && !jogador2Simbolo)) {
        alert("Por favor, preencha os nomes de ambos os jogadores e selecione um símbolo para o Jogador 1.");
        return;
    }

    jogoIniciado = true;
    const tabuleiro = document.getElementById('tabuleiro');
    const conteiner = document.getElementById('conteiner-principal');
    conteiner.style.display = 'none';
    tabuleiro.style.display = 'block';

    if (jogador1Simbolo === "X") jogadorAtual = "X";

    document.getElementById("nomeJogadorAtual").textContent = `Vez de: ${jogadorAtual === jogador1Simbolo ? jogador1Nome : jogador2Nome} (${jogadorAtual})`;
    embaralharImagens();
}

const imagensNivel1 = [
    "imagens/Brasil.jpg",
    "imagens/Itália.jpg",
    "imagens/França.jpg",
    "imagens/Inglaterra.jpg",
    "imagens/Argentina.jpg",
    "imagens/Espanha.jpg",
    "imagens/Rússia.jpg",
    "imagens/Japão.jpg",
    "imagens/EstadosUnidos.jpg"
];

const imagensNivel2 = [
    "imagens/bandeiraBrasil.jpg",
    "imagens/bandeiraÁfrica.jpg",
    "imagens/bandeiraFrança.jpg",
    "imagens/bandeiraInglaterra.jpg",
    "imagens/bandeiraPortugal.jpg",
    "imagens/bandeiraEspanha.jpg",
    "imagens/bandeiraRússia.jpg",
    "imagens/bandeiraJapao.jpg",
    "imagens/bandeiraEstadosUnidos.jpg"
];

const imagensNivel3 = [
    "imagens/comidaBrasil.jpg",
    "imagens/pinturaÁfrica.jpg",
    "imagens/comidaFrança.jpg",
    "imagens/rainhaInglaterra.jpg",
    "imagens/barcoPortugal.jpg",
    "imagens/dançaEspanha.jpg",
    "imagens/dançaRússia.jpg",
    "imagens/roupaJapao.jpg",
    "imagens/comidaEstadosUnidos.jpg"
];

function nivel2() {
    nivel = 2;
    embaralharImagens();
}

function nivel3() {
    nivel = 3;
    embaralharImagens();
}

function embaralharImagens() {
    let imagensSelecionadas;

    if (nivel === 2) {
        imagensSelecionadas = imagensNivel2;
    } else if (nivel === 3) {
        imagensSelecionadas = imagensNivel3;
    } else {
        imagensSelecionadas = imagensNivel1;
    }

    imagensSelecionadas.sort(() => Math.random() - 0.5);

    for (let i = 1; i <= 9; i++) {
        const quadrado = document.getElementById(`quadrado${i}`);
        const img = quadrado.querySelector("img");
        img.src = imagensSelecionadas[i - 1];
    }
}


function realizarJogada(celulaSelecionada) {
    const celula = document.getElementById(`quadrado${celulaSelecionada}`);
    if (jogoIniciado && celula.textContent === "") {
        celula.innerHTML = `<span class="simbolo-style">${jogadorAtual}</span>`;
        celula.disabled = true;

        if (jogadorAtual === jogador1Simbolo) {
            movimentosX.push(celulaSelecionada);
            jogadorAtual = jogador2Simbolo;
        } else {
            movimentosO.push(celulaSelecionada);
            jogadorAtual = jogador1Simbolo;
        }

        document.getElementById("nomeJogadorAtual").textContent = `Vez de: ${jogadorAtual === jogador1Simbolo ? jogador1Nome : jogador2Nome} (${jogadorAtual})`;
        verificarResultado();
    }
}

function verificarResultado() {
    const vitoriaX = verificaVitoriaParaSimbolo(jogador1Simbolo);
    const vitoriaO = verificaVitoriaParaSimbolo(jogador2Simbolo);

    if (vitoriaX || vitoriaO || (movimentosX.length + movimentosO.length === 9)) {
        jogoIniciado = false;
        setTimeout(function() {
            if (vitoriaX) {
                document.querySelector(".textoResultado").textContent = `${jogador1Nome} venceu! Parabéns!!`;
            } else if (vitoriaO) {
                document.querySelector(".textoResultado").textContent = `${jogador2Nome} venceu! Parabéns!!`;
            } else {
                document.querySelector(".textoResultado").textContent = `${jogador1Nome} e ${jogador2Nome} empataram!`;
            }
            document.getElementById("jogoResultado").style.display = 'block';
            document.getElementById("tabuleiro").style.display = 'none';
        }, 2000);
    }
}

function verificaVitoriaParaSimbolo(simbolo) {
    const combinacoesVitoria = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const combinacao of combinacoesVitoria) {
        if (combinacao.every(celula => (simbolo === jogador1Simbolo ? movimentosX : movimentosO).includes(celula))) {
            return true;
        }
    }

    return false;
}

function reiniciarJogo() {
    movimentosX = [];
    movimentosO = [];

    for (let i = 1; i <= 9; i++) {
        const celula = document.getElementById(`quadrado${i}`);
        celula.innerHTML = "";

        const img = document.createElement("img");
        img.setAttribute("src", "");
        celula.appendChild(img);
        celula.disabled = false;
    }

    document.getElementById("jogoResultado").style.display = 'none';
    document.getElementById("tabuleiro").style.display = 'block';

    if (jogador1Simbolo === jogadorAtual) {
        jogadorAtual = jogador1Simbolo;
    } else {
        jogadorAtual = jogador2Simbolo;
    }

    document.getElementById("nomeJogadorAtual").textContent = `Vez de: ${jogadorAtual === jogador1Simbolo ? jogador1Nome : jogador2Nome} (${jogadorAtual})`;

    embaralharImagens();

    jogoIniciado = true;
}
