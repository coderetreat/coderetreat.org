import { Array2d } from "./Array2d";
import { O, X, GameOfLife, StandardRules } from "./GameOfLife";

describe("GameOfLife", () => {
  it("applies the given rules to a grid of cells", () => {
    const initialGrid = new Array2d([
      [O, X, O],
      [O, X, O],
      [O, X, O],
    ]);
    const game = new GameOfLife(initialGrid, StandardRules);

    game.tick();

    expect(game.isAliveAt(0, 0)).toEqual(false);
    expect(game.isAliveAt(1, 0)).toEqual(false);
    expect(game.isAliveAt(2, 0)).toEqual(false);

    expect(game.isAliveAt(0, 1)).toEqual(true);
    expect(game.isAliveAt(1, 1)).toEqual(true);
    expect(game.isAliveAt(2, 1)).toEqual(true);

    expect(game.isAliveAt(0, 0)).toEqual(false);
    expect(game.isAliveAt(1, 0)).toEqual(false);
    expect(game.isAliveAt(2, 0)).toEqual(false);
  });

  it("can be initialized using a seed value", () => {
    const game = GameOfLife.fromSeed("hello", 0.5, 3, 3, StandardRules);

    expect(game.grid.backing).toEqual(
      new Array2d([
        [X, O, X],
        [X, O, X],
        [X, X, X],
      ]).backing
    );
  });

  it("can be serialized and deserialized to a packed value", () => {
    const grid = new Array2d([
      [X, O, X, X, O, X, X, X, X, O, X, O, O, X, X, X, O, X, O, X, X, X],
      [X, O, X, X, O, O, X, O, X, O, X, X, O, X, X, O, O, O, X, X, O, X],
      [X, O, O, O, X, X, O, O, O, X, X, X, O, O, O, X, X, X, O, O, O, X],
      [X, O, X, O, X, X, X, O, O, X, X, O, X, O, O, X, O, O, O, X, O, O],
      [O, X, O, O, X, O, X, O, X, X, O, O, O, O, O, O, X, O, O, X, X, X],
      [O, O, O, X, X, O, O, X, O, X, X, X, X, O, X, X, X, X, X, O, O, X],
      [X, O, O, X, O, O, X, O, O, O, X, X, O, X, X, O, O, O, O, X, O, X],
      [X, O, X, X, X, O, X, X, X, O, O, O, O, O, X, X, X, O, O, O, O, X],
      [X, X, X, X, O, X, O, X, X, O, O, X, O, O, O, O, X, O, O, X, O, X],
      [X, X, O, X, O, O, O, X, O, O, O, O, X, O, O, X, X, O, X, X, X, X],
      [O, O, O, O, O, X, O, O, O, O, X, O, O, X, O, O, O, X, O, O, X, O],
      [X, X, X, X, O, X, O, O, X, O, X, X, X, X, O, O, X, O, O, X, X, O],
      [X, O, O, X, X, X, X, O, X, O, X, X, O, X, X, O, X, O, X, O, X, X],
      [O, X, O, O, X, O, X, O, X, X, X, X, X, X, X, X, O, X, O, X, X, O],
      [X, O, O, O, X, O, O, O, X, O, O, X, O, O, X, O, O, O, O, X, X, X],
      [O, X, X, O, X, O, O, O, X, X, O, X, O, O, O, X, O, O, O, O, O, X],
      [O, O, X, O, O, O, X, O, O, X, X, X, O, O, O, O, X, O, X, X, O, O],
      [O, X, X, X, O, O, X, O, X, X, O, O, O, X, X, X, O, O, O, X, X, X],
      [O, X, O, O, X, X, O, O, O, X, X, X, X, X, X, X, O, O, X, X, O, X],
      [X, X, O, O, O, X, X, X, O, O, X, X, O, O, O, O, X, X, O, O, O, X],
      [O, O, O, O, O, O, O, X, O, X, O, O, O, X, X, O, X, O, X, O, X, X],
      [X, X, O, O, X, X, X, X, X, O, X, X, O, O, O, O, O, O, O, X, X, X],
    ]);

    const sourceGame = new GameOfLife(grid, StandardRules);

    const serialized = sourceGame.serialize();

    const deserializedGame = GameOfLife.fromPacked(serialized);
    expect(deserializedGame.rules).toEqual(sourceGame.rules);
    expect(deserializedGame.grid.backing).toEqual(sourceGame.grid.backing);
  });

  it("can be serialized and deserialized to a packed value", () => {
    const sourceGame = GameOfLife.fromSeed(
      "hello",
      0.5,
      100,
      100,
      StandardRules
    );

    const serialized = sourceGame.serialize();

    const deserializedGame = GameOfLife.fromPacked(serialized);
    expect(deserializedGame.rules).toEqual(sourceGame.rules);
    expect(deserializedGame.grid.backing).toEqual(sourceGame.grid.backing);
  });
});
