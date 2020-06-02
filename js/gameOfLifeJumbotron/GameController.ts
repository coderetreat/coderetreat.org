import { GameOfLife, StandardRules } from "./GameOfLife";
import * as qs from "qs";
import { GraphicsController } from "./GraphicsController";

export class GameController {
  canvas: HTMLCanvasElement;
  graphicsController: GraphicsController;
  game: GameOfLife;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.graphicsController = new GraphicsController({
      element: canvas,
      fps: 30,
      radius: 20,
      fadeFactor: false,
      gap: 4,
    });
  }

  initializeGame() {
    const urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    if (urlParams.seed) {
      let rules = { born: [3], survive: [2, 3] };
      if (urlParams.rules) {
        let match = /S(\d+)B(\d+)/.exec(<string>urlParams.rules);
        if (match) {
          rules = {
            survive: Array.from(match[1]).map(Number),
            born: Array.from(match[2]).map(Number),
          };
        }
      }
      const probability = urlParams.probability
        ? Number(urlParams.probability)
        : 0.7;
      this.game = GameOfLife.fromSeed(urlParams.seed, probability, 100, 100, rules);
    } else if (urlParams.state) {
      this.game = GameOfLife.fromPacked(<string>urlParams.state);
    } else {
      const seed = String((Math.random() * 100000) | 0);
      this.game = GameOfLife.fromSeed(seed, 0.7, 100, 100, StandardRules);
      window.history.pushState({}, null, "?" + qs.stringify({ seed }));
    }
  }
}
