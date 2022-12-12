import fs from 'fs';

function parseInput() {
  return fs
    .readFileSync('src/day.4.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x)
    .map((x) => x);
}

function parsePairs(pair: string) {
  return pair.split(/[,-]/).map((i) => parseInt(i));
}

export function part1() {
  const input = parseInput();

  return input.reduce((total, pair) => {
    const [a, b, c, d] = parsePairs(pair);

    return (a <= c && b >= d) || (c <= a && d >= b) ? total + 1 : total;
  }, 0);
}

export function part2() {
  const input = parseInput();

  return input.reduce((total, pair) => {
    const [a, b, c, d] = parsePairs(pair);

    return (a >= c && a <= d) ||
      (b >= c && b <= d) ||
      (c >= a && c <= b) ||
      (d >= a && d <= b)
      ? total + 1
      : total;
  }, 0);
}
