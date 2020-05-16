// a living cell with 2-3 living neighbours lives
// a dead cell with exactly 3 neighbours lives
// a living cell with 1 or fewer living neighbours dies
// a living cell with more than 3 neighbours dies
// a dead cell with != 3 living neighbours, stays dead

import { isCellAliveInNextGeneration } from "../js/gameOfLife/rules";

describe("the standard rules", () => {
  [2, 3].forEach((numOfLivingNeighbours) => {
    describe("a living cell with 2-3 living neighbours lives", () => {
      it(`${numOfLivingNeighbours} living neighbours`, () => {
        let livingCell = true;

        let result = isCellAliveInNextGeneration(
          livingCell,
          numOfLivingNeighbours
        );

        expect(result).toEqual(true);
      });
    });
  });

  it("a living cell with 1 or fewer living neighbours dies", () => {
    let livingCell = true;
    let numOfLivingNeighbours = 1;

    let result = isCellAliveInNextGeneration(livingCell, numOfLivingNeighbours);

    expect(result).toEqual(false);
  });

  it("a living cell with more than 3 living neighbours dies", () => {
    let livingCell = true;
    let numOfLivingNeighbours = 4;

    let result = isCellAliveInNextGeneration(livingCell, numOfLivingNeighbours);

    expect(result).toEqual(false);
  });

  describe("a dead cell with anything but 3 living neighbours stays dead", () => {
    it("2 living neighbours", () => {
      let livingCell = false;
      let numOfLivingNeighbours = 2;

      let result = isCellAliveInNextGeneration(
        livingCell,
        numOfLivingNeighbours
      );

      expect(result).toEqual(false);
    });
  });

  it("a dead cell with 3 living neighbours comes alive", () => {
    let livingCell = false;
    let numOfLivingNeighbours = 3;

    let result = isCellAliveInNextGeneration(livingCell, numOfLivingNeighbours);

    expect(result).toEqual(true);
  });
});
