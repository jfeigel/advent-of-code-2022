import fs from 'fs';

function parseInput() {
  return fs
    .readFileSync('src/day.5.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x)
    .map((x) => x);
}

function getStacksMoves(input: string[]) {
  const stacksInput = input.slice(0, 8);

  const stacks: string[][] = stacksInput.reduce((_stacks, row) => {
    for (let j = 1; j < 35; j += 4) {
      if (row[j] !== ' ') {
        _stacks[Math.floor(j / 4)].unshift(row[j]);
      }
    }

    return _stacks;
  }, Array.from({ length: 9 }, () => []) as string[][]);

  const moves = input.slice(9).map((m) =>
    m.split(/\D/).reduce((move, d) => {
      let parsed = parseInt(d);
      if (!isNaN(parsed)) {
        move.push(move.length > 0 ? parsed - 1 : parsed);
      }
      return move;
    }, [] as number[]),
  );

  return { stacks, moves };
}

export function part1() {
  const input = parseInput();
  const { stacks, moves } = getStacksMoves(input);

  for (const move of moves) {
    const [numOfMoves, from, to] = move;

    for (let i = 0; i < numOfMoves; i++) {
      const item = stacks[from].pop();
      if (item) stacks[to].push(item);
    }
  }

  return stacks.reduce((top, stack) => top + stack.pop(), '');
}

export function part2() {
  const input = parseInput();
  const { stacks, moves } = getStacksMoves(input);

  for (const move of moves) {
    const [numOfMoves, from, to] = move;
    const itemsToMove = [];

    for (let i = 0; i < numOfMoves; i++) {
      const item = stacks[from].pop();
      if (item) itemsToMove.unshift(item);
    }

    stacks[to] = stacks[to].concat(itemsToMove);
  }

  return stacks.reduce((top, stack) => top + stack.pop(), '');
}
