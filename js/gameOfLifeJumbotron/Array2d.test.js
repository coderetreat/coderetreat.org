/**
 * @jest-environment node
 */
import { Array2d } from "./Array2d";
import Benchmark from "benchmark";

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
    const arr = new Array2d([[0], [1]]);
    expect(arr.get(0, 0)).toEqual(0);
    expect(arr.get(0, 1)).toEqual(1);
  });

  it("provides a map function to transform values", () => {
    const arr = new Array2d([
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
    const arr = new Array2d([
      [1, 2],
      [3, 4],
    ]);

    expect(arr.toString()).toEqual(`[
  [1, 2],
  [3, 4]
]`);
  });

  it("can be zipped with another 2d array", () => {
    const array1 = new Array2d([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    const array2 = new Array2d([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);

    const spy = jest.fn();

    array1.forEachZippedWith(array2, spy);

    expect(spy).toHaveBeenCalledTimes(6);
    expect(spy).toHaveBeenCalledWith([1, 1], 0, 0);
    expect(spy).toHaveBeenCalledWith([2, 2], 1, 0);
    expect(spy).toHaveBeenCalledWith([4, 3], 0, 1);
    expect(spy).toHaveBeenCalledWith([5, 4], 1, 1);
    expect(spy).toHaveBeenCalledWith([7, 5], 0, 2);
    expect(spy).toHaveBeenCalledWith([8, 6], 1, 2);
  });

  describe("#resize", () => {
    it("can be resized with an insertion and removal function", () => {
      const inserter = (x, y) => x + "/" + y;
      const remover = jest.fn();

      const arr = new Array2d([
        [0, 1],
        [2, 3],
      ]);
      const newArray = arr.resize(1, 3, inserter, remover);

      expect(newArray).toMatchObject({ width: 1, height: 3 });
      expect(newArray.get(0, 2)).toEqual("0/2");
      expect(remover).toHaveBeenCalledWith(1, 1, 0);
      expect(remover).toHaveBeenCalledWith(3, 1, 1);
    });

    it("can be resized with an insertion and removal function (mirror)", () => {
      const inserter = (x, y) => x + "/" + y;
      const remover = jest.fn();

      const arr = new Array2d([
        [0, 1],
        [2, 3],
      ]);
      const newArray = arr.resize(3, 1, inserter, remover);

      expect(newArray).toMatchObject({ width: 3, height: 1 });
      expect(newArray.get(2, 0)).toEqual("2/0");
      expect(remover).toHaveBeenCalledWith(2, 0, 1);
      expect(remover).toHaveBeenCalledWith(3, 1, 1);
    });

    it("supports shrinking", () => {
      const inserter = jest.fn();
      const remover = jest.fn();

      const arr = new Array2d([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ]);
      const newArray = arr.resize(2, 2, inserter, remover);

      expect(newArray).toMatchObject({ width: 2, height: 2 });
      expect(newArray.get(1, 1)).toEqual(4);

      expect(inserter).not.toHaveBeenCalled();
      expect(remover).toHaveBeenCalledTimes(5);
      expect(remover).toHaveBeenCalledWith(2, 2, 0);
      expect(remover).toHaveBeenCalledWith(5, 2, 1);
      expect(remover).toHaveBeenCalledWith(8, 2, 2);
      expect(remover).toHaveBeenCalledWith(6, 0, 2);
      expect(remover).toHaveBeenCalledWith(7, 1, 2);
    });
  });
});

// Disabled by default
xdescribe("Array2d - Benchmarking", () => {
  // Run this in-band (npm test -- -i) to disable parallelization
  it("should be fast on initialization", () => {
    const suite = new Benchmark.Suite();
    suite.add("Array2d#Init", () => {
      new Array2d(100, 100, (x, y) => x + "/" + y);
    });
    suite.on("cycle", function (event) {
      console.log(String(event.target));
    });
    suite.run();
  });

  it("should be fast on mapping", () => {
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#map", () => {
      array.map((value) => value.toUpperCase());
    });
    suite.on("cycle", function (event) {
      console.log(String(event.target));
    });
    suite.run();
  });

  it("should be fast on forEach", () => {
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#forEach", () => {
      array.forEach((value) => value.toUpperCase());
    });
    suite.on("cycle", function (event) {
      console.log(String(event.target));
    });
    suite.run();
  });

  it("should be fast on resize", () => {
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#resize", () => {
      array.resize(
        50,
        200,
        (x, y) => x + "/" + y,
        (elem) => elem.toUpperCase()
      );
    });
    suite.on("cycle", function (event) {
      console.log(String(event.target));
    });
    suite.run();
  });
});
