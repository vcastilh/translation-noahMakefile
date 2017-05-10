/* global Reveal */

Reveal.initialize({
  history: true
})

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

window.fetch('./8char-words.txt').then(r => r.text()).then(res => {
  const words = res.split('\n')
  const specialChars = ['.', '-', '_', '!', '@', '#', '$', '%']

  window.setInterval(function () {
    const randomWord = words[getRandomInt(0, words.length - 1)]
    const randomSpecialChar = specialChars[getRandomInt(0, specialChars.length - 1)]
    const randomNumber = getRandomInt(1, 9)
    const randomPassword = randomWord + randomSpecialChar + randomNumber
    document.querySelector('#changing-passwd').textContent = randomPassword
  }, 500)
})
