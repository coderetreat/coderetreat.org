import * as PIXI from "pixi.js";

const toRgb = (r, g, b) => {
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
    return [el, square];
  });
});

app.ticker.speed = 0.001;

let timePassed = 0;

// Listen for frame updates
app.ticker.add((delta) => {
  timePassed = (timePassed + delta * 1000 | 0);
  for (let y = 0; y < graphicsGrid.length; y++) {
    for (let x = 0; x < graphicsGrid[0].length; x++) {
      var square = graphicsGrid[y][x][1];
      var color = toRgb(timePassed, timePassed, timePassed);
      square.clear();
      square.beginFill(color);
      square.drawRect(x * 20, y * 20, 10, 10);
    }
  }
});
