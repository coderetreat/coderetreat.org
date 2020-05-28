import * as PIXI from "pixi.js";
import { computeNextGeneration } from "./computeNextGeneration";

const CELL_SIZE = 20;
const TICK_EVERY_MS = 3000;
const ALPHA_DELTA = 0.01;
const SEED_THRESHOLD = 0.7;

const GRID_X = 100;
const GRID_Y = 100;

export class GolApp {
  constructor(
    pixiOpts,
    { random, tickEveryMs = TICK_EVERY_MS, alphaDelta = ALPHA_DELTA }
  ) {
    this.tickEveryMs = tickEveryMs;
    this.alphaDelta = alphaDelta;

    this.pixiApp = new PIXI.Application(pixiOpts);
    this.pixiApp.ticker.maxFPS = 30;
    this.pixiApp.renderer.view.style["touch-action"] = "auto";

    this.grid = Array(GRID_Y)
      .fill(0)
      .map(() =>
        Array(GRID_X)
          .fill(0)
          .map(() => (random() > SEED_THRESHOLD ? 1 : 0))
      );

    let { width, height } = this.pixiApp.screen;

    let gridX = Math.min(GRID_X, (width / CELL_SIZE) | 0);
    let gridY = Math.min(GRID_Y, (height / CELL_SIZE) | 0);

    this.secondsPassed = 0;
    this.nextSecond = 1;

    this.graphics = Array(gridY)
      .fill(0)
      .map((_, y) =>
        Array(gridX)
          .fill(0)
          .map((_, x) => {
            let point = new PIXI.Graphics();
            point.interactive = true;
            point.x = x * CELL_SIZE;
            point.y = y * CELL_SIZE;
            point.alpha = pixiOpts.autoStart ? 0 : this.grid[y][x];
            point.alphaDelta =
              this.grid[y][x] == 1 ? this.alphaDelta : -this.alphaDelta;
            point.beginFill(0xffffff);
            point.drawCircle(CELL_SIZE / 2, CELL_SIZE / 2, (CELL_SIZE - 2) / 2);
            return point;
          })
      );

    this.graphics.forEach((row) =>
      row.forEach((graphic) => this.pixiApp.stage.addChild(graphic))
    );

    this.drawGeneration(0);
    this.updateAlphaDelta();

    let timeInMs = 0;

    if (!pixiOpts.autoStart) this.pixiApp.render();

    // Listen for frame updates
    this.pixiApp.ticker.add((delta) => {
      timeInMs += this.pixiApp.ticker.elapsedMS;
      if (timeInMs > this.tickEveryMs) {
        timeInMs = timeInMs % this.tickEveryMs;
        this.grid = computeNextGeneration(this.grid);
        this.updateAlphaDelta();
      }
      this.drawGeneration(delta);
    });
  }

  faster() {
    this.tickEveryMs /= 2;
    this.alphaDelta *= 2;
  }

  slower() {
    this.tickEveryMs *= 2;
    this.alphaDelta /= 2;
  }

  resetSpeed() {
    this.tickEveryMs = TICK_EVERY_MS;
    this.alphaDelta = ALPHA_DELTA;
  }

  start() {
    return this.pixiApp.start();
  }

  stop() {
    return this.pixiApp.stop();
  }

  get started() {
    return this.pixiApp?.ticker?.started;
  }

  render() {
    return this.pixiApp.render();
  }

  destroy() {
    return this.pixiApp.destroy();
  }

  drawGeneration(delta) {
    for (let y = 0; y < this.graphics.length; y++) {
      for (let x = 0; x < this.graphics[0].length; x++) {
        let point = this.graphics[y][x];
        point.alpha = Math.max(
          0,
          Math.min(1, point.alpha + point.alphaDelta * delta)
        );
      }
    }
  }

  updateAlphaDelta() {
    for (let y = 0; y < this.graphics.length; y++) {
      for (let x = 0; x < this.graphics[0].length; x++) {
        let point = this.graphics[y][x];
        point.alphaDelta =
          this.grid[y][x] == 1 ? this.alphaDelta : -this.alphaDelta;
      }
    }
  }
}
