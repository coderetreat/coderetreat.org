import * as PIXI from "pixi.js";
import { Array2d } from "./Array2d";
import { GameOfLife } from "./GameOfLife";
import { Viewport } from "pixi-viewport";

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
  viewport: any;

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
      transparent: true,
      antialias: true,
      autoDensity: true,
      resolution: 2,
      autoStart: false,
    });
    this.viewport = new Viewport({
      screenWidth: element.width,
      screenHeight: element.height,
      interaction: this.pixiApp.renderer.plugins.interaction,
    });
    this.pixiApp.stage.addChild(this.viewport);
    this.viewport.pause = true;
    this.viewport.drag().pinch().wheel().decelerate();
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

  resizeCanvas() {
    this.pixiApp.resize();
  }

  resizeDots(game: GameOfLife, radius: number, gap: number) {
    this.radius = radius;
    this.gap = gap;

    this.visibleDots = this.visibleDots.resize(
      0,
      0,
      () => null,
      (dot) => this.pixiApp.stage.removeChild(dot)
    );
    this._handlePossibleResize(game);
  }

  _createNewDot(x, y, cellAlive) {
    const newDot: any = new PIXI.Graphics();
    newDot.x = this.gap + this.radius + x * (this.radius * 2 + this.gap);
    newDot.y = this.gap + this.radius + y * (this.radius * 2 + this.gap);
    newDot.alpha = this.shouldFade ? 0 : cellAlive ? 1 : 0;
    newDot.beginFill(0x74bccc);
    newDot.drawCircle(0, 0, this.radius);
    return newDot;
  }

  _handlePossibleResize(game: GameOfLife) {
    let { width, height } = this.pixiApp.screen;
    this.viewport.resize(width, height);

    let gridX = Math.ceil(
      (this.viewport.worldScreenWidth + this.viewport.left) /
        (this.radius * 2 + this.gap)
    );
    let gridY = Math.ceil(
      (this.viewport.worldScreenHeight + this.viewport.top) /
        (this.radius * 2 + this.gap)
    );

    let gridWidth = Math.min(game.grid.width, gridX);
    let gridHeight = Math.min(game.grid.height, gridY);

    this.visibleDots = this.visibleDots.resize(
      gridWidth,
      gridHeight,
      (x, y) => {
        const cellAlive = game.isAliveAt(x, y);
        const newDot = this._createNewDot(x, y, cellAlive);
        this.viewport.addChild(newDot);
        return newDot;
      },
      (element) => {
        this.viewport.removeChild(element);
      }
    );
  }

  updateFromGame(game: GameOfLife, resetAlpha: boolean = false) {
    this._handlePossibleResize(game);

    this.visibleDots.forEach((graphics, x, y) => {
      const cellAlive = game.isAliveAt(x, y);
      if (resetAlpha) {
        graphics.alpha = this.shouldFade ? 0 : cellAlive ? 1 : 0;
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
