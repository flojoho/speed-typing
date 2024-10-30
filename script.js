import Game from './Game.js';
import words from './words.js';
import './Modal.js';

const gamesArea = document.getElementById('gamesArea');

const newGame = () => {

  const text = randomWords();

  game = new Game(text, newGame);

  const gameDivs = gamesArea.children;

  gameDivs[gameDivs.length - 1].style.top = '40vh';
  gameDivs[gameDivs.length - 1].style.opacity = '0';
  gameDivs[gameDivs.length - 1].style.filter = `blur(${30}px)`;

  setTimeout(() => {
    for(let i = 0; i < gameDivs.length; i++) {
      const fromBottom = gameDivs.length - 1 - i
      gameDivs[i].style.top = -fromBottom * 70;
      gameDivs[i].style.opacity = 1 - fromBottom * 0.18;
      gameDivs[i].style.filter = `blur(${fromBottom * 0.5}px)`;
    }
  }, 0)

}

const randomWords = () => {
  return Array.from({length: 10}, (_, i) => {
    const index = Math.floor(Math.random() * words.length)
    return words[index];
  }).join(' ');
}

let game = new Game(randomWords(), newGame);