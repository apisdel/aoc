export const part1 = (input) => {
    let bags = input.split("\n")
        .map(line => parse(line.trim()));

    let matrix = {};
    bags.forEach(bag => {
        bag.children.forEach(([name]) => {
            if (!matrix[name]) {
                matrix[name] = [];
            }
            matrix[name].push(bag.name);
        });
        if (!matrix[bag.name]) {
            matrix[bag.name] = [];
        }
    });

    const countOptions = (matrix, bagName, visited) => {
        visited.add(bagName);
        matrix[bagName].forEach((bag) => {
            countOptions(matrix, bag, visited);
        });
    }

    let result = new Set();
    countOptions(matrix, 'shiny_gold', result);
    return result.size - 1;
}

export const part2 = (input) => {
    let bags = input.split("\n")
        .map(line => parse(line.trim()));

    let matrix = {};
    bags.forEach(bag => {
        matrix[bag.name] = bag.children;
    });

    console.log(matrix);
    const countOptions = (matrix, bagName) => {
        if (matrix[bagName].length === 0) {
            return 1;
        }
        
        let total = 1;
        matrix[bagName].forEach(([bag, count]) => {
            total += count * countOptions(matrix, bag);
        });

        console.log(`${bagName} contains ${total} bags`);
        return total;
    }

    return countOptions(matrix, 'shiny_gold', 1) - 1;
}

const parse = (line) => {
    let matches = line.match(/^(\w+\s\w+) bags contain (.+?)\.$/);
    const name = matches[1].replace(' ', '_');
    
    let children = [];
    if (matches[2] !== 'no other bags') {
        
        children = matches[2].split(', ').map((bagexp) => {
            let childMatches = bagexp.match(/^(\d+) (\w+\s\w+) bags?$/);
            return [childMatches[2].replace(' ', '_'), parseInt(childMatches[1])];
        });
    }

    return {
        "name": name,
        "children": children,
    }
}