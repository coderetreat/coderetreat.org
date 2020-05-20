import { isCellAliveInNextGeneration } from "./rules";
import { countNeighbours } from "./countNeighbours";

const computeNextGeneration = (oldGrid) => {
  const newGrid = oldGrid.map(columns => columns.map((cell) => cell));
  for (let y = 0; y < oldGrid.length; y++) {
    for (let x = 0; x < oldGrid[0].length; x++) {
      let neighboursAlive = countNeighbours(oldGrid, { y, x });
      newGrid[y][x] = isCellAliveInNextGeneration(
        oldGrid[y][x] === 1, 
        neighboursAlive
      ) ? 1 : 0
    }
  }

  return newGrid;
}

export { computeNextGeneration };