const calculateId = (code) => {
    //replace with 0/1 and convert the resulting binary to decimal
    return parseInt(code.replace(/[F|L]/g, 0).replace(/[B|R]/g, 1), 2);
}

export const part1 = (input) => {
    let ids = input
        .split("\n")
        .map(n => calculateId(n));

    return Math.max(...ids);
}

export const part2 = (input) => {
    let ids = input
        .split("\n")
        .map(n => calculateId(n));

    ids.sort((a, b) => a - b);
    for (let i = 1; i < ids.length - 2; i++) {
        const prev = ids[i - 1];
        const next = ids[i + 1];

        if (next - prev !== 2) {
            return ids[i] + 1;
        }
    }
    
}