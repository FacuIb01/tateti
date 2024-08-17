
const tablero = document.getElementById("tateti");

let turnos = 0

let gano = false;

let arrayCuadrados = [[
    undefined,
    undefined,
    undefined
],[
    undefined,
    undefined,
    undefined
],[
    undefined,
    undefined,
    undefined
]]

for(let i = 0, index = 0, prop = 0; i <9; i++){
    if(i < 3){
        tablero.innerHTML += `<div class="cuadro" id="${i}" onClick="jugador(0,${prop},${i})"></div>`;
    }else if(i < 6){
        tablero.innerHTML += `<div class="cuadro" id="${i}" onClick="jugador(1,${prop},${i})"></div>`;
    }else{
        tablero.innerHTML += `<div class="cuadro" id="${i}" onClick="jugador(2,${prop},${i})"></div>`;
    }
    index++;
    prop++;
    if(index == 3){
        index = 0;
    }
    if(prop == 3){
        prop = 0;
    }
}

function numeroRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    }

const turnoPc = () =>{
    if(gano){
        return;
    }
    const fila = numeroRandom(0,3)
    const cuadradito = numeroRandom(0,3)
    console.log(fila, cuadradito)
    const ubicacion = arrayCuadrados[fila][cuadradito]
    if(ubicacion === undefined){
        const texto = document.createElement("p");
        texto.classList = "turnoPc"
        texto.textContent = "O";
        document.getElementById(`${fila * 3 + cuadradito}`).appendChild(texto);
        arrayCuadrados[fila][cuadradito] = "O";
        turnos++
    }else{
        turnoPc();
    }
    if(turnos >= 3){
        verificador(arrayCuadrados)
    }
    
}

const jugador = (linea,valor,id)=>{
    const texto = document.createElement("p");
    let cuadro = document.getElementById(`${id}`);
    texto.classList = "turnoJugador"
    cuadro.appendChild(texto);
    if(arrayCuadrados[linea][valor] === undefined){
        linea[valor] = "X";
        texto.textContent = "X";
        arrayCuadrados[linea][valor] =  "X";
    }else{
        return console.log("Este cuadro ya está ocupado");
    }
    turnos++;
    
    if(turnos >= 3){
        verificador(arrayCuadrados);
    }
    setTimeout(turnoPc,1000);
    
}

const verificador = (array) => {
    let fila1 = Object.values(array[0]);
    let fila2 = Object.values(array[1]);
    let fila3 = Object.values(array[2]);

    /*Verificador por columna*/
    for(let i = 0; i < 3; i++){
        if(fila1[i] !== undefined &&fila1[i] === fila2[i] && fila1[i] === fila3[i] ){
            gano = true;
            return console.log(`Ganó ${fila1[i]}`),setTimeout(reiniciar,1000);
        }else{
            continue;
        }
    }

        /*Verificador por linea*/
    for(let i = 0; i < 3; i++){
        if(Object.values(array[i]).every(e => e === "X")){
            gano = true;
            return console.log("Ganó X"),setTimeout(reiniciar,1000);
        }else if(Object.values(array[i]).every(e => e === "O")){
            gano = true;
            return console.log("Ganó O"), setTimeout(reiniciar,1000);
        }else{
            continue;
        }
    }

        /*Verificador diagonal*/
        if(fila1[0] !== undefined && fila1[0] === fila2[1] && fila1[0] === fila3[2]){
            gano = true;
            return console.log(`Ganó ${fila1[0]}`), setTimeout(reiniciar,1000);
        }else if(fila1[2] !== undefined &&fila1[2] === fila2[1] && fila1[2] === fila3[0]){
            gano = true;
            return console.log(`Ganó ${fila1[2]}`),setTimeout(reiniciar,1000);
        }

        if(turnos === 9){
            return console.log("Empate"), setTimeout(reiniciar,1000);
        }
}
function reiniciar(){
    location.reload();
}