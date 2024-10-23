import Game from './Game.js';

class Timer {
  #isRunning = false;
  
  constructor(container) {
    this.container = container;
  }

  start() {
    this.#isRunning = true;

    this.startTime = Date.now();

    this.interval = setInterval(() => {
      this.#render(this.#getTime());
    }, 10)

  }

  stop() {
    clearInterval(this.interval);
    const finalTime = this.#getTime();

    this.#render(finalTime);

    return finalTime;
  }

  isRunning() {
    return this.#isRunning;
  }

  #getTime() {
    return Date.now() - this.startTime;
  }

  #formatTime(int) {
    const seconds = Math.floor(int / 1000)
    const milliseconds = (int % 1000).toString().padStart(3, '0');
    
    return `${seconds}:${milliseconds}`;
  }
  
  #render(finalTime) {
    this.container.innerText = this.#formatTime(finalTime);
  }


}

export default Timer;