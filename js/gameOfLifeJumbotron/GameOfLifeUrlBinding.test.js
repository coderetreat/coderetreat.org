/**
 * @jest-environment jsdom
 */
import * as qs from "qs";
import { GameOfLife, StandardRules } from "./GameOfLife";
import * as GameOfLifeUrlBinding from "./GameOfLifeUrlBinding";
jest.mock("./GameOfLife");

describe("GameOfLifeUrlBinding", () => {
  it("uses the ?seed and &rules parameters to initialize the Game if present", () => {
    window.history.replaceState({}, "", "?seed=hello&rules=S2B2");

    GameOfLifeUrlBinding.tryInitializeFromHistory();

    expect(GameOfLife.fromSeed).toHaveBeenCalledWith("hello", 0.7, 100, 100, {
      born: [2],
      survive: [2],
    });
  });

  it("allows to specify a packed game value", () => {
    const packed = "B3|S23|W1|H1|GAA==";
    window.history.replaceState({}, "", "?state=" + encodeURIComponent(packed));

    GameOfLifeUrlBinding.tryInitializeFromHistory();

    expect(GameOfLife.fromPacked).toHaveBeenCalledWith(packed);
  });
});

describe("Updating the url so it's shareable", () => {
  it("when randomly initializing", () => {
    GameOfLifeUrlBinding.setUrlParameters({ seed: "randomSeed" });

    expect(window.location.search).toContain("?seed=randomSeed");
  });
});
