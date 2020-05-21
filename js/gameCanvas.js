import * as PIXI from "pixi.js";
import { computeNextGeneration } from "./gameOfLife/computeNextGeneration";

const toRgb = (r, g, b) => {
  r = (r * 256) | 0;
  b = (b * 256) | 0;
  g = (g * 256) | 0;
  let color = (r % 256) * 256 * 256 + (g % 256) * 256 + (b % 256);
  return color;
};

const view = document.getElementById("gameCanvas");
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

const app = new PIXI.Application({
  view,
  resizeTo: view.parentElement,
  antialias: true,
  autoDensity: true,
  resolution: 2,
});

let cellSize = 14;

let { width, height } = app.screen;
let gridX = (width / cellSize) | 0;
let gridY = (height / cellSize) | 0;

let grid = Array(gridY)
  .fill(0)
  .map(() =>
    Array(gridX)
      .fill(0)
      .map(() => (Math.random() > 0.9 ? 1 : 0))
  );

let graphics = grid.map((row, y) =>
  row.map((_, x) => {
    let point = new PIXI.Graphics();
    point.x = x * cellSize;
    point.y = y * cellSize;
    app.stage.addChild(point);
    return point;
  })
);

const drawGeneration = (currentGrid, oldGrid) => {
  for (let y = 0; y < currentGrid.length; y++) {
    for (let x = 0; x < currentGrid[0].length; x++) {
      if (oldGrid && currentGrid[y][x] == oldGrid[y][x]) continue;

      let isCellAlive = currentGrid[y][x] === 1;
      let point = graphics[y][x];
      point.clear();
      if (isCellAlive) {
        point.beginFill(0xffffff);
        point.drawCircle(cellSize/2, cellSize/2, (cellSize - 2) / 2);
      }
    }
  }
};

let secondsPassed = 0;
let nextSecond = 1;

drawGeneration(grid);

let timeInMs = 0;
let tickEveryMs = 500;

// Listen for frame updates
app.ticker.add((delta) => {
  timeInMs += app.ticker.elapsedMS;
  if (timeInMs > tickEveryMs) {
    timeInMs = timeInMs % tickEveryMs;
    let oldGrid = grid;
    grid = computeNextGeneration(grid);
    drawGeneration(grid, oldGrid);
  }
});
