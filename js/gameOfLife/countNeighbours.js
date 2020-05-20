const countNeighbours = (grid, {y, x}) => {
    let ymax = grid.length - 1;
    let xmax = grid[0].length - 1;
    let result = 0;
    for(let iy=y-1; iy<=y+1; iy++) {
        if (iy < 0 || iy > ymax) {
            continue;
        }
        for(let ix=x-1; ix<=x+1; ix++) {
            if ((ix == x && iy ==y) || ix < 0 || ix > xmax) {
                continue;
            }
            result += grid[iy][ix];
        }
    }
    return result;
}

export {countNeighbours};