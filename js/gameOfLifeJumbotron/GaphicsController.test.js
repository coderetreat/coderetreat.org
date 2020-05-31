/**
 * @jest-environment jsdom
 */
import * as PIXI from "pixi.js";
import { GraphicsController } from "./GraphicsController";
jest.mock("pixi.js", () => ({
  Graphics: jest.fn(),
  Application: jest.fn().mockImplementation(({ view }) => ({
    ticker: {},
    screen: view,
    stage: jest.fn().mockImplementation(() => ({
      addChild: jest.fn(),
    })),
  })),
}));

describe("GraphicsController", () => {
  let container, element, controller;

  beforeEach(() => {
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
      gap: 4,
      fps: 30,
    });
    expect(PIXI.Application).toHaveBeenCalledWith({
      view: element,
      resizeTo: element.parentElement,
      antialias: true,
      autoDensity: true,
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
      gap: 4,
      fps: 30,
    });

    expect(PIXI.Graphics).toHaveBeenCalledTimes(6);
    expect(controller.pixiApp.stage.addChild).toHaveBeenCalledTimes(6);
  });
});
