import PopUp from "./popup.js";
import { GameBuilder } from "./game.js";

import { muteAll, playAll } from "./sound.js";

const speaker = document.querySelector(".mute__btn");

// game element

const gameAlarm = new PopUp();
const game = new GameBuilder()
  .setAlarm(gameAlarm)
  .setDuration(10)
  .setItemount(5)
  .build();
gameAlarm.setClickEventListen(game.start);

speaker.addEventListener("click", () => {
  if (speaker.dataset.status == "play") {
    muteAll();
    speaker.dataset.status = "mute";
  } else if (speaker.dataset.status == "mute") {
    playAll();
    speaker.dataset.status = "play";
  }
});
