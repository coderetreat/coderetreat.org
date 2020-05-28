import { GolApp } from "./gameOfLife/golApp";
import qs from "qs";
import seedrandom from "seedrandom";

const DEFAULT_OPTIONS = {
  seed: (Math.random() * 10000) | 0,
  autoStart: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

const createApp = ({ view, seed, autoStart }, opts) => {
  history.pushState({}, "", "?" + qs.stringify({ seed }));

  const random = seedrandom(seed);

  return new GolApp(
    {
      view,
      resizeTo: view.parentElement,
      antialias: true,
      autoDensity: true,
      resolution: 2,
      autoStart,
    },
    { ...opts, random }
  );
};

const options = {
  view: document.getElementById("gameCanvas"),
  ...DEFAULT_OPTIONS,
  ...qs.parse(window.location.search, { ignoreQueryPrefix: true }),
};

let app = createApp(options);

document
  .querySelector("#jumbotron-gol-control-shuffle")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const wasStarted = app.started;
    app.destroy();

    const oldCanvas = document.querySelector("#gameCanvas");
    const newCanvas = oldCanvas.cloneNode();
    oldCanvas.replaceWith(newCanvas);

    setTimeout(() => {
      app = createApp(
        {
          ...options,
          view: newCanvas,
          autoStart: wasStarted,
          seed: (Math.random() * 10000) | 0,
        },
        { tickEveryMs: app.tickEveryMs, alphaDelta: app.alphaDelta }
      );
    }, 0);
  });

document
  .querySelector("#jumbotron-gol-control-speed-slower")
  .addEventListener("click", (e) => {
    e.preventDefault();
    app.slower();
  });
document
  .querySelector("#jumbotron-gol-control-speed-reset")
  .addEventListener("click", (e) => {
    e.preventDefault();
    app.resetSpeed();
  });
document
  .querySelector("#jumbotron-gol-control-speed-faster")
  .addEventListener("click", (e) => {
    e.preventDefault();
    app.faster();
  });

document
  .querySelector(
    `#jumbotron-gol-control-pause ${!app.started ? ".fa-pause" : ".fa-play"}`
  )
  .classList.add("d-none");
document
  .querySelector("#jumbotron-gol-control-pause")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const shouldStart = !app.started;
    if (shouldStart) {
      app.start();
    } else {
      app.stop();
    }
    document
      .querySelector("#jumbotron-gol-control-pause [data-icon=pause]")
      .classList.toggle("d-none");
    document
      .querySelector("#jumbotron-gol-control-pause [data-icon=play]")
      .classList.toggle("d-none");
  });
