/**
 * @jest-environment jsdom
 */
import { GameOfLife, StandardRules, X, O } from "./GameOfLife";
import { GameController } from "./GameController";
import { Array2d } from "./Array2d";

describe("GameController", () => {
  let element;
  beforeEach(() => {
    element = document.createElement("canvas");
  });

  it("advances the game every tick", () => {
    const game = new GameOfLife(new Array2d([[X]]), StandardRules);
    const controller = new GameController({
      game,
      element,
      tick: 1000,
    });

    controller.onTick(1000);

    expect(game.grid.backing).toEqual([[O]]);
  });
});
