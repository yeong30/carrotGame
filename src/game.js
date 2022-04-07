import { playCarrot, playBg, stopBg, playWin, playBug } from "./sound.js";
import Field from "./field.js";

export const ItemType = Object.freeze({
  bug: "bug",
  carrot: "carrot",
});
export const State = Object.freeze({
  retry: "Retry",
  gameOver: "Game Over",
  nextRound: "next Round",
});

export class GameBuilder {
  setAlarm(alarm) {
    this.game_alarm = alarm;
    return this;
  }
  setItemount(count) {
    this.item_count = count;
    return this;
  }
  setDuration(duration) {
    this.game_duration = duration;
    return this;
  }
  build() {
    return new Game(this.game_alarm, this.item_count, this.game_duration);
  }
}
class Game {
  constructor(alarm, item_count, duration) {
    this.default_life = 3;
    this.default_count = item_count;
    this.duration = duration;
    this.timeInterval = undefined;
    this.timer = document.querySelector(".timer");
    this.gameAlarm = alarm;
    this.round = document.querySelector(".game__round");
    this.currentRound = 1;
    this.currentCarrot = item_count;
    this.currentBug = item_count;
    this.currentLife = this.default_life;
    this.gameField = new Field(item_count);
    this.gameField.setClickListener(this.clickItem, this.retry);
  }
  start = () => {
    playBg();
    this.gameField.init(this.default_count, this.currentBug, this.default_life);
    this.init();
    this.startCountDown();
  };
  init() {
    this.currentCarrot = this.default_count;
    this.currentLife = this.default_life;
    this.round.textContent = "Round " + this.currentRound;
  }
  clickItem = (target) => {
    if (target === ItemType.carrot) {
      const status = this.removeCarrot();
      if (status > 0) {
        return;
      } else {
        this.nextRound();
      }
    } else if (target === ItemType.bug) {
      const status = this.removeLife();
      if (status > 0) {
        return;
      } else {
        this.failStage();
        this.currentRound = 1;
      }
    }
  };
  removeCarrot() {
    playCarrot();
    return --this.currentCarrot;
  }
  removeLife() {
    playBug();
    return --this.currentLife;
  }

  failStage(msg = State.gameOver) {
    if (this.timeInterval) clearInterval(this.timeInterval);

    stopBg();
    this.currentBug = this.default_count;
    this.currentRound = 1;
    this.gameAlarm.showWithTxt(msg);
  }
  nextRound(msg = State.nextRound) {
    if (this.timeInterval) clearInterval(this.timeInterval);
    this.currentRound++;
    this.currentBug++;
    this.gameAlarm.showWithTxt(msg);

    playWin();
  }
  retry = (e) => {
    this.failStage(State.retry);
  };
  startCountDown() {
    let currentTime = this.duration;

    this.timer.textContent = printCurrentTime(currentTime);
    this.timeInterval = setInterval(() => {
      this.timer.textContent = printCurrentTime(--currentTime);
      if (currentTime == 0) {
        this.failStage();
        return;
      }
    }, 1000);
  }
}
function printCurrentTime(time, timer) {
  let min = Math.floor(time / 60);
  let seconds = time % 60;
  return `${min} : ${
    String(seconds).length < 2 ? "0" + String(seconds) : String(seconds)
  }`;
}
