const container = document.querySelector(".game__container");
const canvas = document.querySelector(".game__field");
const popup = document.querySelector(".popup__body");
const popupContainer = document.querySelector(".popup__container");
const round = document.querySelector(".game__round");
const timer = document.querySelector(".timer");
const carrot = '<image class="carrot__img" src="./assets/carrot.png"></image>';
const bug = '<image class="bug__img" src="./assets/bug.png"></image>';
const lifeContainer = document.querySelector(".game__life");
let game;
let currentRound = 1;
let timeInterval;
// game start ;

popup.addEventListener("click", (e) => {
  const target = e.target.closest("button");
  if (target?.value === "nextLevel") currentRound++;
  else if (target?.value === "gameOver") currentRound = 1;
  canvas.innerHTML = "";
  lifeContainer.innerHTML = "";
  round.textContent = "Round " + currentRound;

  game = new GameRound(currentRound);

  popupContainer.classList.add("hide");

  const maxY = canvas.getBoundingClientRect().height - 70;
  let coordinates = game.getPlace(
    maxY,
    (canvas.getBoundingClientRect().width - 70) / (5 + currentRound),
    5 + currentRound
  );
  game.drawItem(coordinates);
  game.startCountDown();
});

canvas.addEventListener("click", (e) => {
  if (e.target.dataset.item === "carrot") {
    const status = game.removeCarrot();
    e.target.remove();
    if (status > 0) {
      return;
    } else {
      game.nextLevel();
    }
  } else if (e.target.dataset.item === "bug") {
    const status = game.removeLife();
    lifeContainer.firstChild.remove();
    if (status > 0) {
      return;
    } else {
      game.gameOver();
    }
  }
});

// game INfo
class GameRound {
  constructor(round = 1) {
    this.round = round;
    this.life = 3;
    this.carrot = 0;
    this.coordintes = { carrot: [], bug: [] };
  }
  getPlace(maxY, baseX, n) {
    this.carrot = n;
    for (let i = 0; i < n; i++) {
      const randomX = Math.random() * (baseX * (i + 1) - baseX * i) + baseX * i;
      const randomY = Math.random() * maxY;
      const randomBugX =
        Math.random() * (baseX * (i + 1) - baseX * i) + baseX * i;
      const randomBugY = Math.random() * maxY;
      this.coordintes.carrot.push({ x: randomX, y: randomY });
      this.coordintes.bug.push({ x: randomBugX, y: randomBugY });
    }
    return this.coordintes;
  }

  drawItem(coord) {
    for (let i = 0; i < coord.carrot.length; i++) {
      let carrot = document.createElement("img");
      carrot.src = "./assets/carrot.png";
      carrot.setAttribute("class", "carrot__img");
      carrot.setAttribute("data-item", "carrot");
      carrot.style.transform = `translate(${coord.carrot[i].x}px,${coord.carrot[i].y}px)`;
      canvas.append(carrot);

      let bug = document.createElement("img");
      bug.src = "./assets/bug.png";
      bug.setAttribute("class", "bug__img");
      bug.setAttribute("data-item", "bug");
      bug.style.transform = `translate(${coord.bug[i].x}px,${coord.bug[i].y}px)`;
      canvas.append(bug);
    }
    this.setLife();
  }
  setLife() {
    this.life = 3;
    for (let i = 0; i < this.life; i++) {
      let img = document.createElement("img");
      img.src = "./assets/shovel.png";
      img.setAttribute("class", "sholve__img");

      lifeContainer.append(img);
    }
  }
  removeLife() {
    return --this.life;
  }
  removeCarrot() {
    return --this.carrot;
  }
  nextLevel() {
    if (timeInterval) clearInterval(timeInterval);

    popup.value = "nextLevel";
    popup.textContent = "Next Level";
    popupContainer.classList.remove("hide");
  }
  gameOver() {
    timeInterval.ㄴ;
    if (timeInterval) clearInterval(timeInterval);

    popup.value = "gameOver";
    popup.textContent = "Game Over";
    popupContainer.classList.remove("hide");
  }
  startCountDown() {
    let startTime = 60;
    timer.textContent = "10:00";
    timeInterval = setInterval(() => {
      startTime--;
      let min = Math.floor(startTime / 60);
      let seconds = startTime % 60;
      timer.textContent = `${min} : ${
        String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
      }`;
      if (startTime == 0) {
        console.log(timeInterval);
        clearInterval(timeInterval);
        this.gameOver();
      }
    }, 1000);
  }
}
