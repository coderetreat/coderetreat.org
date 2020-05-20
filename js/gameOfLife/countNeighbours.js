const countNeighbours = (grid, {y, x}) => {
    let result = 0;
    for(let iy=y-1; iy<=y+1; iy++) {
        for(let ix=x-1; ix<=x+1; ix++) {
            if (ix == x && iy ==y) {
                continue;
            }
            result += grid[iy][ix];
        }
    }
    return result;
}

export {countNeighbours};