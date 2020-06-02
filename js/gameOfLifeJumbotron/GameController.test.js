/**
 * @jest-environment jsdom
 */
import { GameController } from "./GameController";
import { GraphicsController } from "./GraphicsController";
import { GameOfLife } from "./GameOfLife";
jest.mock("./GraphicsController");
jest.mock("./GameOfLife");

describe("GameController", () => {
  let element;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue({ matches: false }),
    });
  });

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

  describe("reduced-motion", () => {
    it("will initialize the GraphicsController with fadeFactor=false", () => {
      window.matchMedia.mockReturnValue({ matches: true });

      const controller = new GameController(element);

      expect(GraphicsController).toHaveBeenCalledTimes(1);
      expect(GraphicsController.mock.calls[0][0]).toMatchObject({
        fadeFactor: false,
      });
    });
  });

  describe("starting", () => {
    let ticker;
    beforeEach(() => {
      ticker = {
        start: jest.fn(),
        stop: jest.fn(),
        add: jest.fn(),
      };
    });
    it("will draw the first generation provided by game", () => {
      const controller = new GameController(element);
      controller.graphicsController.ticker = ticker;

      controller.start();

      expect(controller.graphicsController.updateFromGame).toHaveBeenCalledWith(
        controller.game
      );
    });

    it("will start the ticker bound to call #updateAlphaValues", () => {
      const controller = new GameController(element);
      controller.graphicsController.ticker = ticker;

      controller.start();

      expect(ticker.start).toHaveBeenCalled();
      ticker.add.mock.calls[0][0](1);
      expect(
        controller.graphicsController.updateAlphaValues
      ).toHaveBeenCalledWith(1);
    });

    it("will use the timer to call .game#tick every second", () => {
      const controller = new GameController(element);
      controller.graphicsController.ticker = ticker;
      controller.game = { tick: jest.fn() };
      ticker.elapsedMS = 500;

      controller.start();

      ticker.add.mock.calls.forEach(([cb]) => cb(1));
      expect(controller.game.tick).not.toHaveBeenCalled();

      controller.graphicsController.updateFromGame.mockClear();

      ticker.elapsedMS = 600;
      ticker.add.mock.calls.forEach(([cb]) => cb(1));
      expect(controller.game.tick).toHaveBeenCalled();
      expect(controller.graphicsController.updateFromGame).toHaveBeenCalledWith(
        controller.game
      );
    });

    it("will not start the timer if reduced-motion is active", () => {
      window.matchMedia.mockReturnValue({ matches: true });
      const controller = new GameController(element);
      controller.graphicsController.ticker = ticker;
      controller.game = { tick: jest.fn() };
      ticker.elapsedMS = 500;

      controller.start();
      expect(ticker.start).not.toHaveBeenCalled();
    });
  });

  describe("controls", () => {
    it("provides a shuffle function that will reinitialize the game and update the url", () => {
      window.history.pushState({}, "", "/");
      const controller = new GameController(element);

      GameOfLife.fromSeed.mockClear();
      controller.shuffle();

      expect(GameOfLife.fromSeed).toHaveBeenCalled();
      expect(window.location.search).toContain(
        "seed=" + GameOfLife.fromSeed.mock.calls[0][0]
      );
    });
  });
});
