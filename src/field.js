const CARROT_SIZE = 70;
const DEFAULT_LIFE = 3;
const DEFAULT_ITEM_COUNT = 5;
import { playCarrot, playBug, stopBg } from "./sound.js";

export default class Field {
  constructor() {
    this.field = document.querySelector(".game__field");
    this.round = document.querySelector(".game__round");
    this.life = document.querySelector(".game__life");
    this.retryBtn = document.querySelector(".retry__Btn");

    this.currentCarrot = DEFAULT_ITEM_COUNT;
    this.currentLife = DEFAULT_LIFE;
    this.currentBug = DEFAULT_ITEM_COUNT;
    this.fieldRect = this.field.getBoundingClientRect();
    this.currentRound = 1;

    this.retryBtn.addEventListener("click", () => {
      this.onClickRetry && this.onClickRetry();
    });
    this.field.addEventListener("click", this._onClickItem);
  }
  init() {
    this.field.innerHTML = "";
    this.life.innerHTML = "";
    this.round.textContent = "Round " + this.currentRound;
    this.currentCarrot = DEFAULT_ITEM_COUNT;
    this._dawItem("carrot", "./assets/img/carrot.png", this.currentCarrot);
    this._dawItem("bug", "./assets/img/bug.png", this.currentBug);
    this._setLife();
  }

  _setLife() {
    this.currentLife = DEFAULT_LIFE;
    for (let i = 0; i < this.currentLife; i++) {
      let img = document.createElement("img");
      img.src = "./assets/img/shovel.png";
      img.setAttribute("class", "sholve__img");
      this.life.append(img);
    }
  }
  _dawItem(name, src, count) {
    const maxY = this.fieldRect.height - CARROT_SIZE;
    const maxX = this.fieldRect.width - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
      const { x, y } = getRandomNumber(maxX, maxY, count, i);
      let item = document.createElement("img");
      item.src = src;
      item.setAttribute("class", name + "__img");
      item.setAttribute("data-item", name);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;
      this.field.append(item);
    }
  }

  _onClickItem = (e) => {
    if (!e.target?.dataset?.item) return;
    let status;
    if (e.target.dataset.item === "carrot") {
      e.target.remove();
      status = this.removeCarrot();
    } else if (e.target.dataset.item === "bug") {
      this.life.firstChild.remove();
      status = this.removeLife();
    }
    this.onClickField && this.onClickField(e.target.dataset.item, status);
  };
  setClickListener(onClickField, onClickRetry) {
    this.onClickField = onClickField;
    this.onClickRetry = onClickRetry;
  }

  removeCarrot() {
    playCarrot();
    return --this.currentCarrot;
  }
  removeLife() {
    playBug();
    return --this.currentLife;
  }
}

function getRandomNumber(maxX, maxY, count, i) {
  const base = maxX / count;
  const coordintes = {};
  const randomX = Math.random() * (base * (i + 1) - base * i) + base * i;
  const randomY = Math.random() * maxY;
  coordintes.x = randomX;
  coordintes.y = randomY;
  return coordintes;
}
