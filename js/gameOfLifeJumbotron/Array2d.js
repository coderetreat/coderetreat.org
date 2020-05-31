const fastInit = (width, height, initFn) => {
  const array = new Array(height);
  for (let y = 0; y < height; y++) {
    array[y] = new Array(width);
    for (let x = 0; x < width; x++) {
      array[y][x] = initFn(x, y);
    }
  }
  return array;
};

class Array2d {
  constructor(widthOrBacking, height, initFn) {
    if (Array.isArray(widthOrBacking) && Array.isArray(widthOrBacking[0])) {
      const backing = widthOrBacking;
      this.height = backing.length;
      this.width = backing[0].length;
      this.backing = backing;
    } else {
      const width = widthOrBacking;
      this.width = width;
      this.height = height;
      this.backing = fastInit(width, height, initFn);
    }
  }

  get(x, y) {
    return this.backing[y][x];
  }

  map(fn) {
    const newBacking = new Array(this.height);
    for (let y = 0; y < this.height; y++) {
      newBacking[y] = new Array(this.width);
      for (let x = 0; x < this.width; x++) {
        newBacking[y][x] = fn(this.backing[y][x], x, y);
      }
    }

    return new Array2d(newBacking);
  }

  forEach(fn) {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        fn(this.backing[y][x], x, y);
      }
    }
  }

  resize(newWidth, newHeight, inserter, remover) {
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
