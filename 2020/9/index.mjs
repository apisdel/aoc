export const part1 = (input) => {
    let numbers = input.split("\n")
        .map(n => parseInt(n));
    const preambleSize = 25;

    let preamble = numbers.slice(0, preambleSize);
    for (let i = preambleSize; i < numbers.length; i++) {
        let n = numbers[i];
        if (!sumsTo(preamble, n)) {
            return n;
        }
        preamble.shift();
        preamble.push(n);
    }
}

export const part2 = (input) => {
    const target = part1(input);

    let numbers = input.split("\n")
        .map(n => parseInt(n));

    let sum = 0;
    let list = [];
    let i = 0;
    while(i < numbers.length - 1) {
        const n = numbers[i];
        if (sum < target) {
            list.push(n);
            sum += n;
            i += 1; //only advance the pointer if we are adding a number to the list
        } else if (sum > target) {
            let first = list.shift();
            sum -= first;
        }

        if (sum === target) {
            //we are done here
            return Math.max(...list) + Math.min(...list);
        }
    }
}

const sumsTo = (numbers, sum) => {
    let map = new Map();
    numbers.forEach(n => {
        map.set(n, true);
    });

    for (let i = 0; i < numbers.length - 1; i++) {
        let n = numbers[i];
        if (map.has(sum - n)) {
            return true;
        }        
    }

    return false;
}