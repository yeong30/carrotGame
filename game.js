export default class Game {
  constructor(round, carrot, bug) {
    this.field = document.querySelector(".game__field");
    this.round = document.querySelector(".game__round");
    this.timer = document.querySelector(".timer");
    this.life = document.querySelector(".game__life");
    this.timeInterval;
    this.currentLife = 3;
    this.currentRound = round;
    this.currentCarrot = carrot;
    this.currentBug = bug;
    this.field.addEventListener("click", (e) => this.clickItem(e));
    this.changeMessage;
  }
  start(count, status) {
    this.currentCarrot = count;

    if (status === "Next Level") {
      this.nextRound();
    } else if (status === "Game Over") {
      this.fail(count);
    }
    this.round.textContent = "Round" + this.currentRound;
    const fieldMax = this.field.getBoundingClientRect().height - 70;
    const baseSize =
      (this.field.getBoundingClientRect().width - 70) /
      (this.currentCarrot + this.currentRound);
    let coord = this.getPlace(fieldMax, baseSize);

    this.drawItem(coord);
    this.setLife();
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
        this.changeStage("Game Over");
      }
    }
  }
  getPlace(maxY, baseX) {
    const coordintes = { carrot: [], bug: [] };
    for (let i = 0; i < this.currentCarrot; i++) {
      const randomX = Math.random() * (baseX * (i + 1) - baseX * i) + baseX * i;
      const randomY = Math.random() * maxY;
      coordintes.carrot.push({ x: randomX, y: randomY });
    }
    for (let i = 0; i < this.currentBug; i++) {
      const randomBugX =
        Math.random() * (baseX * (i + 1) - baseX * i) + baseX * i;
      const randomBugY = Math.random() * maxY;
      coordintes.bug.push({ x: randomBugX, y: randomBugY });
    }
    return coordintes;
  }

  drawItem(coord) {
    for (let i = 0; i < coord.carrot.length; i++) {
      let carrot = document.createElement("img");
      carrot.src = "./assets/carrot.png";
      carrot.setAttribute("class", "carrot__img");
      carrot.setAttribute("data-item", "carrot");
      carrot.style.transform = `translate(${coord.carrot[i].x}px,${coord.carrot[i].y}px)`;
      this.field.append(carrot);
    }

    for (let i = 0; i < coord.bug.length; i++) {
      let bug = document.createElement("img");
      bug.src = "./assets/bug.png";
      bug.setAttribute("class", "bug__img");
      bug.setAttribute("data-item", "bug");
      bug.style.transform = `translate(${coord.bug[i].x}px,${coord.bug[i].y}px)`;
      this.field.append(bug);
    }
  }
  setLife() {
    this.currentLife = 3;

    for (let i = 0; i < this.currentLife; i++) {
      let img = document.createElement("img");
      img.src = "./assets/shovel.png";
      img.setAttribute("class", "sholve__img");
      this.life.append(img);
    }
  }
  reset() {
    this.field.innerHTML = "";
    this.life.innerHTML = "";
  }
  removeLife() {
    return --this.currentLife;
  }
  removeCarrot() {
    return --this.currentCarrot;
  }
  changeStage(value) {
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.changeMessage && this.changeMessage(value);
  }
  nextRound() {
    this.reset();
    this.currentRound++;
    this.currentBug++;
  }
  fail(count) {
    this.reset();
    this.currentBug = count;
    this.currentCarrot = count;
    this.currentRound = 1;
  }
  startCountDown() {
    let startTime = 60;
    timer.textContent = "10:00";
    this.timeInterval = setInterval(() => {
      startTime--;
      let min = Math.floor(startTime / 60);
      let seconds = startTime % 60;
      timer.textContent = `${min} : ${
        String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
      }`;
      if (startTime == 0) {
        clearInterval(this.timeInterval);
        this.gameOver();
      }
    }, 1000);
  }
}
