import {countNeighbours } from "../js/gameOfLife/countNeighbours";

describe("count neighbours", () => {
    let grid = [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 1],
    ] 
    it("the center tile counts all 8 neighbours", () => {
        expect(countNeighbours(grid, {y: 1, x: 1})).toEqual(4);
    })
})