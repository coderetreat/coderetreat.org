import {countNeighbours } from "../js/gameOfLife/countNeighbours";

describe("count neighbours", () => {
    let grid = [
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
    ] 
    it("the center tile counts all 8 neighbours", () => {
        expect(countNeighbours(grid, {y: 1, x: 1})).toEqual(7);
    })
    it("the edge tile count 5 neighbours", () => {
        expect(countNeighbours(grid, {y: 2, x: 1})).toEqual(5);
    })
    it("the edge tile count 5 neighbours", () => {
        expect(countNeighbours(grid, {y: 0, x: 1})).toEqual(5);
    })
})