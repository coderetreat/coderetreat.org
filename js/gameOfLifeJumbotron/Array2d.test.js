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

describe("Array2d - Benchmarking", () => {
  it("should be fast on initialization", () => {
    //     Array2d#Init x 2,487 ops/sec ±0.27% (95 runs sampled)
    const suite = new Benchmark.Suite();
    suite.add("Array2d#Init", () => {
      new Array2d(100, 100, (x, y) => x + "/" + y);
    });
    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    suite.run();
  });

  it("should be fast on mapping", () => {
    //    Array2d#map x 1,635 ops/sec ±0.47% (96 runs sampled)
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#map", () => {
      array.map((value) => value.toUpperCase());
    });
    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    suite.run();
  });

  it("should be fast on forEach", () => {
    //    Array2d#forEach x 2,324 ops/sec ±0.77% (93 runs sampled)
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#forEach", () => {
      array.forEach((value) => value.toUpperCase());
    });
    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    suite.run();
  });

  it("should be fast on resize", () => {
    //    Array2d#resize x 1,484 ops/sec ±0.31% (95 runs sampled)
    const array = new Array2d(100, 100, (x, y) => x + "/" + y);
    const suite = new Benchmark.Suite();
    suite.add("Array2d#resize", () => {
      array.resize(50, 200, (x, y) => x+"/"+y, (elem) => elem.toUpperCase());
    });
    suite.on('cycle', function(event) {
      console.log(String(event.target));
    })
    suite.run();
  })
});
