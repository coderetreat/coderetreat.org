/**
 * @jest-environment jsdom
 */
import * as PIXI from "pixi.js";
import { GraphicsController } from "./GraphicsController";
import { GameOfLife, X, O, StandardRules } from "./GameOfLife";
import { Array2d } from "./Array2d";

jest.mock("pixi.js", () => ({
  Graphics: jest.fn().mockImplementation(() => ({
    beginFill: jest.fn(),
    drawCircle: jest.fn(),
  })),
  Application: jest.fn().mockImplementation(({ view }) => ({
    ticker: {},
    renderer: { plugins: { interaction: {} } },
    screen: view,
    stage: {
      addChild: jest.fn(),
      removeChild: jest.fn(),
    },
  })),
}));

describe("GraphicsController", () => {
  let container, element, controller;

  beforeEach(() => {
    jest.clearAllMocks();
    container = document.createElement("div");
    element = document.createElement("canvas");
    element.width = 1;
    element.height = 1;
    container.appendChild(element);
  });

  it("initializes Pixi with preset optins", () => {
    controller = new GraphicsController({
      element,
      radius: 20,
      fadeFactor: 1,
      gap: 4,
      fps: 30,
    });
    expect(PIXI.Application).toHaveBeenCalledWith({
      view: element,
      resizeTo: element.parentElement,
      antialias: true,
      autoDensity: true,
      transparent: true,
      resolution: 2,
      autoStart: false,
    });
    expect(controller.pixiApp.ticker.maxFPS).toEqual(30);
    expect(element.style).toMatchObject({ "touch-action": "auto" });
  });

  it("creates as many dots as it can fit on the screen", () => {
    element.width = 100;
    element.height = 50;
    controller = new GraphicsController({
      element,
      radius: 20,
      fadeFactor: 1,
      gap: 4,
      fps: 30,
    });

    const game = new GameOfLife(
      new Array2d([
        [X, O, X],
        [X, X, X],
      ]),
      StandardRules
    );
    controller.updateFromGame(game);

    expect(PIXI.Graphics).toHaveBeenCalledTimes(6);
    expect(controller.viewport.addChild).toHaveBeenCalledTimes(6);

    const dotInstances = PIXI.Graphics.mock.results.map(({ value }) => value);
    expect(
      dotInstances.some((graphic) => graphic.x == 24 && graphic.y == 24)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 68 && graphic.y == 24)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 112 && graphic.y == 24)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 24 && graphic.y == 68)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 68 && graphic.y == 68)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 112 && graphic.y == 68)
    ).toBeTruthy();
  });

  it("supports resizing the dots", () => {
    element.width = 100;
    element.height = 50;
    controller = new GraphicsController({
      element,
      radius: 20,
      fadeFactor: 1,
      gap: 4,
      fps: 30,
    });

    const game = new GameOfLife(
      new Array2d([
        [X, O, X],
        [X, X, X],
        [X, X, X],
        [X, X, X],
      ]),
      StandardRules
    );
    controller.updateFromGame(game);

    PIXI.Graphics.mockClear();
    controller.viewport.addChild.mockClear();
    controller.resizeDots(game, 10, 4);

    expect(PIXI.Graphics).toHaveBeenCalledTimes(9);
    expect(controller.viewport.addChild).toHaveBeenCalledTimes(9);

    const dotInstances = PIXI.Graphics.mock.results.map(({ value }) => value);
    expect(
      dotInstances.some((graphic) => graphic.x == 14 && graphic.y == 14)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 38 && graphic.y == 14)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 62 && graphic.y == 14)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 14 && graphic.y == 38)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 38 && graphic.y == 38)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 62 && graphic.y == 38)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 14 && graphic.y == 62)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 38 && graphic.y == 62)
    ).toBeTruthy();
    expect(
      dotInstances.some((graphic) => graphic.x == 62 && graphic.y == 62)
    ).toBeTruthy();
  });

  it("provides the app ticker", () => {
    element.width = 48;
    element.height = 24;
    controller = new GraphicsController({
      element,
      fadeFactor: 1,
      radius: 20,
      gap: 4,
      fps: 30,
    });

    expect(controller.ticker).toEqual(controller.pixiApp.ticker);
  });

  describe("drawing", () => {
    it("will initialize the alpha delta value so living cells will fade in", () => {
      element.width = 48;
      element.height = 24;
      controller = new GraphicsController({
        element,
        fadeFactor: 1,
        radius: 20,
        gap: 4,
        fps: 30,
      });

      const game = new GameOfLife(new Array2d([[X, O]]));
      controller.updateFromGame(game);

      expect(PIXI.Graphics.mock.results[0].value.alphaDelta).toEqual(1 / 30);
      expect(PIXI.Graphics.mock.results[0].value.alpha).toEqual(0);
      expect(PIXI.Graphics.mock.results[1].value.alphaDelta).toEqual(-1 / 30);
      expect(PIXI.Graphics.mock.results[1].value.alpha).toEqual(0);
    });

    it("will immediately show all living cells if fadeFactor is false", () => {
      element.width = 48;
      element.height = 24;
      controller = new GraphicsController({
        element,
        fadeFactor: false,
        radius: 20,
        gap: 4,
        fps: 30,
      });

      const game = new GameOfLife(new Array2d([[X, O]]));
      controller.updateFromGame(game);

      expect(PIXI.Graphics.mock.results[0].value.alpha).toEqual(1);
      expect(PIXI.Graphics.mock.results[1].value.alpha).toEqual(0);
    });

    it("advances the alpha value on every tick", () => {
      element.width = 48;
      element.height = 24;
      controller = new GraphicsController({
        element,
        fadeFactor: 1,
        radius: 20,
        gap: 4,
        fps: 30,
      });

      const game = new GameOfLife(new Array2d([[X, O]]));
      controller.updateFromGame(game);
      controller.updateAlphaValues(2);

      expect(PIXI.Graphics.mock.results[0].value.alpha).toEqual(2 / 30);
      expect(PIXI.Graphics.mock.results[1].value.alpha).toEqual(0);
    });

    it("updates the alphaDelta on every updateFromGame tick", () => {
      element.width = 48;
      element.height = 24;
      controller = new GraphicsController({
        element,
        fadeFactor: 1,
        radius: 20,
        gap: 4,
        fps: 30,
      });

      const game = new GameOfLife(new Array2d([[X, O]]), StandardRules);
      controller.updateFromGame(game);
      game.tick();
      controller.updateFromGame(game);

      expect(PIXI.Graphics.mock.results[0].value.alphaDelta).toEqual(-1 / 30);
      expect(PIXI.Graphics.mock.results[1].value.alphaDelta).toEqual(-1 / 30);
    });
  });
});
