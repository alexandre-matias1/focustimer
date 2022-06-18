 //named export 
 // Injeção de independencias 
 import Sounds from "./sounds.js"
 export default function Timer({
   // Destructuring, desestruturando o objeto direto nos parametros da função
   minutesDisplay,
   secondsDisplay,
   resetControls
 }){
  
  let timerTimeOut
  //colocando em variavel os dados recebidos do html
  let minutes = Number(minutesDisplay.textContent)


  // atualiza o os min e os sec
  function updateDisplay(newMinutes, seconds){
    /*
      falsy -- pesquisar sobre
      truthy -- pesquisar sobre
    */
    // Logica para se não houver newMinutes, passar os minutes = Number(minutesDisplay.textContent)
    // TERNARIO -- Se newMinutes (igual) undefined (? = Se sim) coloque minutes : se não newMinutes
    // ? tem peso de if
    newMinutes = newMinutes === undefined ? minutes : newMinutes
    seconds = seconds === undefined ? 0 : seconds
    // retorna o conteudo textual do html p o js
    minutesDisplay.textContent = String(newMinutes).padStart(2, "0")
    secondsDisplay.textContent = String(seconds).padStart(2, "0")
  }

  function reset(){
    updateDisplay(minutes, 0)
    clearTimeout(timerTimeOut)
  }


  function countdown(){
    // setTimeout é uma função do js que executa uma ação em intervalos programáveis.
    timerTimeOut = setTimeout(function(){
      // Transformando a string extraida do HTML p number para utilizar no contador.
      let seconds = Number(secondsDisplay.textContent)
      // Pegando o valor digitado pelo usuário e declarando ele dentro da função do timer
      let minutes = Number(minutesDisplay.textContent)
  
      let isFinished = minutes <= 0 && seconds <= 0

      updateDisplay(minutes, 0)

      // Logica para encerrar o cronometro, o [return] encerra a função
      if (isFinished){
        resetControls()
        updateDisplay()
        Sounds().timeEnd()
        return
      }
      // Logica para quando os segundos zerarem, voltar p/ 59 assim como um relogio.
      if( seconds <= 0 ){
        seconds = 60
        --minutes
      }

      // Duvida, nesse caso o secondsDisplay deixa de ser number e volta p html como elemento????
      // Comando para decrementar o contador
      // String(seconds - 1). padStart(2 , 0) forma de acrescentar o 2 caracteres quando o contador estiver de 00 a 09. Transformar em string pois é uma propriedade desse tipo de texto
      //secondsDisplay.textContent = String(seconds - 1).padStart(2 , "0")
      
      updateDisplay(minutes, String(seconds - 1))

    
      // Recursão é o ato de uma função chamar ela mesma.
      countdown()

      // O valor 1000ms é equivalente a 1 segundo
    }, 1000)
  }

  function updateMinutes(newMinutes){
    minutes = newMinutes 
  }

  function hold (){
     // O metodo cleartimeout() cancela o timeout previamente estabelecido pela função setTimeout
    clearTimeout(timerTimeOut)
  }
 // Shorthand propriety = atalho. 
  return{
    countdown,
    reset,
    updateDisplay,
    updateMinutes,
    hold
  }

}





