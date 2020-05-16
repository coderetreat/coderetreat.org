export const isCellAliveInNextGeneration = (
  isCellAlive,
  numOfLivingNeighbours
) => {
  return (
    (numOfLivingNeighbours == 2 && isCellAlive) || numOfLivingNeighbours == 3
  );
};
