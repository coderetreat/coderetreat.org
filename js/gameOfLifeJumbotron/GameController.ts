import { GameOfLife, StandardRules } from "./GameOfLife";
import * as qs from "qs";
import { GraphicsController } from "./GraphicsController";

export class GameController {
  canvas: HTMLCanvasElement;
  graphicsController: GraphicsController;
  game: GameOfLife;
  reducedMotion: Boolean;
  msElapsedSinceLastUpsTick: number = 0;

  constructor(canvas: HTMLCanvasElement, game: GameOfLife) {
    this.canvas = canvas;
    this.game = game;
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    this.initializeGraphics();
  }

  initializeGraphics() {
    this.graphicsController = new GraphicsController({
      element: this.canvas,
      fps: 30,
      radius: 20,
      fadeFactor: this.reducedMotion ? false : 1,
      gap: 4,
    });
  }

  start() {
    if (this.reducedMotion) return;
    this.graphicsController.updateFromGame(this.game);
    this.graphicsController.ticker.add((delta) =>
      this.graphicsController.updateAlphaValues(delta)
    );
    this.graphicsController.ticker.add(() => {
      this.msElapsedSinceLastUpsTick += this.graphicsController.ticker.elapsedMS;
      if (this.msElapsedSinceLastUpsTick > 1000) {
        this.game.tick();
        this.graphicsController.updateFromGame(this.game);
        this.msElapsedSinceLastUpsTick = this.msElapsedSinceLastUpsTick % 1000;
      }
    });
    this.graphicsController.ticker.start();
  }
}
