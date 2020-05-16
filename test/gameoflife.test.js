// a living cell with 2-3 living neighbours lives
// a dead cell with exactly 3 neighbours lives
// a living cell with 4+ neighbours dies
// a living cell with 1 or fewer living neighbours dies

// given when then

describe("the standard rules", () => {
  it("a living cell with 3 living neighbours lives", () => {
    let isCellAlive = true;
    let numOfLivingNeighbours = 3;

    let result = isCellAliveInNextGeneration(
      isCellAlive,
      numOfLivingNeighbours
    );

    expect(result).toEqual(true);
  });
});

let isCellAliveInNextGeneration = (isCellAlive, numOfLivingNeighbours) => {
  return true;
};
