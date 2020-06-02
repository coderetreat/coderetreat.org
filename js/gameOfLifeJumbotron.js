import { GameController } from "./gameOfLifeJumbotron/GameController";

const controller = new GameController(document.getElementById("gameCanvas"));
controller.initializeGraphics();
controller.initializeGame();
controller.start();
