class Array2d {
  constructor(width, height, initFn) {
    this.width = width;
    this.height = height;
    this.backing = new Array(height)
      .fill(undefined)
      .map((_, y) =>
        new Array(width).fill(undefined).map((_, x) => initFn(x, y))
      );
  }

  get(x, y) {
    return this.backing[y][x];
  }

  map(fn) {
    return new Array2d(this.width, this.height, (x, y) =>
      fn(this.get(x, y), x, y)
    );
  }

  forEach(fn) {
    return this.backing.forEach((row, y) =>
      row.forEach((value, x) => fn(value, x, y))
    );
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

  static fromArray(arr) {
    return new Array2d(arr[0].length, arr.length, (x, y) => arr[y][x]);
  }
}

describe("Array2d", () => {
  it("initializes using a map function", () => {
    const arr = new Array2d(5, 5, (x, y) => x + "/" + y);

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        expect(arr.get(x, y)).toEqual(x + "/" + y);
      }
    }
  });

  it("can be initialized from a two dimensional primitive array", () => {
    const arr = Array2d.fromArray([[0], [1]]);
    expect(arr.get(0, 0)).toEqual(0);
    expect(arr.get(0, 1)).toEqual(1);
  });

  it("provides a map function to transform values", () => {
    const arr = Array2d.fromArray([
      [1, 2],
      [3, 4],
    ]);
    const newArr = arr.map((value, x, y) => value + "@" + x + "/" + y);
    expect(newArr.get(0, 0)).toEqual("1@0/0");
    expect(newArr.get(1, 0)).toEqual("2@1/0");
    expect(newArr.get(0, 1)).toEqual("3@0/1");
    expect(newArr.get(1, 1)).toEqual("4@1/1");
  });

  it("provides a toString method", () => {
    const arr = Array2d.fromArray([
      [1, 2],
      [3, 4],
    ]);

    expect(arr.toString()).toEqual(`[
  [1, 2],
  [3, 4]
]`);
  });

  it("can be resized with an insertion and removal function", () => {
    const inserter = (x, y) => x + "/" + y;
    const remover = jest.fn();

    const arr = Array2d.fromArray([
      [0, 1],
      [2, 3],
    ]);
    const newArray = arr.resize(1, 3, inserter, remover);

    expect(newArray).toMatchObject({ width: 1, height: 3 });
    expect(newArray.get(0, 2)).toEqual("0/2");
    expect(remover).toHaveBeenCalledWith(1, 1, 0);
    expect(remover).toHaveBeenCalledWith(3, 1, 1);
  });
});
