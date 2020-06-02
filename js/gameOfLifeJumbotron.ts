import { GameController } from "./gameOfLifeJumbotron/GameController";
import { StandardRules, GameOfLife } from "./gameOfLifeJumbotron/GameOfLife";
import * as GameOfLifeUrlBinding from "./gameOfLifeJumbotron/GameOfLifeUrlBinding";

let game = GameOfLifeUrlBinding.tryInitializeFromHistory();
if (!game) {
  game = GameOfLife.fromSeed(
    String((Math.random() * 10000) | 0),
    0.7,
    100,
    50,
    StandardRules
  );
}

const controller = new GameController(
  <HTMLCanvasElement>document.getElementById("gameCanvas"),
  game
);
controller.start();
document
  .querySelector("#jumbotron-gol-control-shuffle")
  .addEventListener("click", () => controller.shuffle());
