import fs from 'fs';

interface IMapping {
  [key: string]: {
    [key: string]: number;
  };
}

function parseInput() {
  return fs
    .readFileSync('src/day.2.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x)
    .map((x) => x);
}

export function part1() {
  const input = parseInput();

  const WIN = 6;
  const DRAW = 3;
  const LOSS = 0;

  const MAPPING: IMapping = {
    X: {
      points: 1,
      A: DRAW,
      B: LOSS,
      C: WIN,
    },
    Y: {
      points: 2,
      A: WIN,
      B: DRAW,
      C: LOSS,
    },
    Z: {
      points: 3,
      A: LOSS,
      B: WIN,
      C: DRAW,
    },
  };

  return input.reduce((total, roundSelections) => {
    const [them, us] = roundSelections.split(' ');
    return total + MAPPING[us].points + MAPPING[us][them];
  }, 0);
}

export function part2() {
  const input = parseInput();

  const ROCK = 1;
  const PAPER = 2;
  const SCISSORS = 3;

  const MAPPING: IMapping = {
    X: {
      points: 0,
      A: SCISSORS,
      B: ROCK,
      C: PAPER,
    },
    Y: {
      points: 3,
      A: ROCK,
      B: PAPER,
      C: SCISSORS,
    },
    Z: {
      points: 6,
      A: PAPER,
      B: SCISSORS,
      C: ROCK,
    },
  };

  return input.reduce((total, roundSelections) => {
    const [them, result] = roundSelections.split(' ');
    return total + MAPPING[result].points + MAPPING[result][them];
  }, 0);
}
