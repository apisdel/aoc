# aoc
Advent Of Code 2020

Puzzles are organized in year/day directories. 

Each puzzle must have an input.txt and index.mjs files. The .mjs file must export 2 functions named *part1* and *part2*, that the solver calls with the provided input.

To run a solution use a node version that supports ECMAScript Modules (Some older node versions can work with --experimental-modules flag.) and execute the following command:
```
node solver y d [part2]
```

Examples:
```
node solver 2020 11
```
```
node solver 2020 11 part2
```

