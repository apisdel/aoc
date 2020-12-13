export const part1 = (input) => {
    const lines = input.split('\n');
    const departureTime = parseInt(lines[0]);
    let buses = lines[1].split(',');

    buses = buses
        .filter(n => n !== 'x')
        .map(n => parseInt(n))

    let shortestTime = Infinity;
    let shortestTimeBusId = null;
    buses.forEach(busId => {
        const delay = busId - departureTime % busId;
        if (delay < shortestTime) {
            shortestTime = delay;
            shortestTimeBusId = busId;
        }
    });    
    return shortestTimeBusId * shortestTime;
}

export const part2 = (input) => {
    const lines = input.split('\n');
    let buses = lines[1].split(',')
        .map((id, index) => {
            return {'id': parseInt(id), 'index': index};
        })
        .filter(b => !isNaN(b.id));

    let doneBuses = [];
    let currentBus = buses.shift();
    let step = calcStep([currentBus, ...doneBuses]);
    let time = BigInt(currentBus.id);
    while (true) {
        const valid = checkSolution(time, [...doneBuses, currentBus]);
        if (valid) {
            //We found a solution for the first n buses.
            if (buses.length === 0) {
                break;
            }
            //There are more buses to check. Calcualte new step to reduce time complexity
            step = calcStep([currentBus, ...doneBuses]); 
            //Move the bus we just found a solution for, and get the next one
            doneBuses.push(currentBus);
            currentBus = buses.shift();
        }
        time += BigInt(step);
    }
    return time;
}

const calcStep = (buses) => {
    //This should be lcm for the general case, but since all buses are primes we just multiply them
    return buses.reduce((acc, bus) => {
        return acc * bus.id;
    }, 1);
}

const checkSolution = (time, buses) => {
    let valid = true;
    for (let i = 0; i < buses.length; i++) {
        const {id, index} = buses[i];
        if ((time + BigInt(index)) % BigInt(id) !== 0n) {
            valid = false;
            break;
        }
    }
    return valid;
}