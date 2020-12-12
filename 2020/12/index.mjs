export const part1 = (input) => {
    let instructions = parseInstructions(input);

    let ferry = new NauticalObject(0, 0, 'E');
    instructions.forEach(({command, value}) => {
        switch(command) {
            case 'E':
            case 'S':
            case 'W':
            case 'N':
                ferry.move(command, value);
                break;
            case 'F':
                ferry.move(ferry.facing, value);
                break;
            case 'L':
            case 'R':
                ferry.rotate(command, parseInt(value / 90));
                break;
            default:
                throw new Error('Invalid command!');
        }
    });

    return Math.abs(ferry.x) + Math.abs(ferry.y);
}

export const part2 = (input) => {
    let instructions = parseInstructions(input);

    let ferry = new NauticalObject(0, 0);
    let waypoint = new NauticalObject(10, -1);
    instructions.forEach(({command, value}) => {
        switch(command) {
            case 'E':
            case 'S':
            case 'W':
            case 'N':
                waypoint.move(command, value);
                break;
            case 'F':
                ferry.x += waypoint.x * value;
                ferry.y += waypoint.y * value;
                break;
            case 'L':
            case 'R':
                waypoint.rotateAroundOrigin(command, parseInt(value / 90));
                break;
            default:
                throw new Error('Invalid command!');
        }
    });

    return Math.abs(ferry.x) + Math.abs(ferry.y);
}

const parseInstructions = (input) => {
    return input.split('\n')
        .map((line) => {
            let parts = line.trim().match(/^([NESWLRF])(\d*)$/)
            return {
                "command": parts[1],
                "value": parseInt(parts[2])
            };
        });
}

const DIRECTIONS = ['E', 'S', 'W', 'N'];

class NauticalObject {

    constructor(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing;
    }

    move = (direction, amount) => {
        if (direction === 'N') {
            this.y -= amount;
        } else if (direction === 'S') {
            this.y += amount
        } else if (direction === 'E') {
            this.x += amount;
        } else if (direction === 'W') {
            this.x -= amount;
        }
    }

    rotate = (direction, steps) => {
        let index = DIRECTIONS.indexOf(this.facing);
        index = (direction === 'R')
            ? (index + steps) % 4
            : (index - steps + 4) % 4;
        this.facing = DIRECTIONS[index];
    }

    rotateAroundOrigin = (direction, steps) => {
        if (steps === 0) {
            return;
        }

        //90 deg rotation is the same as swapping coordinates and inverting the sign of the x(right), y(left) coordinate
        if (direction === 'R') {
            let y = this.y;
            this.y = this.x;
            this.x = y * -1;
        } else {
            let x = this.x;
            this.x = this.y;
            this.y = x * -1;
        }
        this.rotateAroundOrigin(direction, steps - 1);
    }

}