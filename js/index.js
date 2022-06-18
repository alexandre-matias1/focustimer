import Controls from "./controls.js"
import Timer from "./timer.js"
import Sound from "./sounds.js"
import {
  buttonPlay,
  buttonPause,
  buttonSet,
  buttonStop,
  buttonSoundOn,
  buttonSoundOff,
  minutesDisplay,
  secondsDisplay
 } from "./elements.js"
// Duas formas de importar os elementos ↓ / ↑
/*
const {
  buttonPlay,
  buttonPause,
  buttonSet,
  buttonStop,
  buttonSoundOn,
  buttonSoundOff,
  minutesDisplay,
  secondsDisplay
} = elements
*/


const controls = Controls({
  buttonPause,
  buttonPlay,
  buttonSet,
  buttonStop
})

// timer recebe um objeto de Timer ()
const timer = Timer({
  minutesDisplay,
  secondsDisplay,
  // A função de exportar estava em outra factory assim não sendo possivel o shorthand prop
  resetControls: controls.reset
})

const sound = Sound()

buttonPlay.addEventListener('click',function(){
  controls.play()
  timer.countdown()
  sound.pressButton()
})


buttonPause.addEventListener('click',function(){
  controls.pause()
  timer.hold()
  sound.pressButton()
})

buttonStop.addEventListener('click', function(){
  controls.reset()
  timer.reset()
  sound.pressButton()
})

// Botão de mutar o timer
buttonSoundOff.addEventListener('click', function(){
  buttonSoundOn.classList.remove('hide')
  buttonSoundOff.classList.add('hide')
  sound.bgAudio.pause()
})

// Botão de desmutar o timer
buttonSoundOn.addEventListener('click', function(){
  buttonSoundOn.classList.add('hide')
  buttonSoundOff.classList.remove('hide')
  sound.bgAudio.play()
})

buttonSet.addEventListener('click', function(){
  // para extrair valor do timer
  let newMinutes = controls.getMinutes()

  if (!newMinutes){
    timer.reset()
    return
  }

  timer.updateDisplay(newMinutes, 0)
  timer.updateMinutes(newMinutes)

})


 