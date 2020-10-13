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
    const { width, height } = this.canvas.parentElement.getBoundingClientRect();
    const radius = Math.max(10, Math.min((width / 100) | 0, (height / 100) | 0));
    const gap = Math.max(2, (0.4 * radius) | 0);
    this.graphicsController = new GraphicsController({
      element: this.canvas,
      fps: 30,
      radius,
      gap,
      fadeFactor: this.reducedMotion ? false : 2,
    });
  }

  start() {
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
    if (this.reducedMotion) {
      this.graphicsController.render();
    } else {
      this.graphicsController.ticker.start();
    }
  }

  shuffle() {
    const seed = String((Math.random() * 10000) | 0);
    this.game = GameOfLife.fromSeed(seed, 0.7, 100, 100, StandardRules);
    GameOfLifeUrlBinding.setUrlParameters({ seed });
    this.graphicsController.updateFromGame(this.game, true);
    if (this.reducedMotion) {
      this.graphicsController.render();
    }
  }

  pause() {
    this.graphicsController.ticker.stop();
  }

  changeSpeed(factor: number) {
    this.ups *= factor;
    this.graphicsController.fadeFactor =
      (this.graphicsController.fadeFactor || 1) * factor;
  }

  resetSpeed() {
    this.ups = 1;
    this.graphicsController.fadeFactor = 1;
  }

  resume() {
    if (this.reducedMotion) {
      this.reducedMotion = false;
      this.graphicsController.fadeFactor = 1;
    }
    this.graphicsController.ticker.start();
  }

  get isRunning() {
    return this.graphicsController.ticker.started;
  }

  get msPerGameTick(): number {
    return 1000 / this.ups;
  }
}
