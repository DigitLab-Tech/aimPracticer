class Game {
  constructor(board) {
    this.board = board;
    this.totalTarget = 0;
    this.spawnInterval = setInterval(() => {
      if (this.totalTarget >= 10) {
        clearInterval(this.spawnInterval);
      } else {
        this.addTarget();
      }
    }, 2000);
  }

  start() {}

  getRandomPosition() {
    return Math.round(Math.random() * 10000) / 100;
  }

  getRandomSize() {
    return Math.floor(Math.random() * 40.99) + 20;
  }

  addTarget() {
    const target = new Target(
      this.getRandomPosition(),
      this.getRandomPosition(),
      this.getRandomSize()
    ).toHtml();

    target.addEventListener("click", () => {
      target.remove();
      this.totalTarget--;
    });

    this.board.appendChild(target);
    this.totalTarget++;
  }
}

class Target {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  toHtml() {
    const div = document.createElement("div");
    div.className = "target";
    div.style.top = `max(0px, calc(${this.y}% - ${this.size}px))`;
    div.style.left = `max(0px, calc(${this.x}% - ${this.size}px))`;
    div.style.height = this.size + "px";
    div.style.width = this.size + "px";

    return div;
  }
}

const game = new Game(document.querySelector(".game"));

game.start();
