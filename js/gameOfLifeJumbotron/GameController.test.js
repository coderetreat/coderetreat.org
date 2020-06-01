/**
 * @jest-environment jsdom
 */
import { GameController } from "./GameController";
import { GraphicsController } from "./GraphicsController";
import { GameOfLife, StandardRules } from "./GameOfLife";
jest.mock("./GraphicsController");
jest.mock("./GameOfLife");

describe("GameController", () => {
  let element;

  beforeEach(() => {
    jest.clearAllMocks();
    const container = document.createElement("div");
    element = document.createElement("canvas");
    container.appendChild(element);
  });

  it("initializes the GraphicsController on the given canvas", () => {
    const controller = new GameController(element);

    expect(GraphicsController).toHaveBeenCalledTimes(1);
    expect(GraphicsController.mock.calls[0][0]).toMatchObject({ element });
  });

  describe("Game initialization", () => {
    it("uses the ?seed and &rules parameters to initialize the Game if present", () => {
      window.history.replaceState({}, "", "?seed=hello&rules=S2B2");

      const controller = new GameController(element);
      controller.initializeGame();

      expect(GameOfLife.fromSeed).toHaveBeenCalledWith("hello", 0.7, 100, 100, {
        born: [2],
        survive: [2],
      });
    });

    it("allows to specify a packed game value", () => {
      const packed = "B3|S23|W1|H1|GAA==";
      window.history.replaceState({}, "", "?state="+encodeURIComponent(packed));

      const controller = new GameController(element);
      controller.initializeGame();

      expect(GameOfLife.fromPacked).toHaveBeenCalledWith(packed);
    });

    it("will otherwise randomly initialize the game", () => {
      window.history.replaceState({}, "", "/");

      const controller = new GameController(element);
      controller.initializeGame();

      expect(GameOfLife.fromSeed).toHaveBeenCalledWith(expect.anything(), 0.7, 100, 100, StandardRules);
    });
  });
});
