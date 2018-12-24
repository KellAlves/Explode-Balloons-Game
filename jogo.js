var timerId = null; //variável que armazena a função timeOut

function iniciajogo() {
    var url = window.location.search;

    var niveljogo = url.replace("?", "")

    var tempo_segundos = 0;

    if (niveljogo == 1) { //nivel 1 - fácil > 120seg
        tempo_segundos = 120;
    }

    if (niveljogo == 2) { //nivel 2 - médio > 60seg
        tempo_segundos = 60;
    }

    if (niveljogo == 3) { //nivel 3 - difícil > 30seg
        tempo_segundos = 30;
    }


    //inserir segundos no span do cronometro
    document.getElementById('cronometro').innerHTML = tempo_segundos;


    //quantidade de balões
    var qtde_baloes = 20;

    cria_baloes(qtde_baloes);

    //imprimir quantidade de baloes inteiros e estourados
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1)

}

function cria_baloes(qtde_baloes) {

    for (var i = 1; i <= qtde_baloes; i++) {

        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '12px';
        balao.id = 'b' + i;
        balao.onclick = function () { estourar(this); };

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e) {

    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

function pontuacao(acao) {

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        alert('Parabéns, você é fodão demais!')
        parar_jogo();
    }
}

function parar_jogo() {
    clearTimeout(timerId);
}

function contagem_tempo(segundos) {

    segundos = segundos - 1;
    if (segundos == -1) {
        clearTimeout(timerId); //Para a Execução do setTimeOut
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo(" + segundos + ")", 1000);

}

function game_over() {
    alert('GAME OVER! Você se fodeu!');
}