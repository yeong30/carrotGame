import { ItemType } from "./game.js";

const CARROT_SIZE = 70;

export default class Field {
  constructor() {
    this.field = document.querySelector(".game__field");
    this.life = document.querySelector(".game__life");
    this.retryBtn = document.querySelector(".retry__Btn");
    this.fieldRect = this.field.getBoundingClientRect();
    this.retryBtn.addEventListener("click", () => {
      this.onClickRetry && this.onClickRetry();
    });
    this.field.addEventListener("click", this._onClickItem);
  }
  init(carrotCount, bugCount, life) {
    this.field.innerHTML = "";
    this.life.innerHTML = "";
    this._dawItem(ItemType.carrot, "./assets/img/carrot.png", carrotCount);
    this._dawItem(ItemType.bug, "./assets/img/bug.png", bugCount);
    this._drawLife(life);
  }

  _drawLife(life) {
    for (let i = 0; i < life; i++) {
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
    if (e.target.dataset.item === ItemType.carrot) {
      e.target?.remove();
    } else if (e.target.dataset.item === ItemType.bug) {
      this.life.firstChild?.remove();
    }
    this.onClickField && this.onClickField(e.target.dataset.item, status);
  };
  setClickListener(onClickField, onClickRetry) {
    this.onClickField = onClickField;
    this.onClickRetry = onClickRetry;
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
