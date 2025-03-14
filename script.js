const canvas = document.getElementById("Jogo Canvas")
const ctx = canvas.getContext("2d")

const personagem = {
    x:100,
    y:350,
    largura:50,
    altura:50
}

function desenharPersonagem () {
    ctx.fillStyle = 'black'
    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura)
}

function atualizarPersonagem(){
    personagem.y -= 1
}

function loop () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenharPersonagem()
    atualizarPersonagem()
    requestAnimationFrame(loop)
}

loop()