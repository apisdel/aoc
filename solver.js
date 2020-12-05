const fs = require('fs').promises;

async function solve(year, day, part) {
    try {
        const dir = `./${year}/${day}`;
        const module = await import(`${dir}/index.mjs`);
        const data = await fs.readFile(`${dir}/input.txt`);
        const input = data.toString();

        if (part === 'part2') {
            console.log(module.part2(input));
        } else {
            console.log(module.part1(input));
        }
    } catch (error) {
        console.error(error);
    }
}

const myArgs = process.argv.slice(2);
const [year, day, part] = myArgs;
solve(year, day, part);