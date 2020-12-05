export const part1 = (input) => {
    let answer = input
        .split("\n")
        .filter(l => l !== "")
        .map(parse)
        .filter(validator1)
        .length;

    return answer;
}

export const part2 = (input) => {
    let answer = input
        .split("\n")
        .filter(l => l !== "")
        .map(parse)
        .filter(validator2)
        .length;

    return answer;
}

const parse = (str) => {
    const parts = str.split(' ');
    let [range, letter, password] = parts; 
    let [from, to] = range.split('-').map(n => parseInt(n));
    letter = letter.replace(":", "");

    return {
        from,
        to,
        letter,
        password
    };
}

const validator1 = (input) => {
    const {from, to, letter, password} = input;
    let count = password.split("").filter(l => l === letter).length;
    return count >= from && count <= to;
}

const validator2 = (input) => {
    let {from, to, letter, password} = input;
    from -= 1;
    to -= 1;

    return (password[from] === letter && password[to] !== letter)
        || (password[from] !== letter && password[to] === letter);
}

