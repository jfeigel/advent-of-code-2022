import fs from 'fs';

function parseInput() {
  return fs
    .readFileSync('src/day.6.input.txt')
    .toString()
    .split('\n')
    .filter((x) => x)
    .map((x) => x)[0];
}

function detect(input: string, length: number) {
  let marker = '';
  let count = 0;

  for (const c of input) {
    count++;
    marker = `${marker.slice(marker.indexOf(c) + 1)}${c}`;

    if (marker.length === length) break;
  }

  return count;
}

export function part1() {
  return detect(parseInput(), 4);
}

export function part2() {
  return detect(parseInput(), 14);
}
