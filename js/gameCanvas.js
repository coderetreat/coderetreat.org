import * as PIXI from "pixi.js";
import { computeNextGeneration } from "./gameOfLife/computeNextGeneration";

const CELL_SIZE = 20;
const TICK_EVERY_MS = 3000;
const ALPHA_DELTA = 0.01;
const SEED_THRESHOLD = 0.7;

const view = document.getElementById("gameCanvas");
const app = new PIXI.Application({
  view,
  resizeTo: view.parentElement,
  antialias: true,
  autoDensity: true,
  resolution: 2,
});

let { width, height } = app.screen;
let gridX = (width / CELL_SIZE) | 0;
let gridY = (height / CELL_SIZE) | 0;

let grid = Array(gridY)
  .fill(0)
  .map(() =>
    Array(gridX)
      .fill(0)
      .map(() => (Math.random() > SEED_THRESHOLD ? 1 : 0))
  );

let graphics = grid.map((row, y) =>
  row.map((_, x) => {
    let point = new PIXI.Graphics();
    point.interactive = true;
    point.x = x * CELL_SIZE;
    point.y = y * CELL_SIZE;
    point.alpha = 0;
    point.alphaDelta = grid[y][x] == 1 ? ALPHA_DELTA : -ALPHA_DELTA;
    point.beginFill(0xffffff);
    point.drawCircle(CELL_SIZE / 2, CELL_SIZE / 2, (CELL_SIZE - 2) / 2);
    app.stage.addChild(point);
    return point;
  })
);

const drawGeneration = (delta) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let point = graphics[y][x];
      point.alpha = Math.max(
        0,
        Math.min(1, point.alpha + point.alphaDelta * delta)
      );
    }
  }
};

const updateAlphaDelta = () => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      let point = graphics[y][x];
      point.alphaDelta = grid[y][x] == 1 ? ALPHA_DELTA : -ALPHA_DELTA;
    }
  }
};

let secondsPassed = 0;
let nextSecond = 1;

drawGeneration(0);
updateAlphaDelta();
let timeInMs = 0;

// Listen for frame updates
app.ticker.add((delta) => {
  timeInMs += app.ticker.elapsedMS;
  if (timeInMs > TICK_EVERY_MS) {
    timeInMs = timeInMs % TICK_EVERY_MS;
    grid = computeNextGeneration(grid);
    updateAlphaDelta();
  }
  drawGeneration(delta);
});
