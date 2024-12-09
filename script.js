const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');
canvas.width = 480;
canvas.height = 320;

let raqueteAltura = 10;
let raqueteLargura= 75;
let raquete = (canvas.width - raqueteLargura) / 2;

let bola = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const linha = 3;
const coluna = 5;
const largura = 75;
const altura = 20;
const padding = 10;
const blocotop = 30;
const esquerda = 30;

const blocos = [];
for (let c=0; c < coluna; c++){
    blocos[c] = [];
    for (let r=0; r < linha; r++){
        blocos[c][r] = {x:0, y:0, status: 1};
    }

}

function desenhoBola() {
    ctx.beginPath();    
    ctx.arc(x, y, bola, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
}


function desenhoRaquete(){
    ctx.beginPath();
    ctx.rect(raquete, canvas.height - raqueteAltura, raqueteLargura, raqueteAltura);
    ctx.fillStyle = "#0095DD"
    ctx.fill();
    ctx.closePath();
}

function desenhoBlocos(){
    for (let c=0; c < coluna; c++){
        for (let r=0; r < linha; r++){
            if(blocos[c][r].status == 1){
                const blocoX = c * (largura + padding) + esquerda;
                const blocoY = r * (altura + padding) + blocotop;
                blocos [c][r].x = blocoX;
                blocos [c][r].y = blocoY;
                ctx.beginPath()
                ctx.rect(blocoX, blocoY, largura, altura);
                ctx.fillStyle = "0095DD"
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function colisao(){ 
for (let c=0; c < coluna; c++){
    for (let r=0; r < linha; r++){
        const b = blocos[c][r];
        if(b.status == 1){
            if( x > b.x && x < b.x + largura &&
                y > b.y && y < b.y + altura ){
                    dy = -dy;
                    b.status = 0.;
                }
            
        }
    }

}
}

function posicaoBola(){
    if(x + dx > canvas.width - bola || x + dx < bola){
        dx = -dx;
    } if ( y + dy < bola){
        dy = -dy;
    } if ( y + dy > canvas.height - raqueteAltura){
        if (x > raquete && x < raquete + raqueteLargura) {
            dy= -dy;
        } else {
            document.location.reload()
        }
        
    }

    x += dx;
    y += dy;
}

document.addEventListener('mousemove', mouseMecher);

function mouseMecher(e){
    const relativo = e.clientX - canvas.offsetLeft;
    if(relativo > 0 && relativo < canvas.width){
        raquete = relativo - raqueteLargura / 2;
    }
}

function desenho(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    desenhoBola();
    desenhoBlocos();
    desenhoRaquete();
    colisao();
    posicaoBola();

}

setInterval(desenho, 10);