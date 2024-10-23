
import Timer from './Timer.js';

const gamesArea = document.getElementById('gamesArea');

class Game {
  #text;
  
  constructor(text, callback) {

    this.#text = text;

    const gameDiv = document.createElement('div');

    const timerSpan = document.createElement('span');
    const typingSpan = document.createElement('span');

    timerSpan.textContent = '0:000';

    timerSpan.classList.add('timerSpan');
    typingSpan.classList.add('typingSpan');
    gameDiv.classList.add('gameDiv');

    gameDiv.appendChild(timerSpan);
    gameDiv.appendChild(typingSpan);
    gamesArea.appendChild(gameDiv);

    text.split('').forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      typingSpan.appendChild(span);
    })

    const typedLetters = [];

    const timer = new Timer(timerSpan);

    const keyDownEvent = e => {

      if(!timer.isRunning()) {
        timer.start();
      }
      
      const key = e.key.toLowerCase();
    
      const index = typedLetters.length;
    
      if(key === 'backspace') {
        if(index > 0) {
          typedLetters.pop();
    
          typingSpan.children[index - 1].classList.remove('red');
          typingSpan.children[index - 1].classList.remove('green');
        }
        return;
      }
    
      const letterOrNull = this.#keyToLetter(key);
    
      if(typedLetters.length < text.length) {
        typedLetters.push(letterOrNull);
    
        if(this.#correctLetters(typedLetters) === typedLetters.length) {
          typingSpan.children[index].classList.remove('red');
          typingSpan.children[index].classList.add('green');
        } else {
          typingSpan.children[index].classList.remove('green');
          typingSpan.children[index].classList.add('red');
        }
      }
    
      if(this.#correctLetters(typedLetters) === typedLetters.length && typedLetters.length === text.length) {
        
        const time = timer.stop();

        document.removeEventListener('keydown', keyDownEvent);
    
        callback();
      }
    }

    document.addEventListener('keydown', keyDownEvent);
    
  }
  
  #correctLetters(array) {
    let count = 0;

    for(let i = 0; i < this.#text.length; i++) {
      if(array[i] !== this.#text[i]) break;
      count++;
    }

    return count;
  }

  #keyToLetter (keyString) {
    const regex = /^[a-z ]$/g;
    if(regex.test(keyString)) return keyString;
    return null;
  }
}

export default Game;