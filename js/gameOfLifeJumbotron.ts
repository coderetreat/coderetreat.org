import { GameController } from "./gameOfLifeJumbotron/GameController";
import { StandardRules, GameOfLife } from "./gameOfLifeJumbotron/GameOfLife";
import * as GameOfLifeUrlBinding from "./gameOfLifeJumbotron/GameOfLifeUrlBinding";
import { Canvas } from "canvas";

let game = GameOfLifeUrlBinding.tryInitializeFromHistory();
if (!game) {
  const seed = String((Math.random() * 10000) | 0);
  game = GameOfLife.fromSeed(seed, 0.7, 100, 50, StandardRules);
  GameOfLifeUrlBinding.setUrlParameters({ seed });
}

const controller = new GameController(
  <HTMLCanvasElement>document.getElementById("gameCanvas"),
  game
);
controller.start();

const container = <HTMLElement>document.querySelector("#gameContainer");
document
  .querySelector("#jumbotron-gol-control-shuffle")
  .addEventListener("click", () => controller.shuffle());

const playPause = document.querySelector("#jumbotron-gol-control-pause");
const updateIconVisiblity = () => {
  if (controller.isRunning) {
    playPause.querySelector(".fa-play").classList.add("d-none");
    playPause.querySelector(".fa-pause").classList.remove("d-none");
  } else {
    playPause.querySelector(".fa-play").classList.remove("d-none");
    playPause.querySelector(".fa-pause").classList.add("d-none");
  }
};
updateIconVisiblity();
playPause.addEventListener("click", () => {
  if (controller.isRunning) {
    controller.pause();
  } else {
    controller.resume();
  }
  updateIconVisiblity();
});

const updateSpeedFactor = () =>
  (document.querySelector("#jumbotron-gol-control-speed-factor").innerHTML = `${
    ((controller.ups * 100) | 0) / 100
  }x`);

document
  .querySelector("#jumbotron-gol-control-speed-slower")
  .addEventListener("click", () => {
    controller.changeSpeed(1 / 2);
    updateSpeedFactor();
  });

document
  .querySelector("#jumbotron-gol-control-speed-faster")
  .addEventListener("click", () => {
    controller.changeSpeed(2);
    updateSpeedFactor();
  });

document
  .querySelector("#jumbotron-gol-control-speed-reset")
  .addEventListener("click", () => {
    controller.resetSpeed();
    updateSpeedFactor();
  });

let isFullscreen = false;
let originalBoundingRect;
const nextTick = () => new Promise((resolve) => window.setTimeout(resolve));
const overflowContainer = <HTMLElement>(
  container.querySelector("#gameOverflowContainer")
);

const goFullscreen = async () => {
  document.querySelector("#gameCanvasOverlay").classList.add("d-none");
  originalBoundingRect = container.getBoundingClientRect();
  const { top, left, width, height } = originalBoundingRect;
  container.style.zIndex = "1000";
  container.style.position = "fixed";
  container.style.top = top + "px";
  container.style.left = left + "px";
  container.style.width = width + "px";
  container.style.height = height + "px";

  delete overflowContainer.style.right;
  delete overflowContainer.style.bottom;
  overflowContainer.style.height = "100vh";
  overflowContainer.style.width = "100vw";
  overflowContainer.style.height = "100vh";
  controller.graphicsController.pixiApp.resize();

  await nextTick();
  container.style.transition = "all 1s ease-in-out 0s";
  await nextTick();
  container.style.top = "0px";
  container.style.left = "0px";
  container.style.width = "100vw";
  container.style.height = "100vh";
  const onEndOfTransition = (e) => {
    if (e.target !== container) return;
    console.log("Transition done");
    document.body.style.overflow = "hidden";
    container.style.transition = "";
    controller.graphicsController.pixiApp.resize();
    container.removeEventListener("transitionend", onEndOfTransition);
    isFullscreen = true;
  };
  container.addEventListener("transitionend", onEndOfTransition);
};

const undoFullscreen = () => {
  container.style.transition = "all 1s ease-in-out 0s";
  container.style.top = originalBoundingRect.top + "px";
  container.style.left = originalBoundingRect.left + "px";
  container.style.width = originalBoundingRect.width + "px";
  container.style.height = originalBoundingRect.height + "px";
  document.body.style.overflow = "auto";

  const onEndOfTransition = (e) => {
    if (e.target !== container) return;
    document.querySelector("#gameCanvasOverlay").classList.remove("d-none");
    container.style.zIndex = "0";
    container.style.transition = "";
    container.style.position = "absolute";
    container.style.top = "0px";
    container.style.left = "0px";
    container.style.right = "0px";
    container.style.bottom = "0px";
    container.style.width = "auto";
    container.style.height = "auto";

    overflowContainer.style.width = "auto";
    overflowContainer.style.height = "auto";
    controller.graphicsController.pixiApp.resize();

    container.removeEventListener("transitionend", onEndOfTransition);
    isFullscreen = false;
  };
  container.addEventListener("transitionend", onEndOfTransition);
};

const fullscreenToggle = document.querySelector(
  "#jumbotron-gol-control-fullscreen"
);

fullscreenToggle.addEventListener("click", () => {
  if (!isFullscreen) {
    goFullscreen();
    fullscreenToggle.querySelector(".fa-expand").classList.add("d-none");
    fullscreenToggle.querySelector(".fa-compress").classList.remove("d-none");
  } else {
    undoFullscreen();
    fullscreenToggle.querySelector(".fa-expand").classList.remove("d-none");
    fullscreenToggle.querySelector(".fa-compress").classList.add("d-none");
  }
});
