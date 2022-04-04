import Game from "./game.js";
import PopUp from "./popup.js";
let START_CARROT = 5;
let START_BUG = 5;

// game start ;

window.addEventListener("load", () => {
  startGame();
});
function startGame() {
  let status = "START";
  const game = new Game(START_CARROT, START_BUG);
  const popup = new PopUp(status);
  popup.clickEvent = function () {
    game.start.bind(game)(START_BUG);
    popup.hide();
  };
  game.changeMessage = function (value) {
    status = value;
    popup.show();
    popup.setContent(value);
  };
}
