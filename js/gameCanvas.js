import * as PIXI from "pixi.js";

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

// The application will create a canvas element for you that you
// can then insert into the DOM
// document.body.appendChild(app.view);

// load the texture we need
app.loader.add("bunny", "js/bunny.png").load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.bunny.texture);

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  var circle = new PIXI.Graphics();
  circle.beginFill(0x5cafe2);
  circle.drawCircle(0, 0, 80);
  circle.x = 320;
  circle.y = 180;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);
  app.stage.addChild(circle);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });
});
