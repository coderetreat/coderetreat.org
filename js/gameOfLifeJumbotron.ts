import { GameController } from "./gameOfLifeJumbotron/GameController";
import { StandardRules, GameOfLife } from "./gameOfLifeJumbotron/GameOfLife";
import * as GameOfLifeUrlBinding from "./gameOfLifeJumbotron/GameOfLifeUrlBinding";

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

const shareButton = document.querySelector("#jumbotron-gol-control-share");
shareButton.addEventListener("click", (e) => {
  const url =
    window.location.origin +
    "?state=" +
    encodeURIComponent(controller.game.serialize());
  if ((<any>navigator).share) {
    (<any>navigator).share({
      url,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
  }
  history.pushState({}, "", url);
});

const nextTick = () => new Promise((resolve) => window.setTimeout(resolve));
let isFullscreen = false;

const overflowContainer = <HTMLElement>(
  container.querySelector("#gameOverflowContainer")
);

const goFullscreen = async () => {
  controller.graphicsController.viewport.pause = false;
  // Set position of container in absolute coordinates
  const { top, left, width, height } = container.getBoundingClientRect();
  document.documentElement.style.setProperty("--gol-top", top + "px");
  document.documentElement.style.setProperty("--gol-left", left + "px");
  document.documentElement.style.setProperty("--gol-width", width + "px");
  document.documentElement.style.setProperty("--gol-height", height + "px");

  // Prerender the game in fullscreen
  delete overflowContainer.style.bottom;
  delete overflowContainer.style.right;
  overflowContainer.style.width = "100vw";
  overflowContainer.style.height = "100vh";
  controller.graphicsController.resizeCanvas();

  document.body.classList.add("fullscreen");

  await nextTick();
  container.parentElement.classList.remove("fullscreen-reverse");
  container.parentElement.classList.add("fullscreen");

  isFullscreen = true;
};

const undoFullscreen = async () => {
  controller.graphicsController.viewport.pause = true;
  document.body.classList.remove("fullscreen");
  container.parentElement.classList.add("fullscreen-reverse");

  setTimeout(() => {
    container.parentElement.classList.remove("fullscreen");
    overflowContainer.style.width = "auto";
    overflowContainer.style.height = "auto";
    overflowContainer.style.right = "0px";
    overflowContainer.style.bottom = "0px";
    controller.graphicsController.resizeCanvas();
  }, 1000);
  isFullscreen = false;
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
