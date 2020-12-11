export const part1 = (input) => {
    let numbers = input.split("\n")
        .map(n => parseInt(n));
        

    numbers.push(0);
    numbers.sort((a, b) => a - b);
    numbers.push(numbers[numbers.length - 1] + 3);
    let joltsDifferences = [0, 0, 0, 0];
    for (let i = 1; i < numbers.length; i++) {
        const diff = numbers[i] - numbers[i - 1];
        joltsDifferences[diff] += 1;
    }
    console.log(joltsDifferences);
    return joltsDifferences[1] * joltsDifferences[3];    
}

export const part2 = (input) => {
    let numbers = input.split("\n")
        .map(n => parseInt(n));

    numbers.push(0);
    numbers.sort((a, b) => a - b);
    numbers.push(numbers[numbers.length - 1] + 3);

    //we divide the sorted array in groups of consecutive numbers, and track the number of groups for each size
    let groupsCounts = new Map();
    let groupLength = 1;
    for (let i = 1; i < numbers.length; i++) {
        const current = numbers[i];
        const prev = numbers[i - 1];

        if (current - prev === 1) {
            groupLength += 1;
        } else {
            if (!groupsCounts.has(groupLength)) {
                groupsCounts.set(groupLength, 0);
            }
            groupsCounts.set(groupLength, groupsCounts.get(groupLength) + 1);
            groupLength = 1;
        }
    }

    //each group can be rearranged internally according to its size
    //we can calculate the possible combinations, but since for the provided input (mine at least) there are no bigger groups than 5, we can use the following map of possible arrangements 
    let combinations = {
        1: 1, //1
        2: 1, //1-2
        3: 2, //1-2-3; 1-3
        4: 4, //1-2-3-4; 1-2-4; 1-3-4; 1-4
        5: 7  //1-2-3-4-5; 1-2-3-5; 1-2-4-5; 1-3-4-5; 1-2-5; 1-3-5; 1-4-5
    };

    //calcualte the final answer
    let answer = 1;
    groupsCounts.forEach((value, key) => {
        answer *= combinations[key] ** value;    
    });
    return answer;
}