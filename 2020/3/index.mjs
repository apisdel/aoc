export const part1 = (input) => {
    let map = input
        .split("\n")
        .filter(l => l !== "")
        .map(l => l.split(""));

    return countTrees(map, [3, 1]);
}

export const part2 = (input) => {
    let map = input
        .split("\n")
        .filter(l => l !== "")
        .map(l => l.split(""));

    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    let answers = [];
    slopes.forEach((slope) => {
        answers.push(countTrees(map, slope));
    });

    //console.log(answers);
    return answers.reduce((n, acc) => n * acc, 1);
}

const countTrees = (map, slope) => {
    const height = map.length;
    const width = map[0].length;

    const [right, down] = slope;
    let row = 0;
    let col = 0;
    let trees = 0;
    while(row < height) {
        if (map[row][col] === '#') {
            trees += 1;
        }

        col = (col + right) % width;
        row += down;
    }
    return trees;
}