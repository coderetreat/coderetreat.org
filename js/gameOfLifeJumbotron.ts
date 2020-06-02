import { GameController } from "./gameOfLifeJumbotron/GameController";
import { StandardRules, GameOfLife } from "./gameOfLifeJumbotron/GameOfLife";
import * as GameOfLifeUrlBinding from "./gameOfLifeJumbotron/GameOfLifeUrlBinding";

let game = GameOfLifeUrlBinding.tryInitializeFromHistory();
if (!game) {
  const seed = String((Math.random() * 10000) | 0);
  game = GameOfLife.fromSeed(seed, 0.7, 100, 50, StandardRules);
  GameOfLifeUrlBinding.setUrlParameters({ seed });
}

const controller = new GameController(
  <HTMLCanvasElement>document.getElementById("gameCanvas"),
  game
);
controller.start();

document
  .querySelector("#jumbotron-gol-control-shuffle")
  .addEventListener("click", () => controller.shuffle());

const playPause = document.querySelector("#jumbotron-gol-control-pause");
const updateIconVisiblity = () => {
  if (controller.isRunning) {
    playPause.querySelector(".fa-play").classList.add("d-none");
    playPause.querySelector(".fa-pause").classList.remove("d-none");
  } else {
    playPause.querySelector(".fa-play").classList.remove("d-none");
    playPause.querySelector(".fa-pause").classList.add("d-none");
  }
};
updateIconVisiblity();
playPause.addEventListener("click", () => {
  if (controller.isRunning) {
    controller.pause();
  } else {
    controller.resume();
  }
  updateIconVisiblity();
});

document
  .querySelector("#jumbotron-gol-control-speed-slower")
  .addEventListener("click", () => controller.changeSpeed(1 / 1.5));

document
  .querySelector("#jumbotron-gol-control-speed-faster")
  .addEventListener("click", () => controller.changeSpeed(1.5));

document
  .querySelector("#jumbotron-gol-control-speed-reset")
  .addEventListener("click", () => controller.resetSpeed());
