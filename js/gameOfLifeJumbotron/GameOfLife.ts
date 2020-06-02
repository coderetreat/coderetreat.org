import { Array2d } from "./Array2d";
import * as ABAB from "abab";
const seedrandom = require("seedrandom");

export const X = true;
export const O = false;

type Rules = {
  born: number[];
  survive: number[];
};

export const StandardRules = { born: [3], survive: [2, 3] };

export class GameOfLife {
  grid: Array2d<Boolean>;
  rules: Rules;

  constructor(initialGrid: Array2d<Boolean>, rules: Rules) {
    this.grid = initialGrid;
    this.rules = rules;
  }

  serialize() {
    let result =
      `B${this.rules.born.join("")}|` +
      `S${this.rules.survive.join("")}|` +
      `W${this.grid.width}|` +
      `H${this.grid.height}|G`;

    let array = new Uint8Array(
      Math.ceil((this.grid.width * this.grid.height) / 8)
    );
    let index = 0;
    let bufferIndex = 0;
    for (let y = 0; y < this.grid.height; y++) {
      for (let x = 0; x < this.grid.width; x++) {
        array[index] += (this.isAliveAt(x, y) ? 1 : 0) << bufferIndex++;
        if (bufferIndex === 8) {
          bufferIndex = 0;
          index++;
        }
      }
    }
    let grid = String.fromCharCode(...Array.from(array));
    return result + ABAB.btoa(grid);
  }

  countLivingNeighbours(x: number, y: number): number {
    let ymax = this.grid.height - 1;
    let xmax = this.grid.width - 1;
    let result = 0;
    for (let iy = y - 1; iy <= y + 1; iy++) {
      if (iy < 0 || iy > ymax) {
        continue;
      }
      for (let ix = x - 1; ix <= x + 1; ix++) {
        if ((ix == x && iy == y) || ix < 0 || ix > xmax) {
          continue;
        }
        result += this.grid.get(ix, iy) ? 1 : 0;
      }
    }
    return result;
  }

  tick() {
    this.grid = this.grid.map((isAlive, x, y) => {
      const livingNeighbours = this.countLivingNeighbours(x, y);

      if (isAlive && this.rules.survive.includes(livingNeighbours)) return true;
      if (!isAlive && this.rules.born.includes(livingNeighbours)) return true;

      return false;
    });
  }

  isAliveAt(x: number, y: number): Boolean {
    return this.grid.get(x, y);
  }

  static fromSeed(
    seed: any,
    probability: number,
    width: number,
    height: number,
    rules: Rules
  ) {
    const random = seedrandom(seed);
    return new GameOfLife(
      new Array2d(width, height, (x, y) => random() > probability),
      rules
    );
  }

  static fromPacked(packedString: string) {
    const [born, survive, widthStr, heightStr, gridStr] = packedString
      .split("|")
      .map((s) => s.substr(1));

    const grid = ABAB.atob(gridStr);
    const width = Number(widthStr);
    const height = Number(heightStr);

    const cells = [];
    for (let char of grid) {
      let data = char.charCodeAt(0);
      for (let i = 0; i < 8; i++) {
        let isAlive = ((data >> i) & 1) === 1;
        cells.push(isAlive);
      }
    }

    const array = new Array2d(
      width,
      height,
      (x, y) => cells[y * height + x] || false
    );

    return new GameOfLife(array, {
      born: born.split("").map(Number),
      survive: survive.split("").map(Number),
    });
  }
}
