import * as PIXI from "pixi.js";
import { computeNextGeneration } from "./gameOfLife/computeNextGeneration";

const toRgb = (r, g, b) => {
  r = r * 256 | 0;
  b = b * 256 | 0;
  g = g * 256 | 0;
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
});

const cellsContainer = new PIXI.Graphics();
app.stage.addChild(cellsContainer);
const drawGeneration = (currentGrid) => {
  cellsContainer.clear();
  var color = 0xFFFFFF;
  cellsContainer.beginFill(color);
for (let y = 0; y < currentGrid.length; y++) {
    for (let x = 0; x < currentGrid[0].length; x++) {
      var isCellAlive = currentGrid[y][x] === 1;
      if(!isCellAlive) continue;
      cellsContainer.drawCircle(x * 10, y * 10, 4);
    }
  }
}

let secondsPassed = 0;
let nextSecond = 1;

let { width, height } = app.screen;
let gridX = width/10 | 0;
let gridY = height/10 | 0;

let grid = Array(gridY).fill(0).map(() => Array(gridX).fill(0).map(() => Math.random() > 0.5 ? 1 : 0));
drawGeneration(grid);

// Listen for frame updates
app.ticker.add((delta) => {
  secondsPassed += delta/50;
  if (secondsPassed > nextSecond) {
    grid = computeNextGeneration(grid);
    drawGeneration(grid);
    nextSecond++;
  }
  
});
