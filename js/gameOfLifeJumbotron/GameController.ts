import { GameOfLife } from "./GameOfLife";

export class GameController {
  game: GameOfLife;
  element: any;
  tick: any;
  timeSinceLastTick: number = 0;

  constructor({
    game,
    element,
    tick,
  }: {
    game: GameOfLife;
    element: HTMLElement;
    tick: number;
  }) {
    this.game = game;
    this.element = element;
    this.tick = tick;
  }

  onTick(delta) {
    this.timeSinceLastTick += delta;
    if (this.timeSinceLastTick >= this.tick) {
      this.game.tick();
      this.timeSinceLastTick = this.timeSinceLastTick % this.tick;
    }
  }
}
