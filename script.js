const principal = document.querySelector("#principal")
const info = document.querySelector('p#info')
let turn = 0;
const time = (turn)=>{
    if(turn > 8 ){
        info.innerText = 'Deu velha'
    }else if(turn %2 === 0 ){
        info.innerText = "Agora é a vez de: O"
    }else{
        info.innerText = "Agora é a vez de: X"
    }
}
const createGame = (arr)=>{
const line1 = document.querySelector("#line-1")
const line2 = document.querySelector("#line-2")
const line3 = document.querySelector("#line-3")
const clearLine = (line)=>{
    line.innerHTML =``
}
clearLine(line1)
clearLine(line2)
clearLine(line3)
const addLine = (line)=>{
    line.innerHTML +=`<span class="field"></span>`
}
for(index = 0; index<3; index++){
    addLine(line1)
    addLine(line2)
    addLine(line3)
}
if(arr){
    const fieldClasses = document.querySelectorAll('.field')
    let aux = 0;
    console.log(arr);
    for (let i = 0; i < 3; i++) {
        for(let a = 0; a<3; a++){
           console.log(arr[i][a]);
           if(arr[i][a]){
           fieldClasses[aux].innerText=arr[i][a]}
           aux++;
        }
    }
}

}

const playable = (isPlaying)=>{
if(isPlaying === false) return
const fieldClasses = document.querySelectorAll('.field')
const mat = [[],[],[]]
let quadradoAtual = 0;
for (let i = 0; i < 3; i++) {
    for(let a = 0; a<3; a++){
        mat[i].push(fieldClasses[quadradoAtual]);
        //acho que deu certo, uma breve explicação é que, o primeiro for acessa cada linha da matriz e o segundo for acessa cada elemento do array tablesquare
        quadradoAtual++;
    }
}
mat.forEach((lines) => { 
    lines.forEach((field)=>{
    field.addEventListener('click', (element)=>{
        const lineVet = mat.indexOf(lines);
        const fieldLineVet = lines.indexOf(field);
        if(turn %2 === 0){
            //info.innerText = "Agora é a vez de: O"
            const target =  element.target
            if(target.innerText === ''){
                const shape = 'O'
                target.innerText = shape
                turn +=1
                time(turn)//chama a mudança depois
                verifyGame(lineVet, fieldLineVet, shape)
            }
        }else {
            //info.innerText = "Agora é a vez de: O"
            const target =  element.target
            if(target.innerText === ''){
                const shape = 'X'
                target.innerText = shape
                turn +=1
                time(turn)//chama a mudança depois
                verifyGame(lineVet, fieldLineVet, shape)           
            }
        }
    }
)})
})
}

const currentGame = [[],[],[]]
function verifyGame(vet, field, shape){
    /*console.log('Vetor na posição ' + vet + " na Matriz")
    console.log('Field na posição ' + field + " no vetor de posição " + vet);
    console.log('A forma jogada é: ' + shape);*/
    currentGame[vet][field]= shape;
    if(currentGame[0][0] && currentGame[0][0] === currentGame[0][1] && currentGame[0][0] === currentGame[0][2])endGame(currentGame[0][0]);
    if(currentGame[1][0] && currentGame[1][0] === currentGame[1][1] && currentGame[1][0] === currentGame[1][2])endGame(currentGame[1][0]);
    if(currentGame[2][0] && currentGame[2][0] === currentGame[2][1] && currentGame[2][0] === currentGame[2][2])endGame(currentGame[2][0]);
    if(currentGame[0][0] && currentGame[0][0] === currentGame[1][1] && currentGame[2][2] === currentGame[0][0])endGame(currentGame[0][0]);
    if(currentGame[0][2] && currentGame[0][2] === currentGame[1][1] && currentGame[2][0] === currentGame[0][2])endGame(currentGame[0][2]);
    if(currentGame[0][0] && currentGame[0][0] === currentGame[1][0] && currentGame[0][0] === currentGame[2][0])endGame(currentGame[0][0]);
    if(currentGame[0][1] && currentGame[0][1] === currentGame[1][1] && currentGame[0][1] === currentGame[2][1])endGame(currentGame[0][1]);
    if(currentGame[0][2] && currentGame[0][2] === currentGame[1][2] && currentGame[0][2] === currentGame[2][2])endGame(currentGame[0][2]);
}

const endGame = (shape)=>{
    createGame(currentGame)
    playable(false)
    time(-1)
    info.innerText = 'Fim de jogo. O vencedor foi: ' + shape;
}
createGame()
playable(true)
