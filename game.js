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
    this.playSounds(this.bgSound);
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
        this.changeStageFail(false, "Next Level");
      }
    } else if (e.target.dataset.item === "bug") {
      const status = this.removeLife();
      this.life.firstChild.remove();
      if (status > 0) {
        return;
      } else {
        this.failed = true;
        this.bgSound.pause();
        this.changeStageFail(true);
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
    this.field.innerHTML = "";
    this.life.innerHTML = "";

    this.failed = false;

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
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
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

  removeLife() {
    this.playSounds(this.bugSound);

    return --this.currentLife;
  }
  removeCarrot() {
    this.playSounds(this.carrotSound);

    return --this.currentCarrot;
  }

  changeStageFail(fail, msg = "Game Over") {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (fail) {
      this.changeMessage(msg);
      this.failed = true;
      this.bgSound.pause();
    } else {
      this.changeMessage(msg);
    }
  }
  nextRound() {
    this.playSounds(this.winSound);
    this.currentRound++;
    this.currentBug++;
  }
  fail(count) {
    this.currentBug = count;
    this.currentCarrot = count;
    this.currentRound = 1;
  }
  startCountDown() {
    let currentTime = GAME_TIME;
    this.printCurrentTime(currentTime);
    this.timeInterval = setInterval(() => {
      this.printCurrentTime(--currentTime);
      if (currentTime == 0) {
        this.changeStageFail(true);
      }
    }, 1000);
  }
  printCurrentTime(time) {
    let min = Math.floor(time / 60);
    let seconds = time % 60;
    this.timer.textContent = `${min} : ${
      String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
    }`;
    return;
  }
  retry(e) {
    this.changeStageFail(true, "Retry");
  }
  playSounds(target) {
    target.currentTime = 0;
    target.play();
  }
}
