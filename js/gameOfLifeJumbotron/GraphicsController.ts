import * as PIXI from "pixi.js";
import { Array2d } from "./Array2d";

type GraphicsControllerOpts = {
  element: HTMLCanvasElement;
  fps: number;
  radius: number;
  gap: number;
};

export class GraphicsController {
  pixiApp: PIXI.Application;
  graphics: Array2d<PIXI.Graphics>;

  constructor({ element, fps, radius, gap }: GraphicsControllerOpts) {
    this.pixiApp = new PIXI.Application({
      view: element,
      resizeTo: element.parentElement,
      antialias: true,
      autoDensity: true,
      resolution: 2,
      autoStart: false,
    });
    this.pixiApp.ticker.maxFPS = fps;
    element.style["touch-action"] = "auto";

    let { width, height } = this.pixiApp.screen;
    let gridX = Math.ceil(width / (radius * 2 + gap));
    let gridY = Math.ceil(height / (radius * 2 + gap));
    this.graphics = new Array2d<PIXI.Graphics>(
      gridX,
      gridY,
      () => new PIXI.Graphics()
    );
  }
}
