// a living cell with 2-3 living neighbours lives
// a dead cell with exactly 3 neighbours lives
// a living cell with 1 or fewer living neighbours dies
// a living cell with 4-8 neighbours dies

describe("the standard rules", () => {
  describe("a living cell with 2-3 living neighbours lives", () => {
    it("3 living neighbours", () => {
      let livingCell = true;
      let numOfLivingNeighbours = 3;

      let result = isCellAliveInNextGeneration(
        livingCell,
        numOfLivingNeighbours
      );

      expect(result).toEqual(true);
    });
  });

  it("a living cell with 1 or fewer living neighbours dies", () => {
    let livingCell = true;
    let numOfLivingNeighbours = 1;

    let result = isCellAliveInNextGeneration(livingCell, numOfLivingNeighbours);

    expect(result).toEqual(false);
  });
});

let isCellAliveInNextGeneration = (isCellAlive, numOfLivingNeighbours) => {
  return numOfLivingNeighbours > 1;
};
