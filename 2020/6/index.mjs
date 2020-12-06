export const part1 = (input) => {
    return input
        .split("\n\n")
        .map(g => countUniqueAnswers(g))
        .reduce((n, acc) => n + acc, 0);
}

export const part2 = (input) => {
    return input
        .split("\n\n")
        .map(g => countMatchingAnswers(g))
        .reduce((n, acc) => n + acc, 0);
}

const countUniqueAnswers = (group) => {
    let unique = new Set();
    group.split("\n").forEach(answers => {
        answers.split("").forEach(answer => {
            unique.add(answer);
        });
    });
    return unique.size;
}

const countMatchingAnswers = (group) => {
    const personsAnswers = group.split("\n");
    const nOfPerons = personsAnswers.length;

    let answersCounts = new Map();
    personsAnswers.forEach(answers => {
        answers.split("").forEach(answer => {
            if (!answersCounts.has(answer)) {
                answersCounts.set(answer, 0)
            }
            answersCounts.set(answer, answersCounts.get(answer) + 1);
        });
    });

    return Array.from(answersCounts.entries()).filter(([answer, count]) => {
        return count === nOfPerons;
    }).length;
}