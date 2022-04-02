const CARROT_SIZE = 70;
const GAME_TIME = 60;

export default class Game {
  constructor(carrot, bug) {
    this.field = document.querySelector(".game__field");
    this.round = document.querySelector(".game__round");
    this.timer = document.querySelector(".timer");
    this.life = document.querySelector(".game__life");
    this.retryBtn = document.querySelector(".retry__Btn");
    this.retryBtn.addEventListener("click", (e) => this.retry(e));
    this.timeInterval;
    this.currentLife = 3;
    this.currentRound = 0;
    this.currentCarrot = carrot;
    this.currentBug = bug;
    this.field.addEventListener("click", (e) => this.clickItem(e));
    this.changeMessage;
    this.carrotSound = new Audio("assets/sound/carrot_pull.mp3");
    this.bugSound = new Audio("assets/sound/bug_pull.mp3");
    this.bgSound = new Audio("assets/sound/bg.mp3");
    this.winSound = new Audio("assets/sound/game_win.mp3");
    this.failed = false;
  }
  start(defaultCount = 5) {
    if (!this.failed) {
      this.nextRound();
    } else if (this.failed) {
      this.fail(defaultCount);
    }
    this.bgSound.play();
    this.initGame(defaultCount);
    this.startCountDown();
  }
  clickItem(e) {
    if (e.target.dataset.item === "carrot") {
      const status = this.removeCarrot();
      e.target.remove();
      if (status > 0) {
        return;
      } else {
        this.changeStage("Next Level");
      }
    } else if (e.target.dataset.item === "bug") {
      const status = this.removeLife();
      this.life.firstChild.remove();
      if (status > 0) {
        return;
      } else {
        this.failed = true;
        this.bgSound.pause();
        this.changeStage("Game Over");
      }
    }
  }
  getRandomNumber(maxX, maxY, count, i) {
    const base = maxX / count;
    const coordintes = {};
    const randomX = Math.random() * (base * (i + 1) - base * i) + base * i;
    const randomY = Math.random() * maxY;
    coordintes.x = randomX;
    coordintes.y = randomY;
    return coordintes;
  }
  initGame(count) {
    this.reset();
    this.round.textContent = "Round " + this.currentRound;
    this.currentCarrot = count;
    this.drawItem("carrot", "./assets/img/carrot.png", this.currentCarrot);
    this.drawItem("bug", "./assets/img/bug.png", this.currentBug);
    this.setLife();
  }
  drawItem(name, src, count) {
    const maxY = this.field.getBoundingClientRect().height - CARROT_SIZE;
    const maxX = this.field.getBoundingClientRect().width - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const { x, y } = this.getRandomNumber(maxX, maxY, count, i);
      let item = document.createElement("img");
      item.src = src;
      item.setAttribute("class", name + "__img");
      item.setAttribute("data-item", name);
      item.style.transform = `translate(${x}px,${y}px)`;
      this.field.append(item);
    }
  }
  setLife() {
    this.currentLife = 3;
    for (let i = 0; i < this.currentLife; i++) {
      let img = document.createElement("img");
      img.src = "./assets/img/shovel.png";
      img.setAttribute("class", "sholve__img");
      this.life.append(img);
    }
  }
  reset() {
    this.field.innerHTML = "";
    this.life.innerHTML = "";
  }
  removeLife() {
    this.bugSound.play();
    return --this.currentLife;
  }
  removeCarrot() {
    this.carrotSound.play();
    return --this.currentCarrot;
  }
  changeStage(value) {
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.changeMessage && this.changeMessage(value);
  }
  nextRound() {
    this.winSound.play();
    this.currentRound++;
    this.currentBug++;
  }
  fail(count) {
    this.currentBug = count;
    this.currentCarrot = count;
    this.currentRound = 1;
  }
  startCountDown() {
    let startTime = GAME_TIME;
    this.timer.textContent = "10:00";
    this.timeInterval = setInterval(() => {
      startTime--;
      let min = Math.floor(startTime / 60);
      let seconds = startTime % 60;
      this.timer.textContent = `${min} : ${
        String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
      }`;
      if (startTime == 0) {
        clearInterval(this.timeInterval);
        this.changeStage("Game Over");
      }
    }, 1000);
  }
  retry(e) {
    this.bgSound.pause();
    this.changeStage("Game Over");
  }
}
