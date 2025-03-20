const canvas = document.getElementById("Jogo Canvas")
const ctx = canvas.getContext("2d")
let gravidade = 0.5
let velocidade_x = 5
let pontuacao = 0
let pontuacaoMaxima = localStorage.getItem("Pontuação Max") || 0
let gameOver = false

document.addEventListener('keypress', (evento) => {
    if (evento.code === 'Space') {
        if (gameOver) {
            velocidade_x = 5;
            pontuacao = 0;
            obstaculo.x = 750;
            gameOver = false;
        } else if (personagem.pulando === false) {
            personagem.velocidade_y = 15;
            personagem.pulando = true;
        }
    }
});


const personagem = {  
    x: 100,
    y: canvas.height - 50,
    largura: 50,
    altura: 50,
    velocidade_y: 0,
    pulando: false
};

const obstaculo = {
    x: 750,
    y: canvas.height - 100,
    largura: 50,
    altura: 100
};

function desenharObstaculo() {
    ctx.fillStyle = 'white'
    ctx.fillRect(
        obstaculo.x,
        obstaculo.y,
        obstaculo.largura,
        obstaculo.altura
    );
}

function desenharPersonagem() {
    ctx.fillStyle = 'black'
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );
}

function atualizarObstaculo() {
    obstaculo.x -= velocidade_x
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width
        velocidade_x += 1
        pontuacao += 10

        let alturaMin = 90
        let alturaMax = 120
        obstaculo.altura = Math.floor(Math.random() * (alturaMax - alturaMin + 1)) + alturaMin
        
        if (pontuacao > pontuacaoMaxima) {
            pontuacaoMaxima = pontuacao;
            localStorage.setItem("Pontuação Max", pontuacaoMaxima)
        }
    }
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.y -= personagem.velocidade_y
        personagem.velocidade_y -= gravidade
    }
    if (personagem.y >= canvas.height - 50) {
        personagem.velocidade_y = 0
        personagem.y = canvas.height - 50
        personagem.pulando = false
    }
}

function verificarColisao() {
    if (
        obstaculo.x < personagem.x + personagem.largura &&
        obstaculo.x + obstaculo.largura > personagem.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        velocidade_x = 0
        personagem.velocidade_y = 0
        ctx.fillStyle = 'white'
        ctx.font = '50px Arial'
        ctx.fillText('Game Over', 50, 100)
        gameOver = true
    }
}

function desenharPontuacao() {
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`Pontuação: ${pontuacao}`, 20, 30)
    ctx.fillText(`Pontuação Máxima: ${pontuacaoMaxima}`, 20, 60)
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        desenharPersonagem()
        desenharObstaculo()
        atualizarPersonagem()
        atualizarObstaculo()
        verificarColisao()
        desenharPontuacao()
    }

    requestAnimationFrame(loop)
}

loop()