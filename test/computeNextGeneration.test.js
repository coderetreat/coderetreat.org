import { computeNextGeneration } from "../js/gameOfLife/computeNextGeneration";
import { countNeighbours } from "../js/gameOfLife/countNeighbours";
import { isCellAliveInNextGeneration } from "../js/gameOfLife/rules";


jest.mock("../js/gameOfLife/rules");
jest.mock("../js/gameOfLife/countNeighbours")

describe("Computing the next generation", () => {
    it("counts the number of neighbours for each cell", () => {
        const grid = [[0]];

        computeNextGeneration(grid);

        expect(countNeighbours).toHaveBeenCalledWith(grid, { y: 0, x: 0 });
    });

    it("should pass the count of neighbours to the rule functioN", () => {
        countNeighbours.mockReturnValue(1);
        const grid = [[0]];

        computeNextGeneration(grid);

        expect(isCellAliveInNextGeneration).toHaveBeenCalledWith(false, 1);
    });

    it("returns a new grid with the rules applied to every cell", () => {
        countNeighbours.mockReturnValue(0);
        isCellAliveInNextGeneration.mockReturnValue(true);
        const grid = [[0, 0, 0]];

        expect(computeNextGeneration(grid)).toEqual([[1, 1, 1]])
    });
})