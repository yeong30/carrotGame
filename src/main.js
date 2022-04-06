import Field from "./field.js";
import PopUp from "./popup.js";
import { playCarrot, playBg, stopBg, playWin } from "./sound.js";
const DEFAULT_ITEM_COUNT = 5;
const GAME_TIME = 10;

// game element

const timer = document.querySelector(".timer");

let timeInterval;

const gameAlarm = new PopUp();
gameAlarm.setClickEventListen(start);

const gameField = new Field();
gameField.setClickListener(clickItem, retry);

function start() {
  playBg();
  gameField.init();
  startCountDown();
}

function clickItem(target, status) {
  if (target === "carrot") {
    if (status > 0) {
      return;
    } else {
      nextStage("Next Level");
    }
  } else if (target === "bug") {
    if (status > 0) {
      return;
    } else {
      failStage();
    }
  }
}

function failStage(msg = "Game Over") {
  if (timeInterval) clearInterval(timeInterval);

  stopBg();
  gameField.currentBug = DEFAULT_ITEM_COUNT;
  gameField.currentRound = 1;
  gameAlarm.showWithTxt(msg);
}
function nextStage(msg) {
  if (timeInterval) clearInterval(timeInterval);
  gameField.currentRound++;
  gameField.currentBug++;
  gameAlarm.showWithTxt(msg);

  playWin();
}

function retry(e) {
  failStage("Retry");
}

// timer
function startCountDown() {
  let currentTime = GAME_TIME;
  printCurrentTime(currentTime);
  timeInterval = setInterval(() => {
    printCurrentTime(--currentTime);
    if (currentTime == 0) {
      failStage();
      return;
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
