/**
 * @jest-environment jsdom
 */
import { GameController } from "./GameController";
import { GraphicsController } from "./GraphicsController";
import { GameOfLife, StandardRules } from "./GameOfLife";
import * as qs from "qs";
jest.mock("./GraphicsController");
jest.mock("./GameOfLife");

describe("GameController", () => {
  let element;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockReturnValue({matches: false}),
    });
  })

  beforeEach(() => {
    jest.clearAllMocks();
    const container = document.createElement("div");
    element = document.createElement("canvas");
    container.appendChild(element);
  });

  it("initializes the GraphicsController on the given canvas", () => {
    const controller = new GameController(element);
    controller.initializeGraphics();

    expect(GraphicsController).toHaveBeenCalledTimes(1);
    expect(GraphicsController.mock.calls[0][0]).toMatchObject({ element });
  });

  describe("reduced-motion", () => {
    it("will initialize the GraphicsController with fadeFactor=false", () => {
      window.matchMedia.mockReturnValue({ matches: true });

      const controller = new GameController(element);
      controller.initializeGraphics();

      expect(GraphicsController).toHaveBeenCalledTimes(1);
      expect(GraphicsController.mock.calls[0][0]).toMatchObject({
        fadeFactor: false,
      });
    });
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
      window.history.replaceState(
        {},
        "",
        "?state=" + encodeURIComponent(packed)
      );

      const controller = new GameController(element);
      controller.initializeGame();

      expect(GameOfLife.fromPacked).toHaveBeenCalledWith(packed);
    });

    it("will otherwise randomly initialize the game", () => {
      window.history.replaceState({}, "", "/");

      const controller = new GameController(element);
      controller.initializeGame();

      expect(GameOfLife.fromSeed).toHaveBeenCalledWith(
        expect.anything(),
        0.7,
        100,
        100,
        StandardRules
      );
    });
  });

  describe("Updating the url so it's shareable", () => {
    it("when randomly initializing", () => {
      window.history.replaceState({}, "", "/");

      const controller = new GameController(element);
      controller.initializeGame();

      expect(window.location.search).toContain("?seed=");
    });
    it("is symmetric, so seeding from a URL will yield the same call to #fromSeed", () => {
      window.history.replaceState({}, "", "/");

      new GameController(element).initializeGame();
      const seed = qs.parse(window.location.search, { ignoreQueryPrefix: true })
        .seed;

      new GameController(element).initializeGame();
      expect(GameOfLife.fromSeed).toHaveBeenCalledWith(
        seed,
        0.7,
        100,
        100,
        StandardRules
      );
    });
  });
});
