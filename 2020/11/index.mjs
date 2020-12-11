export const part1 = (input) => {
    let state = input.split('\n')
        .map(line => {
            return line.trim().split('');
        });

    const stepFunction = (state, row, col) => {
        const neighbours = getNeighbours(state, row, col);
        const occupiedNeighbours = neighbours.filter((s) => s === '#').length;
        if (state[row][col] === '#' && occupiedNeighbours >= 4) {
            return 'L';
        } else if (state[row][col] === 'L' && occupiedNeighbours === 0) {
            return '#';
        }
        return state[row][col];
    }

    state = runSimulation(state, stepFunction);
    return countOccurences(state, '#');
}

export const part2 = (input) => {
    let state = input.split('\n')
        .map(line => {
            return line.trim().split('');
        });

    const stepFunction = (state, row, col) => {
        const neighbours = getNeighboursRay(state, row, col, ['L', '#']); //different method of neighbours acquisition
        const occupiedNeighbours = neighbours.filter((s) => s === '#').length;
        if (state[row][col] === '#' && occupiedNeighbours >= 5) { //different rule
            return 'L';
        } else if (state[row][col] === 'L' && occupiedNeighbours === 0) {
            return '#';
        }
        return state[row][col];
    }

    state = runSimulation(state, stepFunction);
    return countOccurences(state, '#');
}

const runSimulation = (state, stepFunction) => {
    let changed = true;
    do {
        let result = gameStep(state, stepFunction);
        state = result.state;
        changed = result.changed;
    } while (changed);
    return state;
}

const gameStep = (state, stepFunction) => {
    const height = state.length;
    const width = state[0].length;
    let newState = Array(height).fill(null).map(() => Array(width).fill(null));
    let changed = false;

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            newState[row][col] = stepFunction(state, row, col);
            if (state[row][col] !== newState[row][col]) {
                changed = true;
            }
        }
    }

    return {
        'state': newState,
        'changed': changed
    }
}

const getNeighbours = (grid, row, col) => {
    const getCell = (grid, row, col) => {
        if (inBounds(grid, row, col)) {
            return grid[row][col];
        }
        return null;
    }

    let neighbours = [];
    neighbours.push(getCell(grid, row - 1, col - 1)); //NW
    neighbours.push(getCell(grid, row - 1, col));     //N
    neighbours.push(getCell(grid, row - 1, col + 1)); //NE
    neighbours.push(getCell(grid, row, col + 1));     //E
    neighbours.push(getCell(grid, row + 1, col + 1)); //SE
    neighbours.push(getCell(grid, row + 1, col));     //S
    neighbours.push(getCell(grid, row + 1, col - 1)); //SW
    neighbours.push(getCell(grid, row, col - 1));     //W
    return neighbours.filter(n => n !== null);
}

const getNeighboursRay = (grid, row, col, symbols) => {
    const getFirstAvailable = (grid, row, col, deltaRow, deltaCol) => {
        row += deltaRow;
        col += deltaCol;
        while(inBounds(grid, row, col)) {
            if (symbols.indexOf(grid[row][col]) >= 0) {
                return grid[row][col];
            } 
            row += deltaRow;
            col += deltaCol;
        }
        return null;
    }

    let neighbours = [];
    neighbours.push(getFirstAvailable(grid, row, col, -1, -1)); //NW
    neighbours.push(getFirstAvailable(grid, row, col, -1, 0));  //N
    neighbours.push(getFirstAvailable(grid, row, col, -1, 1));  //NE
    neighbours.push(getFirstAvailable(grid, row, col, 0, 1));   //E
    neighbours.push(getFirstAvailable(grid, row, col, 1, 1));   //SE
    neighbours.push(getFirstAvailable(grid, row, col, 1, 0));   //S
    neighbours.push(getFirstAvailable(grid, row, col, 1, -1));  //SW
    neighbours.push(getFirstAvailable(grid, row, col, 0, -1));  //W
    return neighbours.filter(n => n !== null);
}

const inBounds = (grid, row, col) => {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

const countOccurences = (grid, value) => {
    let count = 0;
    grid.forEach((row) => {
        count += row.filter((cell) => cell === value).length;
    })
    return count;
}

const stateToString = (state) => {
    return state.map(row => {
        return row.join('');
    }).join('\n');
}