import { GameOfLife, StandardRules } from "./GameOfLife";
import * as GameOfLifeUrlBinding from "./GameOfLifeUrlBinding";
import { GraphicsController } from "./GraphicsController";

export class GameController {
  canvas: HTMLCanvasElement;
  graphicsController: GraphicsController;
  game: GameOfLife;
  reducedMotion: Boolean;
  ups: number = 1;
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
      if (this.msElapsedSinceLastUpsTick > this.msPerGameTick) {
        this.game.tick();
        this.graphicsController.updateFromGame(this.game);
        this.msElapsedSinceLastUpsTick =
          this.msElapsedSinceLastUpsTick % this.msPerGameTick;
      }
    });
    this.graphicsController.ticker.start();
  }

  shuffle() {
    const seed = String(Math.random()*10000 | 0);
    this.game = GameOfLife.fromSeed(seed, 0.7, 100, 100, StandardRules);
    GameOfLifeUrlBinding.setUrlParameters({seed});
    this.graphicsController.updateFromGame(this.game);
  }

  get msPerGameTick(): number {
    return 1000 / this.ups;
  }
}
