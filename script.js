const dino = document.querySelector(".dino"); //Selecionando a classe dino e armazenando em uma constante.
const background = document.querySelector(".background"); //Selecionando a classe background
let isJumping = false;
let position = 0; //Inicializa a posicao do dino

function handleKeyUp(event){
  if(event.keyCode === 32){ //keyCode Codigo da tecla, 32 = tecla espaco
    console.log("Pressionou o espaco");
    if(!isJumping){
      jump();
    }
  }
  console.log(event.keyCode); //Imprime no console o codigo da tecla
}

//funcao pulo
function jump(){
  let isJumping = true;

  let upInterval = setInterval(() => { //Intervalo de Subida
    if(position >= 150){ //Verifica se a posicao é maior ou igual a 150
      clearInterval(upInterval); //Se sim limpa o intervalo de Subida
      //Descendo  
      let downInterval = setInterval(() => { //Inicializa o Intervalo de descida
        if(position<= 0){ //Verifica se a posicao é menor ou igual a zero
          clearInterval(downInterval); //Se sim, limpa o intervalo de descida
          isJumping = false;
        }else{ //Se nao
          position -= 20; //A cada Intervalo diminui vinte da variavel position
          dino.style.bottom  =  position + 'px'; //Muda a posicao do dino, desce ela
        }
      }, 20); //20 = 20 milisegundo
    }else{
    //Subindo
    position += 20; //A cada intervalo adiciona 20 na posicao
    dino.style.bottom = position + 'px'; // Muda a posicao do dino de acordo com a var position
    }
  }, 20); //20 = 20 milisegundo
}
function createCactus(){
  const cactus = document.createElement('div'); //Criando um novo elemento no HTMl
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus'); //Adicionando uma classe na div cactus 
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus); //Adicionando o cactus como filho da div background

  let leftInterval = setInterval(() => { //Criando o intervalo a esquerda para o cactus 
    if(cactusPosition < -60){ //Checando a posicao do cactus se ela em -60
      clearInterval(leftInterval); //Se sim, limpa o intervalo
      background.removeChild(cactus); //E remoce o filho de background que no caso seria a div cactus
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo </h1>'
    }else {
      cactusPosition -= 10; //Posicicao do cactus 
      cactus.style.left = cactusPosition + "px"; //Adicionando a posicao do cactus a esquerda de acordo com a var cactusPosition
    }
  }, 20) //20 é o tempo de intervalo que vai executar essa funcao

  setTimeout(createCactus, randomTime); //Recursividade, efeito espelho
}

createCactus();
document.addEventListener('keyup', handleKeyUp); //Captura o evento keyup e chama a funcao handleKeyUp
console.log(dino); //Imprime no console o trecho da classe dino