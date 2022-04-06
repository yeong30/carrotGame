const CARROT_SIZE = 70;
const DEFAULT_LIFE = 3;
const DEFAULT_ITEM_COUNT = 5;
const GAME_TIME = 60;

const field = document.querySelector(".game__field");
const round = document.querySelector(".game__round");
const timer = document.querySelector(".timer");
const life = document.querySelector(".game__life");
const retryBtn = document.querySelector(".retry__Btn");
const popup = document.querySelector(".popup__body");
const popupContainer = document.querySelector(".popup__container");

let timeInterval;
let currentLife = DEFAULT_LIFE;
let currentRound = 0;
let currentCarrot = DEFAULT_ITEM_COUNT;
let currentBug = DEFAULT_ITEM_COUNT;
let changeMessage;
let failed = false;

const carrotSound = new Audio("assets/sound/carrot_pull.mp3");
const bugSound = new Audio("assets/sound/bug_pull.mp3");
const bgSound = new Audio("assets/sound/bg.mp3");
const winSound = new Audio("assets/sound/game_win.mp3");

popup.addEventListener("click", clickPopup);
retryBtn.addEventListener("click", retry);
field.addEventListener("click", clickItem);

function start() {
  hidePopup();
  playSounds(bgSound);
  initGame();
  startCountDown();
}
function initGame() {
  field.innerHTML = "";
  life.innerHTML = "";
  failed = false;
  round.textContent = "Round " + currentRound;
  currentCarrot = DEFAULT_ITEM_COUNT;
  drawItem("carrot", "./assets/img/carrot.png", currentCarrot);
  drawItem("bug", "./assets/img/bug.png", currentBug);
  setLife();
}

function clickItem(e) {
  if (e.target.dataset.item === "carrot") {
    const status = removeItem(currentCarrot, carrotSound);
    e.target.remove();
    if (status > 0) {
      return;
    } else {
      changeStageFail(false, "Next Level");
    }
  } else if (e.target.dataset.item === "bug") {
    const status = removeItem(currentLife, bugSound);
    life.firstChild.remove();
    if (status > 0) {
      return;
    } else {
      changeStageFail(true);
    }
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
function drawItem(name, src, count) {
  const maxY = field.getBoundingClientRect().height - CARROT_SIZE;
  const maxX = field.getBoundingClientRect().width - CARROT_SIZE;

  for (let i = 0; i < count; i++) {
    const { x, y } = getRandomNumber(maxX, maxY, count, i);
    let item = document.createElement("img");
    item.src = src;
    item.setAttribute("class", name + "__img");
    item.setAttribute("data-item", name);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    field.append(item);
  }
}
function setLife() {
  currentLife = DEFAULT_LIFE;
  for (let i = 0; i < currentLife; i++) {
    let img = document.createElement("img");
    img.src = "./assets/img/shovel.png";
    img.setAttribute("class", "sholve__img");
    life.append(img);
  }
}

function removeItem(currentCount, sound) {
  playSounds(sound);
  return --currentCount;
}

function changeStageFail(fail, msg = "Game Over") {
  if (timeInterval) clearInterval(timeInterval);
  if (fail) {
    failed = true;
    bgSound.pause();
  }
  showPopup(msg);
}
function nextRound() {
  playSounds(winSound);
  currentRound++;
  currentBug++;
}
function fail() {
  currentBug = DEFAULT_ITEM_COUNT;
  currentRound = 1;
}
function retry(e) {
  changeStageFail(true, "Retry");
}

// timer
function startCountDown() {
  let currentTime = GAME_TIME;
  printCurrentTime(currentTime);
  timeInterval = setInterval(() => {
    printCurrentTime(--currentTime);
    if (currentTime == 0) {
      changeStageFail(true);
    }
  }, 1000);
}
function printCurrentTime(time) {
  let min = Math.floor(time / 60);
  let seconds = time % 60;
  timer.textContent = `${min} : ${
    String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
  }`;
  return;
}
// sound
function playSounds(target) {
  target.currentTime = 0;
  target.play();
}

// popup
function clickPopup(e) {
  if (!failed) {
    nextRound();
    start();
  } else if (failed) {
    fail();
    start();
  }
}
function showPopup(value) {
  popup.value = value;
  popup.textContent = value;
  popupContainer.classList.remove("hide");
}
function hidePopup() {
  popupContainer.classList.add("hide");
}
