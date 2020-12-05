const calculateId = (code) => {
    //replace with 0/1 and convert the resulting binary to decimal
    const row = parseInt(code.slice(0, 7).toString().replace(/F/g, 0).replace(/B/g, 1), 2);
    const col = parseInt(code.slice(7).toString().replace(/L/g, 0).replace(/R/g, 1), 2);

    return row * 8 + col;
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