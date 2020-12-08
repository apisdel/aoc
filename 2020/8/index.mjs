export const part1 = (input) => {
    const commands = input.split('\n');
    const {terminates, acc} = executeProgram(commands);
    return acc;
}

export const part2 = (input) => {
    const commands = input.split('\n');

    let acc = 0;
    for (let i = 0; i < commands.length - 1; i++) {
        let [cmd, val] = commands[i].split(' ');
        if (cmd !== 'jmp' && cmd !== 'nop') {
            continue;
        }

        let newCommandsList = [...commands];
        if (cmd === 'jmp') {
            newCommandsList[i] = `nop ${val}`;
        } else {
            newCommandsList[i] = `jmp ${val}`;
        }

        const result = executeProgram(newCommandsList);
        if (result.terminates) {
            acc = result.acc;
            break;
        }
    }
    return acc;
}

const executeProgram = (commands) => {
    let acc = 0;
    let pointer = 0;
    let history = [];
    let terminates = true;

    while(true) {
        if (history.includes(pointer)) {
            terminates = false;
            break;
        }
        if (!commands[pointer]) {
            terminates = true;
            break;
        }
        history.push(pointer);
        let [cmd, val] = commands[pointer].split(' ');
        if (cmd === 'acc') {
            acc += parseInt(val);
            pointer += 1;
        } else if (cmd === 'jmp') {
            pointer += parseInt(val);
        } else {
            pointer += 1; //nop
        }
    }

    return {
        terminates,
        acc
    }
}