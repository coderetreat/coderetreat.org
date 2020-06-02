import { GameController } from "./gameOfLifeJumbotron/GameController";
import { StandardRules, GameOfLife } from "./gameOfLifeJumbotron/GameOfLife";
import * as gameOfLifeUrlBinding from "./gameOfLifeJumbotron/GameOfLifeUrlBinding";

let game = gameOfLifeUrlBinding.tryInitializeFromHistory();
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
