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
  visibleDots: Array2d<PIXI.Graphics>;
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
    this.visibleDots = new Array2d<PIXI.Graphics>([]);
  }

  render() {
    this.pixiApp.render();
  }

  _handlePossibleResize(game: GameOfLife) {
    let { width, height } = this.pixiApp.screen;
    let gridX = Math.ceil(width / (this.radius * 2 + this.gap));
    let gridY = Math.ceil(height / (this.radius * 2 + this.gap));

    let gridWidth = Math.min(game.grid.width, gridX);
    let gridHeight = Math.min(game.grid.height, gridY);

    this.visibleDots = this.visibleDots.resize(
      gridWidth,
      gridHeight,
      (x, y) => {
        const cellAlive = game.isAliveAt(x, y);
        const newDot: any = new PIXI.Graphics();
        newDot.x = this.gap + this.radius + x * (this.radius * 2 + this.gap);
        newDot.y = this.gap + this.radius + y * (this.radius * 2 + this.gap);
        newDot.alpha = this.shouldFade ? 0 : cellAlive ? 1 : 0;
        newDot.beginFill(0xffffff);
        newDot.drawCircle(0, 0, this.radius);
        this.pixiApp.stage.addChild(newDot);
        return newDot;
      },
      (element) => {
        this.pixiApp.stage.removeChild(element);
      }
    );
  }

  updateFromGame(game: GameOfLife, resetAlpha: boolean = false) {
    this._handlePossibleResize(game);

    this.visibleDots.forEach((graphics, x, y) => {
      const cellAlive = game.isAliveAt(x, y);
      if(resetAlpha) {
        graphics.alpha = this.shouldFade ? 0 : cellAlive ? 1 : 0
      }
      graphics.alphaDelta =
        this.shouldFade && cellAlive ? this.fadeStep : -this.fadeStep;
    });
  }

  updateAlphaValues(delta: number) {
    this.visibleDots.forEach((graphics) => {
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

  get shouldFade(): Boolean {
    return this.fadeFactor !== false;
  }
}
