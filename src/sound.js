const winSound = new Audio("assets/sound/game_win.mp3");
const carrotSound = new Audio("assets/sound/carrot_pull.mp3");
const bugSound = new Audio("assets/sound/bug_pull.mp3");
const bgSound = new Audio("assets/sound/bg.mp3");
bgSound.loop = true;

function playCarrot() {
  carrotSound.currentTime = 0;
  carrotSound.play();
}

function playBug() {
  bugSound.currentTime = 0;
  bugSound.play();
}

function playWin() {
  winSound.play();
}

function playBg() {
  bgSound.currentTime = 0;

  bgSound.play();
}
function stopBg() {
  bgSound.pause();
}
function muteAll() {
  console.log("mute");
  bgSound.muted = true;
}
function playAll() {
  console.log("play");

  bgSound.muted = false;
}

export { playCarrot, playBg, playBug, playWin, stopBg, muteAll, playAll };
