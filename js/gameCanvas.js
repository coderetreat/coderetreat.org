import * as PIXI from "pixi.js";

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

var grid = [
  [1, 1, 1, 1],
  [1, 1, 0, 1],
];

var graphicsGrid = grid.map((row) => {
  return row.map((el) => {
    var square = new PIXI.Graphics();
    app.stage.addChild(square);
    return square;
  });
});

const computeNextGeneration = () => {
  console.log("Next gen");
}

const drawGeneration = () => {
  for (let y = 0; y < graphicsGrid.length; y++) {
    for (let x = 0; x < graphicsGrid[0].length; x++) {
      
      var square = graphicsGrid[y][x];
      var color = toRgb(1, 1, 1);
      square.clear();
      square.beginFill(color);
      square.drawRect(x * 20, y * 20, 10, 10);
    }
  }
}


let secondsPassed = 0;
let nextSecond = 1;

// Listen for frame updates
app.ticker.add((delta) => {
  secondsPassed = (secondsPassed + delta/100);
  if(secondsPassed > nextSecond) {
    computeNextGeneration();
    drawGeneration();
    nextSecond++;
  }
});
