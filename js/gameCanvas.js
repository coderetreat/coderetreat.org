import * as PIXI from "pixi.js";
import { computeNextGeneration } from "./gameOfLife/computeNextGen";

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

let { width, height } = view.parentElement.getBoundingClientRect();
const app = new PIXI.Application({
  view,
  resizeTo: view.parentElement,
  antialias: true,
});

const cellsContainer = new PIXI.Graphics();
app.stage.addChild(cellsContainer);
const drawGeneration = (currentGrid) => {
  cellsContainer.clear();
  for (let y = 0; y < currentGrid.length; y++) {
    for (let x = 0; x < currentGrid[0].length; x++) {
      var isCellAlive = currentGrid[y][x] === 1;
      if(!isCellAlive) continue;
      var color = 0xFFFFFF;
      cellsContainer.beginFill(color);
      cellsContainer.drawRect(x * 20, y * 20, 10, 10);
    }
  }
}


let secondsPassed = 0;
let nextSecond = 1;
let grid = [
  [1, 1, 1, 1],
  [1, 1, 0, 1],
];

// Listen for frame updates
app.ticker.add((delta) => {
  secondsPassed = (secondsPassed + delta/100);
  if(secondsPassed > nextSecond) {
    grid = computeNextGeneration(grid);
    drawGeneration(grid);
    nextSecond++;
  }
});
