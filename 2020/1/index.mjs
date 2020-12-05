export const part1 = (input) => {
    let numbers = input
        .split("\n")
        .map(n => parseInt(n))
        .filter(n => !isNaN(n));

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i];
        if (numbers.indexOf(2020 - n) >= 0) {
            return(n * (2020 - n));
        }
    }

    return 0;
}

export const part2 = (input) => {
    let numbers = input
        .split("\n")
        .map(n => parseInt(n))
        .filter(n => !isNaN(n));

    let pairSums = [];
    let pairProducts = [];
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i; j < numbers.length; j++) {
            pairSums.push(numbers[i] + numbers[j])
            pairProducts.push(numbers[i] * numbers[j]);
        }
    }

    for (let i = 0; i < numbers.length; i++) {
        const n = numbers[i];
        const foundIndex = pairSums.indexOf(2020 - n);
        if (foundIndex >= 0) {
            return n * pairProducts[foundIndex];
        }
    }
}