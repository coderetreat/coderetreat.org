// a living cell with 2-3 living neighbours lives
// a dead cell with exactly 3 neighbours lives
// a living cell with 1 or fewer living neighbours dies
// a living cell with more than 3 neighbours dies
// a dead cell with != 3 living neighbours, stays dead

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
});

let isCellAliveInNextGeneration = (isCellAlive, numOfLivingNeighbours) => {
  return numOfLivingNeighbours > 1 && numOfLivingNeighbours < 4;
};
