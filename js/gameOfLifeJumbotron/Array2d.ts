class Array2d<T> {
  width: number;
  height: number;
  backing: T[][];

  constructor(
    widthOrBacking: number | T[][],
    height?: number,
    initFn?: (x: number, y: number) => T
  ) {
    if (Array.isArray(widthOrBacking) && Array.isArray(widthOrBacking[0])) {
      const backing = widthOrBacking;
      this.height = backing.length;
      this.width = backing[0].length;
      this.backing = backing;
    } else {
      const width = <number>widthOrBacking;
      this.width = width;
      this.height = height;
      this.backing = new Array(height);
      for (let y = 0; y < height; y++) {
        this.backing[y] = new Array(width);
        for (let x = 0; x < width; x++) {
          this.backing[y][x] = initFn(x, y);
        }
      }
    }
  }

  get(x: number, y: number) {
    return this.backing[y][x];
  }

  map<U>(fn: (elem: T, x: number, y: number) => U) {
    const newBacking = new Array(this.height);
    for (let y = 0; y < this.height; y++) {
      newBacking[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        newBacking[y][x] = fn(this.backing[y][x], x, y);
      }
    }

    return new Array2d<U>(newBacking);
  }

  forEach(fn) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(this.backing[y][x], x, y);
      }
    }
  }

  forEachZippedWith<U>(
    other: Array2d<U>,
    fn: (values: [T, U], x: number, y: number) => any
  ) {
    let max_y = Math.min(this.height, other.height);
    let max_x = Math.min(this.width, other.width);

    for(let y = 0; y < max_y; y++) {
      for(let x = 0; x < max_x; x++) {
        fn([this.get(x, y), other.get(x, y)], x, y);
      }
    }
  }

  resize(
    newWidth: number,
    newHeight: number,
    inserter: (x: number, y: number) => T,
    remover: (value: T, x: number, y: number) => any
  ) {
    if(newWidth === this.width && newHeight === this.height) return this;
    this.forEach((value, x, y) => {
      if (x >= newWidth || y >= newHeight) {
        remover(value, x, y);
      }
    });

    return new Array2d(newWidth, newHeight, (x, y) => {
      if (x >= this.width || y >= this.height) return inserter(x, y);
      return this.get(x, y);
    });
  }

  toString() {
    return `[
  [${this.backing
    .map((row) => row.map((column) => JSON.stringify(column)).join(", "))
    .join("],\n  [")}]
]`;
  }
}

export { Array2d };
