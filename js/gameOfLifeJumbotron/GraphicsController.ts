import * as PIXI from "pixi.js";
import { Array2d } from "./Array2d";
import { GameOfLife } from "./GameOfLife";

type GraphicsControllerOpts = {
  element: HTMLCanvasElement;
  fadeFactor: number | false;
  fps: number;
  radius: number;
  gap: number;
};

export class GraphicsController {
  pixiApp: PIXI.Application;
  graphics: Array2d<PIXI.Graphics>;
  gap: number;
  radius: number;
  fadeFactor: number | false;

  constructor({
    element,
    fps,
    radius,
    fadeFactor,
    gap,
  }: GraphicsControllerOpts) {
    this.pixiApp = new PIXI.Application({
      view: element,
      resizeTo: element.parentElement,
      antialias: true,
      autoDensity: true,
      resolution: 2,
      autoStart: false,
    });
    this.radius = radius;
    this.gap = gap;
    this.fadeFactor = fadeFactor;
    this.pixiApp.ticker.maxFPS = fps;
    element.style["touch-action"] = "auto";
    this.graphics = new Array2d<PIXI.Graphics>([]);
  }

  updateFromGame(game: GameOfLife) {
    let { width, height } = this.pixiApp.screen;
    let gridX = Math.ceil(width / (this.radius * 2 + this.gap));
    let gridY = Math.ceil(height / (this.radius * 2 + this.gap));

    let gridWidth = Math.min(game.grid.width, gridX);
    let gridHeight = Math.min(game.grid.height, gridY);

    this.graphics = this.graphics.resize(
      gridWidth,
      gridHeight,
      (x, y) => {
        const cellAlive = game.isAliveAt(x, y);
        const shouldFade = this.fadeFactor !== false;
        const graphics: any = new PIXI.Graphics();
        // gap radius M radius | gap radius M radius gap
        graphics.x = this.gap + this.radius + x * (this.radius * 2 + this.gap);
        graphics.y = this.gap + this.radius + y * (this.radius * 2 + this.gap);
        graphics.alpha = shouldFade ? 0 : cellAlive ? 1 : 0;
        graphics.alphaDelta =
          shouldFade && cellAlive
            ? this.fadeStep
            : -this.fadeStep;
        this.pixiApp.stage.addChild(graphics);
        return graphics;
      },
      (element) => {
        this.pixiApp.stage.removeChild(element);
      }
    );
  }

  updateAlphaValues(delta: number) {
    this.graphics.forEach((graphics) => {
      graphics.alpha = Math.max(
        0,
        Math.min(1, graphics.alpha + graphics.alphaDelta * delta)
      );
    });
  }

  get ticker(): PIXI.Ticker {
    return this.pixiApp.ticker;
  }

  get fadeStep(): number {
    return <number>this.fadeFactor / this.pixiApp.ticker.maxFPS;
  }
}
