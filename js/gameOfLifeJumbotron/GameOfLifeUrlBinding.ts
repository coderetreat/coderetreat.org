import * as qs from "qs";
import { GameOfLife } from "./GameOfLife";

export const tryInitializeFromHistory = () => {
  const urlParams = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  if (urlParams.seed) {
    let rules = { born: [3], survive: [2, 3] };
    if (urlParams.rules) {
      let match = /S(\d+)B(\d+)/.exec(<string>urlParams.rules);
      if (match) {
        rules = {
          survive: Array.from(match[1]).map(Number),
          born: Array.from(match[2]).map(Number),
        };
      }
    }
    const probability = urlParams.probability
      ? Number(urlParams.probability)
      : 0.7;
    return GameOfLife.fromSeed(
      <string>urlParams.seed,
      probability,
      100,
      100,
      rules
    );
  } else if (urlParams.state) {
    return GameOfLife.fromPacked(<string>urlParams.state);
  }
  return null;
};

type GameOfLifeUrlParameters = {
  seed?: String;
};

export const setUrlParameters = (params: GameOfLifeUrlParameters) => {
  window.history.pushState({}, null, "?" + qs.stringify(params));
};
